"use client"

import * as React from "react"
import type { DataTableFilterField, ExtendedSortingState } from "@/../../types/types"
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type TableState,
  type Updater,
  type VisibilityState,
} from "@tanstack/react-table"
import { getSortingStateParser } from "@/lib/parsers"
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
  type Parser,
  type UseQueryStateOptions,
} from "nuqs"
import { startTransition } from "react"

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | "state"
      | "pageCount"
      | "getCoreRowModel"
      | "manualFiltering"
      | "manualPagination"
      | "manualSorting"
    >,
    Required<Pick<TableOptions<TData>, "pageCount">> {
  /**
   * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
   * - Faceted filters are rendered when `options` are provided for a filter field.
   * - Otherwise, search filters are rendered.
   *
   * The indie filter field `value` represents the corresponding column name in the database table.
   * @default []
   * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
   * @example
   * ```ts
   * // Render a search filter
   * const filterFields = [
   *   { label: "Title", value: "title", placeholder: "Search titles" }
   * ];
   * // Render a faceted filter
   * const filterFields = [
   *   {
   *     label: "Status",
   *     value: "status",
   *     options: [
   *       { label: "Todo", value: "todo" },
   *       { label: "In Progress", value: "in-progress" },
   *     ]
   *   }
   * ];
   * ```
   */
  filterFields?: DataTableFilterField<TData>[]

  /**
   * Indicates whether the page should scroll to the top when the URL changes.
   * @default false
   */
  scroll?: boolean

  onFilterChange?: (filters: { id: string; value: string | string[] }[]) => void
  initialState?: Omit<Partial<TableState>, "sorting"> & {
    sorting?: ExtendedSortingState<TData>
  }
}

export function useDataTable<TData>({
  pageCount = -1,
  filterFields = [],
  scroll = false,
  // history = undefined,
  onFilterChange,
  initialState,
  ...props
}: UseDataTableProps<TData>) {

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, "parse">
  >(() => {
    return {
      // history,
      scroll,
      startTransition,
    }
  }, [
    // history,
    scroll,
    startTransition,
  ])
  
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {})

  const [page, setPage] = React.useState<number>(1)
  const [perPage, setPerPage] = React.useState<number>(
    initialState?.pagination?.pageSize ?? props.data.length
  )

  const [sorting, setSorting] = useQueryState(
    "sort",
    getSortingStateParser<TData>()
      .withOptions(queryStateOptions)
      .withDefault(initialState?.sorting ?? [])
  )


  const [filterValues, setFilterValues] = React.useState<Record<string, string | string[]>>({})

  const pagination: PaginationState = {
    pageIndex: page - 1,
    pageSize: perPage,
  }

  

  function onSortingChange(updaterOrValue: Updater<SortingState>) {
    if (typeof updaterOrValue === "function") {
      const newSorting = updaterOrValue(sorting) as ExtendedSortingState<TData>
      void setSorting(newSorting)
    }
  }

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          filters.push({
            id: key,
            value: Array.isArray(value) ? value : [value],
          })
        }
        return filters
      },
      []
    )
  }, [filterValues])

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters)

  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    }
  }, [filterFields])

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue

        const filterUpdates = next.reduce<
          Record<string, string | string[] | null>
        >((acc, filter) => {
          if (searchableColumns.find((col) => col.id === filter.id)) {
            acc[filter.id] = filter.value as string
          } else if (filterableColumns.find((col) => col.id === filter.id)) {
            acc[filter.id] = filter.value as string[]
          }
          return acc
        }, {})

        prev.forEach((prevFilter) => {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null
          }
        })
        if (onFilterChange) {
          onFilterChange(next.map(filter => {
            const value = filterableColumns.find(col => col.id === filter.id)
              ? filter.value as string[]
              : filter.value as string;
            return {
              id: filter.id,
              value
            };
          }));
        }

        setPage(1)
        return next
      })
    },
    [filterableColumns, searchableColumns, onFilterChange]
  )

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
      const newPagination = updaterOrValue(pagination)
      setPage(newPagination.pageIndex + 1)
      setPerPage(newPagination.pageSize)
    } else {
      setPage(updaterOrValue.pageIndex + 1)
      setPerPage(updaterOrValue.pageSize)
    }
  }

  const table = useReactTable({
    ...props,
    initialState,
    pageCount: Math.ceil(props.data.length / perPage),
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters: columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableColumnFilters: true,
    enableSorting: true,
  })

  return { table }
}