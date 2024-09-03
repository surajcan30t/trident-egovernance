'use server';
import { User, getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const fetchDataFromBackend = async () => {
  const req: NextRequest = new NextRequest(
    'http://192.168.34.173:8080/api/get-job-information',
  );
  try {
    console.log('hello from backend');
    const session = await getToken({ req });
    console.log('Token', session);

    if (session) {
      // const accessToken = session;

      const response = await fetch(
        'http://192.168.34.173:8080/api/get-job-information',
        {
          method: 'GET',
          headers: {
            // "Authorization": `Bearer ${session.accessToken}`,
          },
        },
      );

      const data = await response.json();
      console.log(data);
    } else {
      console.log('No session found');
    }
  } catch (error) {
    console.log('ERROR IN COMPONENT PAGE', error);
  }
};

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user;
};

// 'use server'
// import { cookies } from "next/headers";
// // import bcrypt from 'bcrypt'
// import { redirect } from "next/navigation";

// export async function getposts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts = await res.json();
//   console.log(posts);
//   return posts;
// }

// export async function login() {
//   console.log('Hello')
// }

// export async function logout() {
//   // Destroy the session
//   cookies().set("session", "", { expires: new Date(0) });
// }

// export async function usRole(){
//   try{

//     const getrole = await fetch('http://localhost:8080/usertype', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: 'include'
//    })

//    const role = await getrole.json();
//    console.log(role.user)
//    if(role.user === 'admin'){
//      return true
//     }
//     return false
//   }catch(e){
//     console.log(e)
//   }
// }

// export async function checkUserRole(roled: string) {
//   // console.log("Session is this",cookies().get("session"))
//   const session = roled
//   console.log(session)

//   if (!session) {
//     return;
//   }
//   console.log('got session going to decode')
//   // const jwtPayload = jwt.decode(session) as { role: string };
//   const role = await bcrypt.compare("admin", session)
//   console.log('decoded--', role)
//   if (!role) {
//     console.log('Not an admin')
//     return false
//   }
//   console.log('is an admin')
//   return true
// }
