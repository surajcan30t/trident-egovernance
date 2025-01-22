import React from "react";
import authValidator from "@/lib/auth/role-validator";
import Unauthorized from "@/components/Unauthorized";
import SectionAssignForm from "../../components/section-assign/SectionAssignForm";

const page = async () => {
  const { session, role } = await authValidator();

  if (!session) {
    return <Unauthorized />;
  }

  if (role !== 'OFFICE') {
    return <Unauthorized />;
  }

  return (
    <>
      <div className="w-full mx-auto flex flex-col justify-center">
        <h1 className="text-2xl text-slate-600 font-bold">Assign Section</h1>
        <SectionAssignForm />
      </div>
    </>
  )
}

export default page