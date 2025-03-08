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

interface RotatedTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
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

async function refreshAccessToken(
  refreshToken: string,
): Promise<RotatedTokens> {
  console.log('Refresh AccessToken function called');
  const response = await fetchWithTimeout(requiredEnvVars.AZURE_AD_TOKEN_URI!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: requiredEnvVars.AZURE_AD_CLIENT_ID as string,
      client_secret: requiredEnvVars.AZURE_AD_CLIENT_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: requiredEnvVars.AZURE_AD_SCOPE as string,
    }),
  });

  const tokens = await handleApiResponse<GraphTokenResponse>(
    response,
    'Failed to rotate refresh token',
  );

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: Date.now() + tokens.expires_in * 1000,
  };
}
async function fetchUserData(accessToken: string) {
  const [userTypeResponse, menuBladeResponse] = await Promise.all([
    fetchWithTimeout(
      `${requiredEnvVars.NEXT_PUBLIC_BACKEND}/api/get-user-information`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),
    fetchWithTimeout(
      `${requiredEnvVars.NEXT_PUBLIC_BACKEND}/api/get-menu-blade`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),
  ]);

  const [userType, menuBlade] = await Promise.all([
    handleApiResponse(userTypeResponse, 'Failed to fetch user information'),
    handleApiResponse(menuBladeResponse, 'Failed to fetch menu blade'),
  ]);

  if (!userType) {
    throw new AuthenticationError('Failed to fetch user type', 401);
  }

  return { userType, menuBlade };
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
          max_age: 60,
        },
      },
      issuer: requiredEnvVars.AZURE_AD_ISSUER as string,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  secret: requiredEnvVars.NEXTAUTH_SECRET as string,

  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      // Initial sign in
      if (account) {
        try {
          // Fetch required user data immediately during sign in
          const { userType, menuBlade } = await fetchUserData(
            account.access_token!,
          );

          let graphToken;
          // Handle Graph token for ACCOUNTS users
          if (
            (userType as UserType)?.userJobInformationDto?.jobTitle ===
            'ACCOUNTS'
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
                  client_secret:
                    requiredEnvVars.AZURE_AD_CLIENT_SECRET as string,
                  grant_type: 'refresh_token',
                  refresh_token: account.refresh_token!,
                  scope: 'https://graph.microsoft.com/.default',
                }),
              },
            );

            const graphTokenData = await handleApiResponse<GraphTokenResponse>(
              graphTokenResponse,
              'Failed to fetch Graph token',
            );
            graphToken = graphTokenData.access_token;
          }

          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expiresAt: account.expires_at! * 1000,
            userType,
            menuBlade,
            graphToken,
          };
        } catch (error) {
          console.error('Initial authentication error:', error);
          return {
            ...token,
            error: 'AuthenticationError',
            expires: 0,
          };
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      try {
        // Access token has expired, try to update it using refresh token
        const rotatedTokens = await refreshAccessToken(
          token.refreshToken as string,
        );

        // Update token with new values
        token.accessToken = rotatedTokens.access_token;
        token.refreshToken = rotatedTokens.refresh_token;
        token.expiresAt = rotatedTokens.expires_at;

        // Fetch user data with new access token
        const { userType, menuBlade } = await fetchUserData(
          rotatedTokens.access_token,
        );

        token.userType = userType;
        token.menuBlade = menuBlade;

        // Handle Graph token for ACCOUNTS users
        if (
          (userType as UserType)?.userJobInformationDto?.jobTitle === 'ACCOUNTS'
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
                refresh_token: rotatedTokens.refresh_token,
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

        return token;
      } catch (error) {
        console.error('Token rotation failed:', error);

        // Delete token information on error
        delete token.accessToken;
        delete token.refreshToken;
        delete token.expiresAt;
        delete token.userType;
        delete token.menuBlade;
        delete token.graphToken;

        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType || undefined;
        session.user.menuBlade = token.menuBlade || null;
        session.user.accessToken = token.accessToken as string;
        session.user.graphToken = token.graphToken as string;
        session.error = token.error;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/redirect`;
    },
  },
};
