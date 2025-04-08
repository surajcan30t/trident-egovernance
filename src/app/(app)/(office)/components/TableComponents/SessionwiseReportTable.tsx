'use client';
import React, { useEffect, useState } from 'react';
import { columns } from '@/app/(app)/(office)/components/TableComponents/sessionwise-report-column';
import { SessionwiseReport } from '@/app/(app)/(office)/components/TableComponents/schema';
import { sessionwiseContinuingReportFetcher } from '@/app/(app)/(office)/serveractions-office/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DataTable } from '@/components/data-table';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useParticulars } from '@/app/(app)/(accounts)/components/FeeDetailsFilterProvider';
import { DataTableFilterField } from '../../../../../../types-global/types';
import { DataTableSkeleton } from '@/components/data-table-skeleton';
import Image from 'next/image';

const SessionwiseReportTable = ({ sessionType }: { sessionType: string }) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [data, setData] = useState<SessionwiseReport[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const { branches } = useParticulars();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const studentType = ['REGULAR', 'LE'];
  const filterFields: DataTableFilterField<SessionwiseReport>[] = [
    {
      id: 'course',
      label: 'Course',
      options: Object.keys(branches).map((course) => ({
        value: course,
        label: course,
      })),
    },
    {
      id: 'branch',
      label: 'Branch',
      options:
        selectedCourses.length > 0
          ? selectedCourses.flatMap((course) =>
              Object.values(branches[course]).map((branchInfo) => ({
                value: branchInfo.branch,
                label: `${branchInfo.branchCode} (${course})`, // Adding course name for clarity
              })),
            )
          : [],
    },
    {
      id: 'studentType',
      label: 'Student Type',
      options: studentType.map((studentType) => ({
        value: studentType,
        label: studentType,
      })),
    },
  ];

  useEffect(() => {
    async function getData(): Promise<SessionwiseReport[] | undefined> {
      try {
        const response = await sessionwiseContinuingReportFetcher(sessionType);
        if (response) {
          setData(response);
        } else {
          toast({
            variant: 'destructive',
            title: 'Something went wrong.',
          });
        }
      } catch (err) {
        return undefined;
      }
    }
    getData().then(() => setVisible(true));
  }, [sessionType]);

  const { table } = useDataTable({
    data,
    columns,
    onFilterChange: (filters) => {
      const courseFilter = filters.find((f) => f.id === 'course');
      if (courseFilter) {
        const courseValues = Array.isArray(courseFilter.value)
          ? courseFilter.value
          : [courseFilter.value];
        setSelectedCourses(courseValues);
      }
    },
  });

  return (
    <div className="container mx-auto w-full">
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
        {visible && data?.length > 0 ? (
          <DataTable table={table}>
            <DataTableToolbar
              fileName="Sessionwise_Student_Data"
              table={table}
              filterFields={filterFields}
            />
          </DataTable>
        ) : (
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <div className='relative w-[70%] h-[70vh] rounded-lg overflow-hidden'>
              <Image src="/nodata.png" alt="nodata" fill />
            </div>
          </div>
        )}
      </React.Suspense>
    </div>
  );
};

export default SessionwiseReportTable;
