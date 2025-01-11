import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Unauthorized from '@/components/Unauthorized';
import axios from 'axios';
import authValidator from '@/lib/auth/role-validator';

const invoices = [
  {
    invoice: 'PLACEMENT-POOL MEMBERSHIP - SEM8',
    amountDue: 25000,
    amountPaid: 20050,
    balanceAmt: 0,
  },
  {
    invoice: 'PREVIOUS DUE',
    amountDue: 25000,
    amountPaid: 10050,
    balanceAmt: 0,
  },
  {
    invoice: 'COURSE/TUITION FEE - SEM7',
    amountDue: 50000,
    amountPaid: 30050,
    balanceAmt: 0,
  },
  {
    invoice: 'COURSE/TUITION FEE - SEM8',
    amountDue: 50000,
    amountPaid: 40050,
    balanceAmt: 0,
  },
  {
    invoice: 'BPUT REGISTRATION FEE - SEM7',
    amountDue: 50000,
    amountPaid: 50050,
    balanceAmt: 0,
  },
  {
    invoice: 'BPUT REGISTRATION FEE - SEM8',
    amountDue: 50000,
    amountPaid: 20000,
    balanceAmt: 0,
  },
  {
    invoice: 'ACTIVITY FEE - SEM7',
    amountDue: 50000,
    amountPaid: 30000,
    balanceAmt: 0,
  },
  {
    invoice: 'ACTIVITY FEE - SEM8',
    amountDue: 50000,
    amountPaid: 30000,
    balanceAmt: 0,
  },
  {
    invoice: 'PRE PLACEMENT TRAINING FEE - SEM7',
    amountDue: 50000,
    amountPaid: 20000,
    balanceAmt: 0,
  },
  {
    invoice: 'PRE PLACEMENT TRAINING FEE - SEM8',
    amountDue: 50000,
    amountPaid: 20000,
    balanceAmt: 0,
  },
  {
    invoice: 'INDUSTRY-READY TRAINING FEE - SEM7',
    amountDue: 50000,
    amountPaid: 50050,
    balanceAmt: 0,
  },
  {
    invoice: 'INDUSTRY-READY TRAINING FEE - SEM8',
    amountDue: 50000,
    amountPaid: 50050,
    balanceAmt: 0,
  },
];



async function getDuesDetails(token: string) {
  if (!token) {
    return null;
  } else {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/student-portal/get-dues-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching dues details:', error);
      return null;
    }
  }
}

const page = async () => {
  const session = await authValidator();
  if(session.token === undefined) {
    return <Unauthorized />;
  }
  if (session.role !== 'STUDENT') {
    return <Unauthorized />;
  }
  const { duesDetails } = await getDuesDetails(session.token);
  return (
    <>
      <div className="lg:px-44">
        <Table className=" rounded-xl shadow-lg border-r border-l">
          <TableCaption className={'text-lg font-bold'}>
            Account details for Year - {duesDetails[0]?.dueYear}
          </TableCaption>
          <TableHeader className="text-base font-semibold">
            <TableRow className="bg-blue-200">
              <TableHead className="w-3/5 text-slate-600 font-semibold">
                Description
              </TableHead>
              <TableHead className="w-1/5  text-slate-600 font-semibold">
                Due Amount
              </TableHead>
              <TableHead className="w-1/5  text-slate-600 font-semibold">
                Paid Amount
              </TableHead>
              <TableHead className="w-1/5  text-slate-600 font-semibold">
                Balance Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {duesDetails.map((invoice: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium border-r">
                  {invoice.description}
                </TableCell>
                <TableCell>{invoice?.amountDue.toLocaleString()}</TableCell>
                <TableCell>{invoice?.amountPaid.toLocaleString()}</TableCell>
                <TableCell className="">
                  {invoice?.balanceAmount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-blue-200 font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-base">
                &#8377;
                {duesDetails
                  .reduce(
                    (total: number, duesDetails: any) =>
                      total + duesDetails.amountDue,
                    0,
                  )
                  .toLocaleString()}
              </TableCell>
              <TableCell className="text-base">
                &#8377;
                {duesDetails
                  .reduce(
                    (total: number, duesDetails: any) =>
                      total + duesDetails.amountPaid,
                    0,
                  )
                  .toLocaleString()}
              </TableCell>
              <TableCell className="text-base">
                &#8377;
                {duesDetails
                  .reduce(
                    (total: number, duesDetails: any) =>
                      total + duesDetails.balanceAmount,
                    0,
                  )
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};
export default page;
