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
import { FeeCollectionForm } from '@/app/(app)/(feecollection)/components/FeeCollectionForm';
import { PiFilePdfFill } from 'react-icons/pi';
import useSWR, { mutate } from 'swr';
import { OtherFeeCollectionForm } from '@/app/(app)/(feecollection)/components/OtherFeeCollectionForm';

interface StudentData {
  regdNo?: string;
  studentName?: string;
  gender?: string;
  branchCode?: string;
  admissionYear?: number;
  currentYear?: number;
}

const FeeCollectionTable = ({ regdNo }: { regdNo: string | null }) => {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const getCollectionDetails = async (regdNo: string | null) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-collection-history/${regdNo}`,
          {
            cache: 'no-cache',
          },
        );
        const result = await response.json();
        setData(result);

        return result;
      } catch (e) {
        console.error(e);
      }
    };
    getCollectionDetails(regdNo);
  }, [regdNo]);
  const years = Object.keys(data);
  return (
    <>
      <div className="w-[51vw] p-2 rounded-lg shadow-lg border">
        <h1 className="text-lgl font-semibold mb-4">Fee Collection Details</h1>

        {/* Loop through the years */}
        {years &&
          years.map((year, index: number) => {
            const yearData = data[year];
            console.log('index', index);
            // Skip rendering if there's no data for the year
            if (!yearData) return null;

            return (
              <div
                key={`${index}-${year}`}
                className="mb-6 bg-white rounded-lg p-1"
              >
                <table className="w-full table-auto mt-4 border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border">MR No.</th>
                      <th className="border">Collected Fee</th>
                      <th className="border">Payment Date</th>
                      <th className="border">Payment Mode</th>
                      <th className="border">DD No.</th>
                      <th className="border">DD Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Loop through each fee entry in the year */}
                    {yearData &&
                      yearData.map((entry: any, index: number) => (
                        <tr key={entry.mrNo} className="text-center">
                          <td className="border p2">{entry.mrNo}</td>
                          <td className="border p2">
                            {entry.collectedFee.toFixed(2)}
                          </td>
                          <td className="border p2">{entry.paymentMode}</td>
                          <td className="border p2">{entry.ddNo ?? 'N/A'}</td>
                          <td className="border p2">{entry.ddDate ?? 'N/A'}</td>
                          <td className="border p2">{entry.paymentDate}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            );
          })}
      </div>
    </>
  );
};

const fetchDuesDetails = async (regdNo: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/getDuesDetails/${regdNo}`,
    {
      cache: 'no-cache',
    },
  );
  return response.json();
};

const fetchCollectionDetails = async (regdNo: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-collection-history/${regdNo}`,
    {
      cache: 'no-cache',
    },
  );
  return response.json();
};

const FeeDuesDetailsTable = ({ regdNo }: { regdNo: string | null }) => {
  // const [duesData, setDuesData] = useState<any>({});
  // const [collectionData, setCollectionData] = useState<any>({});
  const [dataAvailable, setDataAvailable] = useState<boolean>(false);
  // const [defaultTab, setDefaultTab] = useState<string>('');
  // const [showModal, setShowModal] = useState<boolean>(false);
  // useEffect(() => {
  //   const getDuesDetails = async (regdNo: string | null) => {
  //     setDefaultTab('');
  //     setDataAvailable(false);
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/getDuesDetails/${regdNo}`,
  //         {
  //           cache: 'no-cache',
  //         },
  //       );
  //       const result = await response.json();
  //       setDuesData(result);
  //       const years = Object.keys(result);
  //       const currentYear = years[years.length - 1]; // Get the most recent year
  //       const semesters = Object.keys(result[currentYear]);
  //       const latestSemester = semesters[semesters.length - 1];
  //       setDefaultTab(`${currentYear}-${latestSemester}`);
  //       setDataAvailable(true);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //
  //   const getCollectionDetails = async (regdNo: string | null) => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-collection-history/${regdNo}`,
  //         {
  //           cache: 'no-cache',
  //         },
  //       );
  //       const result = await response.json();
  //       console.log('collection details\n', result);
  //       setCollectionData(result);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //
  //   if (regdNo) {
  //     getDuesDetails(regdNo);
  //     getCollectionDetails(regdNo);
  //   }
  // }, [regdNo]);

  const openModalInNewTab = () => {
    // Open a new tab with the specified URL
    window.open(`studentfeecollection/mr?registrationNo=${regdNo}`, '_blank');
  };
  const { data: duesData, error: duesError } = useSWR(
    regdNo ? `/getDuesDetails/${regdNo}` : null,
    () => fetchDuesDetails(regdNo!),
  );
  const { data: collectionData, error: collectionError } = useSWR(
    regdNo ? `/get-fee-collection-history/${regdNo}` : null,
    () => fetchCollectionDetails(regdNo!),
  );

  if (duesError || collectionError) {
    return <div>Error fetching data</div>;
  }

  let grandTotalAmountDue = 0;
  let grandTotalAmountPaid = 0;
  let grandTotalAmountPaidToJee = 0;
  let grandTotalBalanceAmount = 0;
  console.log('Dues Data', duesData);
  const years = duesData ? Object.keys(duesData) : [];
  const defaultYear = years[years.length - 1];
  return (
    <>
      <div className="w-[51vw] p-2 rounded-lg shadow-lg border">
        {duesData && (
          <Tabs defaultValue={defaultYear} className="w-full">
            <TabsList className="grid w-full grid-cols-8 gap-x-1 flex justify-center">
              {years &&
                years.map((year: any) => (
                  <TabsTrigger key={year} value={year}>
                    Year {year}
                  </TabsTrigger>
                ))}
            </TabsList>
            <h1 className="text-lg font-semibold mb-4 text-start">
              Dues Details
            </h1>

            {years &&
              years.map((year: any) => {
                const semesters = Object.keys(duesData[year]).filter(
                  (semester) => semester !== '-1',
                );

                return (
                  <TabsContent key={year} value={year}>
                    {semesters.map((semester) => {
                      // Calculate totals for the semester
                      let totalAmountDue = 0;
                      let totalAmountPaid = 0;
                      let totalAmountPaidToJee = 0;
                      let totalBalanceAmount = 0;

                      duesData[year][semester].forEach((item: any) => {
                        totalAmountDue += item.amountDue;
                        totalAmountPaid += item.amountPaid;
                        totalAmountPaidToJee += item.amountPaidToJee;
                        totalBalanceAmount += item.balanceAmount;
                      });

                      // Accumulate grand totals
                      grandTotalAmountDue += totalAmountDue;
                      grandTotalAmountPaid += totalAmountPaid;
                      grandTotalAmountPaidToJee += totalAmountPaidToJee;
                      grandTotalBalanceAmount += totalBalanceAmount;

                      return (
                        <Card key={semester} className="mb-4">
                          <CardHeader>
                            <CardDescription>
                              Details for Year {year} - Semester {semester}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <table className="w-full uppercase text-start text-sm">
                              <thead className={'bg-amber-600/60 text-left'}>
                                <tr>
                                  <th className="border">Description</th>
                                  <th className="border">Amount Due</th>
                                  <th className="border">Amount Paid</th>
                                  <th className="border">AMT Paid At OJEE</th>
                                  <th className="border">Balance AMT</th>
                                </tr>
                              </thead>
                              <tbody>
                                {duesData[year][semester].map(
                                  (item: any, index: number) => (
                                    <tr key={index}>
                                      <td className="border p-1">
                                        {item.description}
                                      </td>
                                      <td className="border p-1">
                                        {item.amountDue.toFixed(2)}
                                      </td>
                                      <td className="border p-1">
                                        {item.amountPaid.toFixed(2)}
                                      </td>
                                      <td className="border p-1">
                                        {item.amountPaidToJee.toFixed(2)}
                                      </td>
                                      <td className="border p-1">
                                        {item.balanceAmount.toFixed(2)}
                                      </td>
                                    </tr>
                                  ),
                                )}
                              </tbody>
                              <tfoot>
                                <tr
                                  className={'bg-teal-500 text-white font-bold'}
                                >
                                  <td colSpan={1}>Semester Total</td>
                                  <td className="border">
                                    {totalAmountDue.toFixed(2)}
                                  </td>
                                  <td className="border">
                                    {totalAmountPaid.toFixed(2)}
                                  </td>
                                  <td className="border">
                                    {totalAmountPaidToJee.toFixed(2)}
                                  </td>
                                  <td className="border">
                                    {totalBalanceAmount.toFixed(2)}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </CardContent>
                        </Card>
                      );
                    })}
                    <div className="mt-1 w-full flex justify-center">
                      <table className="w-[46vw] uppercase text-start text-sm bg-teal-600 text-white">
                        <thead className={'text-xs'}>
                          <tr>
                            <th className="border">Total Amount Due</th>
                            <th className="border">Total Amount Paid</th>
                            <th className="border">Total AMT Paid At OJEE</th>
                            <th className="border">Total Balance AMT</th>
                          </tr>
                        </thead>
                        <tbody className={'text-center font-extrabold'}>
                          <tr>
                            <td className="border">
                              {grandTotalAmountDue.toFixed(2)}
                            </td>
                            <td className="border">
                              {grandTotalAmountPaid.toFixed(2)}
                            </td>
                            <td className="border">
                              {grandTotalAmountPaidToJee.toFixed(2)}
                            </td>
                            <td className="border">
                              {grandTotalBalanceAmount.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
                                </tr>
                              </thead>
                              <tbody>
                                {collectionData[`year${year}`] &&
                                  collectionData[`year${year}`].map(
                                    (entry: any, index: number) => (
                                      console.log(
                                        'collection details',
                                        collectionData,
                                      ),
                                      (
                                        <tr key={index} className="text-center">
                                          <td className="border p2">
                                            {entry.mrNo}
                                          </td>
                                          <td className="border p2">
                                            {entry.paymentDate}
                                          </td>
                                          <td className="border p2">
                                            {entry.paymentMode}
                                          </td>
                                          <td className="border p2">
                                            {entry.collectedFee.toFixed(2)}
                                          </td>
                                          <td className="border p2">
                                            {entry.ddNo ?? 'N/A'}
                                          </td>
                                          <td className="border p2">
                                            {entry.ddDate ?? 'N/A'}
                                          </td>
                                          <td className="border p2">
                                            <Button
                                              className="bg-yellow-400 py-0"
                                              size={'default'}
                                              onClick={() => {
                                                openModalInNewTab();
                                              }}
                                            >
                                              <PiFilePdfFill />
                                            </Button>
                                          </td>
                                          <td className="border p2">
                                            {entry.ddDate ?? 'N/A'}
                                          </td>
                                        </tr>
                                      )
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

            {/* Grand Totals */}
          </Tabs>
        )}
      </div>
      {/*{*/}
      {/*  showModal && (*/}
      {/*    <div>*/}
      {/*      <ExportPdf />*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*}*/}
    </>
  );
};

const FeeCollectionDashboardSingleStudent = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('registrationNo');
  return (
    <>
      <div className="w-full flex flex-row gap-x-0">
        <div className="w-2/3 flex flex-col space-y-6">
          <FeeDuesDetailsTable regdNo={param} />
        </div>
        <div className="w-1/3 h-fit rounded-lg px-3 py-3 border">
          <div className="w-full flex flex-col space-y-20">
            {param && <FeeCollectionForm regdNo={param} />}
            {param && <OtherFeeCollectionForm regdNo={param} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeeCollectionDashboardSingleStudent;

// const StudentDetails = ({regdNo}:{regdNo: string | null}) => {
//   const [studentData, setStudentData] = useState<StudentData>({})
//   useEffect(() => {
//     const getStudentDetails = async (regdNo: string | null | undefined) => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${regdNo}`,
//         );
//         const data = await response.json();
//         setStudentData(data)
//         return data;
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     getStudentDetails(regdNo)
//   }, [regdNo]);
//   return <>
//     <div className={''}>
//       <table className='text-xs'>
//         <thead className='font-medium'>
//           <tr className="">
//             <th className='border text-left'>Regd No.</th>
//             <th className='border text-left'>Name</th>
//             <th className='border text-left'>Gender</th>
//             <th className='border text-left'>Branch</th>
//             <th className='border text-left'>Admission Year</th>
//             <th className='border text-left'>Year</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className='p-2 border'>{studentData.regdNo}</td>
//             <td className='p-2 border'>{studentData.studentName}</td>
//             <td className='p-2 border'>{studentData.gender}</td>
//             <td className='p-2 border'>{studentData.branchCode}</td>
//             <td className='p-2 border'>{studentData.admissionYear}</td>
//             <td className='p-2 border'>{studentData.currentYear}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </>;
// };
