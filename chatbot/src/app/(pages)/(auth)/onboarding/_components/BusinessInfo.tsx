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
              <SelectItem value="agricultural">Agricultural</SelectItem>
              <SelectItem value="all">All</SelectItem>
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
    <FormField
      control={form.control}
      name="foundedYear"
      rules={{ required: "Founded year is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Founded Year</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="employees"
      rules={{ required: "Number of employees is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Employees</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select employee range" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="10-50">10-50</SelectItem>
              <SelectItem value="50-200">50-200</SelectItem>
              <SelectItem value="200+">200+</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="website"
      rules={{ required: "Website is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input placeholder="https://www.example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="socialMedia.linkedin"
      render={({ field }) => (
        <FormItem>
          <FormLabel>LinkedIn Profile</FormLabel>
          <FormControl>
            <Input placeholder="www.example.com/company-name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="socialMedia.instagram"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Instagram Handle</FormLabel>
          <FormControl>
            <Input placeholder="www.example.com/handle" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  )
}

export default BusinessInfo
