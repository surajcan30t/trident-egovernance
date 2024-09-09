import { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';

const AZURE_AD_CLIENT_ID = process.env.AZURE_AD_CLIENT_ID!;
const AZURE_AD_CLIENT_SECRET = process.env.AZURE_AD_CLIENT_SECRET!;
const AZURE_AD_TENANT_ID = process.env.AZURE_AD_TENANT_ID!;
const AZURE_AD_SCOPE = process.env.AZURE_AD_SCOPE!;
const AZURE_AD_ISSUER = process.env.AZURE_AD_ISSUER!;

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: AZURE_AD_SCOPE,
        },
      },
      issuer: AZURE_AD_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token;
        try {
          const userType = await fetch(
            'http://localhost:8080/api/get-job-information',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            },
          );
          token.userType = await userType.json();
        } catch (error) {
          console.log('Error during fetch ', error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType || null;
      }
      return session;
    },

    // async redirect({ url, baseUrl}) {
    //   const token = await getSession();
    //   console.log('Token inside callback redirect', token);
    //   if(token === 'job_admin')
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
};
