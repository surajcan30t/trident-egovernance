'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FeesDetailsSchema } from './fees-details-schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { useParticulars } from '@/app/(app)/(feecollection)/components/FeeDetailsFilterProvider';
const temp = [
    "name",
    "regdNo",
    "regdYear",
    "course",
    "branch",
    "arrearsDue",
    "currentDues",
    "totalDues",
    "arrearsPaid",
    "currentDuesPaid",
    "totalPaid",
    "amountDue",
    "phNo",
    "parentContact"
  ]
  
const semesters = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
];
function ParticularsCell({ value }: { value: string }) {
  const { filterParticulars, loading } = useParticulars();
  if (loading) return <div>Loading...</div>;
  if (!filterParticulars.includes(value)) return null;

  return <div className="flex items-center">{value}</div>;
}
export const columns: ColumnDef<FeesDetailsSchema>[] =[

  {
    accessorKey: 'regdNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('regdNo')}
          </span>
        </div>
      );
    },
  },
	{
    accessorKey: 'name',
    header: () => <div className="">Name</div>,
    cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'regdYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration Year" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('regdYear')}
          </span>
        </div>
      );
    },
    footer: 'Total',
  },
  {
    accessorKey: 'course',
    header: () => <div className="">Course</div>,
    cell: ({ row }) => <div className="">{row.getValue('course')}</div>,
  },
  {
    accessorKey: 'branch',
    header: () => <div className="">Branch</div>,
    cell: ({ row }) => <div className="">{row.getValue('branch')}</div>,
  },
  {
    accessorKey: 'arrearsPaid',
    header: () => <div className="">Arrears Paid</div>,
    cell: ({ row }) => <div className="">{row.getValue('arrearsPaid')}</div>,
  },
  {
    accessorKey: 'arrearsDue',
    header: () => <div className="">Arrears Due</div>,
    cell: ({ row }) => <div className="">{row.getValue('arrearsDue')}</div>,
  },
  {
    accessorKey: 'currentDuesPaid',
    header: () => <div className="">Current Dues Paid</div>,
    cell: ({ row }) => <div className="">{row.getValue('currentDuesPaid')}</div>,
  },
  {
    accessorKey: 'currentDues',
    header: () => <div className="">Current Dues</div>,
    cell: ({ row }) => <div className="">{row.getValue('currentDues')}</div>,
  },
  {
    accessorKey: 'totalPaid',
    header: () => <div className="">Total Paid</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalPaid')}</div>,
  },

  // {
  //   accessorKey: 'sem',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Semester" />
  //   ),
  //   cell: ({ row }) => {
  //     const semester = semesters.find(
  //       (semester) => semester.value === row.getValue('sem'),
  //     );
  //
  //     if (!semester) {
  //       return null;
  //     }
  //
  //     return (
  //       <div className="flex items-center">
  //         <span>{semester.value}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  {
    accessorKey: 'totalDues',
    header: () => <div className="">Total Dues</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalDues')}</div>,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

