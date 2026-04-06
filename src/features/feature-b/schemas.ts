import * as v from 'valibot'

export const featureBDialogSchema = v.object({
  label: v.pipe(v.string(), v.minLength(1, 'Required')),
})

export type FeatureBDialogValues = v.InferOutput<typeof featureBDialogSchema>
