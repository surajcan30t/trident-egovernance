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
import { handleDuesFeePayment } from '@/app/(app)/(feecollection)/server-actions-fee-collection/table-actions';

const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    dynamicFields: z
      .array(
        z.object({
          description: z.string().min(1, {
            message: 'Must select a description',
          }),
          amount: z.number().min(1, {
            message: 'Must enter collected fee',
          }),
        }),
      )
      .min(1, {
        message: 'At least one description and fee pair must be added',
      }), // Ensure at least one dynamic field is added
    collectedFee: z.number(),
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

export function OtherFeeCollectionForm({ regdNo }: { regdNo: string }) {
  const router = useRouter();
  const [showDDFields, setShowDDFields] = useState<boolean>(false);
  const [particulars, setParticulars] = useState<string[] | null>([]);
  const [totaldFee, setTotaldFee] = useState<number>(0)
  const [dynamicFields, setDynamicFields] = useState<
    { description: string; collectedFee: string }[]
  >([{ description: '', collectedFee: '' }]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: regdNo,
      collectedFee: totaldFee
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
          },
        );
        const status = await response.status;
        if (status !== 200) {
          console.log('Error: ');
          return;
        } else {
          const data = await response.json();
          setParticulars(data);
          return data;
        }
      } catch (e) {
        console.log(e);
      }
    };
    otherFeeMenuFetcher();
  }, []);

  const handleAddField = () => {
    setDynamicFields((prevFields) => [
      ...prevFields,
      { description: '', collectedFee: '' },
    ]);
  };

  const handleRemoveField = (index: number) => {
    setDynamicFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  useEffect(() => {
    reset({ regdNo: regdNo });
  }, [regdNo, reset]);

  const dynamicFieldsData = form.watch('dynamicFields');
  useEffect(() => {
    const fee = setAddCollectedFee(dynamicFieldsData);
    setTotaldFee(fee)
  }, [dynamicFieldsData]);

  const setAddCollectedFee = (fields: any) => {
    const totalFee = fields?.reduce((sum: number, field: { amount: string }) => {
      return sum + (parseFloat(field.amount) || 0);
    }, 0);
    return totalFee
  };

  const paymentModeSelected = form.watch('paymentMode');
  useEffect(() => {
    console.log('Payment Mode:', paymentModeSelected);

    if (paymentModeSelected === 'DD') {
      setShowDDFields(true);
    } else {
      setShowDDFields(false);
    }
  }, [paymentModeSelected]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await handleDuesFeePayment(data);
      if (response !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      } else {
        // router.refresh()
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Form submitted successfully',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="mt-16 shadow-xl border rounded-lg p-2">
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
            {/*Processing mode*/}
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
                      placeholder="Amount"
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
              Add Description
            </Button>

            <FormField
              control={form.control}
              name="collectedFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Collected Fee<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input readOnly={true} disabled={true} placeholder="" {...field} />
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
            {showDDFields && (
              <FormField
                control={form.control}
                name="ddDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      DD Date<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type={'date'} placeholder="fee" {...field} />
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
                      DD Bank<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="fee" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button variant={'trident'} size={'lg'} type="submit">
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
