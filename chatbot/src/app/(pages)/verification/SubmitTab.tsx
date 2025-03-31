"use client"
import { OnboardingFormData, onboardingSchema } from "@/schema/onboarding"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

function SubmitTab() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const form = useForm<Pick<OnboardingFormData, 'email' | 'phone' | 'businessName'>>({
    resolver: zodResolver(
      onboardingSchema.pick({
        email: true,
        phone: true,
        businessName: true,
      })
    ),
    defaultValues: {
      email: searchParams.get('email') || '',
      phone: searchParams.get('phone') || '',
      businessName: searchParams.get('businessName') || '',
    }
  })
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="p-6 bg-card text-card-foreground shadow-lg rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Welcome {form.getValues('businessName')}!</h2>
        <div className="space-y-4 text-left">
          <p className="text-muted-foreground">
            We've received your business information and our team will review it shortly.
          </p>
          <p className="text-muted-foreground">
            You will receive a verification email at{' '}
            <span className="font-medium text-foreground">{form.getValues('email')}</span>
          </p>
          <p className="text-muted-foreground">
            Our team will contact you at{' '}
            <span className="font-medium text-foreground">{form.getValues('phone')}</span>
            {' '}within 24-48 hours to complete the verification process and set up your business profile.
          </p>
        </div>
        <Button 
          className="w-full mt-6" 
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default SubmitTab
