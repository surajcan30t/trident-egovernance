import React from 'react';

//fetch ('get-student-by-regdNo/{})
const getStudentByRegdNo = async (regdNo: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/office/get-student-by-regdNo/${regdNo}`,
    );
    const data = await res.json();
    console.log('Data', data);
    return data;
  } catch (e) {
    console.log('error', e);
  }
};
const page = async ({ params }: { params: { regdno: string } }) => {
  // const studetData = await getStudentByRegdNo(params.regdno);
  // console.log('component', studetData);
  return (
    <>
      <main className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Hello, {params.regdno}!</h1>
        <p className="text-lg text-gray-500">This is a dynamic route.</p>
      </main>
    </>
  );
};

export default page;
