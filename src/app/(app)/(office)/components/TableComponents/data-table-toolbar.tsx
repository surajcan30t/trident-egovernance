'use client';

import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { getAllBranches } from '../../serveractions-office/actions';
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
import { ExportCSV } from './export-csv';

const stypes = [
  {
    value: 'LE',
  },
  {
    value: 'REGULAR',
  },
];

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

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children
}: DataTableToolbarProps<TData>) {
  const [branches, setBranches] = useState<{ value: string }[]>([]); // State to hold branch options
  const [globalFilter, setGlobalFilter] = useState('');
  useEffect(() => {
    const fetchBranches = async () => {
      const response = await getAllBranches();
      setBranches(response || []); // Set the branches, or an empty array if undefined
    };

    fetchBranches(); // Fetch branches when the component mounts
  }, []);

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
        {table.getColumn('branchCode') && (
          <DataTableFacetedFilter
            column={table.getColumn('branchCode')}
            title="Branch"
            options={branches}
          />
        )}
        {table.getColumn('course') && (
          <DataTableFacetedFilter
            column={table.getColumn('course')}
            title="Course"
            options={courses}
          />
        )}
        {table.getColumn('studentType') && (
          <DataTableFacetedFilter
            column={table.getColumn('studentType')}
            title="Student Type"
            options={stypes}
          />
        )}
        {table.getColumn('currentYear') && (
          <DataTableFacetedFilter
            column={table.getColumn('currentYear')}
            title="Year"
            options={years}
          />
        )}
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
      {children}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto mx-1 hidden h-8 lg:flex"
          >
            <FileOutput className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[100px]">
          <DropdownMenuLabel>Export as</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ExportCSV table={table} />
        </DropdownMenuContent>
      </DropdownMenu>
      <DataTableViewOptions table={table} />
    </div>
  );
}
