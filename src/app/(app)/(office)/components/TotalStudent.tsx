import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

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

//fetch(/office/grouped-continuing-dashboard-count)
const fetchStudentData = async () => {
  const session = await getServerSession(authOptions);
  try {
    if(session){
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/grouped-student-count/CONTINUING`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          next: { revalidate: 10 },
        },
      );
      const data = await response.json();
      return data as CourseWise[];
    }else return undefined;
  } catch (e) {
    console.log(e);
  }
};

const TotalStudent: React.FC = async () => {
  const studentData: CourseWise[] | undefined = await fetchStudentData();
  if (!studentData) {
    return (
      <Card className="bg-orange-700 text-white">
        <CardHeader>
          <CardTitle>Total Student</CardTitle>
        </CardHeader>
        <CardContent>
          No data...
        </CardContent>
      </Card>
    );
  }
  return (
    <>
      <Card className="bg-orange-700 text-white">
        <CardHeader>
          <CardTitle>Total Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-3 flex-wrap">
            {studentData &&
              studentData?.map((data, index) => (
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

export default TotalStudent;

const BranchWiseComponent = ({
  branchWiseStudent,
  course,
}: BranchWiseComponentProps) => {
  return (
    <div>
      <Card className="border-0 shadow-2xl bg-orange-700 text-white">
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
