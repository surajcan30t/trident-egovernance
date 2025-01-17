"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  type: z.enum(['COMPULSORY_FEES', 'OPTIONAL_FEES', 'EXCESS_FEE', 'OTHER_FEES'], {
    required_error: "Type is required",
  }),
  feeGroup: z.string().min(2, {
    message: "Fee Group is required",
  }),
  mrHead: z.enum(['TAT', 'TACTF'], {
    required_error: "MR Head is required",
  }),
  partOf: z.enum(['TAT', 'TACTF'], {
    required_error: "Part of is required",
  }),
  semester: z.number().min(1, {
    message: "Semester is required",
  })
})

function ProfileForm() {

  const { partOf, feeGroups } = useParticulars()
  console.log(feeGroups, 'feeGroups', partOf, 'partOf')
  const [feeGroupOptions, setFeeGroupOptions] = useState<string[]>(feeGroups)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/4 grid grid-cols-1 gap-2 border rounded-lg p-2 shadow-lg">
        <div className="gap-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select>
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
            name="feeGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Group</FormLabel>
                <FormControl>
                  <div className="flex flex-row">
                    <Input placeholder="" {...field} list="feeGroupOptions" />
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
            name="mrHead"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MR Head</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partOf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part of</FormLabel>
                <FormControl>
                  <div className="flex flex-row">
                    <Input placeholder="e.g. TRANSPORTFEES" {...field} list="partOfOptions" />
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
            name="semester"
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
          <Button variant="trident" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default function page() {
  return (
    <div className="flex justify-center items-center">
      <ProfileForm />
    </div>
  )
}