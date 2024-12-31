'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { FeesDetailsSchema } from './fees-details-schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { useParticulars } from '@/app/(app)/(feecollection)/components/FeeDetailsFilterProvider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// import { useEffect } from 'react';

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

  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: 'mrNo',
    header: () => <div className="">MR No.</div>,
    cell: ({ row }) => <div className="">{row.getValue('mrNo')}</div>,
  },
  {
    accessorKey: 'paymentDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MR Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('paymentDate')}
          </span>
        </div>
      );
    },
    footer: 'Total',
  },
  {
    accessorKey: 'paymentMode',
    header: () => <div className="">Payment Mode</div>,
    cell: ({ row }) => <div className="">{row.getValue('paymentMode')}</div>,
  },
  {
    accessorKey: 'regdNo',
    header: () => <div className="">Registration No</div>,
    cell: ({ row }) => <div className="">{row.getValue('regdNo')}</div>,
  },
  {
    accessorKey: 'sessionId',
    header: () => <div className="">Session Id</div>,
    cell: ({ row }) => <div className="">{row.getValue('sessionId')}</div>,
  },
  {
    accessorKey: 'dueYear',
    header: () => <div className="">Year</div>,
    cell: ({ row }) => <div className="">{row.getValue('dueYear')}</div>,
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
    accessorKey: 'collectedFee',
    header: () => <div className="">Total Amount</div>,
    cell: ({ row }) => <div className="">{row.getValue('collectedFee')}</div>,
    footer: (props) => {
      const totalBalance = props.table
        .getRowModel()
        .rows.reduce(
          (sum, bankAccountRow) => sum + bankAccountRow.original.collectedFee,
          0,
        );
      const roundedTotalBalance = Math.round(totalBalance * 100) / 100;
      return (
        <div className="bg-green-700 text-base text-white text-center font-semibold">
          {roundedTotalBalance}
        </div>
      );
    },
  },
  {
    accessorKey: 'collectionDetails',
    header: () => <div className="">Collection Details</div>,
    cell: ({ row }) => (
      <CollectionDetails mrNo={row.getValue('mrNo')} />
    ),
    // footer: 'details',
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

function CollectionDetails({ mrNo }:{ mrNo:string }) {
  const {data:session} = useSession();
  const token = session?.user.accessToken
  const [collectionDetails, setCollectionDetails] = useState<any>([])
  useEffect(() => {
    const getCollectionDetails = async()=>{
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-mrDetails-mrNo/${mrNo}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          cache: 'no-cache',
        },
      );
      const response = await request.json();
      setCollectionDetails(response);
      console.log('response', response);
    }
    getCollectionDetails()
  }, [mrNo]);
  return(
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <table >
            <thead>
            <tr>
              <th >Sl. No</th>
              <th >Particulars</th>
              <th >Amount</th>
            </tr>
            </thead>
            <tbody>
            {collectionDetails.map((item:any, index:number) => (
              <tr key={index}>
                <td >{item.slNo}</td>
                <td >{item.particulars}</td>
                <td >{item.amount}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  )
}