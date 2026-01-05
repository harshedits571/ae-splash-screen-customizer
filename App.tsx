
import React, { useState, useCallback, useRef, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Controls from './components/Controls';
import { SplashSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { Monitor, Info } from 'lucide-react';

declare global {
  interface Window {
    html2canvas: any;
  }
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<SplashSettings>(DEFAULT_SETTINGS);
  const [isExporting, setIsExporting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const splashRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const padding = 64;
      const availableW = width - padding;
      const availableH = height - padding;
      
      const scaleW = availableW / 700;
      const scaleH = availableH / 500;
      const newScale = Math.min(1, scaleW, scaleH);
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExporting) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  const captureCanvas = async (): Promise<HTMLCanvasElement | null> => {
    if (!splashRef.current) return null;
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      return await window.html2canvas(splashRef.current, {
        width: 700,
        height: 500,
        scale: 1, 
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
    } catch (err) {
      console.error('Capture failed:', err);
      return null;
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    const canvas = await captureCanvas();
    if (canvas) {
      const link = document.createElement('a');
      link.download = `AE-Splash-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } else {
      alert('Failed to export image.');
    }
    setIsExporting(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
      {/* Workspace Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative flex flex-col items-center justify-center p-8 bg-zinc-950 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header Branding */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded text-white font-black text-xs">AE</div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">Splash Architect</h1>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Pixel Perfect 700×500</p>
          </div>
        </div>

        {/* Info Tip */}
        <div className="absolute top-8 right-8 flex items-center gap-2 bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-full px-4 py-1.5 animate-pulse">
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] text-zinc-400 font-medium">Interactivity disabled during export</span>
        </div>

        {/* Preview Container */}
        <div 
          className="relative transition-all duration-500 ease-out"
          style={{ 
            transform: `scale(${scale})`,
            width: '700px', 
            height: '500px'
          }}
        >
          <SplashScreen 
            settings={settings} 
            isExporting={isExporting} 
            mousePos={mousePos}
            innerRef={splashRef}
          />
        </div>

        {/* Bottom Specs */}
        <div className="absolute bottom-8 flex items-center gap-8 text-zinc-600">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <span className="text-xs font-mono">700 × 500 PX</span>
          </div>
          <div className="text-xs font-mono uppercase tracking-tighter">
            PNG EXPORT • MANUAL INJECTION GUIDE
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <Controls 
        settings={settings} 
        setSettings={setSettings} 
        onExport={handleExport}
        isExporting={isExporting}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default App;
