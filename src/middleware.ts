// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

type Route = string;

interface UserType {
  jobTitle: string; // The role of the user, e.g., "RECEPTIONIST", "DOCTOR"
}

interface Token {
  userType?: UserType; // Optional userType object
}

let serverRoutesArr: Route[] = [];
console.log('length of array is :', serverRoutesArr.length);
async function fetchDynamicRoutes() {
  if (serverRoutesArr.length === 0) {
    try {
      const response = await fetch('http://localhost:8080/api/routes', {
        cache: 'no-store',
      });
      const resp = await response.json();
      const data = await resp.routes;

      if (data) {
        serverRoutesArr = data; // Assign the fetched routes
        console.log('Fetched routes: ', serverRoutesArr);
      } else {
        console.error('No routes found in response: ', resp);
      }
    } catch (error) {
      console.error('Error fetching dynamic routes:', error);
    }
  }
}

export default withAuth(
  async function middleware(req) {
    await fetchDynamicRoutes(); // Fetch the routes if not already fetched
    console.log('currect url: ', req.nextUrl.pathname);
    const token = req.nextauth.token as Token; // Type assertion to Token interface
    console.log('Token:', token);

    const userRole = token?.userType?.jobTitle;

    // If the user is logged in and requests the home page ('/')
    if (userRole && req.nextUrl.pathname === '/') {
      const redirectionRoute = serverRoutesArr[0]; // Redirect to the zeroth index route based on the user role
      console.log('Redirecting logged-in user to:', redirectionRoute);

      // Prevent access to home page and redirect logged-in users to their role-based page
      return NextResponse.redirect(new URL(redirectionRoute, req.url));
    }

    // Role-based redirection if visiting any other page
    if (
      userRole &&
      serverRoutesArr.length > 0 &&
      req.nextUrl.pathname.startsWith('/')
    ) {
      const redirectionRoute = serverRoutesArr[0]; // Redirect to the zeroth index route
      console.log('Redirecting to:', redirectionRoute);

      // Prevent redirect loop by checking if the user is already on the correct route
      if (req.nextUrl.pathname !== redirectionRoute) {
        return NextResponse.redirect(new URL(redirectionRoute, req.url));
      }
    }

    // If no valid token or role, allow access to public pages like the home page ('/')
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // Allow access if token exists
      },
    },
  },
);

// interface UserType {
//   jobTitle: string;
// }

// interface Token {
//   userType: UserType; // The role of the user, such as "RECEPTIONIST", "DOCTOR", etc.
// }

// export async function middleware(request: NextRequest) {
//   const isPublicRoutes = ["/", "/studentportal", "/studentportal/:path*"];
//   const pathname = request.nextUrl.pathname;

//   // Check if the current path matches any public route
//   const isPublic = isPublicRoutes.some(route => {
//     const regex = new RegExp(`^${route.replace(':path*', '.*')}$`);
//     return regex.test(pathname);
//   });

//   // Fetch the token
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET }) as Token | null;

//   console.log('token in middleware: ', token);

//   // If there's no token and the route is not public, redirect to the login page
//   if (!token && !isPublic) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Check the role and redirect based on the role
//   if (token) {
//     switch (token.userType.jobTitle) {
//       case "job_student":
//         if (!request.nextUrl.pathname.startsWith("/app")) {
//           return NextResponse.redirect(new URL("/app", request.url));
//         }
//         break;
//       case "job_office":
//         if (!request.nextUrl.pathname.startsWith("/feecollectionhome")) {
//           return NextResponse.redirect(new URL("/feecollectionhome", request.url));
//         }
//         break;
//       case "NURSE":
//         if (!request.nextUrl.pathname.startsWith("/vitals")) {
//           return NextResponse.redirect(new URL("/vitals", request.url));
//         }
//         break;
//       case "PATHOLOGIST":
//         if (!request.nextUrl.pathname.startsWith("/image")) {
//           return NextResponse.redirect(new URL("/image", request.url));
//         }
//         break;
//       default:
//         return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // Allow the request to continue
//   return NextResponse.next();
// }

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico|login|studentportal).*)',
    '/abc',
  ],
};
