'use client';

import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { useState, useEffect } from 'react';
import { PiExport } from 'react-icons/pi';
import { FileOutput } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useParticulars } from '@/app/(app)/(accounts)/components/FeeDetailsFilterProvider';
// import { ExportCSV } from './export-csv';


const paymentmode = [
  {
    value: 'CASH',
  },
  {
    value: 'DBC',
  },
  {
    value: 'CBC',
  },
  {
    value: 'UPI',
  },
];

const sem = [
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
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const [branches, setBranches] = useState<{ value: string }[]>([]); // State to hold branch options
  const { filterParticulars, loading } = useParticulars();
  const particulars = filterParticulars.map((item) => ({ value: item }))
  const [globalFilter, setGlobalFilter] = useState('');
  // useEffect(() => {
  //   const fetchBranches = async () => {
  //     const response = await getAllBranches();
  //     setBranches(response || []); // Set the branches, or an empty array if undefined
  //   };
  //
  //   fetchBranches(); // Fetch branches when the component mounts
  // }, []);

  const isFiltered = table.getState().columnFilters.length > 0;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setGlobalFilter(filterValue); // Set the global filter value
    table.setGlobalFilter(filterValue); // Set the table's global filter
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Student"
          value={globalFilter}
          onChange={handleFilterChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('sem') && (
          <DataTableFacetedFilter
            column={table.getColumn('sem')}
            title="Semester"
            options={sem}
          />
        )}
        {table.getColumn('paymentMode') && (
          <DataTableFacetedFilter
            column={table.getColumn('paymentMode')}
            title="Payment Mode"
            options={paymentmode}
          />
        )}
        {table.getColumn('particulars') && (
          <DataTableFacetedFilter
            column={table.getColumn('particulars')}
            title="Particulars"
            options={particulars}
          />
        )}
        {/*{table.getColumn('expenses') && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn('expenses')}*/}
        {/*    title="Expenses"*/}
        {/*    options={expenses}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{table.getColumn('profit') && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn('profit')}*/}
        {/*    title="Student Type"*/}
        {/*    options={profit}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{table.getColumn('currentYear') && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn('currentYear')}*/}
        {/*    title="Year"*/}
        {/*    options={years}*/}
        {/*  />*/}
        {/*)}*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/*<DropdownMenu>*/}
      {/*  <DropdownMenuTrigger asChild>*/}
      {/*    <Button*/}
      {/*      variant="outline"*/}
      {/*      size="sm"*/}
      {/*      className="ml-auto mx-1 hidden h-8 lg:flex"*/}
      {/*    >*/}
      {/*      <FileOutput className="mr-2 h-4 w-4" />*/}
      {/*      Export*/}
      {/*    </Button>*/}
      {/*  </DropdownMenuTrigger>*/}
      {/*  <DropdownMenuContent align="center" className="w-[100px]">*/}
      {/*    <DropdownMenuLabel>Export as</DropdownMenuLabel>*/}
      {/*    <DropdownMenuSeparator />*/}
      {/*    <ExportCSV table={table} />*/}
      {/*  </DropdownMenuContent>*/}
      {/*</DropdownMenu>*/}
      <DataTableViewOptions table={table} />
    </div>
  );
}