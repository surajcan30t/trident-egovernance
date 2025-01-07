'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import StudentOnlyForm from '@/app/(app)/(office)/components/student-report/student-only-form';
import AttendanceDetailsModal from '@/app/(app)/(student)/components/AttendanceDetailsModal';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const description = 'An interactive bar chart';

interface AttendanceSummary {
  subAbbr: string;
  totalClasses: number;
  totalAttended: number;
  attendancePercentage: number;
}

// student-portal/get-attendance-summary
const sem: string = '5th';

const chartConfig = {
  attendance: {
    label: 'Attendance',
    color: 'red',
  },
  subject: {
    label: 'Subject',
    color: 'green',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

function ChartComponent({ data, semester }: { data: any, semester: string }) {
  const [selectedSem, setSelectedSem] = useState<string>(semester);
  console.log(semester)
  const semesters = Object.keys(data);
  const chartData = data[selectedSem].map(
    ({ subAbbr, attendancePercentage, totalAttended, totalClasses }: AttendanceSummary) => ({
      subject: subAbbr,
      attendance: parseFloat(attendancePercentage.toFixed(2)),
      classAttended: totalAttended,
      totalClasses: totalClasses,
    })
  );
  return (
    <Card className="w-full md:w-2/5">
      <CardHeader className="flex flex-row items-stretch space-y-0 p-0 ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <div className="flex items-center gap-2">
            <CardTitle>Attendance for semester</CardTitle>
            <Select
              onValueChange={(value) => setSelectedSem(value)}
              defaultValue={'7'}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Sem" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semesters</SelectLabel>
                  {semesters.map((semester: any) => (
                    <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <Dialog>
            <DialogTrigger>
              <div className="border border-stone-200 bg-white shadow-sm hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50 px-4 py-1 rounded-md">
                Info
              </div>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>
                  Detailed Attendance Sheet for Semester {selectedSem}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea>
                <AttendanceDetailsModal data={chartData} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
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
              left: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="subject"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 20)}
              hide={false}
            />
            <XAxis dataKey="attendance" type="number" domain={[0, 100]} />
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
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const StudentAttendance = () => {
  const { data: session, status } = useSession();
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [curSem, setCursem] = useState("1");
  useEffect(() => {
    async function getAttendanceDetails() {
      // Add additional checks to prevent unnecessary API calls
      if (status === 'loading') return;

      if (status === 'authenticated' && session?.user?.accessToken) {
        try {
          console.log('sem', session.user.userType.collegeInformation.semester)
          setCursem(session.user.userType.collegeInformation.semester.toString());
          console.log('semester', curSem)
          const token = session.user.accessToken;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}/student-portal/get-attendance-summary`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setAttendanceSummary(response.data || null);
        } catch (error) {
          // Optionally set an error state or default value
          setAttendanceSummary(null);
        }
      }
    }

    // Only call the function if we have a valid session
    if (status === 'authenticated') {
      console.log('Status:', status)
      getAttendanceDetails();
    }
  }, [status, session]);
  return <>
    {status === 'loading' ? (
      'Loading..'
    ) : status === 'authenticated' && attendanceSummary && curSem ? (
      <ChartComponent data={attendanceSummary} semester={curSem} />
    ) : null}
  </>;

};


export default StudentAttendance;