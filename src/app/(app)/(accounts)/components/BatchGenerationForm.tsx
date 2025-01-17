'use client'
import { z } from 'zod';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import PulseLoader from 'react-spinners/PulseLoader';
import { useParticulars } from './FeeDetailsFilterProvider';

/**
 * 
 * regdYear int
 * description string
 * amount int
 * comments string
 * tfwType ['TFW', 'NTFW', 'ALL']
 * tatFees int 0
 * tactFees int 0
 * payType ['SEMESTER', 'YEARLY']

*/

const generateAdmissionYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear + index);
  return years.map(year => ({ label: year.toString(), value: year.toString() }));
}



export default function BatchGenerationForm({batchGenerationSubmit}: {batchGenerationSubmit: () => void}) {

  const { branches } = useParticulars();
  const [branchOption, setBranchOption] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  const courseOptions = Array.from(Object.keys(branches)).map(course => course)
  const branchOptions = Array.from(Object.values(branches).flatMap(branchObj =>
    Object.values(branchObj).map(b => b.branchCode)
  ))
  const studentTypeOptions = ['REGULAR', 'LE']
  const FormSchema = z
    .object({
      admissionYear: z.enum(generateAdmissionYearOptions().map(option => option.value) as [string, ...string[]]),
      course: z.enum(['BTECH', 'MTECH', 'MBA', 'MCA']),//z.enum(courseOptions as [string, ...string[]]), 
      branch: z.enum(['CST', 'CSE', 'CSAIML', 'CSDS']),//z.enum(branchOptions as [string, ...string[]]), 
      studentType: z.enum(studentTypeOptions as [string, ...string[]]),
    }).refine(
      (data) => {
        // If paymentMode is 'DD', then ddNo, ddDate, and ddBank must be filled
        if (data.course) {
          return data.branch;
        }
        return true; // other payment modes don't require these fields
      },
      {
        message: 'Branch is required when course is selected',
        path: ['branch'], // points to one of the fields, but message is for all
      },
    );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    const selectedCourse = form.watch('course');
    console.log(selectedCourse)
    setBranchOption(selectedCourse ? Object.values(branches[selectedCourse] || {}).map((branch: any) => branch.branchCode) : []);
  }, [form.watch('course')])


  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const batchId = {
      admYear: data.admissionYear,
      course: convertCourse(data.course),
      branchCode: data.branch,
      studentType: data.studentType
    }
    window.localStorage.setItem('batchData', JSON.stringify(batchId))
    window.localStorage.setItem('step', '2')
    batchGenerationSubmit()
  }

  return (
    <div className='w-full flex justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 border shadow-lg rounded-lg p-2 flex flex-col justify-center items-center gap-2">
          <div className='w-full grid grid-cols-4 gap-2'>
            {/*Admission Year*/}
            <FormField
              control={form.control}
              name="admissionYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Year</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select admission year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {generateAdmissionYearOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Course*/}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        courseOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))
                      }
                      <SelectItem value="BTECH">B.Tech.</SelectItem>
                      <SelectItem value="MTECH">M.Tech.</SelectItem>
                      <SelectItem value="MBA">MBA</SelectItem>
                      <SelectItem value="MCA">MCA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Branch*/}
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        branchOption.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))
                      }
                      <SelectItem value="CST">CST</SelectItem>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="CSAIML">CSAIML</SelectItem>
                      <SelectItem value="CSDS">CSDS</SelectItem>
                      {branchOption.length === 0 && <SelectItem disabled value="SELECT">Select a course first</SelectItem>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*Student Type*/}
            <FormField
              control={form.control}
              name="studentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Type</FormLabel>
                  <span className="text-red-500">*</span>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        studentTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <Button variant={'trident'} size={'lg'} type="submit">
              {loading ? (<PulseLoader
                color="#ffffff"
                size={5}
              />) :
                'Next'
              }
            </Button>
        </form>
      </Form>
    </div>
  )
}