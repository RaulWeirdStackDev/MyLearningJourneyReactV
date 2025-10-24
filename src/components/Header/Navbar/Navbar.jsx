import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="md:hidden">
        <button 
          onClick={toggleMenu} 
          className="flex flex-col space-y-1 focus:outline-none"
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>
      <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
        </li>
        <li>
          <a href="./index.html" className="text-gray-700 hover:text-blue-600 transition-colors">New Journal Entry</a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Statistics</a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">FAQs</a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</a>
        </li>
      </ul>
    </nav>
  );
};