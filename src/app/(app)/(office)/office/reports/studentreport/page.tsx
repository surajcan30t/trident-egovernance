import React from 'react';
import StudentReportByRegdForm from '../../../components/StudentReportByRegdForm';
import Unauthorized from '@/components/Unauthorized';
import authValidator from '@/lib/auth/role-validator';
import { StudentReport } from '@/app/(app)/(office)/office-schemas/schema';
import SingleStudentDetails from '../../../components/student-report/SingleStudentDetails';

interface Response {
  message: string;
  data: StudentReport;
}

const getStudentByRegdNo = async (regdNo: string, token: string) => {
  if (regdNo === undefined || regdNo === null) {
    return { message: 'No registration number found', data: [] }
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/office/get-student-by-regdNo/${regdNo}`,
      {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res)
    if (res.status === 404) {
      return { message: 'No such registration number', data: [] }
    }
    if (res.status !== 200) {
      return { message: 'Something went wrong', data: [] }
    }
    const data = await res.json();
    return { message: 'Something went wrong', data: data }
  } catch (e) {
    return { message: 'Something went wrong', data: [] }
  }
};

const page = async ({ searchParams }: { searchParams: { registrationNumber: string } }) => {
  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }

  if (role !== 'OFFICE') {
    return <Unauthorized />;
  }
  const { registrationNumber } = searchParams
  const studentData: Response = await getStudentByRegdNo(registrationNumber, token);
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-1">
      <StudentReportByRegdForm />

      {registrationNumber && <div className="w-full h-full flex flex-col justify-center items-center relative">
        <div className="flex flex-row bg-sky-400 rounded-t-lg justify-between w-full sticky top-[calc(0vh+3.5rem)]">
          <h1 className="text-xl text-white font-semibold px-2">
            Registration No. -{' '}
            <span className="font-extrabold">
              {studentData?.data?.studentOnlyDTO?.regdNo ?? studentData?.message}
            </span>
          </h1>
        </div>
        {studentData?.data?.studentOnlyDTO && <SingleStudentDetails studentData={studentData?.data} />}
      </div>}
    </div> 
  );
};

export default page;
