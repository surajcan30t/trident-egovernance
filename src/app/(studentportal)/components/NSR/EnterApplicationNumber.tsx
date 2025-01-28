'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PulseLoader from 'react-spinners/PulseLoader';
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
import {
  multiFinalSubmit,
  multiStudentRegistration,
  newStudentLogin,
} from '../../nsractions/nsractions';
import { useAuth } from '@/app/(studentportal)/provider/NSRAuthContext';

const FormSchema = z.object({
  applicationNo: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  rank: z.coerce.number(),
});
const EnterApplicationNumber = () => {
  const { setIsLoggedIn } = useAuth()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationNo: '',
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setError('');
      setLoading(true);
      interface Response {
        status?: number;
        step?: number;
        message?: string;
      }
      const response: Response | undefined = await newStudentLogin(data);
      if (response?.status === 200) {
        setIsLoggedIn(true);
        const step = response?.step;
        switch (step) {
          case 1:
            router.push('/studentportal/newstudentadmission');
            break;
          case 2:
            router.push('/studentportal/newstudentpersonaldetails');
            break;
          case 3:
            router.push('/studentportal/newstudentacademicdetails');
            break;
          case 4:
            router.push('/studentportal/newstudentfacilities');
            break;
          case 5:
            router.push('/studentportal/newstudentdocs');
            break;
          case 6:
            router.push('/studentportal/newstudentfinalregister');
            break;
          default:
            break;
        }
      }
      else {
        setError(response?.message || 'An error occurred during login');
      }
    } catch (error: any) {
      console.log(error);
      // setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function multiReg(data: number) {
    const response = await multiStudentRegistration();
    console.log(response);

  }
  async function multiSub(data: number) {
    const response = await multiFinalSubmit();
    console.log(response);

  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-2xl text-slate-600 font-bold">
          Log In Using Application Number
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 lg:w-1/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="applicationNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter JEE/OJEE application number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rank</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="Enter you rank" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size={'lg'} variant="trident" type="submit">
              {loading ? <PulseLoader color="#ffffff" size={5} /> : 'Submit'}
            </Button>
          </form>
        </Form>
        {error && <p className="text-red-600 font-semibold">{error}</p>}
      </div>
      <div>
        <h1>Multi Student Registration</h1>
        <button
          className="border bg-blue-200"
          onClick={() => {
            multiReg(1);
          }}
        >
          Multi Register
        </button>
      </div>
      <div>
        <h1>Multi Student Submit</h1>
        <button
          className="border bg-blue-200"
          onClick={() => {
            multiSub(1);
          }}
        >
          Multi Submit
        </button>
      </div>
    </>
  );
};

export default EnterApplicationNumber;
