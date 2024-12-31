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

const formSchema = z.object({
  admissionYear: z.string().min(4, {
    message: "Admission year must be at least 4 characters.",
  }),
})
const GetReportBySessionForm: FC<{}> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admissionYear: "",
    },
  })
  const router = useRouter()
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push('/office/reports/admissionreport?admissionYear='+values.admissionYear)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
          <FormField
            control={form.control}
            name="admissionYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Admission Year</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2020" {...field} />
                </FormControl>

                <FormMessage />
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