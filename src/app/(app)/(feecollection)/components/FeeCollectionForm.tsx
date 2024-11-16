import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    processingMode: z.enum(['AUTO', 'COURSEFEEFIRST', 'OPTIONALFEEFIRST'], {
      required_error: 'Must choose payment processing mode',
    }),
    collectedFee: z.string({
      required_error: 'Must enter collected fee',
    }),
    paymentMode: z.enum(['CASH', 'CHEQUE', 'DD', 'UPI', 'CARD'], {
      required_error: 'Must choose payment mode',
    }),
    ddNo: z.string().optional(),
    ddDate: z.string().optional(),
    ddBank: z.string().optional(),
  })
  .refine(
    (data) => {
      // If paymentMode is 'DD', then ddNo, ddDate, and ddBank must be filled
      if (data.paymentMode === 'DD') {
        return data.ddNo && data.ddDate && data.ddBank;
      }
      return true; // other payment modes don't require these fields
    },
    {
      message: 'ddNo, ddDate, and ddBank are required when payment mode is DD',
      path: ['ddNo'], // points to one of the fields, but message is for all
    },
  );

export function FeeCollectionForm({ regdNo }: { regdNo: string }) {
  const router = useRouter();
  const [registrationNo, setRegistrationNo] = useState('');
  const [render, setRender] = useState<boolean>(false);
  const [showDDFields, setShowDDFields] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: regdNo,
    },
  });
  const { reset } = form;

  useEffect(() => {
    reset({ regdNo: regdNo });
  }, [regdNo, reset]);

  useEffect(() => {
    const paymentModeSelected = form.watch('paymentMode');
    console.log(paymentModeSelected)
    if (paymentModeSelected === 'DD') {
      setShowDDFields(true);
    } else {
      setShowDDFields(false);
    }
  }, [form]);
  console.log(form.watch())

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = { status: 200 };
      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      } else {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Form submitted successfully',
        });
      }
    } catch (e) {
      console.log(e);
      setRender(false);
    }
  }

  return (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="regdNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Registration Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={true}
                      disabled={true}
                      placeholder="Registration Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="processingMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Processing Mode</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment processing mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AUTO">Auto</SelectItem>
                      <SelectItem value="COURSEFEEFIRST">
                        Course fee first
                      </SelectItem>
                      <SelectItem value="OPTIONALFEEFIRST">
                        Optional fee first
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collectedFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Collected Fee<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="fee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Mode</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment processing mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CASH">CASH</SelectItem>
                      <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                      <SelectItem value="DD">DD</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="CARD">CARD</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showDDFields && (
                <FormField
                  control={form.control}
                  name="ddNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        DD Number<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            )}
            {/*{showDDFields && (*/}
            {/*  <FormField*/}
            {/*    control={form.control}*/}
            {/*    name="ddDate"*/}
            {/*    render={({ field }) => (*/}
            {/*      <FormItem>*/}
            {/*        <FormLabel>*/}
            {/*          DD Date<span className="text-red-500">*</span>*/}
            {/*        </FormLabel>*/}
            {/*        <FormControl>*/}
            {/*          <Input type={'date'} placeholder="fee" {...field} />*/}
            {/*        </FormControl>*/}
            {/*        <FormMessage />*/}
            {/*      </FormItem>*/}
            {/*    )}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{showDDFields && (*/}
            {/*  <FormField*/}
            {/*    control={form.control}*/}
            {/*    name="ddBank"*/}
            {/*    render={({ field }) => (*/}
            {/*      <FormItem>*/}
            {/*        <FormLabel>*/}
            {/*          DD Bank<span className="text-red-500">*</span>*/}
            {/*        </FormLabel>*/}
            {/*        <FormControl>*/}
            {/*          <Input placeholder="fee" {...field} />*/}
            {/*        </FormControl>*/}
            {/*        <FormMessage />*/}
            {/*      </FormItem>*/}
            {/*    )}*/}
            {/*  />*/}
            {/*)}*/}
            <Button variant={'trident'} size={'lg'} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
