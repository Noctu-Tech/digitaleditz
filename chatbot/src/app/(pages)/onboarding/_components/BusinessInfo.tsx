import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { OnboardingFormData } from '@/schema/onboarding'
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

function BusinessInfo({form}:{form:UseFormReturn<OnboardingFormData>}){
  return (<div className="space-y-4">
    <h2 className="text-2xl font-semibold">Business Information</h2>
    <FormField
      control={form.control}
      name="businessName"
      rules={{ required: "Business name is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="businessType"
      rules={{ required: "Business type is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="description"
      rules={{ required: "Business description is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe your business and services..."
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  )
}

export default BusinessInfo
