export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">&copy; 2025 Created by Raúl Rodríguez. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com" className="hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};