import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  const invalidFiles = files.filter(file => !validTypes.includes(file.type));
  const oversizedFiles = files.filter(file => file.size > maxSize);
  
  if (invalidFiles.length > 0) {
    setFileError("Only JPEG, PNG and PDF files are allowed");
    return;
  }
  
  if (oversizedFiles.length > 0) {
    setFileError("Files must be less than 5MB");
    return;
  }
  
  setFileError("");
  setAttachments(files);
};
