import { handleBulkSectionUpload } from "@/backend";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { generateCSVTemplate, handleCsvtoJsonConversion } from "@/lib/csv-to-json"
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { parseCourse } from '@/lib/course-parser'

interface Response {
  status: number;
  message: string;
  data: Array<JSON> | [];
}

const downloadCsvTemplate = () => {
  const headers = [
    'collegeRollNo',
    'regdNo',
    'labGroup'
  ];
  generateCSVTemplate(headers);
};


export function EditSectionFormModal({ message, open, setOpen, method }: { message: string, open: boolean, setOpen: (value: boolean) => void, method: string }) {
  console.log('method', method)
  const searchParams = useSearchParams();

  const { section, course, branch, sem } = {
    section: searchParams.get('section') as string,
    course: parseCourse(searchParams.get('course') as string),
    branch: searchParams.get('branch') as string,
    sem: searchParams.get('sem') as string
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

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    const parsedJson: Response | undefined = await handleCsvtoJsonConversion(file, null);
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
        const uploadData = {
          section: section,
          course: course,
          branchCode: branch,
          sem: sem,
          studentSectionData: data
        }
        formData.append('data', JSON.stringify(uploadData));
        // Make API call to upload CSV file
        const response = (await handleBulkSectionUpload(formData, method)) as Resp;
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
        } else if (response.status === 200) {
          console.log('Upload successful');
          setUploadStatus(response.message);
          setLoading(false);
          return;
        }
        else {
          console.log('Upload unsuccessful');
          setUploadStatus(null);
          setLoading(false);
          setError('Unable to upload the file. Please try again.');
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Section Assign Form</DialogTitle>
          <DialogDescription>
            {/* <div className="text-red-500">{message}</div> */}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <div className="container">
            <h1 className="text-lg text-left">Instructions: </h1>
            <ul className="text-left mb-4 list-disc bg-red-500 text-white px-5 rounded-lg">
              <li>Download the CSV format</li>
              <li>
                <span className="">
                  Do not change the header of the CSV file.
                </span>{' '}
                Only put the data in the proper places.
              </li>
              <li>Click the upload button to submit the updated CSV file.</li>
            </ul>
          </div>

          <div className="container flex justify-center items-center">
            <div className="flex flex-row gap-3">
              <Button variant='link' className="text-lg text-blue-600" onClick={downloadCsvTemplate}>Click here To Download CSV Format</Button>
            </div>
          </div>

          <div className="container flex flex-col gap-1 justify-center items-center">
            <Input
              type="file"
              accept=".csv" // Ensure that only CSV files can be selected
              className="w-full text-blue-800"
              onChange={handleFileChange}
            />
            <Button variant={'trident'} onClick={handleUpload}>
              {loading ? (
                <div className="flex gap-2 items-center justify-center">
                  In Progress <PulseLoader color="#ffffff" size={5} />
                </div>
              ) : (
                'Upload CSV file'
              )}
            </Button>
          </div>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}


