'use client'

import { SignUp, useUser } from '@clerk/nextjs'

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useUser()

  // Wait until Clerk finishes loading user state
  if (!isLoaded) return <div>Loading...</div>

  // If the user is already signed in, show a welcome message
  if (isSignedIn) {
    return (
      <div className="p-8 text-center text-2xl">
        You are already signed in! Welcome back.
      </div>
    )
  }

  // User is not signed in, show the sign-up form
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create an account</h1>
      <SignUp path="/sign-up" routing="path" />
    </div>
  )
}
