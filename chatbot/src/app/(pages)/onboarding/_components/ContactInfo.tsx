import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { OnboardingFormData } from "@/schema/onboarding"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"


function ContactInfo({form}:{form:UseFormReturn<OnboardingFormData>}) {
  return (
<div className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <FormField
              control={form.control}
              name="phone"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your business phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsAppPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter WhatsApp number for automation" />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    This number will be used for automated updates and notifications
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter your business email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
  )
}

export default ContactInfo
