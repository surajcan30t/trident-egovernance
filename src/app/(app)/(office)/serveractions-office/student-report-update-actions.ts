'use server';
import {
  CareerOnly,
  PersonalDetailsOnly,
  StudentAdmissionDetailsOnly,
  StudentOnly,
} from '@/app/(app)/(office)/office-schemas/schema';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import axios from 'axios';
import { string } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export const studentDetailsUpdateAction = async (
  formData: StudentOnly,
  table: string,
) => {
  const session = await getServerSession(authOptions);
  const regdno = formData.regdNo;
  // console.log('regd no', regdno);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/update-student-data/${table}/${regdno}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();
      // console.log(result);
      if (result === true) return 200;
      else return 400;
    } else return 401;
  } catch (error) {
    console.log(error);
  }
};

export const studentPersonalDetailsUpdateAction = async (
  formData: PersonalDetailsOnly,
  table: string,
) => {
  const session = await getServerSession(authOptions);
  const regdno = formData.regdNo;
  // console.log('regd no', regdno);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/update-student-data/${table}/${regdno}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();
      // console.log(result);
      if (result === true) return 200;
      else return 400;
    } else return 401;
  } catch (error) {
    console.log(error);
  }
};

export const studentAdmissionDetailsUpdateAction = async (
  formData: StudentAdmissionDetailsOnly,
  table: string,
) => {
  const session = await getServerSession(authOptions);
  const regdno = formData.regdNo;
  // console.log('regd no', regdno);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/update-student-data/${table}/${regdno}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();
      // console.log(result);
      if (result === true) return 200;
      else return 400;
    } else return 401;
  } catch (error) {
    console.log(error);
  }
};

export const studentCareerDetailsUpdateAction = async (
  formData: CareerOnly,
  table: string,
) => {
  const session = await getServerSession(authOptions);
  const regdno = formData.regdNo;
  // console.log('regd no', regdno);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/update-student-data/${table}/${regdno}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          method: 'PUT',
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();
      // console.log(result);
      if (result === true) return 200;
      else return 400;
    } else return 401;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

type DocumentNameTypeResponse = {
  status: number;
  message: string;
  name: string | null;
  type: string | null;
};
const documentNameAndTypeSelector = (
  inputIndex: Number,
  registrationNo: string,
): DocumentNameTypeResponse => {
  if (registrationNo === undefined) {
    return {
      status: 422,
      message: 'No registration number found',
      name: null,
      type: null,
    };
  }
  let documentName = '';
  let documentType = '';
  switch (inputIndex) {
    case 0:
      documentName = `${registrationNo}-10th-Certificate`;
      documentType = '10thCertificate';
      break;
    case 1:
      documentName = `${registrationNo}-10th-MarkSheet`;
      documentType = '10thMarkSheet';
      break;
    case 2:
      documentName = `${registrationNo}-12th-Eq-Certificate`;
      documentType = '12thorEquivalentCertificate';
      break;
    case 3:
      documentName = `${registrationNo}-12th-Eq-MarkSheet`;
      documentType = '12thorEquivalentMarkSheet';
      break;
    case 4:
      documentName = `${registrationNo}-CLC-TC`;
      documentType = 'CLCorTC';
      break;
    case 5:
      documentName = `${registrationNo}-Conduct-Certificate`;
      documentType = 'ConductCertificate';
      break;
    case 6:
      documentName = `${registrationNo}-Final-Allot-Letter`;
      documentType = 'FinalAllotmentLetter';
      break;
    case 7:
      documentName = `${registrationNo}-Rank-Card`;
      documentType = 'RankCard';
      break;
    case 8:
      documentName = `${registrationNo}-Passport-Photo`;
      documentType = 'PassportPhoto';
      break;
    case 9:
      documentName = `${registrationNo}-Aadhar-Card`;
      documentType = 'AadhaarCard';
      break;
  }
  const result: DocumentNameTypeResponse = {
    status: 200,
    message: 'Name and type generated successfully',
    name: documentName,
    type: documentType,
  };
  return result;
};

const globalMap = new Map<string, Map<number, object>>();
const urlMapSetter = (
  registrationNo: string,
  innerKey: number,
  value: object,
) => {
  if (!globalMap.has(registrationNo)) {
    const innerMap = new Map<number, object>();
    innerMap.set(innerKey, value);
    globalMap.set(registrationNo, innerMap);
    return { status: 'Ok', message: 'Map created and Value set' };
  } else {
    const existingMap = globalMap.get(registrationNo);
    if (!existingMap?.has(innerKey)) {
      existingMap?.set(innerKey, value);
      return { status: 'Ok', message: 'Value set' };
    } else {
      existingMap?.set(innerKey, value);
      return { status: 'Ok', message: 'Value updated' };
    }
  }
};

interface UrlData {
  fileUrl: string | null;
  docId: number | null;
}
interface UrlResponse {
  status: 'Error' | string;
  data: UrlData | undefined;
  message?: string;
}
const urlMapGetter = (
  registrationNo: string,
  innerKey: number,
): UrlResponse => {
  if (globalMap.has(registrationNo)) {
    const existingMap = globalMap.get(registrationNo);
    if (existingMap?.has(innerKey)) {
      return {
        status: 'Ok',
        data: existingMap?.get(innerKey) as UrlData,
        message: 'Search successful',
      };
    } else {
      return { status: 'Error', data: undefined, message: 'Key not found' };
    }
  } else {
    return { status: 'Error', data: undefined, message: 'Map not found' };
  }
};

const clearUrlMap = (registrationNo: string) => {
  if (globalMap.has(registrationNo)) {
    globalMap.delete(registrationNo);
    return { status: 'Ok', message: 'Map cleared successfully' };
  } else {
    return { status: 'Error', message: 'Invalid key provided' };
  }
};

type FormSch = {
  formData: FormData;
  registrationNo: string;
  docId: number;
};
export const singleUpload = async (inputIndex: number, payload: FormSch) => {
  // console.log('Form Data-', payload);
  const formData = payload.formData;
  const registrationNo = payload.registrationNo;
  const docId = payload.docId;
  // const registrationNo = formData.get('regdNo')
  // const docId = parseInt(formData.get('docId'))?? null
  // console.log('registrationNo', registrationNo, '\ndocId', docId)
  const FILE_EXTENSIONS = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];
  const FILE_SIZE = 4 * 1024 * 1024;
  try {
    const file = formData.get(`file${inputIndex}`) as File;
    const size = file.size;
    const type = file.type;
    // console.log(size, type);
    if (size >= FILE_SIZE && !FILE_EXTENSIONS.includes(type)) {
      // console.log('executed2');
      return { status: 400, message: 'File size is too large' };
    } else if (size === 0 && FILE_EXTENSIONS.includes(type)) {
      // console.log('executed3');
      return { status: 400, message: 'Please select a file' };
    } else if (
      size > 0 &&
      size < FILE_SIZE &&
      !FILE_EXTENSIONS.includes(type)
    ) {
      // console.log('executed4');
      return { status: 400, message: 'Please select a PDF or image file' };
    } else if (size > 0 && size < FILE_SIZE && FILE_EXTENSIONS.includes(type)) {
      // console.log('executed5');
      const awsRequest = await upLoadToS3(
        inputIndex,
        file,
        registrationNo,
        docId,
      );
      // console.log('----------------globalMap----------------\n', globalMap);
      // const awsRequest = {status: 200}
      // console.log('upload1 executed\n', awsRequest);
      if (awsRequest.status !== 200) {
        return { status: 400, message: 'Upload failed' };
      }
      return { status: 200, message: 'File uploaded' };
    } else {
      // console.log('executed6');
      return { status: 400, message: 'Something went wrong' };
    }
  } catch (error) {
    console.log(error);
    return { status: 400, message: 'Something went wrong' };
  }
};

const awsS3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

type S3Response = {
  status: number;
  message: string;
  url: string | null;
  type: string | null;
};
export const upLoadToS3 = async (
  inputIndex: number,
  userFile: File,
  registrationNo: string,
  docId: number,
): Promise<S3Response> => {
  // console.log('regdn o', registrationNo);
  if (registrationNo === null || registrationNo === undefined) {
    return {
      status: 404,
      message: 'No registration found',
      url: null,
      type: null,
    };
  }
  const fetchFileName = documentNameAndTypeSelector(inputIndex, registrationNo);
  if (fetchFileName.status !== 200) {
    return {
      status: 404,
      message: 'Unable to generate document name and type',
      url: null,
      type: null,
    };
  }
  let fileName = fetchFileName.name;
  // console.log('fileName', fileName);

  const fileBuffer = Buffer.from(await userFile.arrayBuffer());
  const params = {
    Bucket: process.env.AWS_S3_BUCKETNAME as string, // Ensure this environment variable is set
    Key: `${registrationNo}/${fileName}`, // Use the unique key for storing
    Body: fileBuffer, // The actual file content
    ContentType: userFile.type, // Set the MIME type of the file
  };

  const command = new PutObjectCommand(params);
  try {
    const awsRequest = await awsS3Client.send(command);
    if (!awsRequest) {
      // console.log('Something went wrong');
      return {
        status: 502,
        message: 'Failed to communicate with AWS S3',
        url: null,
        type: null,
      };
    }
    const fileUrl = `https://${process.env.AWS_S3_BUCKETNAME}.s3.amazonaws.com/${registrationNo}/${fileName}`;
    const mapObject = { fileUrl: fileUrl, docId: docId };
    const setFileUrl = urlMapSetter(registrationNo, inputIndex, mapObject);
    const response: S3Response = {
      status: awsRequest?.$metadata?.httpStatusCode ?? 500,
      message: 'Document uploaded successfully',
      url: fileUrl,
      type: userFile.type,
    };
    return response;
  } catch (error: any) {
    console.log(error);
    return {
      status: error.status ?? 500,
      message: 'Something went wrong',
      url: null,
      type: null,
    };
  }
};

type DocUpdateResponse = {
  status: number;
  message: string | null;
};
export const studentDocsUpdateForm = async (
  registrationNo: string,
  table: string,
): Promise<DocUpdateResponse> => {
  const session = await getServerSession(authOptions);
  interface Document {
    docId: number | null;
    docLink: string;
    docType: string | null;
    uploadDate: Date | null;
  }

  let documents: Document[] = [];
  for (let index = 0; index < 10; index++) {
    const url: UrlResponse = urlMapGetter(registrationNo, index);
    if (url.status !== 'Error') {
      documents.push({
        docId: url.data?.docId || null,
        docLink: url.data?.fileUrl || '',
        docType: documentNameAndTypeSelector(index, registrationNo).type,
        uploadDate: new Date(),
      });
    } else {
      console.log(`Error fetching url for index ${index}: ${url.message}`);
    }
  }
  // console.log('Docements', documents);
  if (documents.length === 0) {
    // console.log('this one executed');
    return { status: 400, message: 'No documents found' };
  }
  try {
    if (session) {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/update-student-data/${table}/${registrationNo}`,
        documents,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      if (response.status === 200) {
        documents.length = 0;
        clearUrlMap(registrationNo);
        // console.log('request', response);
        console.log(globalMap);
        return { status: response.status, message: response.statusText };
      }
      return { status: response.status, message: response.statusText };
    } else return { status: 401, message: 'Unauthorized' };
  } catch (error: any) {
    // console.log(error);
    return { status: 500, message: 'Something went wrong' };
  }
};
