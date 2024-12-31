'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


interface SubjectResult {
  semester: number;
  subjectCode: string;
  grade: string;
  credits: number;
  subjectName: string;
}

interface SubjectResultDataList {
  [key: string]: SubjectResult[]; // Key is the semester number as a string (e.g., "1", "2")
}

interface ApiResponse {
  subjectResultDataList: SubjectResultDataList;
}

export default function DetailedSemesterResultsModal() {
  const { data: session, status } = useSession();
  const [resultSummary, setResultSummary] = useState<ApiResponse | null>(null);
  useEffect(() => {
    async function getAttendanceDetails() {
      // Add additional checks to prevent unnecessary API calls
      if (status === 'loading') return;

      if (status === 'authenticated' && session?.user?.accessToken) {
        try {
          const token = session.user.accessToken;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND}/student-portal/get-subject-wise-results`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setResultSummary(response.data || null);
        } catch (error) {
          // Optionally set an error state or default value
          setResultSummary(null);
        }
      }
    }

    // Only call the function if we have a valid session
    if (status === 'authenticated') {
      getAttendanceDetails();
    }
  }, [status, session]);

  return (
    <>
      {status === 'loading' ? (
        'Loading..'
      ) : status === 'authenticated' && resultSummary ? (
      <Tabs defaultValue="1" className="w-full">
        {/* Tabs List */}
        <TabsList className={'w-full'}>
          {Object.keys(resultSummary?.subjectResultDataList || {}).map(
            (semester) => (
              <TabsTrigger key={semester} value={semester}>
                Sem {semester}
              </TabsTrigger>
            ),
          )}
        </TabsList>

        {/* Tabs Content */}
        {Object.entries(resultSummary?.subjectResultDataList || {}).map(
          ([semester, subjects]) => (
            <TabsContent key={semester} value={semester}>
              <Table className=" rounded-xl shadow-lg border-r border-l">
                <TableCaption className={'text-lg font-bold'}>
                  {/*Account details for Year - {duesDetails[0]?.dueYear}*/}
                </TableCaption>
                <TableHeader className="text-base font-semibold">
                  <TableRow className="bg-blue-200">
                    <TableHead className="w-1/5 text-slate-600 font-semibold">
                      Subject Code
                    </TableHead>
                    <TableHead className="w-3/5  text-slate-600 font-semibold">
                      Subject Name
                    </TableHead>
                    <TableHead className="w-1/5  text-slate-600 font-semibold">
                      Grade
                    </TableHead>
                    <TableHead className="w-1/5  text-slate-600 font-semibold">
                      Credits
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.subjectCode}</TableCell>
                      <TableCell>{subject.subjectName}</TableCell>
                      <TableCell>{subject.grade}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ),
        )}
      </Tabs>
       ) : null}

    </>
  );
}

