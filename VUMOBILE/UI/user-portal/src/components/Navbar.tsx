import React from 'react';

interface NavbarProps {
  onNavigate: (view: 'list' | 'form') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            User Portal
          </span>
        </a>
        <div className="flex space-x-4">
          <button
            onClick={() => onNavigate('list')}
            className="text-sm px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
          >
            User List
          </button>
          <button
            onClick={() => onNavigate('form')}
            className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
