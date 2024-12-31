'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { SessionwiseReport } from './schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

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
    value: 'CSDS',
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

export const columns: ColumnDef<SessionwiseReport>[] = [
  {
    accessorKey: 'sessionId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center">
          <span>{row.getValue('sessionId')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    accessorKey: 'branch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue('branch')}</span>
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
    accessorKey: 'courseYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Year" />
    ),
    cell: ({ row }) => {
      const year = years.find(
        (year) => year.value === row.getValue('courseYear'),
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
  },
  {
    accessorKey: 'noOfMales',
    header: () => <div className="">Total Males</div>,
    cell: ({ row }) => <div className="">{row.getValue('noOfMales')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.noOfMales, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'noOfFemales',
    header: () => <div className="">Total Females</div>,
    cell: ({ row }) => <div className="">{row.getValue('noOfFemales')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.noOfFemales, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalStudents',
    header: () => <div className="">Total Admissions</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalStudents')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.totalStudents, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
