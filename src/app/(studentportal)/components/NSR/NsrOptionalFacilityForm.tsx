'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { handleNsrOptionalFacility } from '../../nsractions/nsractions';
import { useRouter } from 'next/navigation';
import PulseLoader from 'react-spinners/PulseLoader';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
  cfPayMode: z.enum(['YEARLY', 'SEMESTER'], {
    required_error: 'You need to select the payment mode.',
  }),
  hostelOption: z.enum(['YES', 'NO'], {
    required_error: 'You need to select the hostel option.',
  }),
  transportOpted: z.enum(['YES', 'NO'], {
    required_error: 'You need to select the transport option.',
  }),
  pickUpPoint: z.enum(['BBSR', 'PURI', 'CTCK']).optional(),
  plpoolm: z.enum(['YES', 'NO'], {
    required_error: 'You need to select the pool option.',
  }),
  indortrng: z.enum(['YES', 'NO'], {
    required_error: 'You need to select the indoor option.',
  }),
  step: z.number().default(5),
});

const NsrOptionalFacilityForm = (initial: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPickupPoint, setShowPickupPoint] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cfPayMode: initial?.cfPayMode || '',
      hostelOption: initial?.hostelOption || '',
      transportOpted: initial?.transportOpted || '',
      pickUpPoint: initial?.pickUpPoint || '',
      plpoolm: initial?.plpoolm || '',
      indortrng: initial?.indortrng || '',
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    const transportSelected = form.watch('transportOpted');
    if (transportSelected === 'YES') {
      setShowPickupPoint(true);
      form.setValue('pickUpPoint', form.getValues('pickUpPoint') || 'BBSR');
    } else {
      setShowPickupPoint(false);
      form.setValue('pickUpPoint', undefined); // Clear the value if transport is NO
    }
  }, [form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      const status = await handleNsrOptionalFacility(data);
      setLoading(false)
      if (status !== 200) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: 'Please try again later.',
        });
      }
      toast({
        variant: 'success',
        title: 'Your registration has been successfully submitted.',
      });
      router.push('/studentportal/newstudentdocs');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    // <Card>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col items-center gap-3"
      >
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-1">
          {/* Hostel Option */}
          <FormField
            control={form.control}
            name="hostelOption"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Hostel Facility</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transport Option */}
          <FormField
            control={form.control}
            name="transportOpted"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Transport Facility</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fee payment type */}
          <FormField
            control={form.control}
            name="cfPayMode"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Course Fee Payment Mode</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="YEARLY" />
                      </FormControl>
                      <FormLabel className="font-normal">Yearly</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="SEMESTER" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Semesterwise
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pickup Point */}
          {showPickupPoint && (
            <FormField
              control={form.control}
              name="pickUpPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Pickup Point</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your pickup point" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BBSR">Bhubaneswar</SelectItem>
                      <SelectItem value="PURI">Puri</SelectItem>
                      <SelectItem value="CTCK">Cuttuck</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}

          {/* Placement Pool Option */}
          <FormField
            control={form.control}
            name="plpoolm"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you want to opt for Placement Pool</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industiral Training Option */}
          <FormField
            control={form.control}
            name="indortrng"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you want to opt for Industrial Training</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <Button variant={'trident'} className="w-1/3" size="lg" type="submit">
          {loading ? (<PulseLoader
            color="#ffffff"
            size={5}
          />) :
            'Save & Next'}
        </Button>
      </form>
    </Form>
    // </Card>
  );
};

export default NsrOptionalFacilityForm;
