import React from 'react';
import GetTotalAdmissionReportForm from '@/app/(app)/(office)/components/GetTotalAdmissionReportForm';
import TotalAdmissionsReportTable from '@/app/(app)/(office)/components/TotalAdmissionsReportTable';

export default async function page() {

  return (
    <>
      <div className="mx-auto w-full flex flex-col gap-2 justify-center items-center">
        <span className='text-2xl font-bold'>Total Student Admission Report </span>
        <GetTotalAdmissionReportForm />
        <TotalAdmissionsReportTable />
      </div>
    </>
  );
}
