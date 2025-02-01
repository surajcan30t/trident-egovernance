'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/app/(app)/(office)/components/TableComponents/data-table';
import { columns } from '@/app/(app)/(office)/components/TableComponents/sessionwise-report-column';
import { SessionwiseReport } from '@/app/(app)/(office)/components/TableComponents/schema';
import {
  sessionwiseContinuingReportFetcher,
} from '@/app/(app)/(office)/serveractions-office/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const StudentDataTable = ({sessionType}:{sessionType:string}) => {
  const searchParams = useSearchParams()
  const { toast } = useToast();
  const [data, setData] = useState<SessionwiseReport[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    async function getData(): Promise<SessionwiseReport[] | undefined> {
      try {
        const response = await sessionwiseContinuingReportFetcher(sessionType);
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
        return undefined;
      }
    }
    getData().then(()=>setVisible(true))
  }, [sessionType]);

  return (
    <div className="container mx-auto w-full">
      {
        visible && data?.length > 0 &&
        <DataTable columns={columns} data={data} />
      }
    </div>
  );
};

export default StudentDataTable;
