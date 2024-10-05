import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
);

export const config = { matcher: ['/app'] };
