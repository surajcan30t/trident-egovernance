import React from 'react';
import SessionWiseSelector from '@/app/(app)/(accounts)/components/FeeCollectionSessionWise';
import FeeCollectionTable from '@/app/(app)/(accounts)/components/fee-collection-table';
import FeeCollectionThisMonth from '../../components/FeeCollectionThisMonth';
import FeeCollectionToday from '../../components/FeeCollectionToday';
import FeeCollectionFY from '../../components/FeeCollectionFY';
import FeeCollectionDateRange from '../../components/FeeCollectionDateRange';

const page = (props: any) => {
  const { searchParams } = props;
  const today = new Date();

  // Ensure searchParams has the correct shape and defaults
  const query = {
    from: searchParams?.from === 'null' ? null : (searchParams?.from || today.toISOString()),
    to: searchParams?.to === 'null' ? null : (searchParams?.to || today.toISOString()),
    sessionId: searchParams?.sessionId === 'null' ? null : (searchParams.sessionId || null)
  };

  console.log('query', query);
  return (
    <>
      <main className="flex flex-col items-center border">
        <div className="w-full">
          <h1 className="text-2xl text-left font-bold text-slate-800">
            Fee Collection Report - {
              query.sessionId ? `Session ${query.sessionId}` :
                query.from === query.to ? `Today (${new Date(query.from).toLocaleDateString()})` :
                  new Date(query.from).getMonth() === new Date(query.to).getMonth() ? `This Month (${new Date(query.from).toLocaleString('default', { month: 'long', year: 'numeric' })})` :
                    new Date(query.from).getMonth() === 3 && new Date(query.to).getMonth() === 2 ? `Financial Year ${new Date(query.from).getFullYear()}-${new Date(query.to).getFullYear()}` :
                      `${new Date(query.from).toLocaleDateString()} to ${new Date(query.to).toLocaleDateString()}`
            }
          </h1>
        </div>
        <div className="">
          <div className="flex justify-end gap-2 m-2 bg-blue-100 rounded-md p-2">
            <FeeCollectionToday />
            <FeeCollectionThisMonth />
            <FeeCollectionDateRange />
            <FeeCollectionFY />
            <SessionWiseSelector />
          </div>
          <div className="flex flex-row justify-center">
            <FeeCollectionTable query={query} />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
