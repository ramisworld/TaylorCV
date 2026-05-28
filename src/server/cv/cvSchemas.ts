/**
 * CV Schemas
 *
 * This file will contain Zod schemas for CV data structures.
 * To be implemented as part of the new CV workflow.
 */

import { z } from "zod";

// Placeholder schemas - to be implemented
export const CvDataSchema = z.object({
  placeholder: z.string().optional(),
});

export type CvData = z.infer<typeof CvDataSchema>;
