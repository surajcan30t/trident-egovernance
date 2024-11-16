'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { FeeCollectionForm } from '@/app/(app)/(feecollection)/components/FeeCollectionForm';

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
        {years.map((year) => {
          const yearData = data[year];

          // Skip rendering if there's no data for the year
          if (!yearData) return null;

          return (
            <div key={year} className="mb-6 bg-white rounded-lg p-1">
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
                  {yearData.map((entry: any, index: number) => (
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

const FeeDuesDetailsTable = ({ regdNo }: { regdNo: string | null }) => {
  const [data, setData] = useState<any>({});
  const [dataAvailable, setDataAvailable] = useState<boolean>(false);
  const [defaultTab, setDefaultTab] = useState<string>('');
  useEffect(() => {
    const getDuesDetails = async (regdNo: string | null) => {
      setDefaultTab('');
      setDataAvailable(false);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/getDuesDetails/${regdNo}`,
          {
            cache: 'no-cache',
          },
        );
        const result = await response.json();
        setData(result);
        const years = Object.keys(result);
        const currentYear = years[years.length - 1]; // Get the most recent year
        const semesters = Object.keys(result[currentYear]);
        const latestSemester = semesters[semesters.length - 1];
        setDefaultTab(`${currentYear}-${latestSemester}`);
        setDataAvailable(true);
        console.log('use effect called');
        return result;
      } catch (e) {
        console.error(e);
      }
    };
    if (regdNo) {
      getDuesDetails(regdNo);
    }
  }, [regdNo]);

  const years = Object.keys(data);
  const defaultYear = years[years.length - 1]
  return (
    <>
      <div className="w-[51vw] p-2 rounded-lg shadow-lg border">
        <h1 className="text-lgl font-semibold mb-4 text-start">Dues Details</h1>
        {dataAvailable && (
          <Tabs defaultValue={defaultYear} className="w-full">
            <TabsList className="grid w-full grid-cols-8 gap-x-1 flex justify-center">
              {years &&
                years.map((year: any) => {
                  const semesters = Object.keys(data[year]).filter(
                    (semester) => semester !== '-1',
                  );

                  return years.map((semester) => (
                    <TabsTrigger
                      key={`${year}`}
                      value={`${year}`}
                    >
                      Year {year}
                    </TabsTrigger>
                  ));
                })}
            </TabsList>
            {years &&
              years.map((year: any) => {
                const semesters = Object.keys(data[year]).filter(
                  (semester) => semester !== '-1',
                );
                return semesters.map((semester) => (
                  <TabsContent
                    key={`${year}`}
                    value={`${year}`}
                  >
                    <Card>
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
                            {data[year][semester].map(
                              (item: any, index: number) => {
                                return (
                                  <tr key={index}>
                                    <td className="border">
                                      {item.description}
                                    </td>
                                    <td className="border">
                                      {item.amountDue.toFixed(2)}
                                    </td>
                                    <td className="border">
                                      {item.amountPaid.toFixed(2)}
                                    </td>
                                    <td className="border">
                                      {item.amountPaidToJee.toFixed(2)}
                                    </td>
                                    <td className="border">
                                      {item.balanceAmount.toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              },
                            )}
                          </tbody>
                          <tfoot>
                            <tr className={'bg-teal-500 text-white font-bold'}>
                              <td colSpan={4}>Total</td>
                              <td className={'text-center'}></td>
                            </tr>
                          </tfoot>
                        </table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ));
              })}
          </Tabs>
        )}
      </div>
    </>
  );
};

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

const FeeCollectionDashboardSingleStudent = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('registrationNo');
  return (
    <>
      <div className="w-full flex flex-row gap-x-2">
        <div className="w-2/3 flex flex-col space-y-6">
          <FeeDuesDetailsTable regdNo={param} />
          <FeeCollectionTable regdNo={param} />
        </div>
        <div className="w-1/3 h-fit rounded-lg shadow-xl p-1 py-3">
          {param && <FeeCollectionForm regdNo={param} />}
        </div>
      </div>
    </>
  );
};

export default FeeCollectionDashboardSingleStudent;
