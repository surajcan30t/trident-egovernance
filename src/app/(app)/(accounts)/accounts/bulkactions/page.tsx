import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import BulkAdjustmentForm from '../../components/bulk-adjustment-form';
import BulkDiscountForm from '../../components/bulk-discount-form';
import BulkOjeeFeeUpdateForm from '../../components/bulk-ojee-fee-update-form';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 pb-10">
      <h1 className="text-2xl text-slate-600 font-bold">
        Accounts Bulk Operations
      </h1>
      Choose One Action
      <Tabs defaultValue="bulkadjustmentaction" className="w-[60vw]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value={`bulkadjustmentaction`}>Bulk Adjustment</TabsTrigger>
          <TabsTrigger value={`bulkdiscountaction`}>Bulk Discount</TabsTrigger>
          <TabsTrigger value={`bulkojeeaction`}>Bulk OJEE Fee Update</TabsTrigger>
        </TabsList>
        <TabsContent value={`bulkadjustmentaction`}>
          <BulkAdjustmentForm />
        </TabsContent>
        <TabsContent value={`bulkdiscountaction`}>
          <BulkDiscountForm />
        </TabsContent>
        <TabsContent value={`bulkojeeaction`}>
          <BulkOjeeFeeUpdateForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
