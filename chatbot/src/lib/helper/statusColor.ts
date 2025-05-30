export const getStatusColor = (status: string) => {
  switch(status) {
    case "For Sale": return 'bg-green-100 text-green-800'
    case 'Sold': return 'bg-red-100 text-red-800'
    case 'For Rent': return 'bg-blue-100 text-blue-800'
    case 'Rented': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}