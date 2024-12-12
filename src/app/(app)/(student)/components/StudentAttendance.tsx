"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { subject: "DSA", attendance: 67.5 },
  { subject: "DAA", attendance: 59 },
  { subject: "SE", attendance: 0 },
  { subject: "IOT", attendance: 50 },
  { subject: "SPM", attendance: 44 },
  { subject: "RPGS", attendance: 70 },
  { subject: "DBMS", attendance: 100 },

]

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

const sem: string = '5th'

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "red",
  },
  subject: {
    label: "Subject",
    color: "green",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig


const StudentAttendance = () => {
  // const [activeChart, setActiveChart] =
  //   React.useState<keyof typeof chartConfig>("attendance")

//   const total = React.useMemo(
//     () => ({
//       Attendance: chartData.reduce((acc, curr) => acc + curr.Attendance, 0),
//     //   mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
//     }),
//     []
//   )

  return (
    <Card className="w-[40vw]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Attendance for {sem} semester</CardTitle>
          
        </div>

      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0,10)}
              hide={false}
            />
            <XAxis dataKey="attendance" type="number" domain={[0, 100]}/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="attendance"
              layout="vertical"
              fill="cadetblue"
              radius={4}
            >
              {/*<LabelList*/}
              {/*  dataKey="subject"*/}
              {/*  position="insideLeft"*/}
              {/*  offset={8}*/}
              {/*  className="fill-[black]"*/}
              {/*  fontSize={15}*/}
              {/*  fontWeight={600}*/}
              {/*/>*/}
              <LabelList
                dataKey="attendance"
                position="right"
                offset={8}
                className="fill-[black]"
                fontSize={14}
                fontWeight={600}
                formatter={((value:number) => `${value}%`)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default StudentAttendance