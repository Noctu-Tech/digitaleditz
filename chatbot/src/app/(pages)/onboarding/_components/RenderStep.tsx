import { OnboardingFormData } from "@/schema/onboarding";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import BusinessInfo from "./BusinessInfo";
import AddressInfo from "./AddressInfo";
import {ServicesInfo} from "./ServicesInfo";
import ContactInfo from "./ContactInfo";
import SubmitTab from "../../verification/SubmitTab";
interface RenderStepContentProps {
  step: number;
  form: UseFormReturn<OnboardingFormData>;
}

function RenderStepContent({ step, form }: RenderStepContentProps) {
  switch (step) {
    case 0:
      return <BusinessInfo form={form} />;
    case 1:
      return <AddressInfo form={form} />;
    case 2:
      return <ServicesInfo form={form} />;
    case 3:
      return <ContactInfo form={form} />;
    default:
      return <>Onboarding</>;
  }
};

export default RenderStepContent;