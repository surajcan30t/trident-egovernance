'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { feeCollectionSingleStudentDetails } from '@/app/(app)/(accounts)/server-actions-fee-collection/actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';


interface StudentData {
  regdNo?: string;
  name?: string;
  branchCode?: string;
  excessFeePaid?: number;
  feeCollected?: number;
  grandTotalDues?: number;
  jeeFeePaid?: number;
  regdYear?: number;
}

const StudentDetails = () => {
  const { data: session } = useSession();
  const [studentData, setStudentData] = useState<StudentData>({});
  const [statusCode, setStatusCode] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const registrationNo = searchParams.get('registrationNo');
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    const getStudentDetails = async (regdNo: string | null) => {
      try {
        if (!session) return;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-excess-fee-student-data?regdNo=${registrationNo}`,
          {
            headers: {
              'Authorization': `Bearer ${session.user.accessToken}`,
            },
          },
        );
        const data = await response.json();
        setStatusCode(data.status);
        setStatusMessage(data.detail);
        setRender(true);
        setStudentData(data);
        return data;
      } catch (e) {

      }
    };

    const intervalId = setInterval(() => {
      getStudentDetails(registrationNo);
    }, 120000); // Fetch data every 2 minutes

    getStudentDetails(registrationNo); // Initial fetch

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [registrationNo]);
  return (
    <>
      {statusCode === 404 && (
        <div className='flex flex-col items-center justify-center gap-y-1'>
          <h1 className='text-lg font-semibold text-red-500'>{statusMessage}</h1>
        </div>
      )}
      {render && (
        <div className={'bg-gray-50 shadow-lg rounded-lg w-1/2 h-[5rem]'}>
          <table className="text-xs text-left w-full h-full">
            <thead className="font-light">
              <tr className="border-b">
                <td className="px-2 py-1 border-r">Regd No.</td>
                <td className="px-2 py-1 border-r border-t">Name</td>
                <td className="px-2 py-1 border-r border-t">Branch</td>
                <td className="px-2 py-1 border-r border-t">Admission Year</td>
                <td className="px-2 py-1 border-r border-t">Grand Total Dues</td>
                <td className="px-2 py-1 border-r border-t">Fee Collected</td>
                <td className="px-2 py-1 border-r border-t">JEE Fee Paid</td>
                <td className="px-2 py-1">Excess Paid</td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-left">
                <td className="px-2 border-r">{studentData.regdNo}</td>
                <td className="px-2 border-r">{studentData.name}</td>
                <td className="px-2 border-r">{studentData.branchCode}</td>
                <td className="px-2 border-r">{studentData.regdYear}</td>
                <td className="px-2 border-r">{studentData.grandTotalDues}</td>
                <td className="px-2 border-r">{studentData.feeCollected}</td>
                <td className="px-2 border-r">{studentData.jeeFeePaid}</td>
                <td className="px-2">{studentData.excessFeePaid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const FormSchema = z.object({
  regdNo: z.string().min(10, {
    message: 'Registration number must be at least 10 characters.',
  }),
});


export function ExcessFeeRefund() {
  const [render, setRender] = useState<boolean>(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      router.push(`/feecollection/excessfeerefund?registrationNo=${data.regdNo}`);
    } catch (e) {
      setRender(false);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-y-3 items-center justify-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/5 flex flex-row items-end space-x-2"
          >
            <FormField
              control={form.control}
              name="regdNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter Registration Number{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Registration Number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant={'trident'} type="submit">
              Search
            </Button>
          </form>
        </Form>
        <StudentDetails />
      </div>

    </>
  );
}

export default ExcessFeeRefund