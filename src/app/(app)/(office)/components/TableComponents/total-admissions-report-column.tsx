'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { TotalAdmissionsReport } from './schema';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { courses } from '@/lib/filtervalues';
import { parseCourse } from '@/lib/course-parser';


const parsedCourse = courses.map((course) => ({
  value: parseCourse(course.value),
}))

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

console.log(branches)

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

export const columns: ColumnDef<TotalAdmissionsReport>[] = [
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
  //
  {
    accessorKey: 'admissionYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Admission Year" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('admissionYear')}
          </span>
        </div>
      );
    },
    footer: 'Total'
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      const course = parsedCourse.find(
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
      const branch = branches.find(
        (branch: any) => branch.value === row.getValue('branch'),
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
    accessorKey: 'totalAdmissions',
    header: () => <div className="">Total Students</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalAdmissions')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.totalAdmissions, 0);
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
