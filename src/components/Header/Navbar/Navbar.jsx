import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
      <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none z-50`}>
        <li>
          <NavLink 
            to="/" 
            onClick={closeMenu}
            className={({ isActive }) => 
              `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/entry" 
            onClick={closeMenu}
            className={({ isActive }) => 
              `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
            }
          >
            New Journal Entry
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/statistics" 
            onClick={closeMenu}
            className={({ isActive }) => 
              `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
            }
          >
            Statistics
          </NavLink>
        </li>
          <NavLink 
            to="/faqs" 
            onClick={closeMenu}
            className={({ isActive }) => 
              `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
            }
          >
            FAQs
          </NavLink>
        <li>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</a>
        </li>
      </ul>
    </nav>
  );
};