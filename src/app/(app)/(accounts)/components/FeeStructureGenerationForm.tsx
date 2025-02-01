'use client'
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
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
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { PlusIcon, Router, Trash2Icon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { handleFeeStructureGeneration } from '../server-actions-fee-collection/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

// const feeTypeListData: any[] = [
//   { description: 'BLAZER, UNIFORM FEE', type: 'COMPULSORY_FEES', feeGroup: 'TACTFACILITIES', mrHead: 'TACTF', partOf: 'FEES', semester: 1 },
//   { description: 'CAUTION MONEY', type: 'COMPULSORY_FEES', feeGroup: 'CAUTIONMONEY', mrHead: 'TAT', partOf: 'FEES', semester: 1 },
//   { description: 'OTHER FEES - SEM1', type: 'COMPULSORY_FEES', feeGroup: 'MISCFEE', mrHead: 'TAT', partOf: 'FEES', semester: 1 },
//   { description: 'OTHER FEES - SEM2', type: 'COMPULSORY_FEES', feeGroup: 'MISCFEE', mrHead: 'TAT', partOf: 'FEES', semester: 2 },
//   { description: 'COURSE/TUITION FEE - SEM1', type: 'COMPULSORY_FEES', feeGroup: 'COURSEFEE', mrHead: 'TAT', partOf: 'FEES', semester: 1 },
//   { description: 'COURSE/TUITION FEE - SEM2', type: 'COMPULSORY_FEES', feeGroup: 'COURSEFEE', mrHead: 'TAT', partOf: 'FEES', semester: 2 },
// ]

const generateRegdYearOptions = () => {
  const currentYear = 1;
  const years = Array.from({ length: 4 }, (_, index) => currentYear + index);
  return years.map(year => ({ label: year.toString(), value: year.toString() }));
}

const FeeStructureSchmea = z.object({
  description: z.string().min(1, { message: 'This field is required.' }),
  amount: z.string().min(1, { message: 'This field is required.' }),
  payType: z.enum(['YEARLY'], {
    required_error: 'Must choose payment mode',
    message: 'Must choose payment mode',
  }),
  tfwType: z.enum(['TFW', 'NTFW', 'ALL'], {
    required_error: 'Must choose payment mode',
    message: 'Must choose payment mode',
  }),
  tatFees: z.number().default(0),
  tactFees: z.number().default(0),
  comments: z.string().optional(),
})

const RegdYearSchema = z.object({
  regdYear: z.enum(generateRegdYearOptions().map(option => option.value) as [string, ...string[]]),
  feeStructure: z.array(FeeStructureSchmea, {
    required_error: 'At least one description and fee pair must be added',
  }).min(1, { message: 'At least one description and fee pair must be added' })
})

const FormSchema = z.object({
  feeTypeForm: z.array(RegdYearSchema, {
    required_error: 'At least one registration year must be added',
  })
})

function SelectRegdYear({ form, token }: { form: UseFormReturn<z.infer<typeof FormSchema>>, token: string }) {

  const [loading, setLoading] = useState<boolean>(false);
  const [feeTypeLists, setFeeTypeLists] = useState<Record<string, any[]>>({});

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: 'feeTypeForm',
  });

  const handleGetParticulars = async (regdYear: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-feeType-list?year=${regdYear}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      setFeeTypeLists(prev => ({
        ...prev,
        [regdYear]: response.data
      }))
    } catch (error) {
    }
  }

  return (
    <div className='w-full flex flex-col justify-end items-end gap-2 p-2'>
      {fields.map((feeTypeForm, index) => {
        return (
          <div className='w-full bg-slate-100 rounded-lg p-2 border border-gray-500 mb-5' key={feeTypeForm.id}>
            <Form {...form}>
              <div className="">
                <div className='w-full flex flex-row items-start gap-2'>
                  <div className='w-full flex flex-col gap-2'>
                    <div className='w-full flex flex-row items-end gap-2'>
                      {/* Registration Year*/}
                      <FormField
                        control={form.control}
                        name={`feeTypeForm.${index}.regdYear`}
                        key={index}
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Registration Year</FormLabel>
                            <span className="text-red-500">*</span>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className='bg-white'>
                                  <SelectValue placeholder="Select registration year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className=''>
                                {generateRegdYearOptions().map((option: any) => (
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
                      <Button variant={'trident'} size={'default'} type="button" onClick={() => handleGetParticulars(form.getValues(`feeTypeForm.${index}.regdYear`))} >
                        {loading ? (<PulseLoader
                          color="#ffffff"
                          size={5}
                        />) :
                          'Get Particulars'
                        }
                      </Button>
                    </div>
                    <FeeStructureFormYearwise index={index} form={form} feeTypeListData={feeTypeLists[form.getValues(`feeTypeForm.${index}.regdYear`)] || []} />
                  </div>
                  <Button type="button" variant={'outline'} onClick={() => remove(index)}><Trash2Icon className="w-4 h-4 text-red-500" /></Button>
                </div>
              </div>
            </Form>
          </div>
        )
      })}

      <Button className='w-1/5' type="button" variant={'outline'} onClick={() => append({ feeStructure: [], regdYear: '' })}>
        Add Registration Year
      </Button>

    </div>
  )

}

function FeeStructureFormYearwise({ index, form, feeTypeListData }: { index: number, form: UseFormReturn<z.infer<typeof FormSchema>>, feeTypeListData: any }) {

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: `feeTypeForm.${index}.feeStructure`,
  });

  return (
    <div className='w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-2'>
      {/* <SelectRegdYear onSubmit={onRegdYrSubmit} loading={loading} /> */}
      <Form {...form}>
        <div className="space-y-2 grid grid-cols-1 gap-2">
          {fields.map((field, fsyIndex) => (
            <div className='grid grid-cols-10 gap-2 border-2 rounded-lg border-dotted border-gray-400 p-1' key={field.id}>
              {/* Description Field */}
              <FormItem className='col-span-3'>
                <FormLabel className=''>
                  Description
                  <span className="text-red-500">*</span>
                  <Link className='cursor-pointer underline' href={'/feecollection/createnewdescription'}>
                    &nbsp;Create description
                  </Link>
                </FormLabel>
                <Controller
                  name={`feeTypeForm.${index}.feeStructure.${fsyIndex}.description`}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-white'>
                          <SelectValue placeholder="Select payment description" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feeTypeListData?.map((item: any, idx: number) => (
                          <SelectItem key={idx} value={item.description}>
                            {item.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.description && (
                  <FormMessage>
                    {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.description?.message}
                  </FormMessage>
                )}
              </FormItem>
              {/* Collected Fee Field */}
              <FormItem>
                <FormLabel>
                  Amount<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...form.register(`feeTypeForm.${index}.feeStructure.${fsyIndex}.amount`)}
                    placeholder="Amount"
                    className='bg-white'
                  />
                </FormControl>
                {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.amount && (
                  <FormMessage>
                    {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.amount?.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* Pay type */}
              <FormItem>
                <FormLabel>Payment Mode</FormLabel>
                <span className="text-red-500">*</span>
                <Controller
                  name={`feeTypeForm.${index}.feeStructure.${fsyIndex}.payType`}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-white'>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YEARLY">YEARLY</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.payType && (
                  <FormMessage>
                    {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.payType?.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* TFW type */}
              <FormItem>
                <FormLabel>TFW Type</FormLabel>
                <span className="text-red-500">*</span>
                <Controller
                  name={`feeTypeForm.${index}.feeStructure.${fsyIndex}.tfwType`}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-white'>
                          <SelectValue placeholder="Select TFW type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TFW">TFW</SelectItem>
                        <SelectItem value="NTFW">NTFW</SelectItem>
                        <SelectItem value="ALL">ALL</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.tfwType && (
                  <FormMessage>
                    {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.tfwType?.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* Comments Field */}
              <FormItem className='col-span-3'>
                <FormLabel>
                  Comments
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...form.register(`feeTypeForm.${index}.feeStructure.${fsyIndex}.comments`)}
                    placeholder="Comments"
                    className='bg-white'
                  />
                </FormControl>
                {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.comments && (
                  <FormMessage>
                    {form.formState.errors.feeTypeForm?.[index]?.feeStructure?.[fsyIndex]?.comments?.message}
                  </FormMessage>
                )}
              </FormItem>

              {/* Remove Button */}
              <div className="flex justify-end items-end col-span-1">
                <Button
                  type="button"
                  size={'icon'}
                  onClick={() => remove(fsyIndex)}
                  className="mt-2"
                  variant="destructive"
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className='w-full flex justify-center items-center'>
            <Button type="button" variant={'outline'} className='bg-slate-500 text-white' onClick={() => append({ description: '', amount: '', payType: 'YEARLY', tfwType: 'ALL', comments: '', tatFees: 0, tactFees: 0 })}>
            Add Fees
          </Button>
          </div>
        </div>
      </Form>
    </div>
  )

}



export default function FeeStructureGenerationForm({ token, feeStructureGenerationSubmit }: { token: string, feeStructureGenerationSubmit: () => void }) {

  const [loading, setLoading] = useState<boolean>(false);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })



  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true)
    const initialData = window.localStorage.getItem('batchData')
    const response = await handleFeeStructureGeneration(initialData, data)
    if (response.status === 200) {
      window.localStorage.removeItem('step');
      window.localStorage.removeItem('batchData');
      window.localStorage.removeItem('feeStructureGenerationData');
      toast({
        title: 'Success',
        description: 'Fee Structure Generated Successfully',
        variant: 'success',
      })
      feeStructureGenerationSubmit()
    }
    else if (response.status === 401) {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      })
    }
    else {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const feeStructureGenerationData = window.localStorage.getItem('feeStructureGenerationData')
    if (feeStructureGenerationData) {
      form.reset(JSON.parse(feeStructureGenerationData))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('feeStructureGenerationData', JSON.stringify(form.getValues()))
  }, [form.getValues()])

  return (
    <div className='w-full flex flex-col items-center justify-center border shadow-lg rounded-lg p-2'>
      <h1 className='text-xl text-start font-semibold'>Generate Fee Structure</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full bg-emerald-100 rounded-lg space-y-5 flex flex-col justify-center items-center">
          <SelectRegdYear form={form} token={token} />
          <Button className='w-1/5' type="submit" variant={'trident'} size={'default'}>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

/**
 * for regd 1
 * [
    {
        "description": "BLAZER, UNIFORM FEE",
        "type": "COMPULSORY_FEES",
        "feeGroup": "TACTFACILITIES",
        "mrHead": "TACTF",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "CAUTION MONEY",
        "type": "COMPULSORY_FEES",
        "feeGroup": "CAUTIONMONEY",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "OTHER FEES - SEM1",
        "type": "COMPULSORY_FEES",
        "feeGroup": "MISCFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "OTHER FEES - SEM2",
        "type": "COMPULSORY_FEES",
        "feeGroup": "MISCFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 2
    },
    {
        "description": "COURSE/TUITION FEE - SEM1",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "COURSE/TUITION FEE - SEM2",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 2
    },
    {
        "description": "BPUT REGISTRATION FEE - SEM1",
        "type": "COMPULSORY_FEES",
        "feeGroup": "UNIVREGFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "BPUT REGISTRATION FEE - SEM2",
        "type": "COMPULSORY_FEES",
        "feeGroup": "UNIVREGFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 2
    },
    {
        "description": "ACTIVITY FEE - SEM1",
        "type": "COMPULSORY_FEES",
        "feeGroup": "TACTFACILITIES",
        "mrHead": "TACTF",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "ACTIVITY FEE - SEM2",
        "type": "COMPULSORY_FEES",
        "feeGroup": "TACTFACILITIES",
        "mrHead": "TACTF",
        "partOf": "FEES",
        "semester": 2
    },
    {
        "description": "PRE PLACEMENT TRAINING FEE - SEM1",
        "type": "COMPULSORY_FEES",
        "feeGroup": "PPTFEES",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "PRE PLACEMENT TRAINING FEE - SEM2",
        "type": "COMPULSORY_FEES",
        "feeGroup": "PPTFEES",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 2
    },
    {
        "description": "INDUSTRY-READY TRAINING FEE - SEM1",
        "type": "OPTIONAL_FEES",
        "feeGroup": "INDTRNGFEE",
        "mrHead": "TACTF",
        "partOf": "INDTRNGFEES",
        "semester": 1
    },
    {
        "description": "INDUSTRY-READY TRAINING FEE - SEM2",
        "type": "OPTIONAL_FEES",
        "feeGroup": "INDTRNGFEE",
        "mrHead": "TACTF",
        "partOf": "INDTRNGFEES",
        "semester": 2
    },
    {
        "description": "PLACEMENT-POOL MEMBERSHIP - SEM1",
        "type": "OPTIONAL_FEES",
        "feeGroup": "PPMFEE",
        "mrHead": "TACTF",
        "partOf": "PLPOOLFEES",
        "semester": 1
    },
    {
        "description": "PLACEMENT-POOL MEMBERSHIP - SEM2",
        "type": "OPTIONAL_FEES",
        "feeGroup": "PPMFEE",
        "mrHead": "TACTF",
        "partOf": "PLPOOLFEES",
        "semester": 2
    },
    {
        "description": "HOSTEL FEE - IN-CAMPUS - SEM1",
        "type": "OPTIONAL_FEES",
        "feeGroup": "HOSTELFEE",
        "mrHead": "TACTF",
        "partOf": "HOSTELFEES",
        "semester": 1
    },
    {
        "description": "HOSTEL FEE - IN-CAMPUS - SEM2",
        "type": "OPTIONAL_FEES",
        "feeGroup": "HOSTELFEE",
        "mrHead": "TACTF",
        "partOf": "HOSTELFEES",
        "semester": 2
    },
    {
        "description": "TRANSPORT FEE - SEM1",
        "type": "OPTIONAL_FEES",
        "feeGroup": "TRANSPORTFEE",
        "mrHead": "TACTF",
        "partOf": "TRANSPORTFEES",
        "semester": 1
    },
    {
        "description": "TRANSPORT FEE - SEM2",
        "type": "OPTIONAL_FEES",
        "feeGroup": "TRANSPORTFEE",
        "mrHead": "TACTF",
        "partOf": "TRANSPORTFEES",
        "semester": 2
    },
    {
        "description": "TRANSPORT FEE - Y1",
        "type": "OPTIONAL_FEES",
        "feeGroup": "TRANSPORTFEE",
        "mrHead": "TAT",
        "partOf": "TRANSPORTFEES",
        "semester": 1
    },
    {
        "description": "COLLEGE FEES - SEM1",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 1
    },
    {
        "description": "COLLEGE FEES - SEM2",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 2
    }
]
    for regd 4

    [
    {
        "description": "OTHER FEES - SEM7",
        "type": "COMPULSORY_FEES",
        "feeGroup": "MISCFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "OTHER FEES - SEM8",
        "type": "COMPULSORY_FEES",
        "feeGroup": "MISCFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 8
    },
    {
        "description": "COURSE/TUITION FEE - SEM7",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "COURSE/TUITION FEE - SEM8",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 8
    },
    {
        "description": "HOSTEL FEE - IN-CAMPUS - SEM8",
        "type": "OPTIONAL_FEES",
        "feeGroup": "HOSTELFEE",
        "mrHead": "TACTF",
        "partOf": "HOSTELFEES",
        "semester": 8
    },
    {
        "description": "INDUSTRY-READY TRAINING FEE - SEM7",
        "type": "OPTIONAL_FEES",
        "feeGroup": "INDTRNGFEE",
        "mrHead": "TACTF",
        "partOf": "INDTRNGFEES",
        "semester": 7
    },
    {
        "description": "INDUSTRY-READY TRAINING FEE - SEM8",
        "type": "OPTIONAL_FEES",
        "feeGroup": "INDTRNGFEE",
        "mrHead": "TACTF",
        "partOf": "INDTRNGFEES",
        "semester": 8
    },
    {
        "description": "PLACEMENT-POOL MEMBERSHIP - SEM7",
        "type": "OPTIONAL_FEES",
        "feeGroup": "PPMFEE",
        "mrHead": "TACTF",
        "partOf": "PLPOOLFEES",
        "semester": 7
    },
    {
        "description": "PLACEMENT-POOL MEMBERSHIP - SEM8",
        "type": "OPTIONAL_FEES",
        "feeGroup": "PPMFEE",
        "mrHead": "TACTF",
        "partOf": "PLPOOLFEES",
        "semester": 8
    },
    {
        "description": "PRE PLACEMENT TRAINING FEE - SEM7",
        "type": "COMPULSORY_FEES",
        "feeGroup": "PPTFEES",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "PRE PLACEMENT TRAINING FEE - SEM8",
        "type": "COMPULSORY_FEES",
        "feeGroup": "PPTFEES",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 8
    },
    {
        "description": "BPUT REGISTRATION FEE - SEM7",
        "type": "COMPULSORY_FEES",
        "feeGroup": "UNIVREGFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "BPUT REGISTRATION FEE - SEM8",
        "type": "COMPULSORY_FEES",
        "feeGroup": "UNIVREGFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 8
    },
    {
        "description": "TRANSPORT FEE - SEM7",
        "type": "OPTIONAL_FEES",
        "feeGroup": "TRANSPORTFEE",
        "mrHead": "TACTF",
        "partOf": "TRANSPORTFEES",
        "semester": 7
    },
    {
        "description": "TRANSPORT FEE - SEM8",
        "type": "OPTIONAL_FEES",
        "feeGroup": "TRANSPORTFEE",
        "mrHead": "TACTF",
        "partOf": "TRANSPORTFEES",
        "semester": 8
    },
    {
        "description": "ACTIVITY FEE - SEM7",
        "type": "COMPULSORY_FEES",
        "feeGroup": "TACTFACILITIES",
        "mrHead": "TACTF",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "ACTIVITY FEE - SEM8",
        "type": "COMPULSORY_FEES",
        "feeGroup": "TACTFACILITIES",
        "mrHead": "TACTF",
        "partOf": "FEES",
        "semester": 8
    },
    {
        "description": "PREVIOUS DUE Y3",
        "type": "COMPULSORY_FEES",
        "feeGroup": "ARREARS",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "TRANSPORT FEE - Y4",
        "type": "OPTIONAL_FEES",
        "feeGroup": "TRANSPORTFEE",
        "mrHead": "TAT",
        "partOf": "TRANSPORTFEES",
        "semester": 7
    },
    {
        "description": "COLLEGE FEES - SEM7",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 7
    },
    {
        "description": "COLLEGE FEES - SEM8",
        "type": "COMPULSORY_FEES",
        "feeGroup": "COURSEFEE",
        "mrHead": "TAT",
        "partOf": "FEES",
        "semester": 8
    },
    {
        "description": "HOSTEL FEE - IN-CAMPUS - SEM7",
        "type": "OPTIONAL_FEES",
        "feeGroup": "HOSTELFEE",
        "mrHead": "TACTF",
        "partOf": "HOSTELFEES",
        "semester": 7
    }
]
 * */