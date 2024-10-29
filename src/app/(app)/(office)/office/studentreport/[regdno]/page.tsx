import React from 'react';
import SingleStudentDetails from '../../../components/student-report/SingleStudentDetails';
import { StudentReport } from '@/app/(app)/(office)/office-schemas/schema';

const getStudentByRegdNo = async (regdNo: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/office/get-student-by-regdNo/${regdNo}`,
      {
        next: {
          revalidate: 5,
        },
      },
    );
    const data = await res.json();
    console.log(data)
    return data;
  } catch (e) {
    console.log('error', e);
  }
};
const page = async ({ params }: { params: { regdno: string } }) => {
  const studentData: StudentReport = await getStudentByRegdNo(params.regdno);
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-row bg-sky-400 rounded-t-lg justify-between w-full">
          <h1 className="text-xl text-white font-bold px-2">Registration No. - {params.regdno}</h1>
        </div>
        <SingleStudentDetails studentData={studentData} />
      </main>
    </>
  );
};

export default page;
