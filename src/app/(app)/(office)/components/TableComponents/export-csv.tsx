import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import { PiFileCsv } from 'react-icons/pi';

interface ExportCSVProps<TData> {
  table: Table<TData>;
}

export function ExportCSV<TData>({ table }: ExportCSVProps<TData>) {
  const handleExportCSV = () => {
    // Extract headers and ensure they're strings
    const headers = table.getHeaderGroups()[0].headers.map((header) => {
      // If the header is a function or JSX, fallback to a string like "Column" or something suitable.
      if (typeof header.column.columnDef.header === 'string') {
        return header.column.columnDef.header; // Use the header string
      }
      // Fallback for non-string headers (JSX or function)
      return header.column.id ?? ''; // Use the column id as a fallback
    });

    // Extract rows and ensure cell values are strings or numbers
    const rows = table.getRowModel().rows.map((row) =>
      row.getAllCells().map((cell) => {
        const cellValue = cell.getValue();
        return typeof cellValue === 'string' || typeof cellValue === 'number'
          ? cellValue
          : ''; // Handle non-string or non-number values
      }),
    );

    // Convert to CSV format
    const csvContent = [
      headers.join(','), // Join headers as the first row
      ...rows.map((row) => row.join(',')), // Join each row with commas
    ].join('\n'); // Join each row with new lines

    // Create a downloadable CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'table_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 lg:flex w-full mb-1"
      onClick={handleExportCSV} // Trigger the CSV export
    >
      <PiFileCsv className="mr-2 h-4 w-4" />
      CSV
    </Button>
  );
}

// import { type Table } from "@tanstack/react-table"
//
// export function ExportCSV<TData>(
//   /**
//    * The table to export.
//    * @type Table<TData>
//    */
//   table: Table<TData>,
//   opts: {
//     /**
//      * The filename for the CSV file.
//      * @default "table"
//      * @example "tasks"
//      */
//     filename?: string
//     /**
//      * The columns to exclude from the CSV file.
//      * @default []
//      * @example ["select", "actions"]
//      */
//     excludeColumns?: (keyof TData | "select" | "actions")[]
//
//     /**
//      * Whether to export only the selected rows.
//      * @default false
//      */
//     onlySelected?: boolean
//   } = {}
// ): void {
//   const { filename = "table", excludeColumns = [], onlySelected = false } = opts
//
//   // Retrieve headers (column names)
//   const headers = table
//     .getAllLeafColumns()
//     .map((column) => column.id)
//
//   // Build CSV content
//   const csvContent = [
//     headers.join(","),
//     ...(onlySelected
//         ? table.getFilteredSelectedRowModel().rows
//         : table.getRowModel().rows
//     ).map((row) =>
//       headers
//         .map((header) => {
//           const cellValue = row.getValue(header)
//           // Handle values that might contain commas or newlines
//           return typeof cellValue === "string"
//             ? `"${cellValue.replace(/"/g, '""')}"`
//             : cellValue
//         })
//         .join(",")
//     ),
//   ].join("\n")
//
//   // Create a Blob with CSV content
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//
//   // Create a link and trigger the download
//   const url = URL.createObjectURL(blob)
//   const link = document.createElement("a")
//   link.setAttribute("href", url)
//   link.setAttribute("download", `${filename}.csv`)
//   link.style.visibility = "hidden"
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)
// }