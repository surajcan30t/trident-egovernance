import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";


const AZURE_AD_CLIENT_ID = process.env.AZURE_AD_CLIENT_ID!
const AZURE_AD_CLIENT_SECRET = process.env.AZURE_AD_CLIENT_SECRET!
const AZURE_AD_TENANT_ID = process.env.AZURE_AD_TENANT_ID!
const AZURE_AD_SCOPE = process.env.AZURE_AD_SCOPE!
const AZURE_AD_ISSUER = process.env.AZURE_AD_ISSUER!


const options: NextAuthOptions = {
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
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
