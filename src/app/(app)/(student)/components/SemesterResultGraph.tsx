'use client';

import {
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  Line,
} from 'recharts';

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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import DetailedSemesterResultsModal from '@/app/(app)/(student)/components/DetailedSemesterResultsModal';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface SemesterResultAnalysis {
  maxGPA: number;     // Maximum GPA for the semester
  avgSGPA: number;    // Average SGPA for the semester
  studentGPA: number; // Student's SGPA for the semester
}

interface ResultAnalysisData {
  semesterResultAnalyses: SemesterResultAnalysis[]; // Array of semester analyses
}

// /get-semester-result/
const chartConfig = {
  branchmax: {
    label: 'Course avg',
    color: 'hsl(var(--chart-1))',
  },
  branchavg: {
    label: 'Branch avg',
    color: 'hsl(var(--chart-2))',
  },
  semester: {
    label: 'Semester',
  },
} satisfies ChartConfig;

function ChartComponent({ data }: { data: ResultAnalysisData }) {
  const chartData = data.semesterResultAnalyses.map((analysis, index) => ({
    semester: index === data.semesterResultAnalyses.length-1 ? 'CGPA' : `Sem${index + 1}`, // Generate semester name
    branchmax: analysis.maxGPA, // Use maxGPA as branchmax
    branchavg: analysis.avgSGPA, // Use avgSGPA as branchavg
    result: analysis.studentGPA, // Use studentGPA as result
  }));
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-stretch space-y-0 p-0 ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Semester Results</CardTitle>
        </div>
        <div className="flex flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <Dialog>
            <DialogTrigger>
              <div
                className='border border-stone-200 bg-white shadow-sm hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50 px-4 py-1 rounded-md'
              >
                Info
              </div>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Semester Results</DialogTitle>
              </DialogHeader>
              <ScrollArea>
                <DetailedSemesterResultsModal />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="h-[40vh] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 0,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="semester"
              type="category"
              tickLine={true}
              tickMargin={5}
              axisLine={false}
              // fontSize={12}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis axisLine={true} label={{ angle: -90, position: 'insideLeft' }} domain={[0, 10]}/>
            <Tooltip />
            <Bar dataKey="result" maxBarSize={50} fill="#483d8b" radius={3}>
              <LabelList
                dataKey="result"
                position="insideBottom"
                offset={15}
                className="fill-[white]"
                fontSize={14}
                fontWeight={800}
                formatter={(value:number) => (value === 0 ? "" : value)}
              />
            </Bar>
            <Line type="monotone" dataKey="branchmax" stroke="#2f4f4f"></Line>
            <Line
              type="monotone"
              dataKey="branchavg"
              stroke="lightseagreen"
            ></Line>
            <Legend />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default function SemesterResultGraph() {
  const { data: session, status } = useSession();
  const [gpaSummary, setGPASummary] = useState<ResultAnalysisData|null>(null);
  useEffect(() => {
    async function getGPADetails() {
      // Add additional checks to prevent unnecessary API calls
      if (status === 'loading') return;

      if (status === 'authenticated' && session?.user?.accessToken) {
        try {
          const token = session.user.accessToken
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}/student-portal/get-semester-result/branch`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setGPASummary(response.data || null);
        } catch (error) {
          // Optionally set an error state or default value
          setGPASummary(null);
        }
      }
    }
    // Only call the function if we have a valid session
    if (status === 'authenticated') {
      getGPADetails();
    }
  }, [status, session]);

  return <>
    {status === 'loading' ? (
      'Loading..'
    ) : status === 'authenticated' && gpaSummary ? (
      <ChartComponent data={gpaSummary} />
    ) : null}
  </>;
}

