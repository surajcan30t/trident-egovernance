import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Unauthorized from '@/components/Unauthorized';
import Image from 'next/image';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import {
  MdClass, MdDirectionsBus,
  MdHome,
  MdLocalHotel,
  MdOutlineDateRange,
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
} from 'react-icons/md';
import { IoIdCardOutline } from "react-icons/io5";
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { IoMdFlask } from 'react-icons/io';
import { SlUser, SlUserFemale } from 'react-icons/sl';
import ProfilePicture from '../../components/ProfilePicture';

interface User {
  name: string;
  email: string;
  image: string;
  accessToken: string;
  userType: any;
}

async function authValidator() {
  const session = (await getServerSession(authOptions)) as { user: User };
  if (!session || !session.user) {
    return { role: null, token: null };
  } else {
    const userRole = session?.user?.userType?.userJobInformationDto?.jobTitle;
    const user = session?.user?.userType;
    const token = session?.user?.accessToken;
    return { role: userRole, user: user, token: token };
  }
}

const page = async () => {
  const session = await authValidator();
  if (session.role !== 'STUDENT') {
    return <Unauthorized />;
  }
  const basicInformation = {
    name: session.user.userJobInformationDto.displayName,
    type: session.user.userJobInformationDto.jobTitle
      .toLocaleString()
      .toLocaleLowerCase(),
    department: session.user.userJobInformationDto.department,
    id: session.user.userJobInformationDto.employeeId,
  };
  const personalInformation = {
    presentAddress: session.user.studentPersonalInformation.presentAddress,
    phoneNo: session.user.studentPersonalInformation.phoneNo,
    email: session.user.studentPersonalInformation.email,
    dob: session.user.studentPersonalInformation.dob,
  };
  const parentsInformation = {
    motherName: session.user.parentsPersonalInformation.motherName,
    fatherName: session.user.parentsPersonalInformation.fatherName,
    localGuardianName: session.user.parentsPersonalInformation.localGuardianName,
    permanentAddress: session.user.parentsPersonalInformation.permanentAddress,
    phone: session.user.parentsPersonalInformation.phone,
    email: session.user.parentsPersonalInformation.email,
  }
  const collegeInformation = {
    rollNo: session.user.collegeInformation.rollNo,
    year: session.user.collegeInformation.year,
    semester: session.user.collegeInformation.semester,
    labGroup: session.user.collegeInformation.labGroup,
    section: session.user.collegeInformation.section,
    course: session.user.collegeInformation.course,
    hostelAvailed: session.user.collegeInformation.hostelAvailed,
    transportAvailed: session.user.collegeInformation.transportAvailed,
  }
  return (
    <>
      <div
        className={
          'flex flex-col md:flex-row justify-center items-center md:items-start w-full h-full ' +
          ' p-2 gap-1'
        }
      >
        <div className={'h-full w-fit flex flex-col '}>
          <div
            className={
              'h-44 w-44 md:h-80 md:w-80 border relative overflow-hidden rounded-2xl'
            }
          >
            <ProfilePicture />
          </div>
          <div className={'mt-5'}>
            <h6 className="text-2xl font-bold text-gray-800 text-center">
              {basicInformation.name}
            </h6>
            <h3 className="text-lg font-bold text-gray-600 text-center capitalize">
              {basicInformation.type}
            </h3>
            <h3 className="text-lg font-bold text-gray-600 text-center">
              {basicInformation.department}
            </h3>
            <h3 className="text-lg font-bold text-gray-600 text-center">
              {basicInformation.id}
            </h3>
          </div>
        </div>
        <div className={'h-full w-full flex flex-col gap-2 p-2'}>
          {/*College Information*/}
          <div className="w-full h-full">
            <Table className={'hover:bg-white'}>
              <TableHeader className="text-base font-semibold hover:bg-white">
                <TableRow className="bg-blue-200 hover:bg-blue-200">
                  <TableHead
                    colSpan={2}
                    className=" text-slate-600 font-semibold"
                  >
                    College Information
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={'border-0 hover:bg-white text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <IoIdCardOutline className="mr-3" />
                      Roll number
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.rollNo}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdOutlineDateRange className="mr-3" />
                      Year
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.year}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdClass className="mr-3" />
                      Semester
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.semester}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <IoMdFlask className="mr-3" />
                      Lab Group
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.labGroup}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <FaChalkboardTeacher className="mr-3" />
                      Section
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.section}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <FaGraduationCap className="mr-3" />
                      Course
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.course}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdLocalHotel className="mr-3" />
                      Hostel Facility Availing
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.hostelAvailed}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdDirectionsBus className="mr-3" />
                      Transport Facility Availing
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{collegeInformation.transportAvailed}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/*Personal Information*/}
          <div className="w-full h-full">
            <Table className={'hover:bg-white'}>
              <TableHeader className="text-base font-semibold hover:bg-white">
                <TableRow className="bg-blue-200 hover:bg-blue-200">
                  <TableHead
                    colSpan={2}
                    className=" text-slate-600 font-semibold"
                  >
                    Personal Information
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={'border-0 hover:bg-white text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdOutlinePhoneEnabled className="mr-3" />
                      Phone number
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{personalInformation.phoneNo}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdOutlineEmail className="mr-3" />
                      Email
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{personalInformation.email}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdHome className="mr-3" />
                      Present Address
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{personalInformation.presentAddress}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdOutlineDateRange className="mr-3" />
                      Date of Birth
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{personalInformation.dob}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/*Parent Information*/}
          <div className={'w-full h-full'}>
            <Table className={'hover:bg-white'}>
              <TableHeader className="text-base font-semibold hover:bg-white">
                <TableRow className="bg-blue-200 hover:bg-blue-200">
                  <TableHead
                    colSpan={2}
                    className=" text-slate-600 font-semibold"
                  >
                    Parent&apos; s Information
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={'border-0 hover:bg-white text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <SlUser className="mr-3" />
                      Father&apos;s Name
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{parentsInformation.fatherName}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <SlUserFemale className="mr-3" />
                      Mother&apos;s Name
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{parentsInformation.motherName}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <SlUser className="mr-3" />
                      Local Guardian
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{parentsInformation.localGuardianName}</TableCell>
                </TableRow>
                <TableRow className={'border-0 hover:bg-white  text-base'}>
                  <TableCell>
                    <div className={'flex items-center p-1'}>
                      <MdHome className="mr-3" />
                      Permanent Address
                    </div>
                  </TableCell>
                  <TableCell className='text-end'>{parentsInformation.permanentAddress}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className={'w-full h-full'}></div>
        </div>
      </div>
    </>
  );
};

export default page;
