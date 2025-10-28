import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error('Please enter your email address!', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address!', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (!formData.password) {
      toast.error('Please enter your password!', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        email: formData.email,
        name: formData.email.split('@')[0],
        token: 'mock-jwt-token-' + Date.now()
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Welcome back! 🎉', {
        duration: 2000,
        position: 'top-center',
      });

      setTimeout(() => {
        window.location.href = '/entry';
      }, 1000);

    } catch  {
      toast.error('Login failed. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster />
      
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your learning journey</p>
          </div>

          <div className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md p-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-md font-semibold transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              } text-white`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="mt-6 mb-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Do you want to create an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign up
              </a>
            </p>
          </div>

        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}