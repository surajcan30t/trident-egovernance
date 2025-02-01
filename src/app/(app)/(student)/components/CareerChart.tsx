'use client';

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface AcademicRecord {
  course: string;
  score: number ; // It can be a number for courses with numerical scores and a string for the 'Current' course with a GPA
}

const ChartComponent: React.FC<{ data: AcademicRecord[], currentCourse: string }> = ({ data, currentCourse }) => {
  const chartData = data.map((item: AcademicRecord, index) => ({
    course: index === data.length - 1 ? currentCourse : item.course,
    score: index === data.length - 1 ? (item.score-0.5) * 10 : item.score,
  }));
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Career Growth</CardTitle>
        {/*<CardDescription>10th-M.Tech</CardDescription>*/}
      </CardHeader>
      <CardContent className="w-full h-[30vh] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 5,
            }}
          >
            {/*<CartesianGrid strokeDasharray='3 3' />*/}
            <XAxis dataKey="course" axisLine={false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="score" barSize={52} fill="brown">
              <LabelList
                dataKey="score"
                offset={8}
                position='top'
                className="fill-[black]"
                fontSize={14}
                fontWeight={600}
                formatter={(value: number) => `${value.toFixed(2)}%`}
              />
            </Bar>
            <Line type="monotone" dataKey="score" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const CareerChart = () => {
  const { data: session, status } = useSession();
  const course = session?.user?.userType?.collegeInformation?.course
  const [careerGrowthSummary, setCareerGrowthSummary] = useState<AcademicRecord[]|null>(null);
  useEffect(() => {
    async function getGPADetails() {
      // Add additional checks to prevent unnecessary API calls
      if (status === 'loading') return;

      if (status === 'authenticated' && session?.user?.accessToken) {
        try {
          const token = session.user.accessToken
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}/student-portal/get-student-career-history`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setCareerGrowthSummary(response.data || null);
          const response2 = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}/api/get-menu-blade`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (error) {
          // Optionally set an error state or default value
          setCareerGrowthSummary(null);
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
    ) : status === 'authenticated' && careerGrowthSummary ? (
      <ChartComponent data={careerGrowthSummary} currentCourse={String(course)} />
    ) : null}
  </>;
};

export default CareerChart;
