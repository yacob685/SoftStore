import React from 'react';
import { Search, Menu, Download } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={onHome}>
            <div className="bg-emerald-500 text-white p-1.5 rounded-lg mr-2">
              <Download size={24} strokeWidth={3} />
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              Soft<span className="text-emerald-500">Store</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for apps, games, and more..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Nav Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-gray-500 hover:text-gray-700 font-medium">
              Log in
            </button>
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-3">
             <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
