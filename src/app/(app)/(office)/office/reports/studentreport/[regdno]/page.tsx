import React from 'react';
import SingleStudentDetails from '../../../../components/student-report/SingleStudentDetails';
import { StudentReport } from '@/app/(app)/(office)/office-schemas/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const getStudentByRegdNo = async (regdNo: string) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/get-student-by-regdNo/${regdNo}`,
        {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      const data = await res.json();
      return data;
    }else{
      return null;
    }
  } catch (e) {
  }
};
const page = async ({ params }: { params: { regdno: string } }) => {
  const studentData: StudentReport = await getStudentByRegdNo(params.regdno);
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center relative">
        <div className="flex flex-row bg-sky-400 rounded-t-lg justify-between w-full sticky top-[calc(0vh+3.5rem)]">
          <h1 className="text-xl text-white font-semibold px-2">
            Registration No. -{' '}
            <span className="font-extrabold">
              {studentData?.studentOnlyDTO?.regdNo ?? 'N/A'}
            </span>
          </h1>
        </div>
        <SingleStudentDetails studentData={studentData} />
      </main>
    </>
  );
};

export default page;
