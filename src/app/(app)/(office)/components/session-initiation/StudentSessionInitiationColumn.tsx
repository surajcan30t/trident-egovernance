'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '../TableComponents/data-table-column-header';


interface SessionWiseStudentData {
  regdNo: string,
  studentName: string
}

export const columns: ColumnDef<SessionWiseStudentData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'regdNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Regsitration Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('regdNo')}</div>,
  },
  {
    accessorKey: 'studentName',
    header: () => <div className="">Name</div>,
    cell: ({ row }) => <div className="">{row.getValue('studentName')}</div>,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
