import 'next-auth';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

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

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userType?: any;
      menuBlade?: any;
      accessToken?: string | null;
      graphToken?: string | null;
    } & DefaultSession['user'];
  }

  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    graphToken: string | null;
    userType: {
      userJobInformationDto: {
        jobTitle: string;
      };
      // other user type fields
    };
    menuBlade: {
      // menu blade structure
      items?: Array<{
        id: string;
        title: string;
        // other menu item fields
      }>;
    } | null;
    // Remove default fields if you don't want them
    email?: never;
    name?: never;
    picture?: never;
    sub?: never;
  }
}
