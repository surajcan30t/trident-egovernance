'use client'
import { StudentOnly } from '@/app/(app)/(office)/office-schemas/schema';
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

const formSchema = z.object({
  regdNo: z.string().min(6, { message: "Registration number must be at least 6 characters" }),
  studentName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  branchCode: z.enum(['CSE', 'CST', 'CSAIML'], {
    required_error: 'You need to select the gender.',
  }),
  course: z.enum(['BBA', 'MBA', 'BCA', 'MCA', 'BTECH', 'MTECH'], {
    required_error: 'You need to select a course.',
  }),
  dob: z.date(),
  studentType: z.enum(['REGULAR', 'LE'], {
    required_error: 'You need to select the studentType.',
  }),
  cfPayMode: z.enum(['YEARLY', 'SEMESTER'], {
    required_error: 'You need to select the payment mode.',
  }),
  aadhaarNo: z.string().length(12, { message: "Aadhaar number must be 12 digits." }),
  phNo: z.string().min(10).max(15, { message: "Phone number must be between 10 and 15 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  religion: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"], { message: "Invalid gender." }),
  plpoolm: z.boolean().optional(),
  hostelier: z.boolean().optional(),
  indortrng: z.boolean().optional(),
})

const StudentOnlyForm = ({table, data}:{table:string, data: StudentOnly}) =>{
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regdNo: data?.regdNo,
      studentName: data?.studentName,

    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    alert(values.studentName)
  }
  return(
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="regdNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}

export default StudentOnlyForm