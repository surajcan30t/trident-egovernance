// 'use client'
import NewStudentRegistrationData from '@/components/NSR/NewStudentRegistrationData';
import { Card, CardContent } from '@/components/ui/card';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import React, { cache } from 'react';

// Define the structure of the student data returned by the API
interface Student {
  jeeApplicationNo: string;
  regdNo: string;
  studentName: string;
  gender: string;
  rank: number;
  phNo: string;
  status: string;
}

// Define the structure of the API response

// Fetch student data asynchronously
const studentData = async (): Promise<Student | null> => {
  try {
    const NSR_token = cookies().get("NSR-Authorization");
    const response: AxiosResponse<Student> = await axios.get('http://172.16.16.48:8080/NSR/get', {
      headers: {
        'NSR-Authorization': `Bearer ${NSR_token?.value}`,
      },
      params: {
        cache: ''
      }
    },
  );
    if (response.status !== 200) {
      return null;
    }
    if(typeof window !== 'undefined') {
      console.log('storing in ls')
      localStorage.setItem('student', JSON.stringify(response.data));
      console.log('stored in ls')
    }
    return response.data; // Return the student data
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};

// The page component
const Page: React.FC = async () => {
  const data = await studentData(); // Fetch the student data
  // console.log(data)
  return (
    <div>
      {/* {data && ( */}
        <NewStudentRegistrationData {...data} />
        
      {/*  )} */}
    </div>
  );
};

export default Page;
