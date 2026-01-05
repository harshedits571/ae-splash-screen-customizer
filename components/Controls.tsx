
import React, { useRef } from 'react';
import { SplashSettings, BackgroundType, Preset, FitMode } from '../types';
import { PRESETS, DEFAULT_SETTINGS } from '../constants';
import { 
  Upload, 
  Type, 
  Palette, 
  Download, 
  RefreshCw,
  Box,
  Trash2,
  RotateCcw,
  Maximize2,
  Minimize2,
  BookOpen,
  ExternalLink,
  ChevronRight,
  FolderSearch,
  FileDigit,
  Save
} from 'lucide-react';

interface ControlsProps {
  settings: SplashSettings;
  setSettings: React.Dispatch<React.SetStateAction<SplashSettings>>;
  onExport: () => void;
  isExporting: boolean;
}

const Controls: React.FC<ControlsProps> = ({ settings, setSettings, onExport, isExporting }) => {
  const artworkRef = useRef<HTMLInputElement>(null);
  const aeLogoRef = useRef<HTMLInputElement>(null);
  const ccLogoRef = useRef<HTMLInputElement>(null);
  const bgImgRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SplashSettings) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSettings(prev => ({ ...prev, [field]: url }));
    }
  };

  const clearFile = (field: keyof SplashSettings, inputRef: React.RefObject<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [field]: '' }));
    if (inputRef.current) inputRef.current.value = '';
  };

  const resetFile = (field: keyof SplashSettings, inputRef: React.RefObject<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [field]: DEFAULT_SETTINGS[field] }));
    if (inputRef.current) inputRef.current.value = '';
  };

  const applyPreset = (p: Preset) => {
    const presetData = PRESETS[p];
    if (presetData) {
      setSettings(prev => ({ ...prev, ...presetData, preset: p }));
    }
  };

  const updateGradient = (start: string, end: string) => {
    const bgGradient = `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;
    setSettings(prev => ({ 
      ...prev, 
      gradientStart: start, 
      gradientEnd: end, 
      bgGradient 
    }));
  };

  return (
    <div className="w-full lg:w-[400px] h-full flex flex-col bg-zinc-900 border-l border-zinc-800 p-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/20">
          <Box className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Customizer</h2>
      </div>

      <div className="space-y-8 pb-12">
        {/* Download Action First for visibility */}
        <section className="space-y-4">
           <button
            onClick={onExport}
            disabled={isExporting}
            className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all disabled:opacity-50 group shadow-xl active:scale-95"
          >
            {isExporting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            )}
            {isExporting ? 'Preparing Image...' : '1. Export Design (700×500)'}
          </button>
        </section>

        {/* Installation Instructions */}
        <section className="bg-zinc-950 rounded-xl border border-zinc-800 p-5 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <label className="text-xs font-bold uppercase tracking-wider text-white">Full Installation Guide</label>
          </div>
          
          <div className="space-y-4">
            {/* Step 2: Resource Hacker */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">2</span>
              <div className="space-y-2 flex-1">
                <p className="text-[11px] text-zinc-300 font-medium">Download & Install Resource Hacker</p>
                <a 
                  href="https://www.angusj.com/resourcehacker/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-indigo-400 text-[10px] px-2 py-1 rounded transition-colors border border-zinc-700"
                >
                  Download Site <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Step 3: File Location */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-zinc-700">3</span>
              <div className="space-y-2 flex-1">
                <p className="text-[11px] text-zinc-300 font-medium">Locate the target DLL</p>
                <div className="bg-black/40 p-2 rounded border border-white/5 font-mono text-[9px] text-zinc-500 break-all leading-relaxed">
                  C:\Program Files\Adobe\Adobe After Effects [Version]\Support Files\<span className="text-indigo-300">afterFXLib.dll</span>
                </div>
                <p className="text-[9px] text-amber-500/70 italic">* Back up this file before editing!</p>
              </div>
            </div>

            {/* Step 4: Import */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-zinc-700">4</span>
              <p className="text-[11px] text-zinc-400">Launch Resource Hacker and <span className="text-zinc-200">Drag & Drop</span> the DLL file into the window.</p>
            </div>

            {/* Step 5: Navigate */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-zinc-700">5</span>
              <div className="space-y-1">
                <p className="text-[11px] text-zinc-400">In the left tree, navigate to:</p>
                <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1.5 rounded border border-zinc-800 font-mono text-[10px]">
                   <span className="text-zinc-500">PNG</span>
                   <ChevronRight className="w-2.5 h-2.5 text-zinc-700" />
                   <span className="text-indigo-300 font-bold">AE_SPLASH</span>
                   <ChevronRight className="w-2.5 h-2.5 text-zinc-700" />
                   <span className="text-indigo-300 font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Step 6: Replace */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-zinc-700">6</span>
              <div className="space-y-1.5">
                <p className="text-[11px] text-zinc-400">Right-click <code className="text-indigo-300 font-bold">0</code> and select:</p>
                <div className="bg-zinc-900 p-2 rounded text-[10px] text-zinc-200 border border-zinc-800">
                  Replace Resource... <ChevronRight className="w-2.5 h-2.5 inline mx-1 opacity-30" /> Open file with new resource...
                </div>
                <p className="text-[10px] text-zinc-500 leading-tight">Pick your exported PNG from Step 1.</p>
              </div>
            </div>

            {/* Step 7: Save */}
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-zinc-700">7</span>
              <p className="text-[11px] text-zinc-400">Click <span className="text-indigo-400 font-bold">File > Save</span>. Restart After Effects to see your new splash!</p>
            </div>
          </div>
        </section>

        {/* Style Presets */}
        <section>
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 block">Style Presets</label>
          <div className="grid grid-cols-2 gap-2">
            {(['dark', 'light', 'neon', 'creative'] as Preset[]).map(p => (
              <button
                key={p}
                onClick={() => applyPreset(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all border ${
                  settings.preset === p 
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-800/80'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Text Customization */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-zinc-400" />
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Main Typography</label>
          </div>
          <div>
            <input
              type="text"
              value={settings.title}
              onChange={e => setSettings(prev => ({ ...prev, title: e.target.value }))}
              placeholder="App Title (e.g. After Effects)"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>
          <div>
            <input
              type="text"
              value={settings.subtitle}
              onChange={e => setSettings(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Subtitle (e.g. 2025 Release)"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[10px] text-zinc-500 block mb-1 font-bold uppercase tracking-tighter">Title Color</label>
              <input 
                type="color" 
                value={settings.titleColor} 
                onChange={e => setSettings(prev => ({ ...prev, titleColor: e.target.value }))}
                className="w-full h-8 bg-zinc-800 border border-zinc-700 rounded-md p-1 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-zinc-500 block mb-1 font-bold uppercase tracking-tighter">Sub Color</label>
              <input 
                type="color" 
                value={settings.subtitleColor} 
                onChange={e => setSettings(prev => ({ ...prev, subtitleColor: e.target.value }))}
                className="w-full h-8 bg-zinc-800 border border-zinc-700 rounded-md p-1 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-4 h-4 text-zinc-400" />
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Assets</label>
          </div>
          
          <div className="space-y-3">
             {/* Artwork */}
             <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 group transition-colors hover:border-zinc-600">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-medium text-zinc-300">Main Artwork (Right)</label>
                 <div className="flex gap-1">
                   <button 
                    onClick={() => clearFile('artworkUrl', artworkRef)}
                    className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-red-400 transition-colors"
                    title="Remove Image"
                   >
                     <Trash2 className="w-3 h-3" />
                   </button>
                   <button 
                    onClick={() => resetFile('artworkUrl', artworkRef)}
                    className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-indigo-400 transition-colors"
                    title="Reset to default"
                   >
                     <RotateCcw className="w-3 h-3" />
                   </button>
                 </div>
               </div>
               <input 
                ref={artworkRef}
                type="file" 
                accept="image/*"
                onChange={e => handleFileUpload(e, 'artworkUrl')}
                className="text-[10px] text-zinc-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer w-full mb-3"
               />

               <div className="flex gap-2">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, artworkFit: 'contain' }))}
                    className={`flex-1 py-1 px-2 rounded text-[10px] flex items-center justify-center gap-1.5 font-bold uppercase transition-all ${
                      settings.artworkFit === 'contain' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-400'
                    }`}
                  >
                    <Minimize2 className="w-3 h-3" /> Fit
                  </button>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, artworkFit: 'cover' }))}
                    className={`flex-1 py-1 px-2 rounded text-[10px] flex items-center justify-center gap-1.5 font-bold uppercase transition-all ${
                      settings.artworkFit === 'cover' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-400'
                    }`}
                  >
                    <Maximize2 className="w-3 h-3" /> Fill
                  </button>
               </div>
             </div>

             {/* App Logo */}
             <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 group transition-colors hover:border-zinc-600">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-medium text-zinc-300">App Logo (Top Left)</label>
                 <div className="flex gap-1">
                    <button 
                      onClick={() => clearFile('aeLogoUrl', aeLogoRef)}
                      className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-red-400 transition-colors"
                      title="Remove Logo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => resetFile('aeLogoUrl', aeLogoRef)}
                      className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-indigo-400 transition-colors"
                      title="Reset to default"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                 </div>
               </div>
               <input 
                ref={aeLogoRef}
                type="file" 
                accept="image/*"
                onChange={e => handleFileUpload(e, 'aeLogoUrl')}
                className="text-[10px] text-zinc-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer w-full"
               />
             </div>
          </div>
        </section>

        {/* Background Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-zinc-400" />
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Canvas Background</label>
          </div>
          
          <div className="flex bg-zinc-800 p-1 rounded-lg border border-zinc-700">
            {(['solid', 'gradient', 'image'] as BackgroundType[]).map(t => (
              <button
                key={t}
                onClick={() => setSettings(prev => ({ ...prev, bgType: t }))}
                className={`flex-1 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                  settings.bgType === t ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {settings.bgType === BackgroundType.SOLID && (
            <input 
              type="color" 
              value={settings.bgColor} 
              onChange={e => setSettings(prev => ({ ...prev, bgColor: e.target.value }))}
              className="w-full h-10 bg-zinc-800 border border-zinc-700 rounded-md p-1 cursor-pointer"
            />
          )}

          {settings.bgType === BackgroundType.GRADIENT && (
             <div className="space-y-3">
               <div className="flex gap-4">
                 <div className="flex-1">
                   <label className="text-[10px] text-zinc-500 block mb-1 font-bold uppercase tracking-tighter">Start Color</label>
                   <input 
                    type="color" 
                    value={settings.gradientStart} 
                    onChange={e => updateGradient(e.target.value, settings.gradientEnd)}
                    className="w-full h-8 bg-zinc-800 border border-zinc-700 rounded-md p-1 cursor-pointer"
                   />
                 </div>
                 <div className="flex-1">
                   <label className="text-[10px] text-zinc-500 block mb-1 font-bold uppercase tracking-tighter">End Color</label>
                   <input 
                    type="color" 
                    value={settings.gradientEnd} 
                    onChange={e => updateGradient(settings.gradientStart, e.target.value)}
                    className="w-full h-8 bg-zinc-800 border border-zinc-700 rounded-md p-1 cursor-pointer"
                   />
                 </div>
               </div>
             </div>
          )}

          {settings.bgType === BackgroundType.IMAGE && (
             <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 transition-colors hover:border-zinc-600">
                <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-medium text-zinc-300">Custom BG Image</label>
                 <button 
                  onClick={() => clearFile('backgroundUrl', bgImgRef)}
                  className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-red-400 transition-colors"
                  title="Clear Image"
                 >
                   <Trash2 className="w-3 h-3" />
                 </button>
               </div>
                <input 
                  ref={bgImgRef}
                  type="file" 
                  accept="image/*"
                  onChange={e => handleFileUpload(e, 'backgroundUrl')}
                  className="text-[10px] text-zinc-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer w-full"
                />
             </div>
          )}
        </section>

        <p className="text-[10px] text-center text-zinc-600 leading-relaxed px-4">
          After saving in Resource Hacker, a <code className="text-zinc-500">_original.dll</code> backup will be created automatically in your Support Files folder.
        </p>
      </div>
    </div>
  );
};

export default Controls;
