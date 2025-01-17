import 'server-only';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

interface User {
  accessToken: string;
  userType: { userJobInformationDto: { jobTitle: string } };
}

export default async function authValidator(): Promise<{
  session: boolean;
  role: string | undefined;
  token: string | undefined;
}> {
  const session = (await getServerSession(authOptions)) as { user: User };
  if (!session || !session.user) {
    return { session: false, role: undefined, token: undefined };
  } else {
    const userRole = session?.user?.userType?.userJobInformationDto?.jobTitle;
    const token = session?.user?.accessToken;
    return { session: true, role: userRole, token: token };
  }
}
