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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { handleNewStudent } from "@/formactions/nsractions"


const FormSchema = z.object({
    cfPayMode: z.enum(["YEARLY", "SEMESTER"], {
        required_error: "You need to select the payment mode.",
    }),
    hostelOption: z.enum(["YES", "NO"], {
        required_error: "You need to select the hostel option.",
    }),
    transportOpted: z.enum(["YES", "NO"], {
        required_error: "You need to select the transport option.",
    }),
    pickUpPoint: z.enum(["BBSR", "PURI", "CTCK"], {
        required_error: "You need to select the pickup point.",
    }),
    step: z.number().default(5),
})

const NsrOptionalFacilityForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {

        },
    })

    const { toast } = useToast()
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        handleNewStudent(data)
        // toast({
        //     variant: "success",
        //     title: "Your registration has been successfully submitted.",
        //     description: (
        //         <code>
        //             <pre>{JSON.stringify(data, null, 2)}</pre>
        //         </code>
        //     )
        // })
    }

    return (
        // <Card>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-4">
                {/* Hostel Option */}
                <FormField
                    control={form.control}
                    name="hostelOption"
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

                {/* Transport Option */}
                <FormField
                    control={form.control}
                    name="transportOpted"
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

                {/* Transport Option */}
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
                                        <FormLabel className="font-normal">
                                            Yearly
                                        </FormLabel>
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

                {/* Pickup Point */}
                <FormField
                    control={form.control}
                    name="pickUpPoint"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Transport Pickup Point</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your pickup point" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="BBSR">Bhubaneswar</SelectItem>
                                    <SelectItem value="PURI">Puri</SelectItem>
                                    <SelectItem value="CTCK">Cuttuck</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

            </form>
                <Button variant={"trident"} className="w-1/3 m-3" size="lg" type="submit">Submit</Button>
        </Form>
        // </Card>
    )
}

export default NsrOptionalFacilityForm