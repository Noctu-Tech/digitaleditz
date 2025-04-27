"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UpdateProperty } from "@/lib/functions/property/updateProperty"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PropertyFormValues, propertySchema } from "@/schema/property"

function EditPropertyDialog({triggerText, propertyValues, propertyId}:{triggerText?:string, propertyValues?:PropertyFormValues, propertyId?:string}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPendingTransition, startTransition] = useTransition();
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: propertyValues || {
      title: "",
      status: "",
      length: "",
      width: "",
      front: "",
      direction: "",
      facing: "",
      unit: "",
      area: "",
      price: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      description: "",
      type: "residential",
    },
  });

  // Set form values when propertyValues changes
  useEffect(() => {
    if (propertyValues) {
      form.reset(propertyValues);
    }
  }, [propertyValues, form]);
  
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: { form: PropertyFormValues, propertyId: string }) => 
      UpdateProperty(variables.form, variables.propertyId),
    onSuccess: () => {
      toast.success("Property updated", { id: "update-property" });
      setOpen(false);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Failed to update property", { id: "update-property" });
      setIsSubmitting(false);
    }
  });

  const onSubmit = useCallback((values: PropertyFormValues) => {
    if (!propertyId) {
      toast.error("Property ID is required for updating");
      return;
    }
    
    toast.loading("Updating Property...", { id: "update-property" });
    setIsSubmitting(true);
    mutate({ form: values, propertyId });
  }, [mutate, propertyId]);

  const resetForm = useCallback(() => {
    if (propertyValues) {
      form.reset(propertyValues);
    } else {
      form.reset();
    }
    setIsSubmitting(false);
  }, [form, propertyValues]);
  
  const handleDialogChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open && !isSubmitting) {
      resetForm();
    }
  }, [resetForm, isSubmitting]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText || 'Edit Property'}</Button>
      </DialogTrigger>
      <DialogContent className="p-4 max-h-[90vh] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        <DialogDescription>Update your property details</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[50vh]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Property title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="for-sale">For Sale</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="for-rent">For Rent</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="front"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Front</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="direction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Direction</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select direction" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['North', 'South', 'East', 'West'].map(dir => (
                              <SelectItem key={dir} value={dir.toLowerCase()}>{dir}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facing</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select facing" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['Main Road', 'Park', 'Street', 'Corner'].map(face => (
                              <SelectItem key={face} value={face.toLowerCase()}>{face}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="agricultural">Agricultural</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ft">ft</SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="yard">yard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                        <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <h3 className="text-xl font-semibold col-span-2">Location Details</h3>
                  {['address', 'city', 'state', 'zip'].map((fieldName) => (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName as keyof PropertyFormValues}
                      render={({ field }) => (
                        <FormItem className={fieldName === 'address' ? "col-span-2" : ""}>
                          <FormLabel className="capitalize">{fieldName}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                  ))}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="min-h-[100px] rounded-md border p-3 w-full"
                            placeholder="Property description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Property"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPropertyDialog