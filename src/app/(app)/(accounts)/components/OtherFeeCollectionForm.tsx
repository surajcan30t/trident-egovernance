'use client'
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import {
  handleOtherFeesPayment,
} from '@/app/(app)/(accounts)/server-actions-fee-collection/actions';
import { useSession } from 'next-auth/react';
import { Loader } from 'lucide-react';

const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    dynamicFields: z
      .array(
        z.object({
          description: z.string().min(1, { message: 'This field is required.' }),
          amount: z.string().min(1, { message: 'This field is required.' }),
        }),
      )
      .min(1, {
        message: 'At least one description and fee pair must be added',
      }), // Ensure at least one dynamic field is added
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

export function OtherFeeCollectionForm({ regdNo }: { regdNo: string }) {
  const { data: session } = useSession()
  const token = session?.user?.accessToken
  const router = useRouter();
  const [showDDFields, setShowDDFields] = useState<boolean>(false);
  const [particulars, setParticulars] = useState<string[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<
    { description?: string; amount?: string }[]
  >([{ description: '', amount: '' }]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: regdNo,
    },
  });
  const { reset } = form;
  useEffect(() => {
    const otherFeeMenuFetcher = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-other-fees`,
          {
            cache: 'no-cache',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          },
        );
        const status = await response.status;
        if (status !== 200) {
          ('Error: ');
          return;
        } else {
          const data = await response.json();
          setParticulars(data);
          return data;
        }
      } catch (e) {
      }
    };
    otherFeeMenuFetcher();
  }, []);

  const handleAddField = () => {
    setDynamicFields((prevFields) => [
      ...prevFields,
      { description: '', amount: '' },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const currentValues = form.getValues("dynamicFields");

    const updatedValues = currentValues.filter((_, i) => i !== index);

    setDynamicFields(updatedValues);
    form.setValue("dynamicFields", updatedValues);
  };


  useEffect(() => {
    reset({ regdNo: regdNo });
  }, [regdNo, reset]);


  const paymentModeSelected = form.watch('paymentMode');
  useEffect(() => {

    if (paymentModeSelected === 'DD' || paymentModeSelected === 'CHEQUE' || paymentModeSelected === 'UPI' || paymentModeSelected === 'CARD') {
      setShowDDFields(true);
    } else {
      setShowDDFields(false);
    }
  }, [paymentModeSelected]);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      const response = await handleOtherFeesPayment(data);
      setLoading(false)
      if (response !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      } else {
        // router.refresh()
        form.reset()
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Form submitted successfully',
        });
        router.refresh()
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-0 shadow-lg border rounded-lg p-2">
        <h1 className="font-extrabold text-lg">Other Fees Payment</h1>
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
            {dynamicFields.map((_, index) => (
              <div key={index}>
                {/* Description Field */}
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <span className="text-red-500">*</span>
                  <Controller
                    name={`dynamicFields.${index}.description`}
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment description" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {particulars?.map((item, idx) => (
                            <SelectItem key={idx} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormMessage />
                </FormItem>

                {/* Collected Fee Field */}
                <FormItem>
                  <FormLabel>
                    Amount<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`dynamicFields.${index}.amount`)}
                      placeholder="e.g. 500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                {/* Remove Button */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size={'sm'}
                    onClick={() => handleRemoveField(index)}
                    className="mt-2"
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Field Button */}
            <Button type="button" variant={'outline'} onClick={handleAddField}>
              Add Fees
            </Button>

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
