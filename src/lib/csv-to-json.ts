'use client';
import Papa from 'papaparse';

interface Response {
  status: number;
  message: string;
  data: Array<JSON> | [];
}

export const handleCsvtoJsonConversion = (
  file: File,
  toUpperCase: String[] | null,
) => {
  if (!file) {
    return Promise.reject({
      status: 400,
      message: 'No file selected',
      data: null,
    });
  }

  return new Promise<Response>((resolve, reject) => {
    try {
      // Use Papa Parse to read the CSV file
      Papa.parse(file, {
        header: true, // Indicates the first row contains headers
        skipEmptyLines: true, // Skip empty rows
        transform: (value, field: string) => {
          // Check if the value is empty, if so, return null
          if (value === '') return null;

          // If the current field should be uppercased, transform it
          if (toUpperCase && toUpperCase.includes(field)) {
            return value.toUpperCase();
          }

          // Otherwise, return the value as it is
          return value;
        },
        complete: (result) => {
          console.log('Parsed JSON data:', result.data);

          // Resolve the Promise when parsing is successful
          resolve({
            status: 200,
            message: 'Parsing Successful',
            data: result.data as Array<JSON> | [],
          });
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);

          // Reject the Promise if parsing fails
          reject({
            status: 400,
            message: 'Unable to parse CSV',
            data: null,
          });
        },
      });
    } catch (err) {
      console.error(err);

      // Reject the Promise in case of a general error
      reject({
        status: 400,
        message: 'Unable to parse CSV',
        data: [],
      });
    }
  });
};

export const generateCSVTemplate = (headers: string[]) => {
  const csvContent = [headers].map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'section_assign.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
