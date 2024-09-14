'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
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
import { newStudentLogin } from '@/formactions/nsractions'

const FormSchema = z.object({
    applicationNo: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    rank: z.coerce.number()
})
const EnterApplicationNumber = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            applicationNo: "",
        },
    })
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await newStudentLogin(data)
        if(response === 200){
            router.push('/studentportal/newstudentadmission')
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="applicationNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Application Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter JEE/OJEE application number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rank"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rank</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter you rank" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant="trident" type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}


export default EnterApplicationNumber

