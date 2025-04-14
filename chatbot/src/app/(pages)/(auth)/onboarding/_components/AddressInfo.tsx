import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { OnboardingFormData } from "@/schema/onboarding"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

function AddressInfo({form}:{form:UseFormReturn<OnboardingFormData>}) {
  return (
    <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Location Details</h2>
    {['address', 'city', 'state', 'zip'].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as keyof OnboardingFormData}
            rules={{ required: `${field} is required` }}
            render={({ field: { value, ...fieldProps } }) => (
          <FormItem>
            <FormLabel className="capitalize">{field}</FormLabel>
            <FormControl>
              <Input {...fieldProps} value={value as string} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </div>  )
}

export default AddressInfo
