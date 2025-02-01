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

interface AttendanceSummary {
  subAbbr: string;
  totalClasses: number;
  totalAttended: number;
  attendancePercentage: number;
}

export default function AttendanceDetailsModal({ data }: { data: AttendanceSummary[] }) {
  return (
    <>
      <Table className=" rounded-xl shadow-lg border-r border-l">
        <TableCaption className={'text-lg font-bold'}>
          {/*Account details for Year - {duesDetails[0]?.dueYear}*/}
        </TableCaption>
        <TableHeader className="text-base font-semibold">
          <TableRow className="bg-blue-200">
            <TableHead className="w-3/5 text-slate-600 font-semibold">
              Subject Code
            </TableHead>
            <TableHead className="w-1/5  text-slate-600 font-semibold">
              Total Classes
            </TableHead>
            <TableHead className="w-1/5  text-slate-600 font-semibold">
              Classes Attended
            </TableHead>
            <TableHead className="w-1/5  text-slate-600 font-semibold">
              Percentage
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium border-r">
                {invoice.subject}
              </TableCell>
              <TableCell>{invoice?.totalClasses}</TableCell>
              <TableCell>{invoice?.classAttended}</TableCell>
              <TableCell className="">
                {parseFloat(invoice?.attendance).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}