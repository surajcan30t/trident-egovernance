import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string(),
  regdNo: z.string(),
  name: z.string(),
  email: z.string(),
});

export type Students = z.infer<typeof taskSchema>;
