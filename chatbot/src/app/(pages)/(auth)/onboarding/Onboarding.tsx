'use client'
import { useCallback, useState } from 'react'
import { useForm} from 'react-hook-form'
import { Building2, MapPin, Settings, ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { handleOnboarding } from '@/lib/functions/onboarding'
import { OnboardingFormData} from '@/schema/onboarding'
import { Form } from '@/components/ui/form'
import RenderStepContent from './_components/RenderStepContent'

function Onboarding() {
  const [activeStep, setActiveStep] = useState(0)
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      businessType: 'residential',
      services: [],
      employees: '1-10' as const,
    }
    
  })

  const steps = ['Business Info', 'Location', 'Services',  'Confirmation']
  const stepIcons = [
    Building2 ,
    MapPin ,
    Settings ,
    Send
  ]

  const router = useRouter();
  const {mutate, isPending} = useMutation({
    mutationFn: handleOnboarding,
    onSuccess: () => {
      const formData = form.getValues();
      const params = new URLSearchParams({
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName
      }).toString();
      toast.success("OnBoarding completed Successfully", {id: "user-onboard"});
      router.push(`/verification?${params}`);
    },
    onError: () => {
      toast.error("Failed to OnBoard", {id: "user-onboard"})
        }
  })

  const onSubmit = useCallback((values: OnboardingFormData) => {
     toast.loading("Storing Credentials...", {id: "user-onboard"});
     mutate(values)
   }, [mutate])

  const validateStep = async (step: number) => {
    let fieldsToValidate: (keyof OnboardingFormData)[] = [];
    
    switch (step) {
      case 0:
        fieldsToValidate = ['businessName', 'businessType', 'description','employees', 'website', 'socialMedia'];
        break;
      case 1:
        fieldsToValidate = ['address', 'city', 'state', 'zip'];
        break;
      case 2:
        fieldsToValidate = ['services'];
        break;
      case 3:
        fieldsToValidate = ['phone', 'email'];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(activeStep);
    
    if (!isValid) {
      toast.error("Please fill all required fields correctly", {
        id: "validation-error",
      });
      return;
    }
    
    setActiveStep((prev) => prev + 1);
  };

 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Real Estate Business Onboarding
      </h1>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center mb-8">
                {steps.map((label, index) => {
                 const Icon=stepIcons[index]
                  return (
                  <div
                    key={label}
                    className={`flex items-center ${
                      index < steps.length - 1 ? 'mr-4' : ''
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        activeStep >= index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                  
          <Icon size={24} />
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-[2px] w-16 mx-2 ${
                          activeStep > index ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                )})}
              </div>

              <RenderStepContent step={activeStep} form={form}/>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button type="submit">
                    {isPending?"Storing Credentials...":<>Submit
                      <Send className="ml-2 h-4 w-4" /></>}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isPending}
                  >
                    {isPending ? (
                      toast.loading("Validating...",{id:"validation-error"})
                    ) : (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Onboarding
