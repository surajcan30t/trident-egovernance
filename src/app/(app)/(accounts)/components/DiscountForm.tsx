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
import { BadgePercent } from 'lucide-react'
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
import PulseLoader from 'react-spinners/PulseLoader';
import { handleDiscount } from '../server-actions-fee-collection/actions'
const FormSchema = z
  .object({
    regdNo: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    particulars: z.string({
      required_error: 'Must enter the description',
    }),
    discount: z.string({
      required_error: 'Must enter collected fee',
    }),
  })

const DiscountForm = ({ regdNo, description }: { regdNo: string, description: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: regdNo,
      particulars: description,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await handleDiscount(data)
      setLoading(false)
      if (response !== 200) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
      } else {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Discount applied successfully',
        });
        form.reset();
        router.refresh();
      }
    } catch (e) {
      setLoading(false);
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
                    name="particulars"
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
                  {/*Discount Amount*/}
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Amount<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the discount amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={'trident'} size={'lg'} type="submit">
                    {loading ? (<PulseLoader
                      color="#ffffff"
                      size={5}
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

export default DiscountForm
