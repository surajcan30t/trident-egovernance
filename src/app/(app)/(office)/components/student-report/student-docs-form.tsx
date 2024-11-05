'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Documents } from '@/app/(app)/(office)/office-schemas/schema';
import { singleUpload, studentDocsUpdateForm } from '../../serveractions-office/student-report-update-actions';

const ACCEPTED_FILE_TYPES = [
  'image/jpg',
  'image/png',
  'image/jpeg',
  'application/pdf',
];
const MAX_FILE_SIZE = 4000000; // 4MB

const docIndexMap = new Map([
  ['10thCertificate', 0],
  ['10thMarkSheet', 1],
  ['12thorEquivalentCertificate', 2],
  ['12thorEquivalentMarkSheet', 3],
  ['CLCorTC', 4],
  ['ConductCertificate', 5],
  ['FinalAllotmentLetter', 6],
  ['RankCard', 7],
  ['PassportPhoto', 8],
  ['AadhaarCard', 9],
  // Add more document types and their respective indices as needed
]);

const FormSchema = z.object(
  Object.fromEntries(
    Array.from(docIndexMap.values()).map((index) => [
      `file${index + 1}`, // field name, e.g., "file1", "file2", etc.
      z.instanceof(File).refine(
        (file) =>
          file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
        {
          message: 'File must be a PDF and less than 4MB.',
        }
      ),
    ])
  )
);



const StudentDocsForm = ({
  table,
  data,
  registrationNo
}: {
  table: string;
  data: Documents;
  registrationNo: string
}) => {
  console.log(data)
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // upload status for each file
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    },
  });
  const router = useRouter();




  const handleSingleUpload = async (file: File, index: number) => {
    if (!file) return;
    try {
      // Start simulating progress
      const newUploadingState = [...isUploading];
      newUploadingState[index] = true;
      setIsUploading(newUploadingState);

      // Create form data and call the server-side singleUpload function
      const formData = new FormData()
      console.log(1)
      formData.append(`file${index}`, file);
      const payload = {formData: formData, registrationNo: registrationNo, docId: data[index].docId ?? null}
      console.log('regd',registrationNo)
      console.log(3)
      // data[index]?.docId ? formData.append('docId', data[index].docId.toString()) : formData.append('docId', '')
      console.log(4)

      const uploadResponse = await singleUpload(index, payload); // Call server action

      const resp = uploadResponse;
      if (resp.status === 200) {
        toast({
          variant: 'success',
          title: 'Document uploaded successfully.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: uploadResponse.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: `Error: ${error.message}`,
      });
    } finally {
      const updatedUploadingState = [...isUploading];
      updatedUploadingState[index] = false;
      setIsUploading(updatedUploadingState);
    }
  };

  async function handleFinalSubmit() {
    try {
      const newUploadingState = [...isUploading];
      newUploadingState[5] = true;
      setIsUploading(newUploadingState);
      const response = await studentDocsUpdateForm(registrationNo, table);
      if (response.status === 200) {
        toast({
          variant: 'success',
          title: 'Documents uploaded successfully.',
        });
        // router.push('/studentportal/newstudentfinalregister');
      }
      else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: 'Please try again later.',
        });
      }
    } catch (err) {
    } finally {
      const newUploadingState = [...isUploading];
      newUploadingState[5] = false;
      setIsUploading(newUploadingState);
    }
  }
  console.log('Value', form.getValues());

  return (
    console.log(data),
    (
      <>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-[90%] h-[80vh] "
          >
            {Array.from(docIndexMap.entries()).map(([docType, index]) => (
              <FormField
                key={docType}
                control={form.control}
                name={`file${index + 1}`} // Dynamically set the field name
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>
                      Upload {docType.replace(/([A-Z])/g, ' $1')} {/* Format label for better readability */}
                      <span className="text-red-500 font-bold text-lg">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        className="cursor-pointer"
                        onChange={(event) => onChange(event.target.files && event.target.files[0])}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="trident"
                        className="mt-2"
                        type="button"
                        onClick={() => handleSingleUpload(value, index)} // Use index for upload
                      >
                        {isUploading[index] ? <PulseLoader color="white" size={5} /> : 'Upload'}
                      </Button>
                      {data?.length > 0 && data[index]?.docLink && (
                        <Link
                          href={data[index]?.docLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline ml-2 flex flex-row"
                        >
                          view <FileText />
                        </Link>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Final Submit Button */}
            <div className="space-y-2 flex justify-center">
              <Button
                variant="trident"
                size="lg"
                type="button"
                onClick={handleFinalSubmit}
              >
                {isUploading[5] ? (
                  <PulseLoader color="white" size={5} />
                ) : (
                  'Update'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </>
    )
  );
};

export default StudentDocsForm;
