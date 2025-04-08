import React from 'react';
import StudentDuesDetailsTable from '../../components/student-dues-table';
import authValidator from '@/lib/auth/role-validator';
import Unauthorized from '@/components/Unauthorized';
import { StudentDuesDetails } from '../../feecollection-schemas/schema';
import { SetDueStatusFilterSearchParam } from '../../components/SetDueStatusFilterSearchParam';

interface Query {
  regdYr: string | null;
  course: string | null;
  branch: string | null;
}

const getStudentDuesDetails = async (token: string, query: Query) => {
  const { regdYr, course, branch } = query;

  if (token) {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-due-status-report?${regdYr ? `regdYear=${parseInt(regdYr!)}` : ''}${course ? `&course=${course}` : ''}${branch ? `&branch=${branch}` : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = (await request.json()) as StudentDuesDetails[];
      return response;
    } catch (error) {}
  }
};

const page = async (props: any) => {
  const { searchParams } = props;

  const query: Query = {
    regdYr: searchParams?.regdYr === 'undefined' ? '' : searchParams?.regdYr,
    course: searchParams?.course === 'undefined' ? '' : searchParams?.course,
    branch: searchParams?.branch === 'undefined' ? '' : searchParams?.branch,
  };

  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }

  if (role !== 'ACCOUNTS') {
    return <Unauthorized />;
  }

  const response = await getStudentDuesDetails(token, query);
  return (
    <>
      <main className="flex flex-col items-center border rounded p-1">
        <div className="w-full flex">
          <h1 className="text-2xl text-left font-bold text-slate-800">
            Due Status Report
          </h1>
        </div>
        <div className="flex justify-end gap-2 m-2 bg-blue-100 rounded-md p-2">
          <SetDueStatusFilterSearchParam />
        </div>
        <div className="flex flex-row justify-center w-[calc(100vw-20vw)] border-8">
          {response ? (
            // <div className="w-[calc(100vw-20vw)]">
              <StudentDuesDetailsTable data={response} />
            // </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </main>
    </>
  );
};

export default page;

/**
  [
  {
    regdNo: 'REGD9876',
    regdYear: 1,
    name: 'TEST STUDENT 4',
    course: 'B.TECH.',
    branch: 'CSAIML',
    arrearsDue: 0,
    currentDues: 214500,
    totalDues: 214500,
    arrearsPaid: 0,
    currentDuesPaid: 20000,
    totalPaid: 20000,
    amountDue: 182500,
    phNo: '7888894444',
    parentContact: '9887758879'
  },
  {
    regdNo: 'REGD50505050',
    regdYear: 1,
    name: 'Bulk Student50',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 183500,
    totalDues: 183500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 35255.44,
    phNo: '9876543927',
    parentContact: '8765489369'
  },
  {
    regdNo: 'REGD5555',
    regdYear: 1,
    name: 'Bulk Student5',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 203500,
    totalDues: 203500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 203500,
    phNo: '9876559369',
    parentContact: '8765460068'
  },
  {
    regdNo: 'REGD32323232',
    regdYear: 1,
    name: 'Bulk Student32',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 283500,
    phNo: '9876592881',
    parentContact: '8765420302'
  },
  {
    regdNo: 'REGD39393939',
    regdYear: 1,
    name: 'Bulk Student39',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 203500,
    totalDues: 203500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 203500,
    phNo: '9876523496',
    parentContact: '8765491399'
  },
  {
    regdNo: 'REGD49494949',
    regdYear: 1,
    name: 'Bulk Student49',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 283500,
    phNo: '9876538386',
    parentContact: '8765433916'
  },
  {
    regdNo: 'XYZ1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 114500,
    totalDues: 114500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 114500,
    phNo: '9876560991',
    parentContact: '8765449155'
  },
  {
    regdNo: 'VWXYZ1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 94500,
    totalDues: 94500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 94500,
    phNo: '9876587536',
    parentContact: '8765499631'
  },
  {
    regdNo: 'REGD11111111',
    regdYear: 1,
    name: 'Bulk Student11',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876584351',
    parentContact: '8765481448'
  },
  {
    regdNo: 'REGD37373737',
    regdYear: 1,
    name: 'Bulk Student37',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 283500,
    phNo: '9876522066',
    parentContact: '8765463052'
  },
  {
    regdNo: 'REGD46464646',
    regdYear: 1,
    name: 'Bulk Student46',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 283500,
    phNo: '9876525267',
    parentContact: '8765445227'
  },
  {
    regdNo: '2101289372',
    regdYear: 1,
    name: 'Sweety Dash',
    course: 'B.TECH.',
    branch: 'CSAIML',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 14405,
    totalPaid: 14405,
    amountDue: 229390,
    phNo: '9422435889',
    parentContact: '9422435745'
  },
  {
    regdNo: 'REGD7777',
    regdYear: 1,
    name: 'Bulk Student7',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 214500,
    totalDues: 214500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 214500,
    phNo: '9876560159',
    parentContact: '8765436405'
  },
  {
    regdNo: 'REGD13131313',
    regdYear: 1,
    name: 'Bulk Student13',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 203500,
    totalDues: 203500,
    arrearsPaid: 0,
    currentDuesPaid: 50000,
    totalPaid: 50000,
    amountDue: 153500,
    phNo: '9876534953',
    parentContact: '8765431690'
  },
  {
    regdNo: 'REGD22222222',
    regdYear: 1,
    name: 'Bulk Student22',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 114500,
    totalDues: 114500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 109500,
    phNo: '9876520806',
    parentContact: '8765490625'
  },
  {
    regdNo: 'REGD33333333',
    regdYear: 1,
    name: 'Bulk Student33',
    course: 'B.TECH.',
    branch: 'MECH',
    arrearsDue: 0,
    currentDues: 228500,
    totalDues: 228500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 228500,
    phNo: '9876535526',
    parentContact: '8765429351'
  },
  {
    regdNo: 'REGD34343434',
    regdYear: 1,
    name: 'Bulk Student34',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876564779',
    parentContact: '8765426658'
  },
  {
    regdNo: 'REGD43434343',
    regdYear: 1,
    name: 'Bulk Student43',
    course: 'B.TECH.',
    branch: 'CSDS',
    arrearsDue: 0,
    currentDues: 94500,
    totalDues: 94500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 94500,
    phNo: '9876591886',
    parentContact: '8765432670'
  },
  {
    regdNo: 'REGD48484848',
    regdYear: 1,
    name: 'Bulk Student48',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 183500,
    totalDues: 183500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 183500,
    phNo: '9876588636',
    parentContact: '8765492885'
  },
  {
    regdNo: 'REGD25252525',
    regdYear: 1,
    name: 'Bulk Student25',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876578355',
    parentContact: '8765415854'
  },
  {
    regdNo: 'REGD30303030',
    regdYear: 1,
    name: 'Bulk Student30',
    course: 'B.TECH.',
    branch: 'MECH',
    arrearsDue: 0,
    currentDues: 168500,
    totalDues: 168500,
    arrearsPaid: 0,
    currentDuesPaid: 99000,
    totalPaid: 99000,
    amountDue: 69500,
    phNo: '9876558568',
    parentContact: '8765493685'
  },
  {
    regdNo: 'REGD31313131',
    regdYear: 1,
    name: 'Bulk Student31',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 303500,
    totalDues: 303500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 303500,
    phNo: '9876585181',
    parentContact: '8765481745'
  },
  {
    regdNo: 'REGD35353535',
    regdYear: 1,
    name: 'Bulk Student35',
    course: 'B.TECH.',
    branch: 'CSDS',
    arrearsDue: 0,
    currentDues: 203500,
    totalDues: 203500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 203500,
    phNo: '9876552245',
    parentContact: '8765463387'
  },
  {
    regdNo: 'REGD42424242',
    regdYear: 1,
    name: 'Bulk Student42',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 94500,
    totalDues: 94500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 94500,
    phNo: '9876578139',
    parentContact: '8765483779'
  },
  {
    regdNo: 'REGD2222',
    regdYear: 1,
    name: 'Bulk Student2',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 283500,
    phNo: '9876522747',
    parentContact: '8765484592'
  },
  {
    regdNo: 'REGD9999',
    regdYear: 1,
    name: 'Bulk Student9',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 114500,
    totalDues: 114500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 114500,
    phNo: '9876550957',
    parentContact: '8765485299'
  },
  {
    regdNo: 'REGD28282828',
    regdYear: 1,
    name: 'Bulk Student28',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 183500,
    totalDues: 183500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 183500,
    phNo: '9876571287',
    parentContact: '8765416225'
  },
  {
    regdNo: 'REGD44444444',
    regdYear: 1,
    name: 'Bulk Student44',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 114500,
    totalDues: 114500,
    arrearsPaid: 0,
    currentDuesPaid: 54000,
    totalPaid: 54000,
    amountDue: 60500,
    phNo: '9876512420',
    parentContact: '8765447311'
  },
  {
    regdNo: 'WXYZ1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 214500,
    totalDues: 214500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 214500,
    phNo: '9876560049',
    parentContact: '8765423792'
  },
  {
    regdNo: 'REGD9878',
    regdYear: 1,
    name: 'TEST STUDENT 5',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 183500,
    totalDues: 183500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 183500,
    phNo: '1234567834',
    parentContact: '1278567834'
  },
  {
    regdNo: 'REGD12121212',
    regdYear: 1,
    name: 'Bulk Student12',
    course: 'B.TECH.',
    branch: 'MECH',
    arrearsDue: 0,
    currentDues: 148500,
    totalDues: 148500,
    arrearsPaid: 0,
    currentDuesPaid: 1500,
    totalPaid: 1500,
    amountDue: 147000,
    phNo: '9876557487',
    parentContact: '8765484955'
  },
  {
    regdNo: 'REGD16161616',
    regdYear: 1,
    name: 'Bulk Student16',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 183500,
    totalDues: 183500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 183500,
    phNo: '9876575993',
    parentContact: '8765414514'
  },
  {
    regdNo: 'REGD29292929',
    regdYear: 1,
    name: 'Bulk Student29',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 50000,
    totalPaid: 50000,
    amountDue: 144500,
    phNo: '9876571778',
    parentContact: '8765486241'
  },
  {
    regdNo: 'YZ1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'MECH',
    arrearsDue: 0,
    currentDues: 248500,
    totalDues: 248500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 248500,
    phNo: '9876541063',
    parentContact: '8765417777'
  },
  {
    regdNo: 'YZX1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 214500,
    totalDues: 214500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 214500,
    phNo: '9876511265',
    parentContact: '8765499296'
  },
  {
    regdNo: 'ABCD1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 114500,
    totalDues: 114500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 114500,
    phNo: '9876550006',
    parentContact: '8765493406'
  },
  {
    regdNo: 'REGD17171717',
    regdYear: 1,
    name: 'Bulk Student17',
    course: 'B.TECH.',
    branch: 'CSDS',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 283500,
    phNo: '9876523162',
    parentContact: '8765465347'
  },
  {
    regdNo: 'REGD36363636',
    regdYear: 1,
    name: 'Bulk Student36',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 94500,
    totalDues: 94500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 94500,
    phNo: '9876532096',
    parentContact: '8765485535'
  },
  {
    regdNo: 'REGD40404040',
    regdYear: 1,
    name: 'Bulk Student40',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 214500,
    totalDues: 214500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 214500,
    phNo: '9876544903',
    parentContact: '8765495034'
  },
  {
    regdNo: 'REGD45454545',
    regdYear: 1,
    name: 'Bulk Student45',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876516959',
    parentContact: '8765462722'
  },
  {
    regdNo: 'UVWXYZ1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876526375',
    parentContact: '8765449834'
  },
  {
    regdNo: 'REGD9877',
    regdYear: 2,
    name: 'TEST STUDENT 5',
    course: 'B.TECH.',
    branch: 'CSAIML',
    arrearsDue: 0,
    currentDues: 102500,
    totalDues: 102500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 102500,
    phNo: '7888894477',
    parentContact: '7487758812'
  },
  {
    regdNo: 'REGD20202020',
    regdYear: 1,
    name: 'Bulk Student20',
    course: 'B.TECH.',
    branch: 'CST',
    arrearsDue: 0,
    currentDues: 283500,
    totalDues: 283500,
    arrearsPaid: 0,
    currentDuesPaid: 76500,
    totalPaid: 76500,
    amountDue: 207000,
    phNo: '9876543515',
    parentContact: '8765453162'
  },
  {
    regdNo: 'REGD6666',
    regdYear: 1,
    name: 'Bulk Student6',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876554743',
    parentContact: '8765470158'
  },
  {
    regdNo: 'REGD8888',
    regdYear: 1,
    name: 'Bulk Student8',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 114500,
    totalDues: 114500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 114500,
    phNo: '9876581757',
    parentContact: '8765443568'
  },
  {
    regdNo: 'REGD14141414',
    regdYear: 1,
    name: 'Bulk Student14',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876543876',
    parentContact: '8765473623'
  },
  {
    regdNo: 'REGD18181818',
    regdYear: 1,
    name: 'Bulk Student18',
    course: 'B.TECH.',
    branch: 'MECH',
    arrearsDue: 0,
    currentDues: 248500,
    totalDues: 248500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 248500,
    phNo: '9876555872',
    parentContact: '8765496589'
  },
  {
    regdNo: 'REGD19191919',
    regdYear: 1,
    name: 'Bulk Student19',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 214500,
    totalDues: 214500,
    arrearsPaid: 0,
    currentDuesPaid: 93000,
    totalPaid: 93000,
    amountDue: 121500,
    phNo: '9876585076',
    parentContact: '8765445075'
  },
  {
    regdNo: 'YZXa1111',
    regdYear: 1,
    name: 'Bulky Students1',
    course: 'B.TECH.',
    branch: 'CSE',
    arrearsDue: 0,
    currentDues: 194500,
    totalDues: 194500,
    arrearsPaid: 0,
    currentDuesPaid: 0,
    totalPaid: 0,
    amountDue: 194500,
    phNo: '9876586426',
    parentContact: '8765487962'
  }
]
 */
