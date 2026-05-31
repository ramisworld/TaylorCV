import type { z } from "zod";

import type {
  ButtonAnswerSchema,
  CvLayoutStyleOutputSchema,
  ImportanceSchema,
  LayoutArchitectureSchema,
  ProofStyleSchema,
  RoleFamilySchema,
  SectionBudgetTreatmentSchema,
  RequirementTypeSchema,
} from "~/lib/schemas";

export type RequirementType = z.infer<typeof RequirementTypeSchema>;
export type Importance = z.infer<typeof ImportanceSchema>;
export type RoleFamily = z.infer<typeof RoleFamilySchema>;
export type ProofStyle = z.infer<typeof ProofStyleSchema>;
export type SectionBudgetTreatment = z.infer<
  typeof SectionBudgetTreatmentSchema
>;
export type LayoutArchitecture = z.infer<typeof LayoutArchitectureSchema>;
export type ButtonAnswer = z.infer<typeof ButtonAnswerSchema>;

export type CvLayoutStyleOutput = z.infer<typeof CvLayoutStyleOutputSchema>;
