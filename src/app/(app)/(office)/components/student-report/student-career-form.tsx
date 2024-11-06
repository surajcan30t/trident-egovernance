'use client'
import {
  CareerOnly
} from '@/app/(app)/(office)/office-schemas/schema';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { studentCareerDetailsUpdateAction } from '@/app/(app)/(office)/serveractions-office/student-report-update-actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import PulseLoader from 'react-spinners/PulseLoader';


const formSchema = z.object({
  regdNo: z.string(),
  tenthPercentage: z.string(),
  tenthYOP: z.string(),
  twelvthPercentage: z.string().optional(),
  twelvthYOP: z.string().optional(),
  diplomaPercentage: z.string().optional(),
  diplomaYOP: z.string().optional(),
  graduationPercentage: z.string().optional(),
  graduationYOP: z.string().optional(),
})


const StudentCareerDetailsForm = ({table, data}:{table:string, data: CareerOnly}) =>{
const router = useRouter()
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regdNo: data?.regdNo,
      tenthPercentage: data?.tenthPercentage?.toString(),
      tenthYOP: data?.tenthYOP?.toString(),
      twelvthPercentage: data?.twelvthPercentage?.toString(),
      twelvthYOP: data?.twelvthYOP?.toString(),
      diplomaPercentage: data?.diplomaPercentage?.toString(),
      diplomaYOP: data?.diplomaYOP?.toString(),
      graduationPercentage: data?.graduationPercentage?.toString(),
      graduationYOP: data?.graduationYOP?.toString(),
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      setLoading(true)
      const response = await studentCareerDetailsUpdateAction(values, table)
      if(response === 200){
        setLoading(false)
        toast({
          variant: 'success',
          title: 'Academic details updated successfully.',
        });
        router.refresh()
      }
      else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          // description: uploadResponse.message,
        });
      }

    }catch{
      setLoading(false)
    }finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-[90%] h-[80vh] "
        >
          <div>
            <FormField
              control={form.control}
              name="regdNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Tenth percentage*/}
            <FormField
              control={form.control}
              name="tenthPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    10<sup>th</sup> Percentage
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 10th percentage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Tenth yop*/}
            <FormField
              control={form.control}
              name="tenthYOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    10<sup>th</sup> Year of Passing
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 10th passing year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Twelfth percentage*/}
            <FormField
              control={form.control}
              name="twelvthPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>+2 or Inter percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter +2 or Inter percentage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Twelfth yop*/}
            <FormField
              control={form.control}
              name="twelvthYOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>+2 or Inter Year of passing</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your +2 or Inter passing year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Diploma percentage*/}
            <FormField
              control={form.control}
              name="diplomaPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diploma percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Diploma percentage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Diploma yop*/}
            <FormField
              control={form.control}
              name="diplomaYOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diploma year of passing</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Diploma passing year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Graduation percentage*/}
            <FormField
              control={form.control}
              name="graduationPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Graduation percentage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Graduation yop*/}
            <FormField
              control={form.control}
              name="graduationYOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation year of passing</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Graduation passing year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 flex justify-center">
            <Button variant="trident" size="lg" type="submit">
              {loading? <PulseLoader color="white" size={5} /> : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default StudentCareerDetailsForm
