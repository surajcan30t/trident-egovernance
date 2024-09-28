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

const ACCEPTED_FILE_TYPES = ['image/jpg', 'image/png', 'image/jpeg'];
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
  step: z.number().default(5),
});

const NsrUploadFile = () => {
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0, 0]); // progress for each file
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
  ]); // upload status for each file
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const router = useRouter();

  const handleSingleUpload = async (file: File, index: number) => {
    if (!file) return;
    try {
      // Start simulating progress

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
        setUploadStatus((prev) => {
          const updatedStatus = [...prev];
          updatedStatus[index] = 'File uploaded successfully';
          console.log(resp);
          return updatedStatus;
        });
        setProgress((prev) => {
          const updatedProgress = [...prev];
          updatedProgress[index] = 100; // Ensure it's 100% on success
          return updatedProgress;
        });

      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: uploadResponse.message,
        })
      }
    } catch (error: any) {
      setUploadStatus((prev) => {
        const updatedStatus = [...prev];
        updatedStatus[index] = 'Error during upload';
        return updatedStatus;
      });
      setProgress((prev) => {
        const updatedProgress = [...prev];
        updatedProgress[index] = 0; // Reset progress on error
        return updatedProgress;
      });
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: `Error: ${error.message}`,
      })
    } finally {
      setIsUploading(false);
    }
  };

  async function handleFinalSubmit() {
    const response = await saveDocumentToDB(1);
    if (response === 200) {
      toast({
        variant: 'success',
        title: 'Documents uploaded successfully.',
      });
      // router.push('/nsractions');
    }
    else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'Please try again later.',
      });
    }   
  }

  return (
    <>
      <Form {...form}>
        <div className="w-2/3 flex flex-col items-center gap-3">
          <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 lg:gap-y-1">
            {/* File 1 with Upload Button */}
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
                      Upload
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 2 with Upload Button */}
            <FormField
              control={form.control}
              name="file2"
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
                      onClick={() => handleSingleUpload(value, 1)}
                    >
                      Upload
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 3 with Upload Button */}
            <FormField
              control={form.control}
              name="file3"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Graduation Certificate
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
                      Upload
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 4 with Upload Button */}
            <FormField
              control={form.control}
              name="file4"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Post-Graduation Certificate
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
                      Upload
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File 5 with Upload Button */}
            <FormField
              control={form.control}
              name="file5"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Other Certificate
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
                      Upload
                    </Button>
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
            // onClick={() => router.push('/studentportal/newstudentfinalregister	')}
          >
            Review and Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NsrUploadFile;
