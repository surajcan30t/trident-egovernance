'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParticulars } from "./FeeDetailsFilterProvider"
import { useRouter } from "next/navigation"


const FormSchema = z.object({
  regdYr: z.enum(['1', '2', '3', '4'], {
    required_error: "A registration year is required.",
  }).optional(),
  course: z.string({
    required_error: "A course is required.", 
  }).optional(),
  branch: z.string({
    required_error: "A branch is required.",
  }).optional(),
})

export const SetDueStatusFilterSearchParam = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const { branches } = useParticulars();
  const regdYrs = [
    '1', '2', '3', '4'
  ]
  const convertCourse = (course: string) => {
    if (course === 'B.TECH.' || course === 'B.Tech.') {
      return 'BTECH';
    } else if (course === 'M.TECH.' || course === 'M.Tech.') {
      return 'MTECH';
    } else if (course === 'MBA' || course === 'MCA') {
      return course;
    }
    return course;
  }
  const courses = Array.from(Object.keys(branches)).map(course => convertCourse(course))
  const branch = Array.from(Object.values(branches).flatMap(branchObj => 
    Object.values(branchObj).map(b => b.branchCode)
  ))
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let regdYr = data.regdYr;
    let course = data.course;
    let branch = data.branch;
    
    router.push(`/accounts/duestatusreport?regdYr=${regdYr}&course=${course}&branch=${branch}`)
  }
  return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 flex flex-row">
          <FormField
            control={form.control}
            name="regdYr"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regdYrs.map((yr) => (
                      <SelectItem key={yr} value={yr}>
                        {yr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branch.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button variant={'trident'} type="submit"><SearchIcon className="w-4 h-4" />Search</Button>
        </form>
      </Form> 
    </>
  )
}
