import * as v from 'valibot'

export const itemsSearchSchema = v.object({
  page: v.pipe(v.string(), v.transform(Number), v.number()),
  q: v.optional(v.string()),
})

export type ItemsSearch = v.InferOutput<typeof itemsSearchSchema>
