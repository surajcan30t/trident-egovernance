import { z } from 'zod';

export const studentSchema = z.object({
  regdNo: z.string(),
  studentName: z.string(),
  course: z.string(),
  branchCode: z.string(),
  phNo: z.string(),
  email: z.string(),
  studentType: z.string(),
  currentYear: z.string(),
});

export const admissionReportSchema = z.object({
  course: z.string(),
  branch: z.string(),
  studentType: z.string(),
  generalMale: z.number(),
  generalFemale: z.number(),
  OBCMale: z.number(),
  OBCFemale: z.number(),
  SCMale: z.number(),
  SCFemale: z.number(),
  STMale: z.number(),
  STFemale: z.number(),
  minorityMale: z.number(),
  minorityFemale: z.number(),
  TFWMale: z.number(),
  TFWFemale: z.number(),
  NTFWMale: z.number(),
  NTFWFemale: z.number(),
  totalMale: z.number(),
  totalFemale: z.number(),
  totalStudents: z.number(),
});

export const totalAdmissionReportSchema = z.object({
  admissionYear: z.string(),
  course: z.string(),
  branch: z.string(),
  studentType: z.string(),
  totalAdmissions: z.number(),
});

export const sessionWiseStudentReport = z.object({
  sessionId: z.string(),
  course: z.string(),
  branch: z.string(),
  studentType: z.string(),
  courseYear: z.number(),
  noOfMales: z.number(),
  noOfFemales: z.number(),
  totalStudents: z.number(),
});

export type Students = z.infer<typeof studentSchema>;
export type AdmissionReport = z.infer<typeof admissionReportSchema>;
export type TotalAdmissionsReport = z.infer<typeof totalAdmissionReportSchema>;
export type SessionwiseReport = z.infer<typeof sessionWiseStudentReport>;
