import { z } from 'zod';

export const feedetailsSchema = z.object({
  paymentDate: z.string(),
  paymentMode: z.string(),
  particulars: z.string(),
  totalAmount: z.number(),
  sem: z.number(),
});

export type FeesDetailsSchema = z.infer<typeof feedetailsSchema>;
