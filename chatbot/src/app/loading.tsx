
export default function loading() {


  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12 space-y-6">
    
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg
          className="animate-pulse"
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21H21M3 18H21M5 18V8L12 3L19 8V18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 10H9.01M9 14H9.01M15 10H15.01M15 14H15.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-0 rounded-full bg-gray-200 opacity-20 animate-ping"></div>
      </div>

     

      </div>
  );
}