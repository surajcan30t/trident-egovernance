import StudentAttendance from '@/app/(app)/(student)/components/StudentAttendance';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import DuesDetailsChart from '@/app/(app)/(student)/components/DuesDetailsChart';
import CareerChart from '@/app/(app)/(student)/components/CareerChart';
import SemesterResultGraph from '@/app/(app)/(student)/components/SemesterResultGraph';
import Unauthorized from '@/components/Unauthorized';
import DetailedSemesterResultsModal from '../../components/DetailedSemesterResultsModal';

interface User {
  name: string;
  email: string;
  image: string;
  userType: { userJobInformationDto: { jobTitle: string } };
}
async function authValidator() {
  const userRoles = (await getServerSession(authOptions)) as { user: User };
  const userRole = userRoles?.user?.userType?.userJobInformationDto?.jobTitle;
}

const page = async () => {
  const userRole = (await getServerSession(authOptions)) as { user: User };
  if (userRole?.user?.userType?.userJobInformationDto?.jobTitle !== 'STUDENT') {
    return <Unauthorized />;
  }
  return (
    <div className="m-0 w-full flex flex-col justify-center items-center">
      <div className="w-full p-0 flex flex-col md:flex-row justify-center gap-2">
        <StudentAttendance />
        <DuesDetailsChart />
      </div>
      {/* Career Details */}
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center mt-2 md:px-10 lg:px-32">
        <SemesterResultGraph />
        <CareerChart />
      </div>
    </div>
  );
};

export default page;
