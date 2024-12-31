'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/app/(app)/(office)/components/TableComponents/data-table';
import { columns } from '@/app/(app)/(office)/components/TableComponents/total-admissions-report-column';
import { TotalAdmissionsReport } from '@/app/(app)/(office)/components/TableComponents/schema';
import {
  totalAdmissionsReportFetcher,
} from '@/app/(app)/(office)/serveractions-office/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const StudentDataTable = () => {
  const searchParams = useSearchParams()
  const { toast } = useToast();
  const course = searchParams.get('course') as string;
  const branch = searchParams.get('branch') as string;
  const [data, setData] = useState<TotalAdmissionsReport[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    async function getData(course:string, branch: string): Promise<TotalAdmissionsReport[] | undefined> {
      try {
        const response = await totalAdmissionsReportFetcher(course, branch);
        console.log(response);
        if(response){
          setData(response);
        }
        else{
          toast({
            variant: 'destructive',
            title: 'Something went wrong.',
          });
        }
      } catch (err) {
        console.log(err);
        return undefined;
      }
    }
    getData(course, branch).then(()=>setVisible(true))
  }, [course, branch]);

  return (
    <div className="container mx-auto w-full">
      {
        visible && data?.length > 0 ?
        (<DataTable columns={columns} data={data} />) : (
            <div className='text-center mt-5'>No data found</div>
          )
      }
    </div>
  );
};

export default StudentDataTable;
