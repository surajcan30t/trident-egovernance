import React from 'react';
import GetTotalAdmissionReportForm from '@/app/(app)/(office)/components/GetTotalAdmissionReportForm';
import TotalAdmissionsReportTable from '@/app/(app)/(office)/components/TotalAdmissionsReportTable';
import { DataTableSkeleton } from '@/components/data-table-skeleton';

export default async function page() {
  return (
    <>
      <div className="mx-auto w-full flex flex-col gap-2 justify-center items-center">
        <span className="text-2xl font-bold">
          Total Student Admission Report{' '}
        </span>
        <GetTotalAdmissionReportForm />
        <div className="w-[calc(100vw-20vw)]">
          <TotalAdmissionsReportTable />
        </div>
      </div>
    </>
  );
}
