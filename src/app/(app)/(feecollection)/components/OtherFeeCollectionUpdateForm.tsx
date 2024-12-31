import { z } from 'zod';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  handleUpdateOtherFeePayment,
} from '@/app/(app)/(feecollection)/server-actions-fee-collection/actions';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSession } from 'next-auth/react';

const FormSchema = z
  .object({
    mrNo: z.number({
      message: 'MR no. must not be blank.',
    }),
    collectedFee: z.string({
      required_error: 'Must enter collected fee',
    }),
    dynamicFields: z
      .array(
        z.object({
          description: z
            .string()
            .min(1, { message: 'This field is required.' }),
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

export function OtherFeeCollectionUpdateForm({ data }: { data: any }) {
  const {data: session} = useSession()
  const token = session?.user?.accessToken
  console.log('Data', data);
  const router = useRouter();
  const [render, setRender] = useState<boolean>(false);
  const [showDDFields, setShowDDFields] = useState<boolean>(false);
  const [particulars, setParticulars] = useState<string[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [totalFee, setTotalFee] = useState(0);
  const [dynamicFields, setDynamicFields] = useState<
    { description?: string; amount?: string }[]
  >([{ description: '', amount: '' }]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mrNo: data.feeCollection.mrNo,
      collectedFee: data.feeCollection.collectedFee,
      paymentMode: data.paymentMode,
      ddNo: data?.ddNo,
      ddDate: data?.ddDate,
      ddBank: data?.bank,
      dynamicFields: data.mrDetails.map((item: any) => ({
        description: item.particulars, // Map particulars to description
        amount: item.amount.toString(), // Convert amount to string
      })) || [{ description: '', amount: '' }],
    },
  });

  useEffect(() => {
    const otherFeeMenuFetcher = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-other-fees`,
          {
            cache: 'no-cache',
            headers:{
              'Authorization': `Bearer ${token}`,
            }
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
      { description: '', amount: '' },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const currentValues = form.getValues("dynamicFields");

    const updatedValues = currentValues.filter((_, i) => i !== index);

    setDynamicFields(updatedValues);
    form.setValue("dynamicFields", updatedValues);
  };

  const { reset } = form;

  useEffect(() => {
    reset({ mrNo: data.mrNo });
  }, [data.mrNo, reset]);

  const paymentModeSelected = form.watch('paymentMode');
  useEffect(() => {
    console.log('Payment Mode:', paymentModeSelected);

    if (paymentModeSelected === 'DD') {
      setShowDDFields(true);
    } else {
      setShowDDFields(false);
    }
  }, [paymentModeSelected]);
  const dynamicFieldChanged = form.watch('dynamicFields')
  useEffect(() => {
    const currentValues = form.getValues('dynamicFields') || [];
    const total = currentValues.reduce((sum, field) => {
      const amount = parseFloat(field.amount || '0');
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    setTotalFee(total);
    form.setValue('collectedFee', total.toString());
    console.log("Collected fee")
  }, [dynamicFieldChanged, form]);
  console.log("Form error ", form.formState.errors)
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      const response = await handleUpdateOtherFeePayment(data);
      setLoading(false);
      if (response !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      } else {
        router.refresh();
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Form submitted successfully',
        });
      }
    } catch (e) {
      console.log(e);
      setRender(false);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8 rounded-lg p-2 px-5 h-[60vh]">
        <h1 className="font-extrabold text-lg">Other Fees Payment</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="mrNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Money Receipt Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={true}
                      disabled={true}
                      placeholder="Money Receipt Number"
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
                          {/*<SelectItem value="CARD">CARD</SelectItem>*/}
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
              Add Fees
            </Button>

            <FormField
              control={form.control}
              name="collectedFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Collected Fee</FormLabel>
                  <FormControl>
                    <Input readOnly={true} {...field} />
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
              {loading ? (<PulseLoader
                  color="#ffffff"
                  size={5}
                />):
                'Update'
              }
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
