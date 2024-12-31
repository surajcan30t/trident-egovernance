import { z } from 'zod';

export const feedetailsSchema = z.object({
  mrNo: z.number(),
  collectedFee: z.number(),
  paymentMode: z.string(),
  // ddNo: z.string(),
  // ddDate: z.string(),
  // ddBank: z.string(),
  paymentDate: z.string(),
  dueYear: z.number(),
  sessionId: z.string(),
  regdNo: z.string(),
});

export type FeesDetailsSchema = z.infer<typeof feedetailsSchema>;
