'use client'
import { PersonalDetailsOnly } from '@/app/(app)/(office)/office-schemas/schema';
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
import { studentPersonalDetailsUpdateAction } from '@/app/(app)/(office)/serveractions-office/student-report-update-actions';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  regdNo: z.string({required_error: 'Provide registration number'}),
  fname: z.string({required_error: 'Provide father name'}),
  mname: z.string({required_error: 'Provide mother name'}),
  lgName: z.string({required_error: 'Provide local guardian name'}),
  permanentAddress: z.string({required_error: 'Provide permanent address'}),
  permanentCity: z.string({required_error: 'Provide permanent city'}),
  permanentState: z.string({required_error: 'Provide permanent state'}),
  permanentPincode: z.number({required_error: 'Provide permanent pin code'}),
  parentContact: z.string({required_error: 'Provide parent contact'}),
  parentEmailId: z.string().email(),
  presentAddress: z.string({required_error: 'Provide present address'}),
  district: z.string({required_error: 'Provide district'})
})

const StudentPersonalDetailsForm = ({table, data}:{table:string, data: PersonalDetailsOnly}) =>{
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regdNo: data?.regdNo,
      fname: data?.fname,
      mname: data?.mname,
      lgName: data?.lgName,
      permanentAddress: data?.permanentAddress,
      permanentCity: data?.permanentCity,
      permanentState: data?.permanentState,
      permanentPincode: data?.permanentPincode,
      parentContact: data?.parentContact,
      parentEmailId: data?.parentEmailId,
      presentAddress: data?.presentAddress,
      district: data?.district
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      setLoading(true)
      const response = await studentPersonalDetailsUpdateAction(values, table)
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
                  <FormLabel>Registration Number<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} readOnly={true} disabled={true}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father&apos;s name<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother&apos;s name<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Guardian&apos;s name<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Contact<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentEmailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Email<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type={'email'}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent City<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentPincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Pincode<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent State<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Present Address<span className='text-red-500'>*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field}/>
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

export default StudentPersonalDetailsForm
