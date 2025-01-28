'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { array, z } from 'zod'
import { useParticulars } from '@/app/(app)/(accounts)/components/FeeDetailsFilterProvider'
import { useRouter } from 'next/navigation'


const SectionAssignForm = () => {
  const { branches } = useParticulars()
  const router = useRouter()

  const branch = [...new Set(Object.values(branches).flatMap(branchObj => Object.values(branchObj).map(b => b.branchCode)))];

  const course = Object.keys(branches);
  console.log("course ::", course)
  const sem = [1, 2, 3, 4, 5, 6, 7, 8];
  const section = () => Object.fromEntries(branch.map(b => [
    b,
    [b, ...Array.from({ length: 4 }, (_, i) => `${b}-${String.fromCharCode(65 + i)}`)]
  ]));
  console.log("section ::", section());

  const FormSchema = z.object({
    course: z.enum(course as [string, ...string[]], {
      required_error: "Course Through is required.",
    }),
    branchCode: z.enum(branch as [string, ...string[]], {
      required_error: "Branch Through is required.",
    }),
    section: z.string({
      required_error: "Section is required.",
    }),
    sem: z.enum(sem.map(String) as [string, ...string[]], {
      required_error: "Semester is required.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/office/assignsection?course=${data.course}&branch=${data.branchCode}&section=${data.section.toUpperCase()}&sem=${data.sem}`)
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full my-10 flex flex-row justify-between items-end gap-3"
        >
          <div className="w-full lg:grid lg:grid-cols-4 lg:gap-2 lg:gap-y-1">
            {/* course */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>course</FormLabel>
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
            {/* Branch */}
            <FormField
              control={form.control}
              name="branchCode"
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
                        branch.map((b: string, index: number) => (
                          <SelectItem key={index} value={b}>{b}</SelectItem>))
                      }
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* sem */}
            <FormField
              control={form.control}
              name="sem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Semester" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {
                        sem.map((b: number, index: number) => (
                          <SelectItem key={index} value={String(b)}>{b}</SelectItem>))
                      }
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* section */}
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <div className="relative w-full flex items-center gap-2">
                      <Input
                        className="uppercase flex-1 placeholder:normal-case"
                        placeholder="Enter or Select a Section"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      <Select onValueChange={(value) => field.onChange(value)}>
                        <FormControl>
                          <SelectTrigger className="w-12">
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(section())
                            .flatMap((sections) => Object.values(sections))
                            .map((b: string, index: number) => (
                              <SelectItem key={index} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            variant={'trident'}
            className=""
            size="default"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SectionAssignForm