// import React from 'react'

// const User = () => {
//     const username = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson']
//     const userrole = ['Admin', 'Student', 'Faculty', 'Staff']
//     const branch = ['CSE', 'CST', 'CSIT']
//     const singleUser = userrole[Math.floor(Math.random() * userrole.length)]
//     return (
//         <div className='w-[20vw] h-screen bg-slate-500 p-4 flex flex-col justify-start items-center rounded-md'>
// <div className='relative w-[150px] h-[150px] border border-black rounded-full overflow-hidden'>
//     <Image className='object-cover' src={"/user.png"} alt='user' fill sizes='100vw' />
// </div>
// <h1 className='text-white font-bold text-xl'>{username[Math.floor(Math.random() * userrole.length)]}</h1>
// <h1 className='text-white font-semibold text-base'>{singleUser}</h1>
// <h1 className='text-white font-semibold text-base'>{branch[Math.floor(Math.random() * branch.length)]}</h1>
//         </div>
//     )
// }

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';


const student: boolean = true;

type CardProps = React.ComponentProps<typeof Card>;

const User: React.FC<CardProps> = ({ className, ...props }) => {
  const username: string[] = [
    'John Doesdjh',
    'Swayam Prakash Mohanty Mohanty',
    'Swayam Prakash Mohanty',
    'Bob Johnson',
  ];
  const userrole: string[] = ['Admin', 'Student', 'Faculty', 'Staff'];
  const branch: string[] = ['CSE', 'CST', 'CSIT'];
  const year: string[] = ['1st', '2nd', '3rd', '4th'];
  const semester: string[] = ['1st', '2nd', '3rd', '4th', '5th', 'VI', 'VII', 'VIII'];
  const rollno: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const group: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const father: string[] = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson', 'Swayam Prakash Mohanty Mohanty', 'Swayam Prakash Mohanty'];
  const mother: string[] = ['July Amber Chle', 'Monalisa Peterson', 'Jasmine Smith', 'Sushmita Smith']
  const locg: string[] = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson', 'Swayam Prakash Mohanty Mohanty', 'Swayam Prakash Mohanty'];
  const phone: number[] = [1235698750, 4789558962, 7899553200, 9987447851, 9687589320, 7848569521];
  const dob: string[] = ['01-01-2000', '01-01-1990', '01-01-1980', '01-01-1970', '01-01-1960', '01-01-1950'];
  const mail: string[] = ['wYwJZ@example.com', 'wYwJZ@example.com', 'wYwJZ@example.com', 'wYwJZ@example.com', 'wYwJZ@example.com', 'wYwJZ@example.com'];

  return (
    <Card className={cn('w-[300px]', className)} {...props}>
      <CardContent className="grid gap-4 py-2 bg-indigo-200 shadow-md shadow-gray-600 rounded-lg">
        <div className="flex space-x-4 items-center">
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden shrink-0">
            <Image
              className="object-cover"
              src={'/user.png'}
              alt="user"
              fill
              sizes="50vw"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-base">
              {username[Math.floor(Math.random() * username.length)]}
            </h1>
            <h1 className="font-semibold text-base">
              {userrole[Math.floor(Math.random() * userrole.length)]}
            </h1>
            <h1 className="font-semibold text-base">
              {branch[Math.floor(Math.random() * branch.length)]}
            </h1>
          </div>
        </div>
        <hr className='w-full border-gray-500' />
        {student && (
          <>
            <div>
              <h1 className="text-xl font-bold">College Information</h1>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-left font-normal">Roll No.</td>
                    <td className="text-right font-semibold">{rollno[Math.floor(Math.random() * rollno.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Year</td>
                    <td className="text-right font-semibold">{year[Math.floor(Math.random() * year.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Semester</td>
                    <td className="text-right font-semibold">{semester[Math.floor(Math.random() * semester.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Group</td>
                    <td className="text-right font-semibold">{group[Math.floor(Math.random() * group.length)]}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className='w-full border-gray-500' />
            <div>
              <h1 className="text-xl font-bold">Personal Information</h1>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-left font-normal">Mother&apos;s Name:</td>
                    <td className="text-right font-semibold">{mother[Math.floor(Math.random() * mother.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Father&apos;s Name:</td>
                    <td className="text-right font-semibold">{father[Math.floor(Math.random() * father.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Local Guardian:</td>
                    <td className="text-right font-semibold">{locg[Math.floor(Math.random() * locg.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Phone:</td>
                    <td className="text-right font-semibold">{phone[Math.floor(Math.random() * phone.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">E-mail:</td>
                    <td className="text-right font-semibold">{mail[Math.floor(Math.random() * mail.length)]}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">DOB:</td>
                    <td className="text-right font-semibold">{dob[Math.floor(Math.random() * dob.length)]}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </>
        )}
      </CardContent>
    </Card>
  );
};

export default User;
