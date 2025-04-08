import React from 'react';
import TotalStudent from '../../components/TotalStudent';
import TotoalAlum from '../../components/TotalAlum';
import StudentDataTable from '../../components/StudentDataTable';
import { Students } from '../../components/TableComponents/schema';
import authValidator from '@/lib/auth/role-validator';
import Unauthorized from '@/components/Unauthorized';
import { DataTableSkeleton } from '@/components/data-table-skeleton';

const studentDataFetcher = async (
  token: string,
): Promise<Students[] | undefined> => {
  try {
    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/continuing-students`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-cache',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      return data;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
const page = async () => {
  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }

  if (role !== 'OFFICE') {
    return <Unauthorized />;
  }

  const data = await studentDataFetcher(token);

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="flex flex-row gap-4 justify-center w-full">
        <TotalStudent />
        <TotoalAlum />
      </div>
      <div className="w-[calc(100vw-20vw)]">
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={2}
              cellWidths={['5rem', '20rem', '12rem', '12rem', '8rem']}
              shrinkZero
            />
          }
        >
          <StudentDataTable studentData={data} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default page;
