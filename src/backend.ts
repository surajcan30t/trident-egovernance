'use server';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Papa from 'papaparse';
import axios from 'axios';
import { z } from 'zod';

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const fetchDataFromBackend = async () => {
  const req = new NextRequest(
    'http://192.168.34.173:8080/api/get-job-information',
  );
  console.log('req=', req);
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

export const handleNewStudent = async (formData: any) => {
  formData.admissionYear = new Date().getFullYear();
  formData.degreeYop = formData.admissionYear + 4;
  formData.status = 'CONTINUING';
  console.log(formData);
  const session = await getServerSession(authOptions);
  console.log('Server session', session);
  if (session) {
    try {
      const request = await axios.post(
        `${process.env.LOCAL_BACKEND_URL}/NSR/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          // timeout: 5
        },
      );
      return request.status;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('no session found');
    return 401;
  }
};

interface StudentRecord {
  jeeApplicationNo: string;
  studentName: string;
  rank: number;
  rankType: string;
  course: string;
  tfw: string;
  admissionType: string;
  studentType: string;
  gender: string;
  branchCode: string;
  ojeeCounsellingFeePaid: string;
  admissionYear?: number; // This will be added later
}

// Function to convert CSV file to JSON
// const convertCsvToJson = (csvFile: File): Promise<StudentRecord[]> => {
//   return new Promise((resolve, reject) => {
//     Papa.parse<StudentRecord>(csvFile, {
//       header: true, // The CSV headers should match the keys in StudentRecord
//       skipEmptyLines: true, // Skips any empty rows in the CSV
//       complete: (result) => {
//         console.log('Parsed CSV:', result.data);
//         resolve(result.data); // Return the parsed CSV as JSON
//       },
//       error: (error) => {
//         console.error('Error parsing CSV:', error);
//         reject(error);
//       },
//     });
//   });
// };

export const handleBulkStudentUpload = async (
  formData: FormData,
): Promise<object | void> => {
  interface Response {
    status: number;
    message: string;
    description: string;
  }
  const jsonRecords = formData.get('data');
  console.log('Formdata', formData);
  console.log('Uploading FormData:', jsonRecords);
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // Get the CSV file from FormData using the correct key
      const request = await fetch(
        `${process.env.LOCAL_BACKEND_URL}/NSR/bulk-post`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },

          body: jsonRecords,
        },
      );
      const response = await request.json();
      console.log('Response:', response);

      if (
        response.status === 400 ||
        response.status === 422 ||
        response.status === 500
      ) {
        console.log('This block executed');
        const serverResponse = {
          status: response.status,
          message: response.detail,
          description: response.description,
        } as Response;
        return serverResponse;
      }
      const serverResponse = {
        status: 200,
        message: 'Upload Successful',
      } as Response;
      return serverResponse;
    } catch (error) {
      console.error('Error in handleBulkStudentUpload:', error);
    }
  } else {
    const serverResponse = {
      status: 401,
      message: 'Unauthorized',
    } as Response;
    return serverResponse;
  }
};

export const handleBulkSectionUpload = async (
  formData: FormData,
  method: string,
): Promise<object | void> => {
  interface Response {
    status: number;
    message: string;
    description: string;
  }
  if (method !== 'create' && method !== 'update') {
    return;
  }
  const jsonRecords = formData.get('data');
  console.log('Uploading FormData:', jsonRecords, '\nMethod:', method);
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      // Get the CSV file from FormData using the correct key
      const request = await fetch(
        `${process.env.LOCAL_BACKEND_URL}/office/sections/${method}`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },

          body: jsonRecords,
        },
      );
      const response = await request.json();
      console.log('Response:', response);

      if (response.status === 400 || response.status === 422) {
        console.log('400 block executed');
        const serverResponse = {
          status: response.status,
          message: response.detail,
          description: response.description,
        } as Response;
        return serverResponse;
      }
      if (response.status === 500) {
        console.log('500 block executed');
        const serverResponse = {
          status: response.status,
          message: 'Error in creating sections',
          description: response.description,
        } as Response;
        return serverResponse;
      } else {
        console.log('200 block executed');
        const serverResponse = {
          status: 200,
          message: 'Upload Successful',
        } as Response;
        return serverResponse;
      }
    } catch (error) {
      console.error('Error in section upload:', error);
    }
  } else {
    const serverResponse = {
      status: 401,
      message: 'Unauthorized',
    } as Response;
    return serverResponse;
  }
};
