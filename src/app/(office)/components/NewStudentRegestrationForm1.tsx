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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { handleNewStudent } from "@/backend"


const FormSchema = z.object({
  jeeApplicationNo: z.string().min(8, {
    message: "Please enter 12 digit application number",
  }),
  studentName: z.string().min(1, {
    message: "Please enter your name",
  }),
  rollNo: z.string().min(8, {
    message: "Please enter your roll number",
  }),
  rank: z
    .string() // Expect a string from the input
    .transform((val) => parseInt(val, 10)) // Convert it to a number
    .refine((val) => !isNaN(val), {
      message: "Please enter a valid number"
    }), // Ensure it's a valid number
  rankType: z.enum(["JEE", "OJEE"], {
    required_error: "You need to select the ranktype.",
  }),
  course: z.enum(["BBA", "MBA", "BCA", "MCA", "BTECH", "MTECH"], {
    required_error: "You need to select a course.",
  }),
  TFW: z.string().min(2, {
      message: "You need to select TFW.",
    }),
  admissionType: z.enum(["MQ", "COLLEGE", "JEEMAIN", "OJEE"], {
    required_error: "You need to select admittedThrough.",
  }),
  studentType: z.enum(["REGULAR", "LE"], {
    required_error: "You need to select the studentType.",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "You need to select the gender.",
  }),
  step: z.number().default(1),
})

const NewStudentRegestrationForm1 = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jeeApplicationNo: "",
      studentName: "",
      rollNo: "",
      rank: 0,
    },
  })

  const { toast } = useToast()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleNewStudent(data)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-6">
        {/* Application Number */}
        <FormField
          control={form.control}
          name="jeeApplicationNo"
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

        {/* Gender */}
        <FormField
          control={form.control}
          name="rankType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Rank Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        

        {/* Roll Number */}
        <FormField
          control={form.control}
          name="rollNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JEE/OJEE Roll Number</FormLabel>
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
            <FormItem>
              <FormLabel>Rank Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Rank Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="JEE">JEE</SelectItem>
                  <SelectItem value="OJEE">OJEE</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />



        {/* Course Type */}

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="YES" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="NO" />
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
          name="admissionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admitted Through</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Admitted Through" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MQ">MQ</SelectItem>
                  <SelectItem value="COLLEGE">COLLEGE</SelectItem>
                  <SelectItem value="JEEMAIN">JEEMAIN</SelectItem>
                  <SelectItem value="OJEE">OJEE</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Student Type */}
        <FormField
          control={form.control}
          name="studentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Student Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="REGULAR">Regular</SelectItem>
                  <SelectItem value="LE">Lateral Entry</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button variant={"trident"} size="lg" className="font-bold" type="submit">Submit</Button>
      </form>
    </Form>
    // </Card>
  )
}
export default NewStudentRegestrationForm1