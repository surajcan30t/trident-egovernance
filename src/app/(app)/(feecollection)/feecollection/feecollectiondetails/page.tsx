import React from 'react';
import FinancialYearSelector from '@/app/(app)/(feecollection)/components/financial-year-selecter-button';
import FeeCollectionTable from '@/app/(app)/(feecollection)/components/fee-collection-table';

const page = () => {
  return (
    <>
      <main className={'flex flex-col items-center border'}>
        <div>

        </div>
        <div className={''}>
          <div className={'flex justify-end m-2'}>
            <FinancialYearSelector />
          </div>
          <FeeCollectionTable />
        </div>
      </main>
    </>
  );
};

export default page;
