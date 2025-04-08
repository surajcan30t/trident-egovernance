import React from 'react';
// import GetReportBySessionForm from '@/app/(app)/(office)/components/GetReportBySessionForm';
import SessionwiseReportTable from '@/app/(app)/(office)/components/TableComponents/SessionwiseReportTable';
import { DataTableSkeleton } from '@/components/data-table-skeleton';

export default async function page() {
  return (
    <>
      <div className="mx-auto w-full flex flex-col gap-2 justify-center items-center">
        {/*<GetReportBySessionForm />*/}
        <span className="text-2xl font-bold">Passed out Student Report</span>
        <div className="w-[calc(100vw-20vw)]">
          <React.Suspense
            fallback={
              <DataTableSkeleton
                columnCount={5}
                searchableColumnCount={2}
                cellWidths={['5rem', '20rem', '12rem', '12rem', '8rem']}
                shrinkZero
              />
            }
          >
            <SessionwiseReportTable sessionType={'ALUMNI'} />
          </React.Suspense>
        </div>
      </div>
    </>
  );
}
