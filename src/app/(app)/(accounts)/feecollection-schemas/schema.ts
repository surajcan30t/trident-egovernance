import { z } from 'zod';

export const StudentDuesDetailsSchema = z.object({
  name: z.string(),
  regdNo: z.string(),
  regdYear: z.number(),
  course: z.string(),
  branch: z.string(),
  arrearsDue: z.number(),
  currentDues: z.number(),
  totalDues: z.number(),
  arrearsPaid: z.number(),
  currentDuesPaid: z.number(),
  totalPaid: z.number(),
  amountDue: z.number(),
  phNo: z.string(),
  parentContact: z.string(),
});

export type StudentDuesDetails = z.infer<typeof StudentDuesDetailsSchema>;
