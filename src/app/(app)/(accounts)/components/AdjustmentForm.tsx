'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BadgePercent, Loader } from 'lucide-react'
import { z } from 'zod'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleAdjustment } from '../server-actions-fee-collection/actions'
const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    description: z.string({
      required_error: 'Must enter the description',
    }),
    considerationAmount: z.string({
      required_error: 'Must enter consideration amount',
    }),
    approvedBy: z.enum(['Principal'], {
      required_error: 'Must enter approved by',
    }),
  })

const AdjustmentForm = ({ regdNo, description }: { regdNo: string, description: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: regdNo,
      description: description,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await handleAdjustment(data)
      if (response === 200) {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Discount applied successfully',
        });
        form.reset();
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='icon' className='bg-violet-400' ><BadgePercent className='w-4 h-4' /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40rem]">
          <DialogHeader>
            <DialogTitle>Discount Form</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                  <FormField
                    control={form.control}
                    name="regdNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Registration Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly={true}
                            disabled={true}
                            placeholder="Registration Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*Description*/}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Description<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            readOnly={true}
                            disabled={true}
                            placeholder="Enter the description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Consideration Amount*/}
                  <FormField
                    control={form.control}
                    name="considerationAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Consideration Amount<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the consideration amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Approved By*/}
                  <FormField
                    control={form.control}
                    name="approvedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approved By</FormLabel>
                        <span className="text-red-500">*</span>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Approved By" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Principal">Principal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={'trident'} size={'lg'} type="submit">
                    {loading ? (<Loader
                      className="mr-2 size-4 animate-spin"
                      aria-hidden="true"
                    />) :
                      'Apply'
                    }
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdjustmentForm
