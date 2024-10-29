import React from 'react';
import { DataTable } from './TableComponents/data-table';
import { columns } from './TableComponents/StudentColumns';
import { Students } from './TableComponents/schema';
import { studentDataFetcher } from '../serveractions-office/actions';

let data: Students[] = [];
async function getData(): Promise<Students[] | undefined> {
  try {
    const response = await studentDataFetcher();
    return response;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const StudentDataTable = async () => {
  if (!data.length) data = (await getData()) || [];
  else console.log('Data already fetched');
  return (
    <div className="container mx-auto w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default StudentDataTable;
