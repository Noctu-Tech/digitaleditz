"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateProperty } from "@/lib/functions/property/createProperty"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PropertyFormValues, propertySchema } from "@/schema/property"
import { ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { handleImageUpload } from "@/lib/functionapis/uploadMedia"

function AddNew({triggerText}:{triggerText?:string}) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Add isPending state for React 18 transitions
  const [isPendingTransition, startTransition] = useTransition();
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
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
      // images: [],
      type: "residential",
     
    },
  });

  // // Handle image uploads asynchronously when images are selected
  // useEffect(() => {
  //   const uploadImagesIfNeeded = async () => {
  //     if (selectedImages.length > 0 && !isUploaded && !isSubmitting) {
  //       // Don't start new uploads if we're submitting the form
  //       try {
  //         const urls = await uploadImages();
  //         if (urls && urls.length > 0) {
  //           setIsUploaded(true);
  //         }
  //       } catch (error) {
  //         console.error("Background image upload failed:", error);
  //         // Don't show toast here since we're doing this in the background
  //       }
  //     }
  //   };

  //   uploadImagesIfNeeded();
  // }, [selectedImages, isUploaded, isSubmitting]);

  // const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || [])
  //   if (files.length) {
  //     setSelectedImages(prev => [...prev, ...files])
      
  //     // Use startTransition for non-urgent UI updates to prevent blocking
  //     startTransition(() => {
  //       const newPreviewUrls = files.map(file => URL.createObjectURL(file))
  //       setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  //     });
      
  //     setIsUploaded(false); // Reset upload state
  //   }
  // }, []);

  // const removeImage = useCallback((index: number) => {
  //   setSelectedImages(prev => prev.filter((_, i) => i !== index))
  //   setPreviewUrls(prev => {
  //     const urlToRemove = prev[index];
  //     // Clean up the URL in a transition to avoid blocking the UI
  //     startTransition(() => {
  //       URL.revokeObjectURL(urlToRemove)
  //     });
  //     return prev.filter((_, i) => i !== index)
  //   })
    
  //   // If we've already uploaded, we need to update the uploaded state
  //   if (isUploaded) {
  //     setImageUrls(prev => prev.filter((_, i) => i !== index));
  //     // If all images were removed, reset uploaded state
  //     if (selectedImages.length <= 1) {
  //       setIsUploaded(false);
  //     }
  //   }
  // }, [selectedImages.length, isUploaded]);
  
  const {mutate, isPending,isError,isIdle,isPaused,isSuccess} = useMutation({
    mutationFn: CreateProperty,
    onSuccess: () => {
      toast.success("Property created", { id: "create-property" })
      form.reset()
      setSelectedImages([])
      setPreviewUrls([])
      setOpen(false)
      setIsSubmitting(false)
    },
    onError: () => {
      toast.error("Failed to create property", { id: "create-property" })
      setIsSubmitting(false)
    }
  });
console.log(isError,isIdle,isPaused,isSuccess);
  // const uploadImages = async () => {
  //   if (selectedImages.length === 0) return [];
    
  //   try {
  //     const response = await handleImageUpload(selectedImages);
      
  //     if (response.status === 200) {
  //       const urls = Array.isArray(response.data) ? response.data : [response.data];
  //       setImageUrls(urls);
  //       return urls;
  //     } else {
  //       throw new Error("Failed to upload images");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //     toast.error("Failed to upload images");
  //     throw error;
  //   }
  // };



// Replace your onSubmit function with this optimized version:
const onSubmit = useCallback((values: PropertyFormValues) => {
  // Show loading toast immediately for user feedback
  toast.loading("Creating Property...", { id: "create-property" });
 mutate(values);
  // Use startTransition to defer non-urgent updates
  // startTransition(() => {
  //   // This part is now non-blocking
  //   console.log("Form Values:", values);
    
  //   // Use Promise to handle async work properly
  //   Promise.resolve().then(async () => {
  //     try {
  //       // Handle image upload if needed
  //       // let currentImageUrls = imageUrls;
  //       // if (!isUploaded && selectedImages.length > 0) {
  //       //   try {
  //       //     currentImageUrls = await uploadImages();
  //       //   } catch (error) {
  //       //     toast.error("Failed to upload images", { id: "create-property" });
  //       //     return; // Exit early on image upload failure
  //       //   }
  //       // }
        
  //       // // Now submit with the image URLs
  //       // const formDataWithImages = {
  //       //   ...values,
  //       //   images: currentImageUrls
  //       // };
        
  //       mutate(values);
  //     } catch (error) {
  //       toast.error("Failed to create property", { id: "create-property" });
  //     }
  //   });
  // });
}, [mutate]);
  const resetForm = useCallback(() => {
    form.reset();
    // Clean up preview URLs in a non-blocking transition
    startTransition(() => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    });
    setSelectedImages([]);
    setPreviewUrls([]);
    setImageUrls([]);
    setIsUploaded(false);
    setIsSubmitting(false);
  }, [form, previewUrls]);
  
  // Handle dialog close properly
  const handleDialogChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open) {
      // Don't reset while submitting
      if (!isSubmitting) {
        resetForm();
      }
    }
  }, [resetForm, isSubmitting]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button>{triggerText || 'Add New Property'}</Button>
      </DialogTrigger>
      <DialogContent className="p-4 max-h-[90vh] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add your Properties here</DialogDescription>
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
                  {/* Other form fields remain the same */}
                  {/* I'm preserving the rest of the form fields for clarity but not repeating all of them */}
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
                {/* <div className="grid gap-2">
                  <Label htmlFor="image">Property Images</Label>
                  <div className="flex flex-col items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      ref={fileInputRef}
                      multiple
                    />
                 
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div onClick={() => fileInputRef.current?.click()}>
                        <Card className="border-2 border-dashed hover:border-blue-500 transition-colors cursor-pointer group">
                          <CardContent className="flex flex-col items-center justify-center min-h-[200px] p-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-50">
                              <ImageIcon size={24} className="group-hover:text-blue-500" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Upload Images</h3>
                            <p className="text-sm text-center">Upload images of your property</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-40">
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-contain rounded-md"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    {isUploaded && selectedImages.length > 0 && (
                      <div className="text-green-500 text-sm mt-2">
                        ✓ {selectedImages.length} image(s) uploaded successfully
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
              </div>
            </ScrollArea>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isPending}
            >
              {isPending ? (toast.loading("Creating..",{id:"create-property"})) : (<>Create Property</>)}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNew