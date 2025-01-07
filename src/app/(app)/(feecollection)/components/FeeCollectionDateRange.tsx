'use client'

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"

const FeeCollectionDateRange = () => {
    const router = useRouter();
    const [fromDate, setFromDate] = React.useState<Date>()
    const [toDate, setToDate] = React.useState<Date>()
    const handleDateRange = () => {
        if (!fromDate || !toDate) {
            return;
        }
        router.push(`/feecollection/feecollectiondetails?from=${fromDate.toISOString()}&to=${toDate.toISOString()}`)
    }
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="w-4 h-4" />
                        {fromDate ? format(fromDate, "PPP") : <span>From Date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon  className="w-4 h-4"/>
                        {toDate ? format(toDate, "PPP") : <span>To Date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={setToDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Button variant={'trident'} onClick={handleDateRange}>
                <SearchIcon className="w-4 h-4" />
                Date Range
            </Button>
        </>
    )
}

export default FeeCollectionDateRange