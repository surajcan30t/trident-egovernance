"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/hooks/use-toast"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const FormSchema = z.object({
  applicationNo: z.string().min(12, {
    message: "Please enter 12 digit application number",
  }),
  studentName: z.string().min(1, {
    message: "Please enter your name",
  }),
  rollNo: z.string().min(12, {
    message: "Please enter your roll number",
  }),
  rank: z
    .string() // Expect a string from the input
    .transform((val) => parseInt(val, 10)) // Convert it to a number
    .refine((val) => !isNaN(val), { message: "Please enter a valid number"
  }), // Ensure it's a valid number
  rankType: z.enum(["JEE", "OJEE"], {
      required_error: "You need to select the ranktype.",
  }),
  course: z.enum(["BBA", "MBA", "BCA", "MCA", "BTECH", "MTECH"], {
      required_error: "You need to select a course.",
  }),
  TFW: z.string()
    .transform((val) => val === "true") // Convert the string to boolean
    .refine((val) => typeof val === "boolean", {
      message: "You need to select TFW.",
    }),
  admittedThrough: z.enum(["MQ", "COLLEGE", "JEEMAIN", "OJEE"],{
      required_error: "You need to select admittedThrough.",
  }),
  studentType: z.enum(["REGULAR", "LE"], {
      required_error: "You need to select the studentType.",
  })
})

const NewStudentRegestrationForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationNo: "",
      studentName: "",
      rollNo: "",
      rank: 0,
    },
  })

  const { toast } = useToast()
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      variant: "success",
      title: "Your registration has been successfully submitted.",
      description: (
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      )
    })
  }

  return (
    // <Card>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 lg:w-1/3 space-y-6 bg-">
      {/* Application Number */}
        <FormField
          control={form.control}
          name="applicationNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Number</FormLabel>
              <FormControl>
                <Input placeholder="Application Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Student Name */}
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Roll Number */}
        <FormField
          control={form.control}
          name="rollNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your JEE or OJEE roll number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Rank Number */}
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Rank</FormLabel>
              <FormControl>
                <Input placeholder="Enter you rank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Rank Type */}
        <FormField
          control={form.control}
          name="rankType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Student Ranktype</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="JEE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      JEE
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="OJEE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    OJEE
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Course Type */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Course</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BBA" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      BBA
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MBA" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    MBA
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BCA" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      BCA
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MCA" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    MCA
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BTECH" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      BTECH
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MTECH" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    MTECH
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* TFW */}
      <FormField
          control={form.control}
          name="TFW"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>TFW Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
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

      {/* Admitted Through */}
      <FormField
          control={form.control}
          name="admittedThrough"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Admitted Through</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MQ" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      MQ
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="COLLEGE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    COLLEGE
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="JEEMAIN" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      JEEMAIN
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="OJEE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    OJEE
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Student Type */}
      <FormField
          control={form.control}
          name="studentType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Student Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="REGULAR" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Regular
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="LE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Lateral Entry
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
      />

        <Button variant={"trident"} size="lg" className="font-bold" type="submit">Submit</Button>
      </form>
    </Form>
    // </Card>
  )
}
export default NewStudentRegestrationForm