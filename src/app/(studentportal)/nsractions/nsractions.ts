'use server';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { object } from 'zod';
import { json } from 'stream/consumers';

export const newStudentLogin = async (formData: any) => {
  // console.log(formData);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/public/login`,
      formData,
    );
    const token = response.data.token;
    cookies().set('NSR-Authorization', token, {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
    });
    cookies().set('applicationNo', formData.applicationNo, {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
    });
    if (response.status === 200) {
      const status = response.status;
      const getStudentDetails = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/NSR/get`,
        {
          headers: {
            'NSR-Authorization': `Bearer ${token}`,
          },
        },
      );
      const step = getStudentDetails.data.step;
      const resp = {
        status: status,
        step: step,
      };
      return resp;
    }
  } catch (error: any) {
    console.log(error);
    const resp = {
      status: error?.response?.data?.status || 500,
      message: error?.response?.data?.detail || 'Unable to process'
    };
    return resp;
  }
};

// function to get initial student data if exist and update with user input
const initialStudentData = async (formData: any) => {
  interface Document {
    docLink: string;
    docType: string;
    uploadDate: Date | null;
  }
  interface Student {
    jeeApplicationNo: string | null;
    regdNo: string | null;
    admissionDate: Date | null;
    ojeeCouncellingFeePaid: string | null; // It was BooleanString in Java but used string due to mismatch in given example
    studentName: string;
    gender: string | null; // Gender enum type in Java
    branchCode: string | null;
    admissionYear: string | null;
    degree_yop: number | null; // Integer in Java
    phNo: string; // Phone number as string to handle leading zeroes
    email: string;
    rollNo: string;
    hostelier: string | null; // BooleanString type in Java
    hostelOption: string | null; // BooleanString type in Java
    hostelChoice: string | null; // Assuming this as a string
    transportAvailed: string | null; // BooleanString type in Java
    status: string | null;
    batchId: string | null;
    currentYear: number | null; // Integer in Java
    aadhaarNo: number; // Long in Java
    indortrng: string | null; // BooleanString type in Java
    plpoolm: string | null; // BooleanString type in Java
    cfPayMode: string | null; // CfPaymentMode type in Java, using string for simplicity
    religion: string | null; // Enum type in Java, keeping string for simplicity
    rank: number | null; // Long in Java
    rankType: string | null; // RankType in Java, assuming string here
    course: string; // Enum in Java, keeping string
    tfw: string | null; // Enum in Java
    admissionType: string | null; // Enum in Java
    studentType: string | null; // Enum in Java

    tenthPercentage: number | null;
    tenthYOP: number | null;
    twelvthPercentage: number | null;
    twelvthYOP: number | null;
    diplomaPercentage: number | null;
    diplomaYOP: number | null;
    graduationPercentage: number | null;
    graduationYOP: number | null;

    fname: string; // Father's name
    mname: string; // Mother's name
    lgName: string; // Legal guardian's name
    permanentAddress: string;
    permanentCity: string;
    permanentState: string;
    permanentPincode: number; // Number type in Java
    parentContact: string; // Phone numbers as strings
    parentEmailId: string;
    presentAddress: string | null;
    district: string;

    ojeeCounsellingFeePaid: string | null;
    ojeeRollNo: string | null;
    ojeeRank: string | null;
    aieeeRank: string | null;
    caste: string;
    reportingDate: Date | null;
    categoryCode: string | null;
    categoryRank: number | null;
    allotmentId: string;

    transportOpted: string | null; // BooleanString in Java
    pickUpPoint: string | null;
    studentDocsData: Document[];
    step: number | null;
  }
  try {
    const NSR_token = cookies().get('NSR-Authorization');
    const response: AxiosResponse<Student> = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/get`,
      {
        headers: {
          'NSR-Authorization': `Bearer ${NSR_token?.value}`,
        },
      },
    );
    if (response.status !== 200) {
      return null;
    }
    // console.log('Inside initialstudentdata formdata:', formData);
    const data = response.data;
    // const data = 123;
    // console.log('Data in initialStudentData function', data);
    const studentDocsData: Document[] =
      formData.studentDocsData || data.studentDocsData;
    const initData = {
      jeeApplicationNo: formData.jeeApplicationNo || data.jeeApplicationNo,
      regdNo: formData.regdNo || data.regdNo,
      admissionDate: formData.admissionDate || data.admissionDate,
      ojeeCouncellingFeePaid:
        formData.ojeeCouncellingFeePaid || data.ojeeCouncellingFeePaid,
      studentName: formData.studentName || data.studentName,
      gender: formData.gender || data.gender,
      branchCode: formData.branchCode || data.branchCode,
      admissionYear: formData.admissionYear || data.admissionYear,
      degree_yop: formData.degree_yop || data.degree_yop,
      phNo: formData.phNo || data.phNo,
      email: formData.email || data.email,
      rollNo: formData.rollNo || data.rollNo,
      hostelier: formData.hostelier || data.hostelier,
      hostelOption: formData.hostelOption || data.hostelOption,
      hostelChoice: formData.hostelChoice || data.hostelChoice,
      transportAvailed: formData.transportAvailed || data.transportAvailed,
      status: formData.status || data.status,
      batchId: formData.batchId || data.batchId,
      currentYear: formData.currentYear || data.currentYear,
      aadhaarNo: formData.aadhaarNo || data.aadhaarNo,
      indortrng: formData.indortrng || data.indortrng,
      plpoolm: formData.plpoolm || data.plpoolm,
      cfPayMode: formData.cfPayMode || data.cfPayMode,
      religion: formData.religion || data.religion,
      rank: formData.rank || data.rank,
      rankType: formData.rankType || data.rankType,
      course: formData.course || data.course,
      tfw: formData.tfw || data.tfw,
      admissionType: formData.admissionType || data.admissionType,
      studentType: formData.studentType || data.studentType,
      tenthPercentage: formData.tenthPercentage || data.tenthPercentage,
      tenthYOP: formData.tenthYOP || data.tenthYOP,
      twelvthPercentage: formData.twelvthPercentage || data.twelvthPercentage,
      twelvthYOP: formData.twelvthYOP || data.twelvthYOP,
      diplomaPercentage: formData.diplomaPercentage || data.diplomaPercentage,
      diplomaYOP: formData.diplomaYOP || data.diplomaYOP,
      graduationPercentage:
        formData.graduationPercentage || data.graduationPercentage,
      graduationYOP: formData.graduationYOP || data.graduationYOP,
      lgName: formData.lgName || data.lgName,
      permanentAddress: formData.permanentAddress || data.permanentAddress,
      permanentCity: formData.permanentCity || data.permanentCity,
      permanentState: formData.permanentState || data.permanentState,
      permanentPincode: formData.permanentPincode || data.permanentPincode,
      parentContact: formData.parentContact || data.parentContact,
      parentEmailId: formData.parentEmailId || data.parentEmailId,
      presentAddress: formData.presentAddress || data.presentAddress,
      district: formData.district || data.district,
      ojeeCounsellingFeePaid:
        formData.ojeeCounsellingFeePaid || data.ojeeCounsellingFeePaid,
      ojeeRollNo: formData.ojeeRollNo || data.ojeeRollNo,
      ojeeRank: formData.ojeeRank || data.ojeeRank,
      aieeeRank: formData.aieeeRank || data.aieeeRank,
      caste: formData.caste || data.caste,
      reportingDate: formData.reportingDate || data.reportingDate,
      categoryCode: formData.categoryCode || data.categoryCode,
      categoryRank: formData.categoryRank || data.categoryRank,
      allotmentId: formData.allotmentId || data.allotmentId,
      transportOpted: formData.transportOpted || data.transportOpted,
      pickUpPoint: formData.pickUpPoint || data.pickUpPoint,
      step: formData.step || data.step,
      fname: formData.fname || data.fname,
      mname: formData.mname || data.mname,
      studentDocsData: studentDocsData,
    };
    return initData;
  } catch (error) {
    console.log(error);
  }
};

// function to send allotment id
export const nsrSendAllotmentID = async (formData: any) => {
  try {
    const data = await initialStudentData(formData);
    if (!data) {
      console.log('No initial data found.');
      return;
    }
    console.log('Data in NSRALLOTMENTID function', data);
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`,
      data,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );
    return (await request).status;
  } catch (error) {
    console.log(error);
  }
};

// function to send personal data
export const handleNsPersonal = async (formData: any) => {
  try {
    // Fetch initial student data
    const data = await initialStudentData(formData);

    if (!data) {
      console.log('No initial data found.');
      return;
    }

    // Merge initial data with formData (user input data)

    console.log('data in handleNsPersonal', data); // Log merged data for debugging

    // Send data to API
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`,
      data,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );

    // console.log((await request).data);
    return (await request).status;
  } catch (error) {
    console.log(error);
  }
};

// function to send academic data
export const handleNsrAcademic = async (formData: any) => {
  console.log('Acad form data', formData);
  try {
    // Fetch initial student data
    const data = await initialStudentData(formData);
    // const data = formData

    if (!data) {
      console.log('No initial data found.');
      return;
    }

    // Merge initial data with formData (user input data)

    console.log('data in handleNsAcademic', data); // Log merged data for debugging

    // Send data to API
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`,
      data,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );

    // console.log((await request).data);
    return (await request).status;
  } catch (error: any) {
    // console.log(error.message);
    const response = {
      status: error.status,
      message: error.message,
    };
    console.log(response);
    return response;
  }
};

// function to send optional facility data
export const handleNsrOptionalFacility = async (formData: any) => {
  try {
    // Fetch initial student data
    const data = await initialStudentData(formData);

    if (!data) {
      console.log('No initial data found.');
      return;
    }

    // Merge initial data with formData (user input data)

    console.log('data in handleNsAcademic', data); // Log merged data for debugging

    // Send data to API
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`,
      data,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );

    // console.log((await request).data);
    return (await request).status;
  } catch (error) {
    console.log(error);
  }
};

//
const documentNameAndTypeSelector = (inputIndex: Number) => {
  // const applicationNo = cookies().get('applicationNo');
  const applicationNo = 'jee789';
  let documentName = '';
  let documentType = '';
  switch (inputIndex) {
    case 0:
      documentName = `${applicationNo}-10th-Certificate`;
      documentType = '10thCertificate';
      break;
    case 1:
      documentName = `${applicationNo}-10th-MarkSheet`;
      documentType = '10thMarkSheet';
      break;
    case 2:
      documentName = `${applicationNo}-12th-Eq-Certificate`;
      documentType = '12thorEquivalentCertificate';
      break;
    case 3:
      documentName = `${applicationNo}-12th-Eq-MarkSheet`;
      documentType = '12thorEquivalentMarkSheet';
      break;
    case 4:
      documentName = `${applicationNo}-CLC-TC`;
      documentType = 'CLCorTC';
      break;
    case 5:
      documentName = `${applicationNo}-Conduct-Certificate`;
      documentType = 'ConductCertificate';
      break;
    case 6:
      documentName = `${applicationNo}-Final-Allot-Letter`;
      documentType = 'FinalAllotmentLetter';
      break;
    case 7:
      documentName = `${applicationNo}-Rank-Card`;
      documentType = 'RankCard';
      break;
    case 8:
      documentName = `${applicationNo}-Passport-Photo`;
      documentType = 'PassportPhoto';
      break;
    case 9:
      documentName = `${applicationNo}-Aadhar-Card`;
      documentType = 'AadhaarCard';
      break;
  }
  const returnType = { name: documentName, type: documentType };
  return returnType;
};
// function to validate file size and type and execute uploadToS3 function
export const singleUpload = async (inputIndex: Number, formData: any) => {
  console.log(formData);
  const FILE_EXTENSIONS = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];
  const FILE_SIZE = 4 * 1024 * 1024;
  try {
    const file = formData.get(`file${inputIndex}`);
    const size = file.size;
    const type = file.type;
    // const buffer = Buffer.from(await file.arrayBuffer());
    console.log(size, type);
    if (size >= FILE_SIZE && !FILE_EXTENSIONS.includes(type)) {
      console.log('executed2');
      return { status: 400, message: 'File size is too large' };
    } else if (size === 0 && FILE_EXTENSIONS.includes(type)) {
      console.log('executed3');
      return { status: 400, message: 'Please select a file' };
    } else if (
      size > 0 &&
      size < FILE_SIZE &&
      !FILE_EXTENSIONS.includes(type)
    ) {
      console.log('executed4');
      return { status: 400, message: 'Please select a PDF or image file' };
    } else if (size > 0 && size < FILE_SIZE && FILE_EXTENSIONS.includes(type)) {
      console.log('executed5');
      const awsRequest = await upLoadToS3(inputIndex, file);
      console.log('upload1 executed\n', awsRequest);

      return { status: 200, message: 'File uploaded' };
    } else {
      console.log('executed6');
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

const globalMap = new Map<String, Map<Number, String>>();
const urlMapSetter = (
  uniqueApplicationNo: String,
  innerKey: Number,
  value: String) => {
  if (!globalMap.has(uniqueApplicationNo)) {
    const innerMap = new Map<Number, String>();
    innerMap.set(innerKey, value);
    globalMap.set(uniqueApplicationNo, innerMap);
    return { status: 'Ok', message: 'Map created and Value set' };
  } else {
    const existingMap = globalMap.get(uniqueApplicationNo);
    if (!existingMap?.has(innerKey)) {
      existingMap?.set(innerKey, value);
      return { status: 'Ok', message: 'Value set' };
    } else {
      existingMap?.set(innerKey, value);
      return { status: 'Ok', message: 'Value updated' };
    }
  }
};

const urlMapGetter = (uniqueApplicationNo: String, innerKey: Number) => {
  if (globalMap.has(uniqueApplicationNo)) {
    const existingMap = globalMap.get(uniqueApplicationNo);
    if (existingMap?.has(innerKey)) {
      return { status: 'Ok', data: existingMap.get(innerKey) };
    } else {
      return { status: 'Error', message: 'Key not found' };
    }
  } else {
    return { status: 'Error', message: 'Map not found' };
  }
};

// function to upload file to S3
export const upLoadToS3 = async (inputIndex: Number, userFile: File) => {
  const applicationNo = cookies().get('applicationNo')?.value as string;
  // const applicationNo = 'jee789';
  let fileName = documentNameAndTypeSelector(inputIndex).name;
  console.log('fileName', userFile.name);

  const fileBuffer = Buffer.from(await userFile.arrayBuffer());
  const params = {
    Bucket: process.env.AWS_S3_BUCKETNAME as string, // Ensure this environment variable is set
    Key: `${applicationNo}/${fileName}`, // Use the unique key for storing
    Body: fileBuffer, // The actual file content
    ContentType: userFile.type, // Set the MIME type of the file
  };

  const command = new PutObjectCommand(params);
  try {
    const awsRequest = await awsS3Client.send(command);
    if (!awsRequest) {
      console.log('Something went wrong');
      return;
    }
    const fileUrl = `https://${process.env.AWS_S3_BUCKETNAME}.s3.amazonaws.com/${applicationNo}/${fileName}`;
    const setFileUrl = urlMapSetter(applicationNo, inputIndex, fileUrl);
    const response = {
      status: awsRequest?.$metadata?.httpStatusCode,
      statusText: 'Ok',
      url: fileUrl,
      type: userFile.type,
    };
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveDocumentToDB = async (ind: Number) => {
  const applicationNo = cookies().get('applicationNo')?.value as string;
  interface Document {
    docLink: String;
    docType: string | null;
    uploadDate: Date | null;
  }
  // const applicationNo = 'jee789';
  let documents: Document[] = [];
  for (let index = 0; index < 5; index++) {
    const url = urlMapGetter(applicationNo, index);
    if (url.status !== 'Error') {
      documents.push({
        docLink: url.data || '',
        docType: documentNameAndTypeSelector(index).name,
        uploadDate: new Date(),
      });
    } else {
      console.log(`Error fetching url for index ${index}: ${url.message}`);
    }
  }
  console.log('Global Map: ', globalMap);
  const data = await initialStudentData({ studentDocsData: documents });
  console.log('indise savetoDB after setting data', data);
  try {
    const authToken = cookies().get('NSR-Authorization');
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`,
      data,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );
    // console.log('request', request);
    return request.status;
  } catch (error) {
    console.log(error);
  }
};

export const nsrFinalSubmit = async () => {
  try {
    const applicationNo = cookies().get('applicationNo');
    const authToken = cookies().get('NSR-Authorization');
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent/${applicationNo?.value}`,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );
    console.log('request', request);
    return request.status;
  } catch (error) {
    console.log(error);
  }
};
