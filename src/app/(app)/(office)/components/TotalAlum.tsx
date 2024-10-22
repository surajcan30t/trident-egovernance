import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface StudentData {
  branchCode: string;
  branchStudentCount: number;
}
interface CourseWise {
  course: string;
  studentCount: number;
  branches: StudentData[];
}
interface BranchWiseComponentProps {
  branchWiseStudent: StudentData[];
  course: string;
}

const fetchStudentData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/office/grouped-student-count/CONTINUING`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    },
  );
  const data = await response.json();
  return data as CourseWise[];
};

const TotoalAlum: React.FC = async () => {
  const studentData: CourseWise[] = await fetchStudentData();
  return (
    <>
      <Card className="bg-amber-600 text-white">
        <CardHeader>
          <CardTitle>Total Alumni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-3 flex-wrap">
            {studentData.map((data, index) => (
              <div
                key={data.course}
                className={`flex flex-row items-center gap-2 border border-gray-100 rounded-md px-2`}
              >
                <Dialog>
                  <DialogTrigger>
                    <div className="flex flex-col gap-0">
                      <div className="uppercase">{data.course}</div>
                      <span className="text-xl font-bold">
                        {data.studentCount}
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="m-2 p-2">
                    <BranchWiseComponent
                      branchWiseStudent={data.branches}
                      course={data.course}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TotoalAlum;

const BranchWiseComponent = ({
  branchWiseStudent,
  course,
}: BranchWiseComponentProps) => {
  return (
    <div>
      <Card className="border-0 shadow-2xl bg-amber-600 text-white">
        <CardHeader>
          <CardTitle>{course}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap text-white gap-2">
            {branchWiseStudent.map((data, index) => (
              <div
                key={data.branchCode}
                className={`flex flex-row items-center gap-2 rounded-md px-2 border border-gray-100`}
              >
                <div className="flex flex-col gap-0">
                  <div className="uppercase">{data.branchCode}</div>
                  <span className="text-xl font-bold">
                    {data.branchStudentCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
