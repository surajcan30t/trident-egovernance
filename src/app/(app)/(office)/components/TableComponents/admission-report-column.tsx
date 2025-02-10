'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { AdmissionReport } from './schema';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

const courses = [
  {
    value: 'BTECH',
  },
  {
    value: 'MTECH',
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

export const columns: ColumnDef<AdmissionReport>[] = [
  {
    accessorKey: 'courses',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      const course = courses.find(
        (course) => course.value === row.getValue('courses'),
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
    footer: 'Total'
  },
  {
    accessorKey: 'branch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      const branch = branches.find(
        (branch) => branch.value === row.getValue('branch'),
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
    accessorKey: 'generalMale',
    header: () => <div className="">General Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('generalMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.generalMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'generalFemale',
    header: () => <div className="">General Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('generalFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.generalFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'OBCMale',
    header: () => <div className="">OBC Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('OBCMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.OBCMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'OBCFemale',
    header: () => <div className="">OBC Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('OBCFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.OBCFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'SCMale',
    header: () => <div className="">SC Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('SCMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.SCMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'SCFemale',
    header: () => <div className="">SC Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('SCFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.SCFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'STMale',
    header: () => <div className="">ST Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('STMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.STMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'STFemale',
    header: () => <div className="">ST Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('STFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.totalFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'minorityMale',
    header: () => <div className="">Minority Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('minorityMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.minorityMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'minorityFemale',
    header: () => <div className="">Minority Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('minorityFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.minorityFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'TFWMale',
    header: () => <div className="">TFW Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('TFWMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.TFWMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'TFWFemale',
    header: () => <div className="">TFW Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('TFWFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.TFWFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalMale',
    header: () => <div className="">Total Male</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalMale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.totalMale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalFemale',
    header: () => <div className="">Total Female</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalFemale')}</div>,
    footer: (props) => {
      const total = props.table
        .getRowModel()
        .rows.reduce((sum, reportData) => sum + reportData.original.totalFemale, 0);
      return (
        <div className="text-right">
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalStudents',
    header: () => <div className="">Total Students</div>,
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
