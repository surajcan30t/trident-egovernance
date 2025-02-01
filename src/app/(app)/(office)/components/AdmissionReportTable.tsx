'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/app/(app)/(office)/components/TableComponents/data-table';
import { columns } from '@/app/(app)/(office)/components/TableComponents/admission-report-column';
import { AdmissionReport } from '@/app/(app)/(office)/components/TableComponents/schema';
import { admissionReportFetcher } from '@/app/(app)/(office)/serveractions-office/actions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const StudentDataTable = () => {
  const searchParams = useSearchParams()
  const { toast } = useToast();
  const admissionYear = searchParams.get('admissionYear') as string;
  const [data, setData] = useState<AdmissionReport[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    async function getData(year:string): Promise<AdmissionReport[] | undefined> {
      try {
        const response = await admissionReportFetcher(year);
        if(response){
          setData(response);
        }
        else{
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
    getData(admissionYear).then(()=>setVisible(true))
  }, [admissionYear]);

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
