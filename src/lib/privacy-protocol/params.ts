/**
 * Privacy Protocol — Zod schemas for API query parameter validation
 */

import { z } from "zod"

export const JURISDICTION_RISK_VALUES = [
  "low",
  "medium",
  "high",
  "five_eyes",
  "fourteen_eyes",
] as const

/** "ado_score" is a deprecated alias of "picks", kept so existing clients keep working. */
export const SORT_VALUES = [
  "picks",
  "ado_score",
  "name",
  "recently_verified",
  "recently_added",
] as const

/**
 * Zod schema for GET /api/v1/tools query params.
 * Array params (jurisdiction_risk) accept a single value or multiple values
 * (caller should use searchParams.getAll() before passing in).
 */
export const toolSearchParamsSchema = z.object({
  q: z.string().max(200).optional(),
  category: z.string().max(100).optional(),
  is_open_source: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  has_free_tier: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  e2ee: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  jurisdiction_risk: z.array(z.enum(JURISDICTION_RISK_VALUES)).optional(),
  sort: z.enum(SORT_VALUES).default("picks"),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  offset: z.coerce.number().int().min(0).default(0),
})

export type ToolSearchParams = z.infer<typeof toolSearchParamsSchema>
