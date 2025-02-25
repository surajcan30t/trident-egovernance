import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

type Route = string;

interface UserType {
  jobTitle: string; // The role of the user, e.g., "RECEPTIONIST", "DOCTOR"
}

interface Token {
  accessToken: string;
  userType?: UserType; // Optional userType object
}
interface MenuBlade {
  redirectUrl: string;
  allowedRoutes: string[];
}

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token; // Extract the token
    // console.log('Token:', token);

    // If there's no token, redirect to login
    if (!token) {
      console.log('No token found. Redirecting to login.');
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Extract menuBlade from token
    const menuBlade = token?.menuBlade as MenuBlade | undefined;
    if (!menuBlade) {
      console.error('menuBlade not found in token.');
      return NextResponse.redirect(new URL('/', req.url));
    }
    //
    const { redirectUrl, allowedRoutes } = menuBlade;
    const requestedPath = req.nextUrl.pathname;
    if (requestedPath === '/') {
      console.log(`User accessing base path. Redirecting to ${redirectUrl}.`);
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Check if the requested route is allowed
    const isRouteAllowed = allowedRoutes.some((route: string) => {
      // Convert the route to a regular expression to match the requested path for dynamic routes
      const routeRegex = new RegExp(`^${route.replace(/:[^/]+/g, '[^/]+')}$`);
      return routeRegex.test(requestedPath);
    });

    if (!isRouteAllowed) {
      console.log(
        `${requestedPath} Route not allowed. Redirecting to ${redirectUrl}.`,
      );
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    console.log('Access granted to:', requestedPath);
    return NextResponse.next(); // Proceed if all checks pass
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // Allow access if token exists
      },
    },
  },
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png\\.jpg$|favicon.ico|tgi.png|login|studentportal|verifymr|accounts/studentfeecollection/mr).*)(.+)',
    // "/(?!api|_next/static|_next/image|.*\.(png|jpe?g|gif|webp|avif|svg|bmp|ico)$|favicon.ico|login|studentportal|verifymr|accounts/studentfeecollection/mr)(.*)"
  ],
};
