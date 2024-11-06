import { z } from 'zod';

//   interface Document {
//   docLink: string;
//   docType: string;
//   uploadDate: Date | null;
// }
export const documentSchema = z.object({
  docId: z.number(),
  docLink: z.string(),
  docType: z.string(),
  uploadDate: z.date().nullable(),
});

export const studentOnlySchema = z.object({
  regdNo: z.string(),
  studentName: z.string(),
  gender: z.string(),
  dob: z.string(),
  course: z.string(),
  branchCode: z.string(),
  admissionYear: z.string(),
  degreeYop: z.number(),
  phNo: z.string(),
  email: z.string().email(),
  studentType: z.string(),
  hostelier: z.string(),
  transportAvailed: z.string(),
  status: z.string(),
  batchId: z.string(),
  currentYear: z.number(),
  aadhaarNo: z.number(),
  indortrng: z.string(),
  plpoolm: z.string(),
  cfPayMode: z.string(),
  religion: z.string(),
  section: z.string(),
});

export const personalDetailsOnlySchema = z.object({
  regdNo: z.string(),
  fname: z.string(), // Father's name
  mname: z.string(), // Mother's name
  lgName: z.string(), // Legal guardian's name
  permanentAddress: z.string(),
  permanentCity: z.string(),
  permanentState: z.string(),
  district: z.string(),
  permanentPincode: z.number(), // Using number for pincode
  parentContact: z.string(), // Phone number as a string to handle leading zeroes
  parentEmailId: z.string().email(), // Validates email format
  presentAddress: z.string(), // Nullable to allow null values
});

export const studentAdmissionDetailsOnlySchema = z.object({
  regdNo: z.string(),
  admissionDate: z.string(), // Nullable to allow null values
  ojeeCounsellingFeePaid: z.string(), // Assuming "YES" or "NO" as string values
  tfw: z.string(), // Nullable to allow "NTFW" or similar values
  admissionType: z.string(), // Nullable to allow values like "OJEE"
  ojeeRollNo: z.string().optional(),
  ojeeRank: z.string().optional(),
  aieeeRank: z.string().optional(),
  caste: z.string(),
  reportingDate: z.string().optional(),
  categoryCode: z.string().optional(),
  categoryRank: z.number().optional(),
  jeeApplicationNo: z.string(),
  allotmentId: z.string(),
});

export const studentCareerOnlySchema = z.object({
  regdNo: z.string(),
  tenthPercentage: z.string(), // Assuming this is a mandatory field
  tenthYOP: z.string(), // Year of Passing for 10th, assuming mandatory
  twelvthPercentage: z.string().optional(), // 12th percentage, assuming mandatory
  twelvthYOP: z.string().optional(), // Year of Passing for 12th, assuming mandatory
  diplomaPercentage: z.string().optional(), // Nullable to allow null values if diploma wasn't pursued
  diplomaYOP: z.string().optional(), // Nullable for the Year of Passing of diploma
  graduationPercentage: z.string().optional(), // Nullable to allow null values if graduation wasn't pursued
  graduationYOP: z.string().optional(), // Nullable for the Year of Passing of graduation
});

export const hostelOnlySchema = z.object({
  regdNo: z.string(),
  hostelier: z.string(), // Assuming values like "YES" or "NO"
  hostelOption: z.string(), // Assuming values like "YES" or "NO"
  hostelChoice: z.string(), // Choice of hostel, assuming it's a string
  lgName: z.string(), // Legal guardian's name
  regdyear: z.number(), // Registration year as a number
});

export const transportOnlySchema = z.object({
  regdNo: z.string(),
  transportAvailed: z.string(), // Assuming values like "YES" or "NO"
  transportOpted: z.string(), // Assuming values like "YES" or "NO"
  route: z.string(), // Route as a string, assuming values like "N/A" or specific routes
  pickUpPoint: z.string(), // Pickup location as a string
  regdYear: z.number(), // Registration year as a number
});

export const studentreportSchema = z.object({
  studentOnlyDTO: studentOnlySchema,
  personalDetailsOnlyDTO: personalDetailsOnlySchema,
  studentAdmissionDetailsOnlyDTO: studentAdmissionDetailsOnlySchema,
  studentCareerOnlyDTO: studentCareerOnlySchema,
  hostelOnlyDTO: hostelOnlySchema,
  transportOnlyDTO: transportOnlySchema,
  studentDocsOnlyDTOS: z.array(documentSchema),
});

export type StudentReport = z.infer<typeof studentreportSchema>;
export type StudentOnly = z.infer<typeof studentOnlySchema>;
export type PersonalDetailsOnly = z.infer<typeof personalDetailsOnlySchema>;
export type StudentAdmissionDetailsOnly = z.infer<
  typeof studentAdmissionDetailsOnlySchema
>;
export type CareerOnly = z.infer<typeof studentCareerOnlySchema>;
export type HostelOnly = z.infer<typeof hostelOnlySchema>;
export type TransportOnly = z.infer<typeof transportOnlySchema>;
export const documentsSchema = z.array(documentSchema);
export type Documents = z.infer<typeof documentsSchema>;

// jeeApplicationNo: z.string(),
//   regdNo: z.string(),
//   admissionDate: z.date(),
//   ojeeCouncellingFeePaid: z.string().nullable(), // Originally BooleanString in Java, so allowing string and null
//   studentName: z.string(),
//   gender: z.string().nullable(), // Originally an enum in Java, allowing string and null
//   branchCode: z.string().nullable(),
//   admissionYear: z.string().nullable(),
//   degreeYop: z.number().nullable(), // Originally Integer in Java, allowing null
//   phNo: z.string(), // To handle leading zeroes
//   email: z.string().email(),
//   dob: z.string().nullable(),
//   rollNo: z.string(),
//   hostelier: z.string().nullable(), // BooleanString type in Java, allowing string and null
//   hostelOption: z.string().nullable(), // BooleanString type in Java
//   hostelChoice: z.string().nullable(), // Assuming a string type
//   transportAvailed: z.string().nullable(), // BooleanString type in Java
//   status: z.string().nullable(),
//   batchId: z.string().nullable(),
//   currentYear: z.number().nullable(),
//   aadhaarNo: z.number(), // Long in Java
//   indortrng: z.string().nullable(), // BooleanString type in Java
//   plpoolm: z.string().nullable(), // BooleanString type in Java
//   cfPayMode: z.string().nullable(), // CfPaymentMode type in Java, simplified as string
//   religion: z.string().nullable(), // Enum type in Java, simplified as string
//   rank: z.number().nullable(), // Long in Java
//   rankType: z.string().nullable(), // RankType in Java, simplified as string
//   course: z.string(), // Enum in Java, simplified as string
//   tfw: z.string().nullable(), // Enum in Java
//   admissionType: z.string().nullable(), // Enum in Java
//   studentType: z.string().nullable(), // Enum in Java
//
//   tenthPercentage: z.number().nullable(),
//   tenthYOP: z.number().nullable(),
//   twelvthPercentage: z.number().nullable(),
//   twelvthYOP: z.number().nullable(),
//   diplomaPercentage: z.number().nullable(),
//   diplomaYOP: z.number().nullable(),
//   graduationPercentage: z.number().nullable(),
//   graduationYOP: z.number().nullable(),
//
//   fname: z.string(), // Father's name
//   mname: z.string(), // Mother's name
//   lgName: z.string(), // Legal guardian's name
//   permanentAddress: z.string(),
//   permanentCity: z.string(),
//   permanentState: z.string(),
//   permanentPincode: z.number(),
//   parentContact: z.string(), // Phone number as string
//   parentEmailId: z.string().email(),
//   presentAddress: z.string().nullable(),
//   district: z.string(),
//
//   ojeeCounsellingFeePaid: z.string().nullable(),
//   ojeeRollNo: z.string().nullable(),
//   ojeeRank: z.string().nullable(),
//   aieeeRank: z.string().nullable(),
//   caste: z.string(),
//   reportingDate: z.date().nullable(),
//   categoryCode: z.string().nullable(),
//   categoryRank: z.number().nullable(),
//   allotmentId: z.string(),
//
//   transportOpted: z.string().nullable(), // BooleanString in Java
//   pickUpPoint: z.string().nullable(),
//   studentDocsData: z.array(DocumentSchema)
