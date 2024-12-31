import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface UserType {
    userJobInformationDto: {
      displayName: string | null;
      jobTitle: string;
      department: string;
      employeeId: string;
    };
    collegeInformation: {
      rollNo: number;
      year: number;
      semester: number;
      labGroup: number;
      section: string;
      course: string;
    };
    studentPersonalInformation: {
      presentAddress: string | null;
      phoneNo: string;
      email: string;
      dob: string; // ISO 8601 format: YYYY-MM-DD
    };
    parentsPersonalInformation: {
      motherName: string;
      fatherName: string;
      localGuardianName: string;
      permanentAddress: string;
      phone: string;
      email: string;
    };
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userType?: any;
      menuBlade?: any;
      accessToken?: string | null;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken: string;
    userType: object | null;
    menuBlade: object | null;
  }
}
