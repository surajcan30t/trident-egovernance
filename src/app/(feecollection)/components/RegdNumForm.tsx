"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
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

const FormSchema = z.object({
  regdNo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function RegdNumForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      regdNo: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: "(You can close this toast now)",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/4 space-y-6">
        <FormField
          control={form.control}
          name="regdNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="Registration Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant={'trident'} type="submit">Submit</Button>
      </form>
    </Form>
  )
}
