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
import { singleUpload, saveDocumentToDB } from '../../nsractions/nsractions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { FileText, Loader, UploadCloud } from 'lucide-react';
import PulseLoader from 'react-spinners/PulseLoader';

const ACCEPTED_FILE_TYPES = ['image/jpg', 'image/jpeg', 'application/pdf'];
const MAX_FILE_SIZE = 4000000; // 4MB

const FormSchema = z.object({
  file1: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file2: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file3: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file4: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file5: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file6: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file7: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file8: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file9: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),
  file10: z
    .instanceof(File)
    .refine(
      (file) =>
        file.size < MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: 'File must be a PDF and less than 4MB.',
      },
    ),

  step: z.number().default(6),
});

const NsrUploadFile = (initial: any) => {
  // const NsrUploadFile = () => {
  const [isUploading, setIsUploading] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false]);// upload
  // status for each file
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  }
  );
  const router = useRouter();

  const handleSingleUpload = async (file: File, index: number) => {
    if (!file) return;
    try {
      // Start simulating progress
      const newUploadingState = [...isUploading];
      newUploadingState[index] = true;
      setIsUploading(newUploadingState);

      // Create form data and call the server-side singleUpload function
      const formData = new FormData();
      formData.append(`file${index}`, file);

      const uploadResponse = await singleUpload(index, formData); // Call server action

      const resp = uploadResponse;
      if (uploadResponse.status === 200) {
        toast({
          variant: 'success',
          title: 'Document uploaded successfully.',
        });

      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: uploadResponse.message,
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: `Error: ${error.message}`,
      })
    } finally {
      const updatedUploadingState = [...isUploading];
      updatedUploadingState[index] = false;
      setIsUploading(updatedUploadingState);
    }
  };

  async function handleFinalSubmit() {
    try {
      const newUploadingState = [...isUploading];
      newUploadingState[10] = true;
      setIsUploading(newUploadingState);
      const response = await saveDocumentToDB(1);
      if (response === 200) {
        toast({
          variant: 'success',
          title: 'Documents uploaded successfully.',
        });
        router.push('/studentportal/newstudentfinalregister');
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
      newUploadingState[10] = false;
      setIsUploading(newUploadingState);
    }
  }
  return (
    <>
      <Form {...form}>
        <div className="w-2/3 flex flex-col items-center gap-3">
          <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-1">
            {/* File 1 10th certificate */}
            <FormField
              control={form.control}
              name="file1"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload 10<sup>th</sup> Certificate
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      className="cursor-pointer"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 0)}
                    >
                      {isUploading[0] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === '10thCertificate'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 2 10th marksheet */}
            <FormField
              control={form.control}
              name="file2"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload 10<sup>th</sup> Marksheet
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 1)}
                    >
                      {isUploading[1] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === '10thMarkSheet'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 3 12th certificate */}
            <FormField
              control={form.control}
              name="file3"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload 12<sup>th</sup> Certificate
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 2)}
                    >
                      {isUploading[2] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === '12thorEquivalentCertificate'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 4 12th marksheet */}
            <FormField
              control={form.control}
              name="file4"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload 12<sup>th</sup> Marksheet
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 3)}
                    >
                      {isUploading[3] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === '12thorEquivalentMarkSheet'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 5 with TC */}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload College Leaving Certificate or TC
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 4)}
                    >
                      {isUploading[4] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === 'CLCorTC'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*File 6 Conduct-Certificate*/}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Conduct Certificate
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 5)}
                    >
                      {isUploading[5] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === 'ConductCertificate'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/*  File 7 Final Allot Letter */}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Final Allot Letter
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 6)}
                    >
                      {isUploading[6] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === 'FinalAllotmentLetter'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* File 8 Rank Card */}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Rank Card
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 7)}
                    >
                      {isUploading[7] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === 'RankCard'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* File 8 Passport Photo */}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Passport Size Photo
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 8)}
                    >
                      {isUploading[8] ? (
                        <PulseLoader color="white" size={5} />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === 'PassportPhoto'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* File 10 Aadhaar Card */}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Aadhaar Card
                    <span className="text-red-500 font-bold text-lg">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="trident"
                      className="mt-2"
                      onClick={() => handleSingleUpload(value, 9)}
                    >
                      {isUploading[9] ? (
                        <Loader className="mr-2 size-4 animate-spin"
                        aria-hidden="true"/>
                      ) : (
                        'Upload'
                      )}
                    </Button>
                    {initial?.studentDocsData?.length > 0 &&
                      (() => {
                        const tenthMarkSheet = initial.studentDocsData.find(
                          (doc:any) => doc.docType === 'AadhaarCard'
                        );
                        return (
                          tenthMarkSheet?.docLink && (
                            <Link
                              href={tenthMarkSheet.docLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline ml-2"
                            >
                              <FileText />
                            </Link>
                          )
                        );
                      })()}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Final Submit Button */}
          <Button
            variant="trident"
            className="w-1/3 mt-4"
            size="lg"
            onClick={handleFinalSubmit}
          >
            {isUploading[10] ? (
              <PulseLoader color="white" size={5} />
            ) : (
              'Review and Submit'
            )}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NsrUploadFile;
