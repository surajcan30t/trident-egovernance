import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userType?: object | null;
      accessToken?: string | null;
    } & DefaultSession['user'];
  }
  interface JWT {
    accessToken: string;
    userType: object | null;
  }
}
