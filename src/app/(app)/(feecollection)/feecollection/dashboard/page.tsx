import React from 'react';
import DailyCollection from '../../components/DailyCollection';
import FeeDataGrid from '@/app/(app)/(feecollection)/components/FeeDataGrid';
import { RegdNumForm } from '@/app/(app)/(feecollection)/components/RegdNumForm';
import FeeCollectionDashboardSingleStudent from '@/app/(app)/(feecollection)/components/fee-collection-dashboard-single-student';

const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 items-center gap-4">
      <div className="flex flex-row gap-4">
        <DailyCollection />
      </div>
      <RegdNumForm />
    </div>
  );
};

export default page;
