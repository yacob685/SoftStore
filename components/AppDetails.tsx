import React, { useEffect, useState } from 'react';
import { AppData, AIReviewData } from '../types';
import { getAIAppReview } from '../services/geminiService';
import { Download, ShieldCheck, Check, X, ThumbsUp, Sparkles, Share2, Info } from 'lucide-react';
import DownloadModal from './DownloadModal';

interface AppDetailsProps {
  app: AppData;
  onBack: () => void;
}

const AppDetails: React.FC<AppDetailsProps> = ({ app, onBack }) => {
  const [review, setReview] = useState<AIReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getAIAppReview(app.name, app.os).then(data => {
      if (isMounted) {
        setReview(data);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [app]);

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      {showDownload && <DownloadModal app={app} onClose={() => setShowDownload(false)} />}
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-emerald-600 hover:underline">Home</button>
        <span className="mx-2">/</span>
        <span>{app.os}</span>
        <span className="mx-2">/</span>
        <span>{app.category}</span>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-800">{app.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-3xl flex-shrink-0 overflow-hidden shadow-inner">
                 <img src={`https://picsum.photos/seed/${app.id}/300`} alt={app.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h1>
                        <p className="text-gray-500 mb-2">{app.developer} • {app.version}</p>
                    </div>
                    <div className="hidden sm:block">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/160px-Infobox_info_icon.svg.png" className="w-12 opacity-20" alt="logo watermark" />
                    </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                    <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">
                        {app.license}
                    </span>
                    <div className="flex items-center text-yellow-500">
                        <span className="font-bold text-lg mr-1">{app.rating}</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-lg">★</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => setShowDownload(true)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 transform active:scale-95"
                    >
                        <Download strokeWidth={3} size={20} />
                        <span>Free Download</span>
                    </button>
                    <button className="sm:w-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center justify-center sm:justify-start">
                    <ShieldCheck size={12} className="mr-1" /> 100% Secure • No Viruses • Tested today
                </p>
              </div>
            </div>
          </div>

          {/* AI Review Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="text-indigo-500" size={20} />
                <span>SoftStore AI Review</span>
            </h2>

            {loading ? (
                <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="h-24 bg-gray-100 rounded-xl"></div>
                        <div className="h-24 bg-gray-100 rounded-xl"></div>
                    </div>
                </div>
            ) : review ? (
                <>
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                        {review.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <h3 className="font-bold text-green-800 mb-3 flex items-center">
                                <ThumbsUp size={16} className="mr-2" /> Pros
                            </h3>
                            <ul className="space-y-2">
                                {review.pros.slice(0, 4).map((pro, i) => (
                                    <li key={i} className="flex items-start text-sm text-green-700">
                                        <Check size={14} className="mt-1 mr-2 flex-shrink-0" /> {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <h3 className="font-bold text-red-800 mb-3 flex items-center">
                                <Info size={16} className="mr-2" /> Cons
                            </h3>
                             <ul className="space-y-2">
                                {review.cons.slice(0, 4).map((con, i) => (
                                    <li key={i} className="flex items-start text-sm text-red-700">
                                        <X size={14} className="mt-1 mr-2 flex-shrink-0" /> {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Technical Opinion</h3>
                        <p className="text-sm text-gray-600 italic">"{review.technicalOpinion}"</p>
                    </div>
                </>
            ) : (
                <p className="text-red-500">Failed to load review.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
                {app.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
                Download {app.name} today to experience one of the leading applications in the {app.category} category.
                Optimized for {app.os}, it ensures stability and performance for all your needs.
            </p>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            
            {/* App Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">App Specs</h3>
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 text-sm">License</span>
                        <span className="text-gray-900 text-sm font-medium">{app.license}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 text-sm">Version</span>
                        <span className="text-gray-900 text-sm font-medium">{app.version}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 text-sm">Platform</span>
                        <span className="text-gray-900 text-sm font-medium">{app.os}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500 text-sm">Downloads</span>
                        <span className="text-gray-900 text-sm font-medium">{app.downloads}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                         <span className="text-gray-500 text-sm">Language</span>
                         <span className="text-gray-900 text-sm font-medium">English</span>
                    </div>
                </div>
            </div>

            {/* Alternatives */}
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Alternatives</h3>
                {loading ? (
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-100 rounded w-full"></div>
                        <div className="h-8 bg-gray-100 rounded w-full"></div>
                        <div className="h-8 bg-gray-100 rounded w-full"></div>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {review?.alternativeApps.slice(0, 5).map((alt, i) => (
                             <li key={i} className="flex items-center text-gray-600 hover:text-emerald-600 cursor-pointer transition-colors">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
                                {alt}
                             </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Ad Placeholder (keeping the 'Softonic' spirit alive without real ads) */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400 flex-col">
                <span className="text-xs font-bold tracking-widest uppercase mb-2">Advertisement</span>
                <div className="w-12 h-12 border-2 border-gray-300 rounded-lg"></div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AppDetails;
