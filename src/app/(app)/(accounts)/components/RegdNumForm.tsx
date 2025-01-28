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
  studentName?: string;
  gender?: string;
  branchCode?: string;
  admissionYear?: number;
  currentYear?: number;
}

const StudentDetails = () => {
  const { data: session } = useSession();
  const [studentData, setStudentData] = useState<StudentData>({});
  const searchParams = useSearchParams();
  const registrationNo = searchParams.get('registrationNo');
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    const getStudentDetails = async (regdNo: string | null) => {
      try {
        if (!session) return;
        else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${regdNo}`,
            {
              headers: {
                'Authorization': `Bearer ${session.user.accessToken}`,
              },
            },
          );
          const data = await response.json();
          setRender(true);
          setStudentData(data);
          return data;
        }
      } catch (e) {
        console.error(e);
      }
    };
    getStudentDetails(registrationNo);
  }, [registrationNo]);
  return (
    <>
      {render && (
        <div className={'bg-gray-50 shadow-lg rounded-lg w-full h-full'}>
          <table className="text-xs text-left w-full h-full">
            <thead className="font-light">
              <tr className="border-b">
                <td className="px-2 py-1 border-r">Regd No.</td>
                <td className="px-2 py-1 border-r">Name</td>
                <td className="px-2 py-1 border-r">Gender</td>
                <td className="px-2 py-1 border-r">Branch</td>
                <td className="px-2 py-1 border-r">Admission Year</td>
                <td className="px-2 py-1">Year</td>
              </tr>
            </thead>
            <tbody>
              <tr className="text-left">
                <td className="px-2 border-r">{studentData.regdNo}</td>
                <td className="px-2 border-r">{studentData.studentName}</td>
                <td className="px-2 border-r">{studentData.gender}</td>
                <td className="px-2 border-r">{studentData.branchCode}</td>
                <td className="px-2 border-r">{studentData.admissionYear}</td>
                <td className="px-2 border-r">{studentData.currentYear}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const FormSchema = z.object({
  regdNo: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export const RedirectOtherFeeCollectionForm = () => {
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
          '/accounts/otherfeecollection?registrationNo=' + data.regdNo,
        );
      }
    } catch (e) {
      console.log(e);
      setRender(false);
    }
  }

  return (
    <>
      <>
        <div className="w-4/5 flex flex-row gap-x-2 items-start ">
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
    </>
  );
};


export function RedirectStudentFeeCollectionForm() {
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
      const response = await feeCollectionSingleStudentDetails(data.regdNo);
      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please check the registration number',
        });
      } else {
        router.push(
          '/accounts/studentfeecollection?registrationNo=' + data.regdNo,
        );
      }
    } catch (e) {
      console.log(e);
      setRender(false);
    }
  }

  return (
    <>
      <div className="w-4/5 flex flex-row gap-x-2 items-start ">
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
