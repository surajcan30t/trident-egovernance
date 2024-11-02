'use client'
import { StudentOnly, transportOnlySchema } from '@/app/(app)/(office)/office-schemas/schema';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { studentDetailsUpdateAction } from '@/app/(app)/(office)/serveractions-office/student-report-update-actions';
import { useState } from 'react';

const formSchema = z.object({
  regdNo: z.string(),
  studentName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  branchCode: z.string({
    required_error: 'You need to select the gender.',
  }),
  section: z.string({required_error: "Please select the section"}),
  course: z.string({
    required_error: 'You need to select a course.',
  }),
  dob: z.string(),
  studentType: z.string({
    required_error: 'You need to select the studentType.',
  }),
  cfPayMode: z.string({
    required_error: 'You need to select the payment mode.',
  }),
  status: z.string({required_error: 'You need to select the status.'}),
  aadhaarNo: z.number({required_error: 'Must provide Aadhaar Number'}),
  phNo: z.string().min(10).max(15, { message: "Phone number must be between 10 and 15 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  religion: z.string({required_error: 'Please select the religion'}),
  gender: z.string({ required_error: "Invalid gender." }),
  plpoolm: z.string({required_error: "You must select one"}),
  indortrng: z.string({required_error: "You must select one"}),
  admissionYear: z.string().optional(),
  degreeYop: z.number().optional(),
  hostelier: z.string().optional(),
  transportAvailed: z.string().optional(),
  batchId: z.string().optional(),
  currentYear: z.number().optional(),
})

const StudentOnlyForm = ({table, data}:{table:string, data: StudentOnly}) =>{
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regdNo: data?.regdNo,
      studentName: data?.studentName || '',
      branchCode: data?.branchCode || undefined,
      course: data?.course || undefined,
      dob: data?.dob || '',
      studentType: data?.studentType || undefined,
      cfPayMode: data?.cfPayMode || undefined,
      status: data?.status || undefined,
      aadhaarNo: data?.aadhaarNo || parseInt(''),
      phNo: data?.phNo || '',
      email: data?.email || '',
      religion: data?.religion || undefined,
      gender: data?.gender || undefined,
      plpoolm: data?.plpoolm || undefined,
      indortrng: data?.indortrng || undefined,
      hostelier: data?.hostelier || undefined,
      degreeYop: data?.degreeYop || undefined,
      transportAvailed: data?.transportAvailed || undefined,
      admissionYear: data?.admissionYear || undefined,
      batchId: data?.batchId || undefined,
      currentYear: data?.currentYear || undefined,
      section: data?.section || undefined
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      setLoading(true)
      const response = await studentDetailsUpdateAction(values, table)
      if(response === 200){
        setLoading(false)
      }

    }catch{
      setLoading(false)
    }finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-[90%] h-[80vh] "
        >
          <div>
            <FormField
              control={form.control}
              name="regdNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        <SelectValue placeholder="Select the branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="CST">CST</SelectItem>
                      <SelectItem value="CSAIML">CSAIML</SelectItem>
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
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className=""
                      placeholder="Enter your date of birth"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            <FormField
              control={form.control}
              name="cfPayMode"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Course Fee Payment Mode</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                      className="flex flex-row space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="YEARLY" />
                        </FormControl>
                        <FormLabel className="font-normal">Yearly</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="SEMESTER" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Semesterwise
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
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
                      <SelectItem value="CONTINUING">Continuing</SelectItem>
                      <SelectItem value="PASSOUT">Passed Out</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aadhaarNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Enter you aadhaar number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      className="uppercase"
                      placeholder="Enter your contact number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Mail ID</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="lowercase"
                      placeholder="Enter your mail ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your religion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HINDU">Hindu</SelectItem>
                      <SelectItem value="MUSLIM">Muslim</SelectItem>
                      <SelectItem value="CHRISTIAN">Christian</SelectItem>
                      <SelectItem value="SIKH">Sikh</SelectItem>
                      <SelectItem value="BUDDHIST">Buddhist</SelectItem>
                      <SelectItem value="JAIN">Jain</SelectItem>
                      <SelectItem value="PARSI">Parsi</SelectItem>
                      <SelectItem value="OTHERS">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHERS">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plpoolm"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Opt for Placement Pool</FormLabel>
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
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="indortrng"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Opt for Industrial Training
                  </FormLabel>
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
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NO" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transportAvailed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport availed</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hostelier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hosteler</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degreeYop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pass Out year</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch ID</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admissionYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Year</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /><FormField
              control={form.control}
              name="currentYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Year</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="space-y-2 flex justify-center">
            <Button variant="trident" size="lg" type="submit">
              {loading? 'Updating' : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default StudentOnlyForm
