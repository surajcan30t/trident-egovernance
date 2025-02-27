'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { PiFilePdfFill, PiTrashFill } from 'react-icons/pi';
import useSWR, { mutate } from 'swr';
import { OtherFeeCollectionForm } from '@/app/(app)/(accounts)/components/OtherFeeCollectionForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FeeCollectionUpdateForm } from '@/app/(app)/(accounts)/components/FeeCollectionUpdateForm';
import { OtherFeeCollectionUpdateForm } from '@/app/(app)/(accounts)/components/OtherFeeCollectionUpdateForm';
import { deleteMrDetails } from '@/app/(app)/(accounts)/server-actions-fee-collection/actions';
import { MRDeleteAction } from '@/app/(app)/(accounts)/components/MRDeleteAction';
import { useSession } from 'next-auth/react';

interface StudentData {
  regdNo?: string;
  studentName?: string;
  gender?: string;
  branchCode?: string;
  admissionYear?: number;
  currentYear?: number;
}


const fetchStudentDetails = async (regdNo: string | null, session: any) => {

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${regdNo}`, {
      headers: {
        'Authorization': `Bearer ${session.user.accessToken}`,
      },
      cache: 'no-cache'
    }

    );
    const data = await response.json();
    const curYear = data.currentYear;
    return curYear;
  } catch (e) {
    console.error(e);
  }
};

const fetchCollectionDetails = async (regdNo: string, session: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-collection-history/${regdNo}/OTHER%20FEES`,
    {
      cache: 'no-cache',
      headers: {
        'Authorization': `Bearer ${session.user.accessToken}`,
      }
    },
  );
  return response.json();
};

const FeeDuesDetailsTable = ({ regdNo }: { regdNo: string | null }) => {
  const { data: session } = useSession();
  const openModalInNewTab = (mrNo: number) => {
    // Open a new tab with the specified URL
    window.open(`studentfeecollection/mr?registrationNo=${regdNo}&mrNo=${mrNo}`, '_blank');
  };

  const { data: collectionData, error: collectionError } = useSWR(
    regdNo ? `/get-fee-collection-history/${regdNo}/OTHER%20FEES` : null,
    () => fetchCollectionDetails(regdNo!, session),
  );
  const { data: curYear, error: curYearError } = useSWR(
    regdNo ? `/get-basic-student-details/${regdNo}` : null,
    () => fetchStudentDetails(regdNo!, session),
  );

  if (curYearError || collectionError) {
    return <div>Error fetching data</div>;
  }

  const years = collectionData ? Object.keys(collectionData) : [];
  const defaultYear = curYear && `year${curYear}`;
  return (
    <>
      <div className="w-[51vw] p-2 rounded-lg shadow-lg border">
        {collectionData && curYear && (
          <Tabs defaultValue={defaultYear} className="w-full">
            <TabsList className="w-full gap-x-1 flex justify-center">
              {years &&
                years.map((year: any) => (
                  <TabsTrigger key={year} value={year} className="capitalize">
                    {year}
                  </TabsTrigger>
                ))}
            </TabsList>

            {years &&
              years.map((year: any) => {
                return (
                  <TabsContent key={year} value={year}>
                    {/* Collection Table for the Year */}
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold">
                        Fee Collection Details
                      </h2>
                      {collectionData ? (
                        <Card key={year} className="mb-4">
                          <CardHeader>
                            <CardDescription>
                              Details for Year {year}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                              <thead className="bg-amber-300">
                                <tr>
                                  <th className="border">MR No.</th>
                                  <th className="border">MR Date</th>
                                  <th className="border">Payment Mode</th>
                                  <th className="border">Collected Fee</th>
                                  <th className="border">DD No.</th>
                                  <th className="border">DD Date</th>
                                  <th className="border"></th>
                                  <th className="border"></th>
                                  <th className="border"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {collectionData[year] &&
                                  collectionData[year].map(
                                    (entry: any, index: number) => (
                                      <tr key={index} className="text-center">
                                        <td className="border p2">
                                          {entry.feeCollection.mrNo}
                                        </td>
                                        <td className="border p2">
                                          {entry.feeCollection.paymentDate}
                                        </td>
                                        <td className="border p2">
                                          {entry.feeCollection.paymentMode}
                                        </td>
                                        <td className="border p2">
                                          {entry.feeCollection.collectedFee.toFixed(
                                            2,
                                          )}
                                        </td>
                                        <td className="border p2">
                                          {entry.feeCollection.ddNo ?? 'N/A'}
                                        </td>
                                        <td className="border p2">
                                          {entry.feeCollection.ddDate ?? 'N/A'}
                                        </td>
                                        <td className="border p2">
                                          <Button
                                            className="bg-lime-600 py-0"
                                            size={'sm'}
                                            onClick={() => {
                                              openModalInNewTab(entry.feeCollection.mrNo);
                                            }}
                                          >
                                            <PiFilePdfFill />
                                          </Button>
                                        </td>
                                        <td className="border p2">
                                          <Dialog>
                                            <DialogTrigger>
                                              <div className="bg-amber-600 text-stone-50 shadow hover:bg-slate-800 dark:bg-[#fb923c] dark:text-stone-950 dark:hover:bg-[#f97316] font-bold rounded px-2 py-1">
                                                Edit
                                              </div>
                                            </DialogTrigger>
                                            <DialogContent className="">
                                              <DialogHeader>
                                                <DialogTitle>
                                                  Update Mr number-{entry.mrNo}
                                                </DialogTitle>
                                              </DialogHeader>
                                              <ScrollArea>
                                                <OtherFeeCollectionUpdateForm
                                                  data={entry}
                                                />
                                              </ScrollArea>
                                            </DialogContent>
                                          </Dialog>
                                        </td>
                                        <td className="border p2">
                                          <MRDeleteAction mrNo={entry.feeCollection.mrNo} />
                                        </td>
                                      </tr>
                                    ),
                                  )}
                              </tbody>
                            </table>
                          </CardContent>
                        </Card>
                      ) : (
                        <p>No collection data available for this year.</p>
                      )}
                    </div>
                  </TabsContent>
                );
              })}
          </Tabs>
        )}
      </div>
    </>
  );
};

const OtherFeeCollectionDashboardSingleStudent = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('registrationNo');
  return (
    <>
      <div className="w-full flex flex-row gap-x-0">
        <div className="w-2/3 flex flex-col space-y-6">
          {param && <FeeDuesDetailsTable regdNo={param} />}
        </div>
        <div className="w-1/3 h-fit rounded-lg px-3 py-0">
          <div className="w-full flex flex-col ">
            {param && <OtherFeeCollectionForm regdNo={param} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherFeeCollectionDashboardSingleStudent;
