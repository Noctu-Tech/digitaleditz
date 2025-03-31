import { z } from "zod"

export const onboardingSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.enum(['residential', 'commercial', 'both'], {
    required_error: 'Please select a business type',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'Please enter a valid city'),
  state: z.string().min(2, 'Please enter a valid state'),
  zip: z.string().regex(/^\d{6}?$/, 'Invalid ZIP code format'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  whatsAppPhone: z.string().regex(/^\d{10}$/, 'WhatsApp number must be 10 digits').optional(),
  email: z.string().email('Invalid email address'),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>
