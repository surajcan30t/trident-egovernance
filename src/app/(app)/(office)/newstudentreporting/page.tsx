import React from 'react';
import NewStudentRegestrationForm from '../components/NewStudentRegestrationForm';
import SideBarMenu from '../../components/SideBarMenu';

const page = async () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 pb-10">
      <h1 className="text-2xl text-slate-600 font-bold">
        New Student Registration Form
      </h1>
      <NewStudentRegestrationForm />
    </div>
    // <div>
    //   <SideBarMenu />
    // </div>
  );
};

export default page;
