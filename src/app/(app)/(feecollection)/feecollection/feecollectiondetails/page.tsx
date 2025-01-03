import React from 'react';
import FinancialYearSelector from '@/app/(app)/(feecollection)/components/financial-year-selecter-button';
import FeeCollectionTable from '@/app/(app)/(feecollection)/components/fee-collection-table';

const page = (props: any) => {
  const { searchParams } = props;
  const today = new Date();
  const defaultQuery = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const query:string = searchParams.get('search') || defaultQuery;
  return (
    <>
      <main className={'flex flex-col items-center border'}>
        <div>

        </div>
        <div className=''>
          <div className='flex justify-end m-2'>
            <FinancialYearSelector />
          </div>
          { query && <FeeCollectionTable query={query} /> }
        </div>
      </main>
    </>
  );
};

export default page;
