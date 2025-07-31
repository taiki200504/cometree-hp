"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-mono flex items-center justify-center">
          <div className="text-center p-8 bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-lg max-w-md">
            <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-400 mb-2">エラーが発生しました</h2>
            <p className="text-sm opacity-75 mb-6">
              予期しないエラーが発生しました。ページを再読み込みしてください。
            </p>
            <div className="space-y-4">
              <Button
                onClick={this.handleRetry}
                className="bg-blue-400/20 text-blue-400 border-blue-400/30 hover:bg-blue-400/30"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                再試行
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
              >
                ページを再読み込み
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-blue-400">エラー詳細</summary>
                <pre className="mt-2 text-xs bg-black/50 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 