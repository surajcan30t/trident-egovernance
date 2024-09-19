'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, IdCard, User, BookUser, PersonStanding, Award } from 'lucide-react'
import { FaVenusMars } from "react-icons/fa";
import { PiRankingBold, PiStudentBold } from "react-icons/pi";
import { Button } from '../../../../components/ui/button';
import { nsrSendAllotmentID } from '@/formactions/nsractions';
import { useRouter } from 'next/navigation';

const NewStudentRegistrationData = (data: any) => {
  // Dummy data (replace with actual data from school)

  if (typeof window !== 'undefined') {
    console.log('storing in ls')
    localStorage.setItem('student', JSON.stringify(data));
    console.log('stored in ls')
  }
  const router = useRouter()
  const [statusMessage, setStatusMessage] = useState('')

  const DataField = ({ icon, label, value }: any) => (
    <div className="flex items-center px-1 py-1 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="mr-4 text-2xl text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-5">Admission Details</h1>
        {/* <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData.gender}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Application number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData.applicationNumber}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">TFW status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData.tfwStatus}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Batch</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData.batch}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Course</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData.course}</dd>
              </div>
            </dl>
          </div>
        </div> */}
        <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2">
          <DataField icon={<BookUser />} label="Application No." value={data.jeeApplicationNo} />
          <DataField icon={<IdCard />} label="JEE/OJEE Roll No." value={data.rollNo} />
          <DataField icon={<PiRankingBold />} label="JEE/OJEE Rank" value={data.rank} />
          <DataField icon={<User />} label="Name" value={data.studentName} />
          <DataField icon={<FaVenusMars />} label="Gender" value={data.gender} />
          <DataField icon={<GraduationCap />} label="Course" value={data.course} />
          <DataField icon={<Award />} label="Branch" value={data.branch} />
          <DataField icon={<PersonStanding />} label="TFW Status" value={data.tfw} />
          <DataField icon={<GraduationCap />} label="Admitted Through" value={data.admissionType} />
          <DataField icon={<PiStudentBold />} label="Student Type" value={data.studentType} />
        </div>

        <div className="flex justify-center m-5">
          <form action={
            async(form) => {
              const payload = {
                allotId:form.get('allotmentID'),
                step: 2,
              };
              const response = await nsrSendAllotmentID(payload);
              if(response !== 200){
                setStatusMessage('Allotment ID not found')
              }
              if(response === 200){
                router.push('/studentportal/newstudentpersonaldetails')
              }
            }
          } className='flex flex-col gap-3 justify-center'>
            <div className='flex flex-row gap-3 justify-center items-center'>
              <label htmlFor="allotmentID">Allotment Id:-</label>
              <input value={data?.allotmentId} name='allotmentID' type="text" placeholder='Enter your JEE/OJEE allotment ID' className='w-2/3 px-4 py-1 border border-gray-300 rounded-md ring-1' />
            </div>
            <p className='after:content text-red-500 text-sm text-center'>Please refer to JEE allotment letter</p>
            <Button variant='trident'>Save & Next</Button>
            {statusMessage && <p className='text-red-500 text-sm text-center'>{statusMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudentRegistrationData