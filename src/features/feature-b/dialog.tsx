import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import * as v from 'valibot'
import { Button } from '@ui/button'
import { Dialog, DialogContent } from '@ui/dialog'
import { PatternForm, PatternTextField } from '@pattern/form'
import type { UnknownForm } from '@pattern/form.contexts'
import { featureBDialogSchema } from '@features/feature-b/schemas'
import { toast } from '@ui/toaster'

export function FeatureBDialogTrigger() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    defaultValues: { label: '' },
    onSubmit: async ({ value }) => {
      const parsed = v.parse(featureBDialogSchema, value)
      toast({ title: 'Saved', description: parsed.label })
      setOpen(false)
      form.reset()
    },
  })

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Open sample dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Sample" description="Neutral dialog for feature-b">
          <PatternForm form={form as unknown as UnknownForm}>
            <PatternTextField name="label" label="Label" />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </PatternForm>
        </DialogContent>
      </Dialog>
    </>
  )
}
