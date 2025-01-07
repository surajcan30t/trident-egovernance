'use client';
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleBulkStudentUpload } from '@/backend';
import PulseLoader from 'react-spinners/PulseLoader';

// Function to download the CSV template
const downloadCsvTemplate = () => {
  const headers = [
    'jeeApplicationNo',
    'studentName',
    'rank',
    'rankType',
    'course',
    'tfw',
    'admissionType',
    'studentType',
    'gender',
    'branchCode',
    'ojeeCounsellingFeePaid',
  ];

  const csvContent = [headers].map((e) => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'student_template.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const NSRBulkUploadForm = () => {
  interface Err422 {
    description?: string[];
  }
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error422, setError422] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]); // State to hold parsed JSON data
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null); // Reset error message when a new file is selected
      setError422(null);
    }
  };
  interface Response {
    status: number;
    message: string;
    data: Array<JSON> | [];
  }

  const handleConversion = () => {
    if (!file) {
      setError('Please select a CSV file to upload.');
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
            const fieldsToUppercase = [
              'rankType',
              'course',
              'tfw',
              'admissionType',
              'studentType',
              'gender',
              'branchCode',
              'ojeeCounsellingFeePaid',
            ];

            // Check if the value is empty, if so, return null
            if (value === '') return null;

            // If the current field should be uppercased, transform it
            if (fieldsToUppercase.includes(field)) {
              return value.toUpperCase();
            }

            // Otherwise, return the value as it is
            return value;
          },
          complete: (result) => {
            console.log('Parsed JSON data:', result.data);
            setParsedData(result.data); // Set parsed data to state
            setError(null); // Reset error message on successful upload

            // Resolve the Promise when parsing is successful
            resolve({
              status: 200,
              message: 'Parsing Successful',
              data: result.data as Array<JSON> | [],
            });
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setError('Error parsing CSV file. Please check the format.');

            // Reject the Promise if parsing fails
            reject({
              status: 400,
              message: 'Parsing Failed',
              data: null,
            });
          },
        });
      } catch (err) {
        console.error(err);
        setError('Error uploading the file. Please try again.');

        // Reject the Promise in case of a general error
        reject({
          status: 400,
          message: 'Parsing Failed',
          data: [],
        });
      }
    });
  };

  const handleUpload = async () => {
    const parsedJson: Response | undefined = await handleConversion();
    if (parsedJson?.status === 400) {
      console.log('Error parsing CSV file');
      return;
    }
    try {
      setLoading(true);
      setUploadStatus(null);
      const formData = new FormData();
      const data = parsedJson?.data;
      interface Resp {
        status: number;
        message: string;
        description: string;
      }
      if (Array.isArray(data) && data.length > 0) {
        console.log('Data to be uploaded:');
        formData.append('data', JSON.stringify(data));
        // Make API call to upload CSV file
        const response = (await handleBulkStudentUpload(formData)) as Resp;
        console.log('Response:', response);
        if (response.status === 422) {
          setUploadStatus(null);
          setError(null);
          const errorMessage = Array.isArray(response.description)
            ? response.description.join('\n')
            : response.description || 'Unknown error';
          setError422(errorMessage);
          return;
        } else if (response.status === 400) {
          setUploadStatus(null);
          setError422(null);
          setError(
            `Values must be of [${response.message}]\n Please check in the ${response.description} column`,
          );
          return;
        } else {
          setUploadStatus(response.message);
          setLoading(false);
          return;
        }
      } else {
        setError('No data to upload');
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
      setError('Error uploading the file. Please try again.');
      setLoading(false);
    } finally {
      setParsedData([]);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <h1 className="text-xl">NSR Bulk Upload Form</h1>

      {/* Instructions for the user */}
      <ol className="text-left mb-4 list-decimal">
        <li>Download the CSV format</li>
        <li>
          <span className="text-red-600">
            Do not change the header of the CSV file.
          </span>{' '}
          Only put the data in the proper places.
        </li>
        <li>
          <span className="text-red-600">Rules must be followed</span>
          <div className="border rounded-lg p-2 bg-red-500">
            <ul className="list-disc px-4 text-white">
              <li>Allowed values for Rank type -- [JEE, OJEE]</li>
              <li>Allowed values for TFW status -- [TFW, NTFW]</li>
              <li>Allowed values for Gender -- [MALE, FEMALE, OTHERS]</li>
              <li>Allowed values for Student Type -- [REGULAR, LE]</li>
              <li>Allowed values for Ojee Counselling Fee Paid -- [YES, NO]</li>
            </ul>
          </div>
        </li>
        <li>Click the upload button.</li>
      </ol>
      <Button onClick={downloadCsvTemplate} variant="trident">
        Download CSV Template
      </Button>
      <Input
        type="file"
        accept=".csv" // Ensure that only CSV files can be selected
        className="w-1/3"
        onChange={handleFileChange}
      />
      <Button variant={'trident'} onClick={handleUpload}>
        {loading ? (
          <div className="flex gap-2 items-center justify-center">
            In Progress <PulseLoader color="#ffffff" size={5} />
          </div>
        ) : (
          'Upload'
        )}
      </Button>

      {uploadStatus && <p className="text-green-600">Upload Successful</p>}
      {error422 && (
        <p className="whitespace-pre-line" style={{ color: 'red' }}>
          {error422}
        </p>
      )}
      {error && (
        <p className="whitespace-pre-line" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {/* {parsedData.length > 0 && (
        <div>
          <h2>Parsed Data:</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>{' '}
          Display parsed JSON
        </div>
      )} */}
    </div>
  );
};

export default NSRBulkUploadForm;
