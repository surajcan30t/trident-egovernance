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
    // const isRouteAllowed = allowedRoutes.some(
    //   (route: string) => route === requestedPath,
    // );

    // if (!isRouteAllowed) {
    //   console.log(`Route not allowed. Redirecting to ${redirectUrl}.`);
    //   return NextResponse.redirect(new URL(redirectUrl, req.url));
    // }

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

// Do not uncomment this. This is not required
// export default withAuth(
//   async function middleware(req) {
//     console.log('correct url: ', req.nextUrl.pathname);
//     const token = req.nextauth.token as Token; // Type assertion to Token interface
//     console.log('Token:', token);
//
//     const userRole = token?.userType?.jobTitle;
//
//     // If the user is logged in and requests the home page ('/')
//     if (userRole && req.nextUrl.pathname === '/') {
//       const redirectionRoute = serverRoutesArr[0]; // Redirect to the zeroth index route based on the user role
//       console.log('Redirecting logged-in user to:', redirectionRoute);
//
//       // Prevent access to home page and redirect logged-in users to their role-based page
//       return NextResponse.redirect(new URL(redirectionRoute, req.url));
//     }
//
//     // Role-based redirection if visiting any other page
//     if (
//       userRole &&
//       serverRoutesArr.length > 0 &&
//       req.nextUrl.pathname.startsWith('/')
//     ) {
//       const redirectionRoute = serverRoutesArr[0]; // Redirect to the zeroth index route
//       console.log('Redirecting to:', redirectionRoute);
//
//       // Prevent redirect loop by checking if the user is already on the correct route
//       if (req.nextUrl.pathname !== redirectionRoute) {
//         return NextResponse.redirect(new URL(redirectionRoute, req.url));
//       }
//     }
//
//     // If no valid token or role, allow access to public pages like the home page ('/')
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return !!token; // Allow access if token exists
//       },
//     },
//   },
// );

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
//     return regex.testpage(pathname);
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
//         if (!request.nextUrl.pathname.startsWith("/dashboard")) {
//           return NextResponse.redirect(new URL("/dashboard", request.url));
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
    '/student/:path*',
    '/newstudentregistration',
    '/office/:path*',
    // '/feecollection/dashboard',
    // '/feecollection/feecollectiondetails',
    // '/feecollection/studentfeecollection',
    // '/feecollection/otherfeecollection',
    // '/feecollection/duestatusreport',
  ],
};
