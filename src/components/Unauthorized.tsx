import React from 'react';

const Unauthorized = () => {
  return (
    <div className="w-[calc(100vw-20.5rem)] h-[calc(100vh-5.5rem)] bg-white flex flex-col justify-center items-center gap-3">
      <div>
        <h1 className="text-4xl text-center font-extrabold">Hold Up!</h1>
      </div>
      <div className="flex justify-center items-center text-8xl font-extrabold text-red-500">
        4<div className="text-[10rem] mx-4 animate-spin">0</div>4
      </div>
      <div>
        <h1 className="text-4xl text-center font-semibold">
          Oops! looks like you are on the wrong way.
        </h1>
      </div>
    </div>
  );
};

export default Unauthorized;
