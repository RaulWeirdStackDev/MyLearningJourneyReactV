import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!', {
      duration: 2000,
      position: 'top-center',
    });
    navigate('/');
    closeMenu();
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
        {/* Always visible - Public routes */}
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
            to="/faqs" 
            onClick={closeMenu}
            className={({ isActive }) => 
              `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
            }
          >
            FAQs
          </NavLink>
        </li>

        {/* Authenticated users only - Private routes */}
        {isAuthenticated() && (
          <>
            <li>
              <NavLink 
                to="/entry" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
                }
              >
                New Entry
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

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </li>
          </>
        )}

        {/* Guest users only - Auth routes */}
        {!isAuthenticated() && (
          <>
            <li>
              <NavLink 
                to="/login" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`
                }
              >
                Login
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/register" 
                onClick={closeMenu}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};