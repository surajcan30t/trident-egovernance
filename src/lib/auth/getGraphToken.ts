import 'server-only';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

interface User {
  accessToken: string;
  userType: { userJobInformationDto: { jobTitle: string } };
}

interface GraphTokenResponse {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
}

export default async function getGraphToken(access_token: string): Promise<{
  graphToken: string | undefined;
}> {
  const session = (await getServerSession(authOptions)) as { user: User };
  if (!session || !session.user) {
    return { graphToken: undefined };
  } else {
    try {
      const graphTokenResponse = await fetch(process.env.AZURE_AD_TOKEN_URI!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.AZURE_AD_CLIENT_ID as string,
          client_secret: process.env.AZURE_AD_CLIENT_SECRET as string,
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          requested_token_use: 'on_behalf_of',
          scope: 'https://graph.microsoft.com/.default',
          assertion: access_token,
        }),
      });
      if (!graphTokenResponse.ok) {
        console.error(
          'Graph token fetch failed:',
          await graphTokenResponse.text(),
        );
        return { graphToken: undefined };
      }
      const graphTokenData: GraphTokenResponse =
        await graphTokenResponse.json();
      return { graphToken: graphTokenData.access_token };
    } catch (error) {
      return { graphToken: undefined };
    }
  }
}
