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
  // section: z.string(),
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

export const studentSectionData = z.object({
  collegeRollNo: z.number(),
  regdNo: z.string(),
  labGroup: z.number(),
});

export const ongoingSessionsSchema = z.object({
  sessionId: z.string(),
  startDate: z.string(),
  endDate: z.string() || null,
  course: z.string(),
  regdYear: z.number(),
  prevSessionId: z.string(),
  admissionYear: z.number(),
  studentType: z.string(),
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
export type StudentSectionData = z.infer<typeof studentSectionData>;
export type OngoingSessions = z.infer<typeof ongoingSessionsSchema>;
