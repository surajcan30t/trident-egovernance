'use client';
import React, { useEffect, useState } from 'react';
import { columns } from '@/app/(app)/(office)/components/TableComponents/admission-report-column';
import { AdmissionReport } from '@/app/(app)/(office)/components/TableComponents/schema';
import { admissionReportFetcher } from '@/app/(app)/(office)/serveractions-office/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DataTable } from '@/components/data-table';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useParticulars } from '../../(accounts)/components/FeeDetailsFilterProvider';
import { DataTableFilterField } from '../../../../../types-global/types';
import Image from 'next/image';
import { parseCourse, unParseCourse } from '@/lib/course-parser';
import { DataTableSkeleton } from '@/components/data-table-skeleton';

const StudentDataTable = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const admissionYear = searchParams.get('admissionYear') as string;
  const [data, setData] = useState<AdmissionReport[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const { branches } = useParticulars();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const studentType = ['REGULAR', 'LE'];

  const filterFields: DataTableFilterField<AdmissionReport>[] = [
    {
      id: 'courses',
      label: 'Course',
      options: Object.keys(branches).map((course) => ({
        value: parseCourse(course),
        label: course,
      })),
    },
    {
      id: 'branch',
      label: 'Branch',
      options:
        selectedCourses.length > 0
          ? selectedCourses.flatMap((course) =>
              Object.values(branches[unParseCourse(course)]).map(
                (branchInfo) => ({
                  value: branchInfo.branchCode,
                  label: `${branchInfo.branchCode} (${course})`, // Adding course name for clarity
                }),
              ),
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
    async function getData(
      year: string,
    ): Promise<AdmissionReport[] | undefined> {
      try {
        const response = await admissionReportFetcher(year);
        if (response) {
          setData(response);
        } else {
          toast({
            variant: 'destructive',
            title: 'Something went wrong.',
            description: 'Please check the admission year',
          });
        }
      } catch (err) {
        return undefined;
      }
    }
    getData(admissionYear).then(() => setVisible(true));
  }, [admissionYear]);

  const { table } = useDataTable({
    data,
    columns,
    onFilterChange: (filters) => {
      const courseFilter = filters.find((f) => f.id === 'courses');
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
              fileName="Admission-Data"
              filterFields={filterFields}
              table={table}
            />
          </DataTable>
        ) : (
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <div className="relative w-[70%] h-[70vh] rounded-lg overflow-hidden">
              <Image src="/nodata.png" alt="nodata" fill />
            </div>
          </div>
        )}
      </React.Suspense>
    </div>
  );
};

export default StudentDataTable;
