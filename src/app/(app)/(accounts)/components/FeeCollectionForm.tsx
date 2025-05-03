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
import { handleDuesFeePayment } from '@/app/(app)/(accounts)/server-actions-fee-collection/actions';
import { Loader } from 'lucide-react';

const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    feeProcessingMode: z.enum(['AUTO', 'COURSEFEES', 'OPTIONALFEES'], {
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
      // If paymentMode is 'DD' or 'UPI' or 'CHEQUE' then ddNo, ddDate, and ddBank must be filled
      if (data.paymentMode === 'DD' || data.paymentMode === 'CHEQUE' || data.paymentMode === 'UPI' || data.paymentMode === 'CARD') {
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

  const paymentModeSelected = form.watch('paymentMode');
  useEffect(() => {

    if (paymentModeSelected === 'DD' || paymentModeSelected=== 'CHEQUE' || paymentModeSelected === 'UPI' || paymentModeSelected === 'CARD') {
      setShowDDFields(true);
    } else {
      setShowDDFields(false);
    }
  }, [paymentModeSelected]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await handleDuesFeePayment(data)
      setLoading(false)
      if (response !== 200) {
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
      setLoading(false);
    } finally {
      // window.location.reload()
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8 shadow-lg border rounded-lg p-2">
        <h1 className='font-extrabold text-lg'>Fees Payment</h1>
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
            {/*Processing mode*/}
            <FormField
              control={form.control}
              name="feeProcessingMode"
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
                      <SelectItem value="COURSEFEES">
                        Course fee first
                      </SelectItem>
                      <SelectItem value="OPTIONALFEES">
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
                    <Input placeholder="e.g. 20000" {...field} />
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
                      DD/UPI/Cheque Number<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {showDDFields && (
              <FormField
                control={form.control}
                name="ddDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      DD/UPI/Cheque Date<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type={'date'} placeholder="mm/dd/yyyy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {showDDFields && (
              <FormField
                control={form.control}
                name="ddBank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      DD/UPI/Cheque Bank<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SBI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button variant={'trident'} size={'lg'} type="submit">
              {loading ? (<Loader
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
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
