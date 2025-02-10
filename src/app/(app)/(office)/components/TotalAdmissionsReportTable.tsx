'use client'
import React, { useEffect, useState } from 'react';
import { columns } from '@/app/(app)/(office)/components/TableComponents/total-admissions-report-column';
import { TotalAdmissionsReport } from '@/app/(app)/(office)/components/TableComponents/schema';
import {
  totalAdmissionsReportFetcher,
} from '@/app/(app)/(office)/serveractions-office/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DataTable } from '@/components/data-table';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useParticulars } from '@/app/(app)/(accounts)/components/FeeDetailsFilterProvider';
import { DataTableFilterField } from '../../../../../types-global/types';
import Image from 'next/image';
import { parseCourse, unParseCourse } from '@/lib/course-parser';

const StudentDataTable = () => {
  const searchParams = useSearchParams()
  const { toast } = useToast();
  const course = searchParams.get('course') as string;
  const branch = searchParams.get('branch') as string;
  const [data, setData] = useState<TotalAdmissionsReport[]>([]);
  const [visible, setVisible] = useState<boolean>(false);


  const { branches } = useParticulars();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const studentType = ['REGULAR', 'LE']
  const filterFields: DataTableFilterField<TotalAdmissionsReport>[] = [
    {
      id: 'course',
      label: 'Course',
      options: Object.keys(branches).map((course) => ({
        value: parseCourse(course),
        label: course
      }))
    },
    {
      id: 'branch',
      label: "Branch",
      options: selectedCourses.length > 0
        ? selectedCourses.flatMap(course =>
          Object.values(branches[unParseCourse(course)]).map(branchInfo => ({
            value: branchInfo.branchCode,
            label: `${branchInfo.branchCode} (${course})`  // Adding course name for clarity
          }))
        )
        : []
    },
    {
      id: 'studentType',
      label: 'Student Type',
      options: studentType.map((studentType) => ({
        value: studentType,
        label: studentType
      }))
    }
  ]

  useEffect(() => {
    async function getData(course: string, branch: string): Promise<TotalAdmissionsReport[] | undefined> {
      try {
        const response = await totalAdmissionsReportFetcher(course, branch);
        if (response) {
          setData(response);
        }
        else {
          toast({
            variant: 'destructive',
            title: 'Something went wrong.',
          });
        }
      } catch (err) {
        return undefined;
      }
    }
    getData(course, branch).then(() => setVisible(true))
  }, [course, branch]);

  const { table } = useDataTable({
    data,
    columns,
    onFilterChange: (filters) => {
      const courseFilter = filters.find(f => f.id === 'course');
      if (courseFilter) {
        const courseValues = Array.isArray(courseFilter.value)
          ? courseFilter.value
          : [courseFilter.value];
        setSelectedCourses(courseValues);
      }
    }
  });

  return (
    <div className="container mx-auto w-full">
      {
        visible && data?.length > 0 ?
          (<DataTable table={table}>
            <DataTableToolbar fileName='Total_Admissions_Data' table={table} filterFields={filterFields} />
          </DataTable>)
          :
          (
            <div className='w-full flex flex-col gap-2 justify-center items-center'>
              <div className='relative w-[70%] h-[70vh] rounded-lg overflow-hidden'>
                <Image src="/nodata.png" alt="nodata" fill />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default StudentDataTable;
