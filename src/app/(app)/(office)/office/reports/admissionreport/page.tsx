import React from 'react';
import GetReportBySessionForm from '@/app/(app)/(office)/components/GetReportBySessionForm';
import AdmissionReportTable from '@/app/(app)/(office)/components/AdmissionReportTable';

export default async function page() {

  return (
    <>
      <div className="mx-auto w-full flex flex-col gap-2 justify-center items-center">
        <GetReportBySessionForm />
        <AdmissionReportTable />
      </div>
    </>
  );
}
