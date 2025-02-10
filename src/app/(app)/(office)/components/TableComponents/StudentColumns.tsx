'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { Students } from './schema';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

const courses = [
  {
    value: 'B.TECH.',
  },
  {
    value: 'M.TECH.',
  },
  {
    value: 'BCA',
  },
  {
    value: 'MCA',
  },
];

const stypes = [
  {
    value: 'LE',
  },
  {
    value: 'REGULAR',
  },
];

const branches = [
  {
    value: 'CSE',
  },
  {
    value: 'CST',
  },
  {
    value: 'CSAIML',
  },
  {
    value: 'MECH',
  },
];

const years = [
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

export const columns: ColumnDef<Students>[] = [
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
    accessorKey: 'regdNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Regd No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('regdNo')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'studentName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('studentName')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      const course = courses.find(
        (course) => course.value === row.getValue('course'),
      );

      if (!course) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{course.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'branchCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      const branch = branches.find(
        (branch) => branch.value === row.getValue('branchCode'),
      );

      if (!branch) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{branch.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'currentYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => {
      const year = years.find(
        (year) => year.value === row.getValue('currentYear'),
      );

      if (!year) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{year.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'studentType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Type" />
    ),
    cell: ({ row }) => {
      const type = stypes.find(
        (type) => type.value === row.getValue('studentType'),
      );

      if (!type) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{type.value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'email',
    header: () => <div className="">Email</div>,
    cell: ({ row }) => <div className="">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phNo',
    header: () => <div className="">Contact No.</div>,
    cell: ({ row }) => <div className="">{row.getValue('phNo')}</div>,
  },
  {
    accessorKey: 'parentContact',
    header: () => <div className="">Parent Contact No.</div>,
    cell: ({ row }) => <div className="">{row.getValue('parentContact')}</div>,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
