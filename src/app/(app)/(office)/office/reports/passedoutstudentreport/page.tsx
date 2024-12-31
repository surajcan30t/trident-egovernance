import React from 'react';
// import GetReportBySessionForm from '@/app/(app)/(office)/components/GetReportBySessionForm';
import SessionwiseReportTable from '@/app/(app)/(office)/components/TableComponents/SessionwiseReportTable';

export default async function page() {

  return (
    <>
      <div className="mx-auto w-full flex flex-col gap-2 justify-center items-center">
        {/*<GetReportBySessionForm />*/}
        <span className='text-2xl font-bold'>Passed out Student Report</span>
        <SessionwiseReportTable sessionType={'ALUMNI'} />
      </div>
    </>
  );
}