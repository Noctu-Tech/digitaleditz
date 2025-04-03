"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useRef, useState } from "react"

interface FormData {
  title: string;
  status: string;
  length: string;
  width: string;
  front: string;
  direction: string;
  facing: string;
  unit: string;
  price: string;
  description: string;
}

function AddNew({triggerText}:{triggerText?:string}) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    status: '',
    length: '',
    width: '',
    front: '',
    direction: '',
    facing: '',
    unit: '',
    price: '',
    description: ''
  });
  
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length) {
      setSelectedImages(prev => [...prev, ...files])
      const newPreviewUrls = files.map(file => URL.createObjectURL(file))
      setPreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => {
      URL.revokeObjectURL(prev[index]) // Clean up the URL
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log(formData, selectedImages);
    // Handle your form submission here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText|| 'Add New Property'}</Button>
      </DialogTrigger>
      <DialogContent className="p-4 max-h-[90vh] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh]">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Property title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="length">Length</Label>
                <Input 
                  id="length" 
                  type="number"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="width">Width</Label>
                <Input 
                  id="width" 
                  type="number"
                  value={formData.width}
                  onChange={(e) => handleInputChange('width', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="front">Front</Label>
                <Input 
                  id="front" 
                  type="number"
                  value={formData.front}
                  onChange={(e) => handleInputChange('front', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="direction">Direction</Label>
                <Select onValueChange={(value) => handleInputChange('direction', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    {['North', 'South', 'East', 'West'].map(dir => (
                      <SelectItem key={dir} value={dir.toLowerCase()}>{dir}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facing">Facing</Label>
                <Select onValueChange={(value) => handleInputChange('facing', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select facing" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Main Road', 'Park', 'Street', 'Corner'].map(face => (
                      <SelectItem key={face} value={face.toLowerCase()}>{face}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Select onValueChange={(value) => handleInputChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ft">ft</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="yard">yard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="min-h-[100px] rounded-md border p-3"
                placeholder="Property description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Product Images</Label>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  ref={fileInputRef}
                  multiple
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-11/12"
                >
                  Choose Images
                </Button>
                <div className="grid grid-cols-2 gap-4 w-full">
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
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="w-full">Create Listing</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddNew
