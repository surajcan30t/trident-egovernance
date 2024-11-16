import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import Link from 'next/link';

const collectionDashboardData = async () => {
  const date = new Date();
  const dateString = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-dashboard-data/${dateString}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    );
    const data = await request.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const TodayCollection = async ({ data }: { data: any }) => {
  return (
    <>
      <Link href={'feecollectiondetails'}>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-2xl font-bold text-gray-900">
                    &#8377; {data?.amountCollectedToday ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};
const TotalBalanceDue = ({ data }: { data: any }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Due</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-2xl font-bold text-gray-900">
                  &#8377; {data?.duesSummary.totalAmountDue ?? 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
const TotalAmountPaid = ({ data }: { data: any }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Collected</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                <span className="text-2xl font-bold text-gray-900">
                  &#8377; {data?.duesSummary.totalAmountPaid ?? 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
const TotalBalanceAmount = ({ data }: { data: any }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>To be collected</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-2xl font-bold text-gray-900">
                  &#8377; {data?.duesSummary.totalBalanceAmount ?? 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const CollectionDashboard = async () => {
  const data = await collectionDashboardData();
  return (
    <>
      {data?.duesSummary &&
        <div className={'flex flex-row gap-1'}>
          <TodayCollection data={data} />
          <TotalBalanceDue data={data} />
          <TotalAmountPaid data={data} />
          <TotalBalanceAmount data={data} />
        </div>
      }
    </>
  );
};

export default CollectionDashboard;
