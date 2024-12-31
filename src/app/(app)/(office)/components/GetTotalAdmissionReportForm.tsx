"use client"
import { FC } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  course: z.enum(['BBA', 'MBA', 'BCA', 'MCA', 'BTECH', 'MTECH'], {
    required_error: 'You need to select a course.',
  }),
  branch: z.enum(['CSE', 'CST', 'CSAIML', 'CSDS', 'MECH', 'CIVIL',], {
    required_error: 'You need to select the gender.',
  }),
})
const GetReportBySessionForm: FC<{}> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })
  const router = useRouter()
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push('/office/reports/totaladmissionsreport?course='+values.course+'&branch='+values.branch)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BBA">BBA</SelectItem>
                    <SelectItem value="MBA">MBA</SelectItem>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="MCA">MCA</SelectItem>
                    <SelectItem value="BTECH">BTECH</SelectItem>
                    <SelectItem value="MTECH">MTECH</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="CST">CST</SelectItem>
                    <SelectItem value="CSAIML">CSAIML</SelectItem>
                    <SelectItem value="CSDS">CSDS</SelectItem>
                    <SelectItem value="MECH">MECH</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button variant='trident' type="submit">Find</Button>
        </form>
      </Form>
    </>
  )
}

export default GetReportBySessionForm