import { useSyncExternalStore } from 'react'
import { ToastView, type ToastPayload } from '@ui/toast'

type Listener = () => void

const toasts: ToastPayload[] = []
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((l) => {
    l()
  })
}

export function toast(payload: Omit<ToastPayload, 'id'> & { id?: string }) {
  const id = payload.id ?? crypto.randomUUID()
  toasts.push({ ...payload, id })
  emit()
  return id
}

export function subscribeToasts(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getToastsSnapshot(): ToastPayload[] {
  return toasts
}

export function Toaster() {
  const list = useSyncExternalStore(subscribeToasts, getToastsSnapshot, getToastsSnapshot)
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%-2rem,20rem)] flex-col gap-2">
      {list.map((t) => (
        <ToastView key={t.id} toast={t} />
      ))}
    </div>
  )
}
