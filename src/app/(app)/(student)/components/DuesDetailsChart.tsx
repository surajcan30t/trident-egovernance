'use client';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { FaCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const chartConfig = {
  amountPending: {
    label: 'Amount',
  },
  safari: {
    label: 'Safari',
    color: 'red',
  },
} satisfies ChartConfig;

let width: number = 0;
if (typeof window !== 'undefined') {
  width = window.innerWidth;
}

const increaseRadius: number =
  width < 769 ? 0 : width < 1025 ? 10 : width < 1281 ? 20 : 38;

function ChartComponent({ data }: { data: any }) {
  const router = useRouter()
  const duesSummary = data.dueSummary;
  // const paid = 500;
  const paid = duesSummary.totalPaid;
  // const due = 0;
  const due = duesSummary.currentDues;
  // const pending = 500;
  const pending = duesSummary.amountDue;
  const excess = pending < 0 ? pending : NaN;
  const degreeAngle =  360 - ((pending / due) *360);
  const chartData = [
    {
      browser: 'safari',
      amountPaid: paid,
      amountPending: (pending < 0 ? 0 : pending).toLocaleString(),
      fill: 'mediumseagreen',
    },
  ];
  return (
    <Card className="flex flex-col w-full md:w-2/5">
      <CardHeader className="flex flex-row items-stretch space-y-0 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Dues for</CardTitle>
          <CardDescription>2024-2025</CardDescription>
        </div>
        <div className="flex flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <Button variant="outline" size="default" onClick={()=>router.push('/student/accountdetails')}>
            Info
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex h-[200] md:h-[60%] xl:h-[70%] items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full md:h-full max-w-full"
        >
          <RadialBarChart
            width={100} // Add dynamic sizing or fixed minimum width
            height={100} // Add dynamic sizing or fixed minimum height
            data={chartData}
            startAngle={0}
            endAngle={degreeAngle}
            innerRadius={80 + increaseRadius}
            outerRadius={140 + increaseRadius}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-slate-200 last:fill-white"
              polarRadius={[86 + increaseRadius, 74 + increaseRadius]}
            />
            <RadialBar dataKey="amountPaid" cornerRadius={0} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].amountPending.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Rupees pending
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 md:flex md:flex-row justify-between items-center gap-2 font-medium leading-none w-full pt-2">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-items-center">
              <FaCircle className="text-[mediumseagreen]" />
              Amount paid
            </div>
            <span className="font-bold text-lg">
              &#8377; {paid.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-items-center">
              <FaCircle className="text-slate-200" />
              Amount pending
            </div>
            <span className="font-bold text-lg">
              &#8377; {(pending < 0 ? 0 : pending).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            Total amount
            <br />{' '}
            <span className="font-bold text-lg">
              &#8377; {due.toLocaleString()}
            </span>
          </div>
          {!isNaN(excess) ? (
            <div className="flex flex-col justify-center items-center">
              Excess amount
              <br />
              <span className="font-bold text-lg">
                &#8377; {excess.toLocaleString()}
              </span>
            </div>
          ) : null}
        </div>
      </CardFooter>
    </Card>
    // </div>
  );
}

export default function DuesDetailsChart() {
  const { data: session, status } = useSession();
  const [duesSummary, setDuesSummary] = useState(null);
  useEffect(() => {
    async function getDuesDetails() {
      // Add additional checks to prevent unnecessary API calls
      if (status === 'loading') return;

      if (status === 'authenticated' && session?.user?.accessToken) {
        try {
          const token = session.user.accessToken
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}/student-portal/get-dues-details`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log('response.data',response.data)
          setDuesSummary(response.data || null);
        } catch (error) {
          // Optionally set an error state or default value
          setDuesSummary(null);
        }
      }
    }

    // Only call the function if we have a valid session
    if (status === 'authenticated') {
      getDuesDetails();
    }
  }, [status, session, session?.user?.accessToken]);
  return <>
    {status === 'loading' ? (
      'Loading..'
    ) : status === 'authenticated' && duesSummary ? (
      <ChartComponent data={duesSummary} />
    ) : null}
  </>;
}
