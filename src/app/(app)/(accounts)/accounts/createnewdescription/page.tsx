"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { useParticulars } from "@/app/(app)/(accounts)/components/FeeDetailsFilterProvider"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { handleCreateNewFeeType } from "../../server-actions-fee-collection/actions"
import { Trash2Icon } from "lucide-react"

const FeeCreationSchema = z.object({
  description: z.string().toUpperCase().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  type: z.enum(['COMPULSORY_FEES', 'OPTIONAL_FEES', 'EXCESS_FEE', 'OTHER_FEES', ''], {
    required_error: "Type is required",
  }),
  feeGroup: z.string().toUpperCase().min(2, {
    message: "Fee Group is required",
  }),
  mrHead: z.enum(['TAT', 'TACTF'], {
    required_error: "MR Head is required",
  }),
  partOf: z.string().toUpperCase().min(1, {
    message: "Part of is required",
  }),
  semester: z.string().min(1, {
    message: "Semester is required",
  })
})

const formSchema = z.object({
  newFees: z.array(FeeCreationSchema, {
    required_error: 'At least one New Fee should be added'
  }).min(1, {
    message: 'At least one New Fee should be added'
  })
})

function ProfileForm({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  const { partOf, feeGroups } = useParticulars()
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: 'newFees',
  });
  return (
    <>
      {fields.map((formSchema, index) => {
        return (
          <div className='w-full rounded-lg p-2 border border-gray-500 mb-5' key={formSchema.id}>
            <Form {...form}>
              <form className="w-full grid grid-rows-2 gap-2 border rounded-lg p-2 shadow-lg">
                <div className="gap-2 grid grid-cols-6">
                  <FormField
                    control={form.control}
                    name={`newFees.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input className="uppercase" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`newFees.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="COMPULSORY_FEES">COMPULSORY_FEES</SelectItem>
                              <SelectItem value="OPTIONAL_FEES">OPTIONAL_FEES</SelectItem>
                              <SelectItem value="EXCESS_FEE">EXCESS_FEE</SelectItem>
                              <SelectItem value="OTHER_FEES">OTHER_FEES</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`newFees.${index}.feeGroup`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Group</FormLabel>
                        <FormControl>
                          <div className="flex flex-row">
                            <Input className="uppercase" placeholder="" {...field} list="feeGroupOptions" />
                            <datalist id="feeGroupOptions">
                              {
                                feeGroups.map((feeGroup) => (
                                  <option key={feeGroup} value={feeGroup}>{feeGroup}</option>
                                ))
                              }
                            </datalist>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`newFees.${index}.mrHead`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MR Head</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TAT">TAT</SelectItem>
                              <SelectItem value="TACTF">TACTF</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`newFees.${index}.partOf`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Part of</FormLabel>
                        <FormControl>
                          <div className="flex flex-row">
                            <Input className="uppercase" placeholder="e.g. TRANSPORTFEES" {...field} list="partOfOptions" />
                            <datalist id="partOfOptions">
                              {
                                partOf.map((partOf) => (
                                  <option key={partOf} value={partOf}>{partOf}</option>
                                ))
                              }
                            </datalist>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`newFees.${index}.semester`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end items-center p-4">
                  <Button variant="destructive" onClick={() => remove(index)} type="submit"><Trash2Icon className="w-4 h-4" /></Button>
                </div>
              </form>
            </Form>
          </div>
        )
      })
      }
      <Button type="button" variant={'outline'} className='bg-slate-500 text-white' onClick={() => append({ description: '', feeGroup: '', mrHead: 'TAT', partOf: '', semester: '', type: '' })}>
        Add More
      </Button>
    </>
  )
}

function ProfileFormArray() {

  const { partOf, feeGroups } = useParticulars()
  console.log(feeGroups, 'feeGroups', partOf, 'partOf')
  const [feeGroupOptions, setFeeGroupOptions] = useState<string[]>(feeGroups)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: 'newFees',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await handleCreateNewFeeType(values)
    console.log('response', response)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-2 border rounded-lg p-2 shadow-lg">
          <div className="gap-2">
            <ProfileForm form={form} />
          </div>
          <div className="flex justify-end items-center p-4">
            <Button variant="trident" type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default function page() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-xl text-slate-700 font-semibold">Create New Description</h1>
      <ProfileFormArray />
    </div>
  )
}