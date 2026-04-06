import * as v from 'valibot'

export const featureAFilterSchema = v.object({
  tag: v.optional(v.string()),
})

export type FeatureAFilter = v.InferOutput<typeof featureAFilterSchema>
