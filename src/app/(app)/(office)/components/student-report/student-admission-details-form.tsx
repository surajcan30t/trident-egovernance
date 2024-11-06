'use client'
import {
  StudentAdmissionDetailsOnly,
  studentAdmissionDetailsOnlySchema,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import {
  studentAdmissionDetailsUpdateAction,
  studentDetailsUpdateAction,
} from '@/app/(app)/(office)/serveractions-office/student-report-update-actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import PulseLoader from 'react-spinners/PulseLoader';


const formSchema = z.object({
  regdNo: z.string(),
  admissionDate: z.string(), // Nullable to allow null values
  ojeeCounsellingFeePaid: z.string(), // Assuming "YES" or "NO" as string values
  tfw: z.string(), // Nullable to allow "NTFW" or similar values
  admissionType: z.string(), // Nullable to allow values like "OJEE"
  ojeeRollNo: z.string().optional(),
  ojeeRank: z.string().optional(),
  aieeeRank: z.string().optional(),
  caste: z.string(),
  reportingDate: z.string().optional(),
  categoryCode: z.string().optional(),
  categoryRank: z.number().optional(),
  jeeApplicationNo: z.string(),
  allotmentId: z.string(),
})

const StudentAdmissionDetailsForm = ({table, data}:{table:string, data: StudentAdmissionDetailsOnly}) =>{
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regdNo: data?.regdNo,
      admissionDate: data?.admissionDate,
      ojeeCounsellingFeePaid: data?.ojeeCounsellingFeePaid,
      tfw: data?.tfw,
      admissionType: data?.admissionType,
      ojeeRollNo: data?.ojeeRollNo || undefined,
      ojeeRank: data?.ojeeRank || undefined,
      aieeeRank: data?.aieeeRank || undefined,
      caste: data?.caste,
      reportingDate: data?.reportingDate || undefined,
      categoryCode: data?.categoryCode || undefined,
      categoryRank: data?.categoryRank || undefined,
      jeeApplicationNo: data?.jeeApplicationNo,
      allotmentId: data?.allotmentId,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      setLoading(true)
      const response = await studentAdmissionDetailsUpdateAction(values, table)
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
            <FormField
              control={form.control}
              name="admissionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Date</FormLabel>
                  <FormControl>
                    <Input type={'date'} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reportingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reporting Date</FormLabel>
                  <FormControl>
                    <Input type={'date'} placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ojeeCounsellingFeePaid"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Ojee Counselling fee paid</FormLabel>
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
                        <FormLabel className="font-normal">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tfw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TFW Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select TFW status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TFW">TFW</SelectItem>
                      <SelectItem value="NTFW">NTFW</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* Admitted Through */}
            <FormField
              control={form.control}
              name="admissionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admitted Through</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Admitted Through" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MQ">MQ</SelectItem>
                      <SelectItem value="COLLEGE">COLLEGE</SelectItem>
                      <SelectItem value="JEEMAIN">JEEMAIN</SelectItem>
                      <SelectItem value="OJEE">OJEE</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/*Jee roll number*/}
            <FormField
              control={form.control}
              name="jeeApplicationNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>JEE roll number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter jee roll number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*JEE rank*/}
            <FormField
              control={form.control}
              name="aieeeRank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>JEE rank</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter jee rank"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Ojee roll number*/}
            <FormField
              control={form.control}
              name="ojeeRollNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OJEE roll number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ojee roll number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*OJEE rank*/}
            <FormField
              control={form.control}
              name="ojeeRank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OJEE rank</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ojee rank"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Allotment ID*/}
            <FormField
              control={form.control}
              name="allotmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allotment ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter allotment ID"
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
                        <SelectValue placeholder="Select your caste" />
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



            <div className={'hidden'}>
            <FormField
              control={form.control}
              name="categoryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your date of birth"
                      {...field}
                      readOnly={true}
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryRank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your date of birth"
                      disabled={true}
                      readOnly={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
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

export default StudentAdmissionDetailsForm
