
"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserIcon, Loader2Icon, UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomDialogHeader from "../../workflows/_components/CustomDialogHeader";
import { ProfileSchemaType,profileSchema } from "@/schema/users";
import { EditProfile } from "@/lib/functions/username/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import apiClientNew from "@/lib/functionapis/apiclientnew";

const availableServices = [
  { id: "buying", label: "Buying" },
  { id: "selling", label: "Selling" },
  { id: "renting", label: "Renting" },
  { id: "property-management", label: "Property Management" },
  { id: "consultation", label: "Consultation" }
];





function EditProfileDialog({ 
  triggerText, 
  triggerEl, 
  userData 
}: { 
  triggerText?: string, 
  triggerEl?: React.ReactNode,
  userData?: ProfileSchemaType
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues:userData|| {
      username: "",
      email: "",
      u_pfp:"",
      businessName: "",
      businessType: "",
      description: "",
      foundedYear: "",
      employees: "",
      website: "",
      socialMedia: {
        linkedin: "",
        instagram: ""
      },
      address: "",
      city: "",
      state: "",
      zip: "",
      services: [],
      
      phone: "",
      whatsAppPhone: ""
    }
  });

  // Load user data when available
  useEffect(() => {
    if (userData) {
      form.reset({
        username: userData.username || "",
        email: userData.email || "",
        u_pfp:userData.u_pfp ||"",
        businessName: userData.businessName || "",
        businessType: userData.businessType || "",
        description: userData.description || "",
        foundedYear: userData.foundedYear || "",
        employees: userData.employees || "",
        website: userData.website || "",
        socialMedia: {
          linkedin: userData.socialMedia?.linkedin || "",
          instagram: userData.socialMedia?.instagram || ""
        },
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        zip: userData.zip || "",
        services: userData.services || [],
        phone: userData.phone || "",
        whatsAppPhone: userData.whatsAppPhone || ""
      });
    }
  }, [userData, form]);

  const { mutate, isPending } = useMutation({
  mutationFn: EditProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully", { id: "edit-profile" });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to update profile", { id: "edit-profile" });
    }
  });

  const onSubmit = useCallback((values: ProfileSchemaType) => {
    toast.loading("Updating profile...", { id: "edit-profile" });
    mutate(values);
  }, [mutate]);

// Add these to your component function
const fileInputRef = useRef<HTMLInputElement>(null);
const [isUploading, setIsUploading] = useState(false);

// Add this function to handle file upload
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  try {
    setIsUploading(true);
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClientNew.post('/file/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // Update the form with the new profile picture URL
    form.setValue('u_pfp', response.data.url);
    toast.success('Profile picture uploaded successfully');
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    toast.error('Failed to upload profile picture');
  } finally {
    setIsUploading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerEl ? triggerEl : <Button>{triggerText ?? "Edit Profile"}</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-[50vw] max-h-[80vh]">
        <ScrollArea className="max-h-[70vh]">
          <CustomDialogHeader 
            icon={UserIcon}
            title="Edit Profile"
            subtitle="Update your personal and business information"
          />
          <div className="p-6">
            <Form {...form}>
              <form className="space-y-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4 md:col-span-2">
  <h3 className="text-lg font-medium">Profile Picture</h3>
  
  <div className="flex items-center gap-4">
    <Avatar className="h-20 w-20">
      <AvatarImage src={form.watch("u_pfp") || "/placeholder-avatar.png"} alt="Profile" />
      <AvatarFallback>{form.watch("username")?.charAt(0) || "U"}</AvatarFallback>
    </Avatar>
    
    <div className="flex flex-col gap-2">
      <input 
        type="file" 
        id="profile-picture" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange} 
      />
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload New Picture
          </>
        )}
      </Button>
      
      {form.watch("u_pfp") && (
        <FormField
          control={form.control}
          name="u_pfp"
          render={({ field }) => (
            <FormItem>
              <FormDescription className="text-xs truncate max-w-[200px]">
                {field.value}
              </FormDescription>
            </FormItem>
          )}
        />
      )}
    </div>
  </div>
</div>
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                  </div>
                  
                  {/* Business Information */}
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-medium">Business Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="businessName"
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
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="foundedYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Founded Year</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <FormField
                        control={form.control}
                        name="employees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employees</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1-10">1-10</SelectItem>
                                <SelectItem value="10-50">10-50</SelectItem>
                                <SelectItem value="50-100">50-100</SelectItem>
                                <SelectItem value="100+">100+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                    </div>
                  </div>
                  
                  {/* Online Presence */}
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-medium">Online Presence</h3>
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
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
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/..." {...field} />
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
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                  </div>
                  
                  {/* Location */}
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-medium">Location</h3>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} 
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-medium">Services</h3>
                    
                    <FormField
                      control={form.control}
                      name="services"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {availableServices.map((service) => (
                              <FormField
                                key={service.id}
                                control={form.control}
                                name="services"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={service.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(service.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, service.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== service.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {service.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Changes
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;