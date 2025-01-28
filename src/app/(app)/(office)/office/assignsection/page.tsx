import React from "react";
import authValidator from "@/lib/auth/role-validator";
import Unauthorized from "@/components/Unauthorized";
import SectionAssignForm from "../../components/section-assign/SectionAssignForm";
import SectionTable from "../../components/section-assign/SectionTable";

const page = async () => {
  const { session, role } = await authValidator();

  // if (!session) {
  //   return <Unauthorized />;
  // }

  // if (role !== 'OFFICE') {
  //   return <Unauthorized />;
  // }

  return (
    <>
      <div className="w-full mx-auto flex flex-col justify-center items-center">
        <div className="w-full"><h1 className="text-2xl text-slate-600 font-bold">Assign Section</h1></div>
        <SectionAssignForm />
        <SectionTable />
      </div>
    </>
  )
}

export default page