import { GetMyProfile } from "@/lib/functionapis/profile";
import { User } from "@/types/profile";


export async function GetMe() {
  console.log("GetMe function called"); // Debugging line
  try {; // Debugging line
      const data  = await GetMyProfile();
      return data;
  } catch (error) {
      console.error('Error fetching user:', error);
      throw error; // Important: rethrow the error
  }
}
export const GetUsers = async (): Promise<User[]> => {

   return [
    { name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'Active', lastActive: '2h ago' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'client', status: 'Offline', lastActive: '1d ago' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', status: 'Active', lastActive: '5m ago' },
    { name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'Active', lastActive: '2h ago' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'client', status: 'Offline', lastActive: '1d ago' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', status: 'Active', lastActive: '5m ago' },
    { name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'Active', lastActive: '2h ago' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'client', status: 'Offline', lastActive: '1d ago' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', status: 'Active', lastActive: '5m ago' },
    { name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'Active', lastActive: '2h ago' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'client', status: 'Offline', lastActive: '1d ago' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', status: 'Active', lastActive: '5m ago' },
   ];
 }

const getProfile = async (userId: string) => {
  
}