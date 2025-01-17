'use client'
import { z } from 'zod';
import { useRouter } from 'next/navigation';
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
import { handleExcessFeeRefund } from '@/app/(app)/(accounts)/server-actions-fee-collection/actions';
import PulseLoader from 'react-spinners/PulseLoader';

const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    voucherNo: z.string({
      required_error: 'Must enter voucher number',
    }),
    refundAmount: z.string({
      required_error: 'Must enter refund amount',
    }),
    refundMode: z.enum(['CASH', 'UPI', 'CHEQUE'], {
      required_error: 'Must choose refund mode',
    }),
    chqNo: z.string().optional(),
    chqDate: z.string().optional(),
  })
  .refine(
    (data) => {
      // If paymentMode is 'DD', then ddNo, ddDate, and ddBank must be filled
      if (data.refundMode === 'CHEQUE') {
        return data.chqNo && data.chqDate;
      }
      return true; // other payment modes don't require these fields
    },
    {
      message: 'chqNo and chqDate are required when refund mode is CHEQUE',
      path: ['chqNo'], // points to one of the fields, but message is for all
    },
  );

export function ExcessFeeRefundForm({ regdNo }: { regdNo: string }) {
  const router = useRouter();
  const [showDDFields, setShowDDFields] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

  const refundModeSelected = form.watch('refundMode');
  useEffect(() => {
    console.log('Refund Mode:', refundModeSelected);

    if (refundModeSelected === 'CHEQUE') {
      setShowDDFields(true);
    } else {
      setShowDDFields(false);
    }
  }, [refundModeSelected]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await handleExcessFeeRefund(data)
      setLoading(false)
      if (response === 404) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'This student is not eligible for a refund. Please check the registration number and try again.',
        });
      } else {
        console.log("successful")
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Excess fee refund request submitted successfully',
        });
        router.refresh()
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-1/3 mb-8 shadow-lg border rounded-lg p-2">
        <h1 className='font-extrabold text-lg'>Excess Fee Refund</h1>
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
              name="voucherNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Voucher Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter voucher number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="refundAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Refund Amount<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Refund mode*/}
            <FormField
              control={form.control}
              name="refundMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Mode</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select refund mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CASH">
                        CASH
                      </SelectItem>
                      <SelectItem value="UPI">
                        UPI
                      </SelectItem>
                      <SelectItem value="CHEQUE">
                        CHEQUE
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showDDFields && (
              <FormField
                control={form.control}
                name="chqNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cheque Number<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {showDDFields && (
              <FormField
                control={form.control}
                name="chqDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Cheque Date<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type={'date'} placeholder="fee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button variant={'trident'} size={'lg'} type="submit">
              {loading ? (<PulseLoader
                color="#ffffff"
                size={5}
              />) :
                'Confirm'
              }
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
