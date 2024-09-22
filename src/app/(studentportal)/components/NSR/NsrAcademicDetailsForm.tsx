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
import { handleNsrAcademic } from "@/formactions/nsractions"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"


const FormSchema = z.object({
    tenthPercentage: z.string().min(1, {
        message: "Please enter your father's name",
    }),
    tenthYOP: z.string().min(1, {
        message: "Please enter your mother's name",
    }),
    twelvthPercentage: z.string().optional(),
    twelvthYOP: z.string().optional(),
    diplomaPercentage: z.string().optional(),
    diplomaYOP: z.string().optional(),
    graduationPercentage: z.string().optional(),
    graduationYOP: z.string().optional(),
    educationType: z.enum(["INTER", "DIP"]),
    step: z.number().default(4),
})

const NsrAcademicDetailsForm = (initial: any) => {
    const [statusMessage, setStatusMessage] = useState('')
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            tenthPercentage: initial?.tenthPercentage?.toString() || "",
            tenthYOP: initial?.tenthYOP?.toString() || "",
            twelvthPercentage: initial?.twelvthPercentage?.toString() || "",
            twelvthYOP: initial?.twelvthYOP?.toString() || "",
            diplomaPercentage: initial?.diplomaPercentage?.toString() || "",
            diplomaYOP: initial?.diplomaYOP?.toString() || "",
            graduationPercentage: initial?.graduationPercentage?.toString() || "",
            graduationYOP: initial?.graduationYOP?.toString() || "",
            educationType: 'INTER',
        },
    })

    const { toast } = useToast()
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const status = await handleNsrAcademic(data)
        if (status !== 200) {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "Please try again later.",
            })
        }
        else{

            toast({
                variant: "success",
                title: "Your registration has been successfully submitted.",
            })
            router.push("/studentportal/newstudentfacilities")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col items-center gap-3">
                <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-1">


                    {/* 10th Year */}
                    <FormField
                        control={form.control}
                        name="tenthYOP"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>10<sup>th</sup> Year of Passing</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your 10th passing year" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 10th Percentage */}
                    <FormField
                        control={form.control}
                        name="tenthPercentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>10<sup>th</sup> Percentage</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your 10th percentage" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="educationType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Graduation Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value?.toString()}
                                        className="flex flex-row space-x-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="INTER" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                12<sup>th</sup>
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="DIP" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Diploma
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Inter Year */}
                    {form.watch("educationType") === "INTER" && (
                        <>
                            <FormField
                                control={form.control}
                                name="twelvthYOP"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>+2 or Inter Year of passing</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your +2 or Inter passing year" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Inter Percentage */}
                            <FormField
                                control={form.control}
                                name="twelvthPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>+2 or Inter percentage</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your +2 or Inter percentage" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}


                    {/* Diploma Year */}
                    {form.watch("educationType") === "DIP" && (
                        <>
                            <FormField
                                control={form.control}
                                name="diplomaYOP"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diploma year of passing</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter you Diploma passing year" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Diploma Percentage */}
                            <FormField
                                control={form.control}
                                name="diplomaPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diploma percentage</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Diploma percentage" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}


                    {/* Graduation Year */}
                    <FormField
                        control={form.control}
                        name="graduationYOP"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Graduation year of passing</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Graduation passing year" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Graduation Percentage */}
                    <FormField
                        control={form.control}
                        name="graduationPercentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Graduation percentage</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Graduation percentage" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <Button variant={"trident"} className="w-1/3 m-3" size="lg" type="submit">Submit</Button>
            </form>
        </Form>
    )
}
export default NsrAcademicDetailsForm

