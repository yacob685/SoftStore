import React, { useEffect, useState } from 'react';
import { AppData } from '../types';
import { CheckCircle, Loader2, ShieldCheck, X, FileDown } from 'lucide-react';

interface DownloadModalProps {
  app: AppData;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ app, onClose }) => {
  const [step, setStep] = useState< 'scanning' | 'preparing' | 'ready' >('scanning');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate Virus Scan
    const scanInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setStep('preparing');
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    if (step === 'preparing') {
      const timer = setTimeout(() => {
        setStep('ready');
        // Trigger actual "download"
        downloadMockFile();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const downloadMockFile = () => {
    const textContent = `
Thank you for downloading ${app.name} from SoftStore!

App Name: ${app.name}
Version: ${app.version}
Developer: ${app.developer}
License: ${app.license}

This is a simulated download file for demonstration purposes.
In a real application, this would be the installer executable.

Visit the official website for real downloads: https://example.com/search?q=${encodeURIComponent(app.name)}
    `;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.name.replace(/\s+/g, '_')}_Setup.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                 <img src={`https://picsum.photos/seed/${app.id}/200`} alt="icon" className="w-full h-full object-cover rounded-2xl" />
             </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'ready' ? 'Download Started' : `Downloading ${app.name}...`}
          </h2>
          
          <div className="min-h-[120px] flex flex-col items-center justify-center">
            {step === 'scanning' && (
              <div className="w-full">
                <div className="flex items-center justify-center text-emerald-600 mb-3">
                  <ShieldCheck className="animate-pulse mr-2" />
                  <span className="font-medium">Scanning for viruses...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            {step === 'preparing' && (
               <div className="text-gray-500 flex flex-col items-center">
                 <Loader2 className="animate-spin mb-2 text-emerald-500" size={32} />
                 <span>Connecting to secure server...</span>
               </div>
            )}

            {step === 'ready' && (
              <div className="text-center animate-in fade-in zoom-in duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-3">
                  <CheckCircle size={28} />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Your download has started automatically. If it doesn't start, <button onClick={downloadMockFile} className="text-emerald-600 hover:underline font-medium">click here</button>.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-left flex items-center">
                    <FileDown className="text-gray-400 mr-3" size={20}/>
                    <div>
                        <div className="text-xs text-gray-400 uppercase font-bold">Filename</div>
                        <div className="text-sm font-medium text-gray-800">{app.name.replace(/\s+/g, '_')}_Setup.txt</div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {step === 'ready' && (
          <div className="bg-gray-50 px-8 py-4 text-center">
            <button 
              onClick={onClose}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-emerald-200"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadModal;
