import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { OnboardingFormData } from "@/schema/onboarding";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface ServicesInfoProps {
  form: UseFormReturn<OnboardingFormData>;
}

const ServicesInfo: React.FC<ServicesInfoProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Services Offered</h2>
      <FormField
        control={form.control}
        name="services"
        rules={{ required: "At least one service is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services</FormLabel>
            <Select onValueChange={(value) => {
              const currentServices = field.value || [];
              const updatedServices = currentServices.includes(value)
                ? currentServices.filter(service => service !== value)
                : [...currentServices, value];
              field.onChange(updatedServices);
            }}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select services" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="buying">Buying</SelectItem>
                <SelectItem value="selling">Selling</SelectItem>
                <SelectItem value="renting">Renting</SelectItem>
                <SelectItem value="property-management">Property Management</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="all">All of the Above</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export { ServicesInfo};
