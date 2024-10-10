// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

import { withAuth } from 'next-auth/middleware';

let serverRoutesArr = [];
async function fetchDynamicRoutes() {
  if (serverRoutesArr.length === 0) {
    const response = await fetch('http://localhost:3000/api/routes');
    const data = await response.json();
    serverRoutesArr = data;
    return serverRoutesArr;
  }
}
export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

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
    '/((?!$|api|_next/static|_next/image|favicon.ico|login|feecollection|office|studentportal|newstudentreporting).*)',
  ],
};
