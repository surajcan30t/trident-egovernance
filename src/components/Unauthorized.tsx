import React from 'react';

const Unauthorized = () => {
  return (
    <div className="w-[100%] h-[calc(100vh-8.5rem)] bg-white flex flex-col justify-center items-center gap-3">
      <div>
        <h1 className="text-4xl text-center font-extrabold">Hold Up!</h1>
      </div>
      <div className="flex justify-center items-center text-8xl font-extrabold text-red-500">
        4<div className="text-[10rem] mx-4 animate-spin">0</div>1
      </div>
      <div>
        <h1 className="text-4xl text-center font-semibold">
          You don’t have permission to access this page. Please log in to continue.
        </h1>
      </div>
    </div>
  );
};

export default Unauthorized;
