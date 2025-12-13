import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import AppCard from './components/AppCard';
import AppDetails from './components/AppDetails';
import { MOCK_APPS, CATEGORIES } from './constants';
import { AppData, ViewState } from './types';
import { Monitor, Smartphone, Apple, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOS, setSelectedOS] = useState<'All' | 'Windows' | 'Mac' | 'Android' | 'iOS'>('All');

  const filteredApps = useMemo(() => {
    return MOCK_APPS.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      const matchesOS = selectedOS === 'All' || app.os === selectedOS;
      
      return matchesSearch && matchesCategory && matchesOS;
    });
  }, [searchQuery, selectedCategory, selectedOS]);

  const handleAppClick = (app: AppData) => {
    setSelectedApp(app);
    setViewState(ViewState.DETAILS);
    window.scrollTo(0,0);
  };

  const handleBack = () => {
    setSelectedApp(null);
    setViewState(ViewState.HOME);
  };

  const handleHome = () => {
    setSelectedApp(null);
    setSearchQuery('');
    setViewState(ViewState.HOME);
  };

  const OSButton = ({ os, icon: Icon }: { os: typeof selectedOS, icon: any }) => (
    <button
      onClick={() => setSelectedOS(os)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        selectedOS === os 
          ? 'bg-emerald-600 text-white shadow-md' 
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      <Icon size={16} />
      <span>{os}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-12">
      <Header onSearch={setSearchQuery} onHome={handleHome} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {viewState === ViewState.HOME && (
          <div className="space-y-8">
            
            {/* Hero / Filter Section */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                 <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                   {searchQuery ? `Search results for "${searchQuery}"` : "Discover the best apps"}
                 </h1>
                 
                 <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    <OSButton os="All" icon={LayoutGrid} />
                    <OSButton os="Windows" icon={Monitor} />
                    <OSButton os="Mac" icon={Monitor} />
                    <OSButton os="Android" icon={Smartphone} />
                    <OSButton os="iOS" icon={Apple} />
                 </div>
              </div>

              {/* Categories */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-500 ring-offset-1'
                        : 'text-gray-600 hover:bg-gray-200 bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredApps.map(app => (
                  <AppCard key={app.id} app={app} onClick={handleAppClick} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <Monitor size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No apps found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}

        {viewState === ViewState.DETAILS && selectedApp && (
          <AppDetails app={selectedApp} onBack={handleBack} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                    © 2024 SoftStore. All rights reserved. 
                    <span className="block text-xs mt-1">This is a portfolio project. No real software is hosted here.</span>
                </div>
                <div className="flex space-x-6 text-gray-400">
                    <a href="#" className="hover:text-gray-600">About</a>
                    <a href="#" className="hover:text-gray-600">Privacy</a>
                    <a href="#" className="hover:text-gray-600">Terms</a>
                    <a href="#" className="hover:text-gray-600">Contact</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
