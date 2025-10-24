
import { Navbar } from '../Header/Navbar/Navbar'

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/Header/logoMLJ.jpeg" alt="Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800">My Learning Journey</h1>
        </div>
        <Navbar />
      </div>
    </header>
  );
};