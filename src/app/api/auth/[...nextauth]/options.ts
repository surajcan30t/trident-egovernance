import { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';

const requiredEnvVars = {
  AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
  AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
  AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
  AZURE_AD_SCOPE: process.env.AZURE_AD_SCOPE,
  AZURE_AD_ISSUER: process.env.AZURE_AD_ISSUER,
  AZURE_AD_TOKEN_URI: process.env.AZURE_AD_TOKEN_URI,
  NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
} as const;

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

class AuthenticationError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

interface GraphTokenResponse {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
  id_token: string;
}

interface UserType {
  userJobInformationDto: {
    jobTitle: string;
  };
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 5000,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new AuthenticationError(`Request timeout: ${url}`, 408);
      }
    }
    throw error;
  }
}

async function handleApiResponse<T>(
  response: Response,
  errorMessage: string,
): Promise<T> {
  if (!response.ok) {
    const errorDetail = await response
      .text()
      .catch(() => 'No error details available');
    throw new AuthenticationError(
      `${errorMessage}. Status: ${response.status}. Details: ${errorDetail}`,
      response.status,
    );
  }
  return response.json();
}

async function handleImageResponse(response: Response): Promise<string> {
  if (!response.ok) return 'null';
  const blob = await response.blob();
  return URL.createObjectURL(blob); // Convert to Blob URL
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: requiredEnvVars.AZURE_AD_CLIENT_ID as string,
      clientSecret: requiredEnvVars.AZURE_AD_CLIENT_SECRET as string,
      tenantId: requiredEnvVars.AZURE_AD_TENANT_ID as string,
      authorization: {
        params: {
          scope: requiredEnvVars.AZURE_AD_SCOPE as string,
        },
      },
      issuer: requiredEnvVars.AZURE_AD_ISSUER as string,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 0,
  },
  secret: requiredEnvVars.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (!account) {
        return token;
      }

      token.accessToken = account.access_token;
      // console.log('TOKEN::', token);
      console.log('ACCOUNT::', account);
      try {
        const [userTypeResponse, menuBladeResponse, profilePictureResponse] =
          await Promise.all([
            fetchWithTimeout(
              `${requiredEnvVars.NEXT_PUBLIC_BACKEND}/api/get-user-information`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              },
            ),
            fetchWithTimeout(
              `${requiredEnvVars.NEXT_PUBLIC_BACKEND}/api/get-menu-blade`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              },
            ),
            fetchWithTimeout(
              `${requiredEnvVars.NEXT_PUBLIC_BACKEND}/api/get-user-photo`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              },
            ),
          ]);

        console.log(profilePictureResponse);

        // Handle API responses
        const [userType, menuBlade, profilePicture] = await Promise.all([
          handleApiResponse(
            userTypeResponse,
            'Failed to fetch user information',
          ),
          handleApiResponse(menuBladeResponse, 'Failed to fetch menu blade'),
          handleImageResponse(profilePictureResponse),
        ]);

        console.log('got profile picture', profilePicture);

        if (!userType) {
          console.log('!!user type', !userType);
          return {
            ...token,
            error: 'Authentication Failed',
            expires: 0,
          };
        }

        console.log('set user type');

        token.userType = userType;
        token.menuBlade = menuBlade;
        profilePicture === 'null'
          ? (token.picture = null)
          : (token.picture = profilePicture);

        // Only proceed with Graph token if user has a job title
        if (
          (token.userType as UserType | undefined)?.userJobInformationDto
            ?.jobTitle === 'ACCOUNTS'
        ) {
          const graphTokenResponse = await fetchWithTimeout(
            requiredEnvVars.AZURE_AD_TOKEN_URI!,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                client_id: requiredEnvVars.AZURE_AD_CLIENT_ID as string,
                client_secret: requiredEnvVars.AZURE_AD_CLIENT_SECRET as string,
                grant_type: 'refresh_token',
                refresh_token: account.refresh_token!,
                scope: 'https://graph.microsoft.com/.default',
              }),
            },
          );

          const graphToken = await handleApiResponse<GraphTokenResponse>(
            graphTokenResponse,
            'Failed to fetch Graph token',
          );
          token.graphToken = graphToken.access_token;
        }

        console.log('TOKEN\t\t', token);
        return token;
      } catch (error) {
        console.error('Authentication error:', error);

        // Handle specific error types
        if (error instanceof AuthenticationError) {
          if (error.statusCode === 401) {
            // Token expired or invalid
            delete token.accessToken;
            delete token.userType;
            delete token.menuBlade;
            delete token.graphToken;
          }
        }
        // Return token even if there's an error to prevent complete authentication failure
        return token;
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType || undefined;
        session.user.menuBlade = token.menuBlade || null;
        session.user.accessToken = token.accessToken as string;
        session.user.graphToken = token.graphToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/redirect`;
    },
  },
};
