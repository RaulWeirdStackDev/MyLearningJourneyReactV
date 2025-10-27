export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; 2025 Created by Raúl Rodríguez. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://wa.me/56972033734 "
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </a>
          <a
            href="https://www.misterraul.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            See more of my work!
          </a>

          <a
            href="https://www.linkedin.com/in/raulrodriguezdev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
