import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { OnboardingFormData } from "@/schema/onboarding";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react"; // Add this import

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
            {/* Add this section to display selected services */}
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {(field.value || []).map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1"
                  >
                    <span className="capitalize">
                      {service.replace(/-/g, ' ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedServices = field.value?.filter(s => s !== service) || [];
                        field.onChange(updatedServices);
                      }}
                      className="text-primary hover:text-primary/80"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export { ServicesInfo };
