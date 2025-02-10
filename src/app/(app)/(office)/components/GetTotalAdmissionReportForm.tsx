"use client"
import { FC, useEffect, useState } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParticulars } from '../../(accounts)/components/FeeDetailsFilterProvider';
import { parseCourse } from '@/lib/course-parser';


const GetReportBySessionForm: FC<{}> = (props) => {
  const [branchOption, setBranchOption] = useState<string[]>([]);
  const [toggleReset, setToggleReset] = useState(false);
  const searchParams = useSearchParams();


  const { branches } = useParticulars();
  const course = Object.keys(branches);
  const branchOptions = Array.from(Object.values(branches).flatMap(branchObj =>
    Object.values(branchObj).map(b => b.branchCode)
  ))

  const formSchema = z.object({
    course: z.enum(course as [string, ...string[]], {
      required_error: 'You need to select a course.',
    }),
    branch: z.enum(branchOptions as [string, ...string[]], {
      required_error: 'You need to select the gender.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  useEffect(() => {
    if (searchParams.size === 0) {
      setToggleReset(false)
    }
    else {
      setToggleReset(true)
    }
  }, [searchParams.size])

  useEffect(() => {
    const selectedCourse = form.watch('course');
    setBranchOption(selectedCourse ? Object.values(branches[selectedCourse] || {}).map((branch: any) => branch.branchCode) : []);
  }, [form.watch('course')])

  const router = useRouter()
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push('/office/reports/totaladmissionsreport?course=' + parseCourse(values.course) + '&branch=' + values.branch)
  }

  function reSet() {
    form.resetField('course')
    form.resetField('branch')
    form.reset()
    form.clearErrors()
    router.push('/office/reports/totaladmissionsreport')
  }

  return (
    <>
      <div className='w-full h-full flex flex-row justify-center items-end gap-2 '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 grid grid-cols-3 gap-2 items-end">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {
                        course.map((b: string, index: number) => (
                          <SelectItem key={index} value={b}>{b}</SelectItem>))
                      }
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
                        <SelectValue placeholder="Select a Branch" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {
                        branchOption.map((b: string, index: number) => (
                          <SelectItem key={index} value={b}>{b}</SelectItem>))
                      }
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button variant='trident' type="submit">Find</Button>
          </form>
        </Form>
        <div className='grid grid-cols-2 gap-2'>
          <Button onClick={reSet} disabled={!toggleReset} variant='trident' type="submit">Reset</Button>
        </div>
      </div>
    </>
  )
}

export default GetReportBySessionForm