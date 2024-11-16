'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { feeCollectionSingleStudentDetails } from '@/app/(app)/(feecollection)/server-actions-fee-collection/table-actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface StudentData {
  regdNo?: string;
  studentName?: string;
  gender?: string;
  branchCode?: string;
  admissionYear?: number;
  currentYear?: number;
}

const StudentDetails = () => {
  const [studentData, setStudentData] = useState<StudentData>({});
  const searchParams = useSearchParams();
  const registrationNo = searchParams.get('registrationNo');
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    const getStudentDetails = async (regdNo: string | null) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${regdNo}`,
        );
        const data = await response.json();
        setRender(true)
        setStudentData(data);
        return data;
      } catch (e) {
        console.error(e);
      }
    };
    getStudentDetails(registrationNo);
  }, [registrationNo]);
  return (
    <>
      { render &&
        <div className={'bg-gray-50 rounded-lg shadow-lg'}>
          <table className="text-xs">
            <thead className="font-medium rounded-lg">
              <tr className=" rounded-lg">
                <th className="text-left">Regd No.</th>
                <th className="text-left">Name</th>
                <th className="text-left">Gender</th>
                <th className="text-left">Branch</th>
                <th className="text-left">Admission Year</th>
                <th className="text-left">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-t rounded-lg">
                  {studentData.regdNo}
                </td>
                <td className="p-2 border rounded-lg">
                  {studentData.studentName}
                </td>
                <td className="p-2 border rounded-lg">{studentData.gender}</td>
                <td className="p-2 border rounded-lg">
                  {studentData.branchCode}
                </td>
                <td className="p-2 border rounded-lg">
                  {studentData.admissionYear}
                </td>
                <td className="p-2 border-t rounded-lg">
                  {studentData.currentYear}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </>
  );
};

const FormSchema = z.object({
  regdNo: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function RegdNumForm() {
  const router = useRouter();
  const [registrationNo, setRegistrationNo] = useState('');
  const [render, setRender] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await feeCollectionSingleStudentDetails(data.regdNo);
      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please check the registration number',
        });
      } else {
        router.push(
          '/feecollection/studentfeecollection?registrationNo=' + data.regdNo,
        );
      }
    } catch (e) {
      console.log(e);
      setRender(false);
    }
  }

  return (
    <>
      <div className='w-3/5 flex flex-row gap-x-2 items-start'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/4 flex flex-row items-end space-x-2"
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
