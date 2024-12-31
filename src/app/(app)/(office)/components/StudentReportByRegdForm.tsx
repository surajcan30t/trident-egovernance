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
import { useRouter } from 'next/navigation';
import PulseLoader from 'react-spinners/PulseLoader';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { handleNsrOptionalFacility } from '@/app/(studentportal)/nsractions/nsractions';

const FormSchema = z.object({
  regdNo: z.string().min(8, {
    message: 'Registration number must be 10 characters long.',
  }),
});

const StudentReportByRegdForm = (initial: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: '',
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const status = router.push(`/office/reports/studentreport/${data.regdNo}`);
      setLoading(false);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    // <Card>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/3 flex flex-col items-center gap-3 rounded-lg bg-zinc-50 p-4 shadow-md"
      >
        <div className="w-full">
          {/* Registration Number */}

          <FormField
            control={form.control}
            name="regdNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Student Regd No." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant={'trident'} className="w-1/3" size="lg" type="submit">
          {loading ? <PulseLoader color="#ffffff" size={5} /> : 'Get Details'}
        </Button>
      </form>
    </Form>
    // </Card>
  );
};

export default StudentReportByRegdForm;
