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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { handleNsPersonal } from '../../nsractions/nsractions';
import { useRouter } from 'next/navigation';
import PulseLoader from 'react-spinners/PulseLoader';
import { useState } from 'react';

const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const FormSchema = z.object({
  fname: z.string().toUpperCase().min(1, {
    message: "Please enter your father's name",
  }),
  mname: z.string().toUpperCase().min(1, {
    message: "Please enter your mother's name",
  }),
  lgName: z.string().toUpperCase().min(1, {
    message: 'Please enter your local guardian name',
  }),
  dob: z.string().min(1, {
    message: 'Please enter your date of birth',
  }),
  permanentCity: z.string().toUpperCase().min(1, {
    message: 'Please enter your city',
  }),
  permanentState: z.string().toUpperCase().min(1, {
    message: 'Please enter your state',
  }),
  permanentAddress: z.string().toUpperCase().min(1, {
    message: 'Please enter your address',
  }),
  district: z.string().toUpperCase().min(1, {
    message: 'Please enter your district',
  }),
  phNo: z.string().toUpperCase().min(1, {
    message: 'Please enter your contact number',
  }),
  email: z.string().toLowerCase().min(1, {
    message: 'Please enter your email ID',
  }),
  parentContact: z.string().min(1, {
    message: 'Please enter your parent contact number',
  }),
  parentEmailId: z.string().toLowerCase().min(1, {
    message: 'Please enter your parent email ID',
  }),
  caste: z.enum(
    [
      'GENERAL',
      'SC',
      'ST',
      'OBC',
      'OTHERS',
    ],
    {
      required_error: 'You need to select the religion.',
    },
  ),
  permanentPincode: z
    .string() // Expect a string from the input
    .transform((val) => parseInt(val, 10)) // Convert it to a number
    .refine((val) => !isNaN(val), {
      message: 'Please enter a valid pin number',
    }), // Ensure it's a valid number
  aadhaarNo: z
    .string() // Expect a string from the input
    .transform((val) => parseInt(val, 10)) // Convert it to a number
    .refine((val) => !isNaN(val), {
      message: 'Please enter a valid aadhaar number',
    }), // Ensure it's a valid number
  religion: z.enum(
    [
      'HINDU',
      'MUSLIM',
      'CHRISTIAN',
      'SIKH',
      'BUDDHIST',
      'JAIN',
      'PARSI',
      'OTHERS',
    ],
    {
      required_error: 'You need to select the religion.',
    },
  ),
  step: z.number().default(3),
});

const NsrPersonalDetailsForm = (initial: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // console.log(initial)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fname: initial?.fname || '',
      mname: initial?.mname || '',
      lgName: initial?.lgName || '',
      dob: initial?.dob || '',
      permanentCity: initial?.permanentCity || '',
      permanentState: initial?.permanentState || '',
      permanentAddress: initial?.permanentAddress || '',
      district: initial?.district || '',
      phNo: initial?.phNo || '',
      email: initial?.email || '',
      parentContact: initial?.parentContact || '',
      parentEmailId: initial?.parentEmailId || '',
      caste: initial?.caste || '',
      permanentPincode: initial?.permanentPincode?.toString(),
      aadhaarNo: initial?.aadhaarNo?.toString(),
      religion: initial?.religion || '',
    },
  });

  const { toast } = useToast();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      const status = await handleNsPersonal(data);
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
      router.push('/studentportal/newstudentacademicdetails');
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col items-center gap-3"
      >
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-1">
          {/* Father Name */}
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Father Name</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your father's name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mother Name */}
          <FormField
            control={form.control}
            name="mname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mother Name</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your mother's name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Local Guardian Name */}
          <FormField
            control={form.control}
            name="lgName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local Guardian Name</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your Local Guardian's name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type='date'
                    className=""
                    placeholder="Enter your date of birth"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Aadhaar Number */}
          <FormField
            control={form.control}
            name="aadhaarNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Number</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter you aadhaar number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PIN Code */}
          <FormField
            control={form.control}
            name="permanentPincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter you PIN code "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Permanent Address */}
          <FormField
            control={form.control}
            name="permanentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your address here"
                    className="resize-none uppercase"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="permanentCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District */}
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your district"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="permanentState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your state"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Student Contact */}
          <FormField
            control={form.control}
            name="phNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Contact Number</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your contact number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Student Mail ID */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Mail ID</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="lowercase"
                    placeholder="Enter your mail ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parent Contact */}
          <FormField
            control={form.control}
            name="parentContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Contact Number</FormLabel>
                <FormControl>
                  <Input
                    className="uppercase"
                    placeholder="Enter your parent's contact number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parent Mail ID */}
          <FormField
            control={form.control}
            name="parentEmailId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Mail ID</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="lowercase"
                    placeholder="Enter your parent's mail ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Caste */}
          <FormField
            control={form.control}
            name="caste"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caste</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your religion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="GENERAL">General</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="OTHERS">Others</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Religion */}
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your religion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HINDU">Hindu</SelectItem>
                    <SelectItem value="MUSLIM">Muslim</SelectItem>
                    <SelectItem value="CHRISTIAN">Christian</SelectItem>
                    <SelectItem value="SIKH">Sikh</SelectItem>
                    <SelectItem value="BUDDHIST">Buddhist</SelectItem>
                    <SelectItem value="JAIN">Jain</SelectItem>
                    <SelectItem value="PARSI">Parsi</SelectItem>
                    <SelectItem value="OTHERS">Others</SelectItem>
                  </SelectContent>
                </Select>
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
  );
}
export default NsrPersonalDetailsForm;
