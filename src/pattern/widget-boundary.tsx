import { type ReactNode, Component, type ErrorInfo } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@ui/alert'

type WidgetBoundaryState = { error: Error | null }

export class WidgetBoundary extends Component<{ children: ReactNode }, WidgetBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): WidgetBoundaryState {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[widget-boundary]', error, info)
    }
  }

  override render() {
    if (this.state.error) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Widget failed</AlertTitle>
          <AlertDescription>{this.state.error.message}</AlertDescription>
        </Alert>
      )
    }
    return this.props.children
  }
}
