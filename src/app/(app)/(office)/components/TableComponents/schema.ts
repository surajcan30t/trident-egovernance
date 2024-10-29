import { z } from 'zod';

export const taskSchema = z.object({
  regdNo: z.string(),
  studentName: z.string(),
  course: z.string(),
  branchCode: z.string(),
  phNo: z.string(),
  email: z.string(),
  studentType: z.string(),
  currentYear: z.string(),
});

export type Students = z.infer<typeof taskSchema>;
