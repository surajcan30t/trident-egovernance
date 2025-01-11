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

const modes = [
  {
    value: 'CASH',
  },
  {
    value: 'UPI',
  },
]

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MR No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('mrNo')}
          </span>
        </div>
      );
    },
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Mode" />
    ),
    cell: ({ row }) => {
      const filteredMode = modes.find(
        (mode) => mode.value === row.getValue('paymentMode'),
      );

      if (!filteredMode) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{filteredMode.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    const getCollectionDetails = async () => {
      try {
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

        if (!request.ok) {
          throw new Error(`HTTP error! status: ${request.status}`);
        }

        const text = await request.text();
        if (!text) {
          setCollectionDetails([]);
          return;
        }

        const response = JSON.parse(text);
        setCollectionDetails(response);
        console.log('response', response);
      } catch (error) {
        console.error('Error fetching collection details:', error);
        setCollectionDetails([]);
      }
    };

    if (token && mrNo) {
      getCollectionDetails();
    }
  }, [mrNo, token]);
  return(
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40vw]">
          <table >
            <thead>
            <tr className="bg-slate-200 border">
              <th >Sl. No</th>
              <th >Particulars</th>
              <th >Amount</th>
            </tr>
            </thead>
            <tbody>
            {[...collectionDetails].sort((a, b) => a.slNo - b.slNo).map((item:any, index:number) => (
              <tr key={index}>
                <td className="border">{item.slNo}</td>
                <td className="border">{item.particulars}</td>
                <td className="border">{item.amount}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  )
}