import { z } from 'zod';

export const StudentDuesDetailsSchema = z.object({
  name: z.string(),
  regdNo: z.string(),
  regdYear: z.string(),
  course: z.string(),
  branch: z.string(),
  arrearsDue: z.string(),
  currentDues: z.string(),
  totalDues: z.string(),
  arrearsPaid: z.string(),
  currentDuesPaid: z.string(),
  totalPaid: z.string(),
  amountDue: z.string(),
  phNo: z.string(),
  parentContact: z.string(),
});

export type StudentDuesDetails = z.infer<typeof StudentDuesDetailsSchema>;
