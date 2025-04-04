import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  image: string;
  userType: {
    userJobInformationDto: {
      displayName: string | null;
      jobTitle: string;
      department: string;
      employeeId: string;
    };
    collegeInformation: {
      rollNo: number;
      year: number;
      semester: number;
      labGroup: number;
      section: string;
      course: string;
    };
    studentPersonalInformation: {
      presentAddress: string | null;
      phoneNo: string;
      email: string;
      dob: string; // format: YYYY-MM-DD
    };
    parentsPersonalInformation: {
      motherName: string;
      fatherName: string;
      localGuardianName: string;
      permanentAddress: string;
      phone: string;
      email: string;
    };
  };
}
 

type CardProps = React.ComponentProps<typeof Card>;

const User: React.FC<CardProps> =  ({ className, ...props }) => {
  const { data: session } = useSession()
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const jobTitle = session?.user?.userType?.userJobInformationDto?.jobTitle
  console.log(session)
  const student: boolean = jobTitle === 'STUDENT';

  useEffect(() => {
    if (session?.user?.accessToken) {
      const getProfilePicture = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/api/get-user-photo`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch image");
          }

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      getProfilePicture();
    }
  }, [session?.user?.accessToken]);

  return (
    <Card className={cn('w-full h-fit', className)} {...props}>
      <CardContent className=" w-full h-full grid gap-4 bg-indigo-200 shadow-md shadow-gray-600 rounded-lg">
        <div className="flex flex-col space-x-4 items-center">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden shrink-0">
            {<></>}
            <Image
              className="object-cover"
              src={imageUrl || ''}
              alt="user"
              width={200}
              height={200}
              // fill
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-base text-center">
              {session?.user?.name}
            </h1>
            <h1 className="font-semibold text-base text-center capitalize">
              {session?.user?.userType?.userJobInformationDto?.jobTitle}
            </h1>
            <h1 className="font-semibold text-base text-center uppercase">
              {session?.user?.userType?.userJobInformationDto?.department}
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
                    <td className="text-right font-semibold">{session?.user?.userType?.collegeInformation?.rollNo}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Year</td>
                    <td className="text-right font-semibold">{session?.user?.userType?.collegeInformation?.year}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Semester</td>
                    <td className="text-right font-semibold">{session?.user?.userType?.collegeInformation?.semester}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Section</td>
                    <td className="text-right font-semibold">{session?.user?.userType?.collegeInformation?.section}</td>
                  </tr>
                  <tr>
                    <td className="text-left font-normal">Group</td>
                    <td className="text-right font-semibold">{session?.user?.userType?.collegeInformation?.labGroup}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*<hr className='w-full border-gray-500' />*/}
            {/*<div>*/}
            {/*  <h1 className="text-xl font-bold">Personal Information</h1>*/}
            {/*  <table className="w-full">*/}
            {/*    <tbody>*/}
            {/*      <tr className='border-b border-gray-400'>*/}
            {/*        <td className="text-left font-normal">Mother&apos;s Name:</td>*/}
            {/*        <td className="text-right font-semibold">{mother[Math.floor(Math.random() * mother.length)]}</td>*/}
            {/*      </tr>*/}
            {/*      <tr className='border-b border-gray-400'>*/}
            {/*        <td className="text-left font-normal">Father&apos;s Name:</td>*/}
            {/*        <td className="text-right font-semibold">{father[Math.floor(Math.random() * father.length)]}</td>*/}
            {/*      </tr>*/}
            {/*      <tr className='border-b border-gray-400'>*/}
            {/*        <td className="text-left font-normal">Local Guardian:</td>*/}
            {/*        <td className="text-right font-semibold">{locg[Math.floor(Math.random() * locg.length)]}</td>*/}
            {/*      </tr>*/}
            {/*      <tr className='border-b border-gray-400'>*/}
            {/*        <td className="text-left font-normal">Phone:</td>*/}
            {/*        <td className="text-right font-semibold">{phone[Math.floor(Math.random() * phone.length)]}</td>*/}
            {/*      </tr>*/}
            {/*      <tr className='border-b border-gray-400'>*/}
            {/*        <td className="text-left font-normal">E-mail:</td>*/}
            {/*        <td className="text-right font-semibold">{mail[Math.floor(Math.random() * mail.length)]}</td>*/}
            {/*      </tr>*/}
            {/*      <tr className='border-b border-gray-400'>*/}
            {/*        <td className="text-left font-normal">DOB:</td>*/}
            {/*        <td className="text-right font-semibold">{dob[Math.floor(Math.random() * dob.length)]}</td>*/}
            {/*      </tr>*/}
            {/*    </tbody>*/}
            {/*  </table>*/}
            {/*</div>*/}

          </>
        )}
      </CardContent>
    </Card>


  );
};

export default User;
