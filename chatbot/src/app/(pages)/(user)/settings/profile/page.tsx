
import Image from "next/image"

interface UserProfile {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  businessHours: string;
  services: string[];
}

const mockUser: UserProfile = {
  id: "123",
  businessName: "Digital Editz Studio",
  ownerName: "John Doe",
  email: "contact@digitaleditz.com",
  phone: "(555) 123-4567",
  description: "Professional photo editing and digital art services",
  address: "123 Creative Ave, Design District, NY 10001",
  businessHours: "Mon-Fri: 9AM-6PM | Sat: 10AM-4PM",
  services: ["Photo Retouching", "Digital Art Creation", "Image Manipulation", "Color Correction"]
};

export default function Page() {
  return (
    <div className="min-h-screen">
      
      <div className="relative mx-auto max-w-4xl flex flex-col justify-center items-center rounded-lg  p-8 shadow-lg">
        
        {/* Business Header */}
        <div className="mb-8 justify-center items-center text-center rounded-full">
          
            <Image
              src="https://picsum.photos/200"
              alt="Business Logo"
              width={128}
              height={128}
              className="rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold ">{mockUser.businessName}</h1>
          <p className="">Owned by {mockUser.ownerName}</p>
        </div>

        {/* Business Description */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">About Us</h2>
          <p className="">{mockUser.description}</p>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Our Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockUser.services.map((service, index) => (
              <div key={index} className="rounded-lg p-3 ">
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours & Location */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Business Hours</h2>
          <p className="">{mockUser.businessHours}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <h2 className="mb-2 text-xl font-semibold">Contact Us</h2>
          <p className="">📍 {mockUser.address}</p>
          <p className="">📧 {mockUser.email}</p>
          <p className="">📞 {mockUser.phone}</p>
        </div>
      </div>
  );
}