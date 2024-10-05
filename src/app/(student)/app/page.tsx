import StudentAttendance from '@/components/StudentAttendance'
import User from '@/components/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Unauthorized from '@/components/Unauthorized'

interface User {
  name: string
  email: string
  image: string
  userType: { jobTitle: string }
}
const page = async () => {
  const userRole = await getServerSession(authOptions) as { user: User }
  // console.log('Userrole in student page -- \n', userRole)
  if (userRole?.user?.userType?.jobTitle !== 'job_student') {
    return <Unauthorized />
  }
  return (
    <div className='m-0 p-2 flex flex-row gap-4 justify-end'>
      <div>
        <StudentAttendance />
      </div>
      <div className=''>
        <User />
      </div>
    </div>

  )
}

export default page