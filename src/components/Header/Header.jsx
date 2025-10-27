import { Navbar } from '../Header/Navbar/Navbar'

export const Header = () => {
  return (
    <header className="bg-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/logoMLJ.jpeg" alt="Logo" className="h-32 w-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
          My Learning Journey
        </h1>
        
        <Navbar />
      </div>
    </header>
  );
};