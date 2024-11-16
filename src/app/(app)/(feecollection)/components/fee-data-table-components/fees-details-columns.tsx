'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { FeesDetailsSchema } from './fees-details-schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { useParticulars } from '@/app/(app)/(feecollection)/components/FeeDetailsFilterProvider';

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

export const columns: ColumnDef<FeesDetailsSchema>[] = [
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
    footer: 'Total'
  },
  {
    accessorKey: 'paymentMode',
    header: () => <div className="">MR No.</div>,
    cell: ({ row }) => <div className="">{row.getValue('paymentMode')}</div>,
  },
  {
    accessorKey: 'paymentMode',
    header: () => <div className="">Payment Mode</div>,
    cell: ({ row }) => <div className="">{row.getValue('paymentMode')}</div>,
  },
  {
    accessorKey: 'particulars',
    header: () => <div className="">Particulars</div>,
    cell: ({ row }) => <ParticularsCell value={row.getValue('particulars')} />,
  },

  {
    accessorKey: 'sem',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
    cell: ({ row }) => {
      const semester = semesters.find(
        (semester) => semester.value === row.getValue('sem'),
      );

      if (!semester) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{semester.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'totalAmount',
    header: () => <div className="">Total Amount</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalAmount')}</div>,
    footer: (props) => {
      const totalBalance = props.table
        .getRowModel()
        .rows.reduce((sum, bankAccountRow) => sum + bankAccountRow.original.totalAmount, 0);
      const roundedTotalBalance = Math.round(totalBalance * 100) / 100;
      return (
        <div className="bg-green-700 text-base text-white text-center font-semibold">
          {roundedTotalBalance}
        </div>
      );
    },
  },{
    accessorKey: 'collectionDetails',
    header: () => <div className="">Collection Details</div>,
    cell: ({ row }) => <div className="">{row.getValue('collectionDetails')}</div>,
    footer: 'details',

  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },

]