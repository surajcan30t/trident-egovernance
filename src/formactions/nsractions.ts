'use server';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

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
  } catch (error) {
    console.log(error);
  }
};

// function to get initial student data if exist and update with user input
const initialStudentData = async (formData: any) => {
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
    // console.log('Data in initialStudentData function', data);
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

// export const handleNsPersonal = async (formData: any, initial: any) => {
//   const data = {
//     jeeApplicationNo: initial.jeeApplicationNo,
//     studentName: initial.studentName,
//     gender: initial.gender,
//     course: initial.course,
//     branch: initial.branch,
//     tfw: initial.tfw,
//     admissionType: initial.admissionType,
//     studentType: initial.studentType,
//     rollNo: initial.rollNo,
//     rank: initial.rank,
//     allotmentId: initial.allotmentId,
//     fname: formData.fname,
//     mname: formData.mname,
//     lgName: formData.lgName,
//     permanentCity: formData.permanentCity,
//     permanentState: formData.permanentState,
//     permanentAddress: formData.permanentAddress,
//     district: formData.district,
//     phNo: formData.phNo,
//     email: formData.email,
//     parentContact: formData.parentContact,
//     parentEmailId: formData.parentEmailId,
//     caste: formData.caste,
//     permanentPincode: formData.permanentPincode,
//     aadhaarNo: formData.aadhaarNo,
//     religion: formData.religion,
//   }
//   console.log(data)
//   try {
//     const authToken = cookies().get('NSR-Authorization');
//     const request = axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent`, data, {
//       headers: {
//         'NSR-Authorization': `Bearer ${authToken?.value}`,
//       },
//     })
//     console.log((await request).data)
//     return (await request).status
//   } catch (error) {
//     console.log(error)
//   }
// };

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

export const nsrFinalSubmit = async () => {
  try {
    const applicationNo = cookies().get('applicationNo');
    const authToken = cookies().get('NSR-Authorization');
    const request = axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/NSR/postByStudent/${applicationNo?.value}`,
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
