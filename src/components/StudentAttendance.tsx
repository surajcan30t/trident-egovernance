"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { subject: "DSA", Attendance: 222 },
  { subject: "DAA", Attendance: 97 },
  { subject: "SE", Attendance: 167 },
  { subject: "IOT", Attendance: 242 },
  { subject: "SPM", Attendance: 373 },
  { subject: "RPGS", Attendance: 301 },
  { subject: "DBMS", Attendance: 245 },
]

const sem: string = '5th'

const chartConfig = {
  attendance: {
    label: "Attendance",
  },

  subject: {
    label: "Subject",
  },
  Attendance: {
    label: "Attendance",
    color: "rgb(131, 125, 252)",
  }
} satisfies ChartConfig

const StudentAttendance = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Attendance")

//   const total = React.useMemo(
//     () => ({
//       Attendance: chartData.reduce((acc, curr) => acc + curr.Attendance, 0),
//     //   mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),         
//     }),
//     []
//   )

  return (
    <Card className="w-[60vw]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Your {sem} sem Attendance</CardTitle>
          
        </div>

      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="font-bold"
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent />
              }
            />
            <Bar dataKey={activeChart} barSize={40} color="bg-sky-500" fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default StudentAttendance