'use server';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const newStudentLogin = async (formData: any) => {
  console.log(formData);
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
      message: error?.response?.data?.detail || 'Unable to process',
    };
    return resp;
  }
};

export const nsrSignout = async () => {
  cookies().delete('NSR-Authorization');
  cookies().delete('applicationNo');

  return true;
};

export const isAuthenticated = async () => {
  const token = cookies().get('NSR-Authorization');
  if (!token) {
    return false;
  } else return true;
};

// function to get initial dashboard data if exist and update with user input
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
    degreeYop: number | null; // Integer in Java
    phNo: string; // Phone number as string to handle leading zeroes
    email: string;
    dob: string | null;
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
    const data = response.data;
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
      degreeYop: formData.degreeYop || data.degreeYop,
      phNo: formData.phNo || data.phNo,
      email: formData.email || data.email,
      dob: formData.dob || data.dob,
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
    const request = axios.put(
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
    // Fetch initial dashboard data
    const data = await initialStudentData(formData);

    if (!data) {
      console.log('No initial data found.');
      return;
    }

    // Merge initial data with formData (user input data)

    console.log('data in handleNsPersonal', data); // Log merged data for debugging

    // Send data to API
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.put(
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
    // Fetch initial dashboard data
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
    const request = axios.put(
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
    // Fetch initial dashboard data
    const data = await initialStudentData(formData);

    if (!data) {
      console.log('No initial data found.');
      return;
    }

    // Merge initial data with formData (user input data)

    console.log('data in handleNsAcademic', data); // Log merged data for debugging

    // Send data to API
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.put(
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
  const applicationNo = cookies().get('applicationNo')?.value as string;
  console.log('appl: ', applicationNo);
  // const applicationNo = 'jee789';
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
      const awsRequest = await upLoadToS3(inputIndex, file);
      // console.log('upload1 executed\n', awsRequest);

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

const globalMap = new Map<String, Map<Number, String>>();
const urlMapSetter = (
  uniqueApplicationNo: String,
  innerKey: Number,
  value: String,
) => {
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

const deleteDBSavedUrlMap = (uniqueApplicationNo: String) => {
  if (globalMap.has(uniqueApplicationNo)) {
    globalMap.delete(uniqueApplicationNo);
    return { status: 'Ok', message: 'Map cleared successfully' };
  } else {
    return { status: 'Error', message: 'Invalid key provided' };
  }
};

// function to upload file to S3
export const upLoadToS3 = async (inputIndex: Number, userFile: File) => {
  const applicationNo = cookies().get('applicationNo')?.value as string;
  // const applicationNo = 'jee789';
  let fileName = documentNameAndTypeSelector(inputIndex).name;
  // console.log('fileName', userFile.name);
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
    urlMapSetter(applicationNo, inputIndex, fileUrl);
    console.log('url map for', applicationNo, '\n', globalMap);
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

  let documents: Document[] = [];
  for (let index = 0; index < 10; index++) {
    const url = urlMapGetter(applicationNo, index);
    if (url.status !== 'Error') {
      documents.push({
        docLink: url.data || '',
        docType: documentNameAndTypeSelector(index).type,
        uploadDate: new Date(),
      });
    } else {
      console.log(`Error fetching url for index ${index}: ${url.message}`);
    }
  }
  console.log('Global Map: ', globalMap);
  const data = await initialStudentData({ studentDocsData: documents });
  console.log('inside savetoDB after setting data', data);
  try {
    const authToken = cookies().get('NSR-Authorization');
    const request = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`,
      data,
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );
    // console.log('request', request);
    const status = request.status;
    if (status === 200) {
      return status;
    } else return status;
  } catch (error) {
    console.error(error);
  }
};

export const nsrFinalSubmit = async () => {
  try {
    const applicationNo = cookies().get('applicationNo');
    const authToken = cookies().get('NSR-Authorization');
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent/${applicationNo?.value}`,
      {},
      {
        headers: {
          'NSR-Authorization': `Bearer ${authToken?.value}`,
        },
      },
    );
    console.log('request', request);
    if (request.status === 200) {
      deleteDBSavedUrlMap(applicationNo?.value as string);
      return request.status;
    } else return request.status;
  } catch (error) {
    console.error('+++++++++++++++Final Submit Error+++++++++++++++\n', error);
  }
};

interface Document {
  docLink: string;
  docType: string;
  uploadDate: Date | null;
}

interface Student {
  jeeApplicationNo: string | null;
  regdNo: string | null;
  ojeeCouncellingFeePaid: string | null; // It was BooleanString in Java but used string due to mismatch in given example
  studentName: string;
  gender: string | null; // Gender enum type in Java
  branchCode: string | null;
  admissionYear: string | null;
  degreeYop: number | null; // Integer in Java
  phNo: string; // Phone number as string to handle leading zeroes
  email: string;
  dob: string | null;
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
  categoryCode: string | null;
  categoryRank: number | null;
  allotmentId: string;

  transportOpted: string | null; // BooleanString in Java
  pickUpPoint: string | null;
  studentDocsData: Document[];
}

const randomNameGenerator = (len: number) => {
  let res = '';
  for (let i = 0; i < len; i++) {
    const random = Math.floor(Math.random() * 27);
    res += String.fromCharCode(97 + random);
  }
  return res;
};

const getStudentDetailsFromBackend = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/test/get-student-test/BTECH/CSIT`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    return;
  }
};

function generateRandomStudentData(data: any, index: number): Student {
  const randomDate = (): Date =>
    new Date(new Date().getTime() - Math.random() * 1e12);
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const randomString = (length: number): string =>
    Math.random()
      .toString(36)
      .substring(2, 2 + length);
  const randomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const hostelOption = Math.random() > 0.5 ? 'YES' : 'NO';
  const Caste = ['GENERAL', 'OBC', 'SC', 'ST'];
  const Religion = ['HINDU', 'MUSLIM', 'CHRISTIAN'];
  return {
    jeeApplicationNo: data.regdNo,
    regdNo: data.regdNo,
    ojeeCouncellingFeePaid: Math.random() > 0.5 ? 'YES' : 'NO',
    studentName: data.name,
    gender: data.gender,
    branchCode: data.branchCode,
    admissionYear: new Date().getFullYear().toString(),
    degreeYop: new Date().getFullYear() + 4,
    phNo: data.phone,
    email: data.email,
    dob: data.dob,
    hostelier: data.hostelier,
    hostelOption: data.hostelier,
    hostelChoice: data.hostelier === 'YES' ? 'ONCAMPUS' : 'NONE',
    transportAvailed: data.transportAvailed,
    status: data.status,
    batchId: data.batchId,
    currentYear: data.currentYear,
    aadhaarNo: data.aadhaarNo,
    indortrng: data.indOrTrng,
    plpoolm: data.plPoolM,
    cfPayMode: data.cfPayMode,
    religion: Religion[Math.floor(Math.random() * Religion.length)],
    rank: randomNumber(1, 1000000),
    rankType: 'JEE',
    course: data.course,
    tfw: Math.random() > 0.5 ? 'TFW' : 'NTFW',
    admissionType: 'JEEMAIN',
    studentType: data.studentType,
    tenthPercentage: randomNumber(60, 100),
    tenthYOP: randomNumber(2015, 2020),
    twelvthPercentage: randomNumber(60, 100),
    twelvthYOP: randomNumber(2017, 2022),
    diplomaPercentage: randomNumber(60, 100),
    diplomaYOP: randomNumber(2017, 2022),
    graduationPercentage: randomNumber(60, 100),
    graduationYOP: randomNumber(2019, 2023),
    fname: `Father${index}`,
    mname: `Mother${index}`,
    lgName: `Guardian${index}`,
    permanentAddress: `Address${randomNumber(1, 50)}`,
    permanentCity: `City${randomNumber(1, 50)}`,
    permanentState: `State${randomNumber(1, 30)}`,
    permanentPincode: randomNumber(100000, 999999),
    parentContact: `87654${randomNumber(10000, 99999)}`,
    parentEmailId: `parent${index}@example.com`,
    presentAddress: null,
    district: `District${randomNumber(1, 50)}`,
    ojeeCounsellingFeePaid: 'YES',
    ojeeRollNo: null,
    ojeeRank: null,
    aieeeRank: String(randomNumber(1, 1000)),
    caste: Caste[Math.floor(Math.random() * Caste.length)],
    categoryCode: null,
    categoryRank: null,
    allotmentId: `Allot${index}`,
    transportOpted: data.transportAvailed,
    pickUpPoint: data.transportAvailed === 'YES' ? 'BBSR' : 'N/A',
    studentDocsData: Array.from({ length: 1 }, () => ({
      docLink: `https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGRvY3VtZW50fGVufDB8fDB8fHwy`,
      docType: 'PassportPhoto',
      uploadDate: randomDate(),
    })),
  };
}

// function generateRandomStudentDataForMe(index: number): Student {
//   const randomDate = (): Date =>
//     new Date(new Date().getTime() - Math.random() * 1e12);
//   const formatDate = (date: Date): string => {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };
//   const randomString = (length: number): string =>
//     Math.random()
//       .toString(36)
//       .substring(2, 2 + length);
//   const randomNumber = (min: number, max: number): number =>
//     Math.floor(Math.random() * (max - min + 1)) + min;
//   const hostelOption = 'NO';

//   return {
//     jeeApplicationNo: `2101289370`,
//     regdNo: `2101289370`,
//     ojeeCouncellingFeePaid: Math.random() > 0.5 ? 'YES' : 'NO',
//     studentName: `Swayam Prakash Mohanty`,
//     gender: 'MALE',
//     branchCode: 'CST',
//     admissionYear: '2021',
//     degreeYop: 2025,
//     phNo: `9938771133`,
//     email: `mohantyswayam2001@gmail.com `,
//     dob: randomDate().toISOString().split('T')[0],
//     hostelier: 'NO',
//     hostelOption,
//     hostelChoice: 'NONE',
//     transportAvailed: 'NO',
//     status: 'CONTINUING',
//     batchId: null,
//     currentYear: randomNumber(1, 4),
//     aadhaarNo: randomNumber(100000000000, 999999999999),
//     indortrng: 'YES',
//     plpoolm: 'YES',
//     cfPayMode: 'SEMESTER',
//     religion: 'HINDU',
//     rank: randomNumber(1, 1000000),
//     rankType: 'JEE',
//     course: 'BTECH',
//     tfw: Math.random() > 0.5 ? 'TFW' : 'NTFW',
//     admissionType: 'JEEMAIN',
//     studentType: 'REGULAR',
//     tenthPercentage: randomNumber(60, 100),
//     tenthYOP: 2018,
//     twelvthPercentage: randomNumber(60, 100),
//     twelvthYOP: 2020,
//     diplomaPercentage: null,
//     diplomaYOP: null,
//     graduationPercentage: randomNumber(60, 100),
//     graduationYOP: 2025,
//     fname: `Father${index}`,
//     mname: `Mother${index}`,
//     lgName: `Guardian${index}`,
//     permanentAddress: `Address${index}`,
//     permanentCity: `City${randomNumber(1, 50)}`,
//     permanentState: `State${randomNumber(1, 30)}`,
//     permanentPincode: randomNumber(100000, 999999),
//     parentContact: `87654${randomNumber(10000, 99999)}`,
//     parentEmailId: `parent${index}@example.com`,
//     presentAddress: null,
//     district: `District${randomNumber(1, 50)}`,
//     ojeeCounsellingFeePaid: 'YES',
//     ojeeRollNo: null,
//     ojeeRank: null,
//     aieeeRank: String(randomNumber(1, 1000)),
//     caste: 'GENERAL',
//     categoryCode: null,
//     categoryRank: null,
//     allotmentId: `Allot${index}`,
//     transportOpted: 'NO',
//     pickUpPoint: null,
//     studentDocsData: Array.from({ length: 3 }, () => ({
//       docLink: `https://images.unsplash.com/photo-1633526543814-9718c8922b7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGRvY3VtZW50fGVufDB8fDB8fHwy`,
//       docType: '10thCertificate',
//       uploadDate: randomDate(),
//     })),
//   };
// }

export const multiStudentRegistration = async () => {
  const dataFromDB = await getStudentDetailsFromBackend();
  if (dataFromDB.length < 0) return;
  else {
    for (let i = 0; i < 5; i++) {
      const data = dataFromDB[i];
      const student: Student = generateRandomStudentData(data, i);
      console.log(student);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND}/NSR/post`,
          student,
        );
        console.log(response.status);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }
};

export const multiFinalSubmit = async () => {
  const dataFromDB = await getStudentDetailsFromBackend();
  if (dataFromDB.length < 0) return;
  else {
    try {
      for (let i = 0; i < 5; i++) {
        const regdNum = dataFromDB[i].regdNo;
        const request = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent/${regdNum}`,
        );
        console.log('request for student', regdNum, 'status:', request.status);
      }
    } catch (error: any) {
      console.log(error);
    }
  }
};
