import React from 'react'
import { CheckCircle } from 'lucide-react'

function VerificationPending() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <CheckCircle className="h-16 w-16 mx-auto animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Activation Pending
        </h2>
        <p className="mb-4">
          Please wait while we activate your account. This may take a few moments.
        </p>
        <p className="text-sm">
          You will be automatically redirected once activation is complete.
        </p>
      </div>
    </div>
  )
}

export default VerificationPending
