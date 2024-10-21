import React from 'react';
import NewStudentRegestrationForm from '../components/NewStudentRegestrationForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NSRBulkUploadForm from '../components/NSRBulkUploadForm';

const page = async () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 pb-10">
      <h1 className="text-2xl text-slate-600 font-bold">
        New Student Registration
      </h1>
      Choose One
      <Tabs defaultValue="account" className="w-[60vw]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={`SingleUpload`}>Single Upload</TabsTrigger>
          <TabsTrigger value={`BulkUpload`}>Bulk Upload</TabsTrigger>
        </TabsList>
        <TabsContent value={`SingleUpload`}>
          <NewStudentRegestrationForm />
        </TabsContent>
        <TabsContent value={`BulkUpload`}>
          <NSRBulkUploadForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
