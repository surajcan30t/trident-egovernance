"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useMemo } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getSessionFromUser } from '@/app/(app)/(feecollection)/server-actions-fee-collection/table-actions';
import { useRouter } from 'next/navigation';

function generateFinancialYears(startYear:any) {
  const financialYears = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  console.log(currentMonth);
  const sessionYear = currentMonth >= 10 ? currentYear + 1 : currentYear;

  for (let year = startYear; year <= sessionYear; year++) {
    const nextYear = year + 1;
    financialYears.push(`${year}-${nextYear}`);
  }

  return financialYears;
}


const FormSchema = z.object({
  financialYear: z.string({
    required_error: "A date of birth is required.",
  }),
})


const FinancialYearSelector = () => {
  const router = useRouter()
  const financialYears = useMemo(() => generateFinancialYears(2007), []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await getSessionFromUser(data.financialYear)
    if (request.success === false) {
      toast({
        title: "You submitted the following values:",
        variant: "destructive",
        description: "Sorry no session found",
      })
    }
    else{
      router.refresh()
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 flex flex-row">
          <FormField
            control={form.control}
            name="financialYear"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {financialYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button variant={'trident'} type="submit">Get Details</Button>
        </form>
      </Form>
    </>
  )
}

export default FinancialYearSelector