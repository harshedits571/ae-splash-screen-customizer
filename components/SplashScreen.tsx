
import React, { useMemo } from 'react';
import { SplashSettings, BackgroundType } from '../types';

interface SplashScreenProps {
  settings: SplashSettings;
  isExporting: boolean;
  mousePos: { x: number; y: number };
  innerRef: React.RefObject<HTMLDivElement>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ settings, isExporting, mousePos, innerRef }) => {
  const transformStyle = useMemo(() => {
    if (isExporting) return {};
    const moveX = (mousePos.x - 0.5) * 15;
    const moveY = (mousePos.y - 0.5) * 15;
    return {
      transform: `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`,
      transition: 'transform 0.1s ease-out',
    };
  }, [mousePos, isExporting]);

  const bgStyle = useMemo(() => {
    switch (settings.bgType) {
      case BackgroundType.SOLID:
        return { backgroundColor: settings.bgColor };
      case BackgroundType.GRADIENT:
        return { background: settings.bgGradient };
      case BackgroundType.IMAGE:
        return { 
          backgroundImage: `url(${settings.backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return {};
    }
  }, [settings]);

  return (
    <div className="relative group" style={{ width: '700px', height: '500px' }}>
      {/* Visual Guide Overlay */}
      {!isExporting && (
        <div className="absolute inset-0 pointer-events-none border-2 border-indigo-500/20 rounded-lg overflow-hidden z-50">
           <div className="absolute inset-x-[250px] inset-y-0 border-x border-white/5 bg-white/[0.02]" title="Reserved for AE loading animation"></div>
        </div>
      )}

      {/* Actual Splash Content */}
      <div
        ref={innerRef}
        id="ae-splash-target"
        className="relative overflow-hidden shadow-2xl bg-black"
        style={{
          width: '700px',
          height: '500px',
          fontFamily: settings.fontFamily,
          ...bgStyle,
          ...transformStyle,
        }}
      >
        {/* Left Section: Logo + Text */}
        <div className="absolute left-0 top-0 bottom-0 w-[250px] p-8 flex flex-col justify-between z-10 pointer-events-none">
          <div className="flex flex-col items-start">
            {/* Logo */}
            <div className="mb-8 w-16 h-16 flex items-center justify-center">
              {settings.aeLogoUrl && (
                <img 
                  src={settings.aeLogoUrl} 
                  alt="AE Logo" 
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {/* Title & Subtitle */}
            <h1 
              className="text-3xl font-bold leading-tight tracking-tight mb-2 text-left w-full"
              style={{ color: settings.titleColor }}
            >
              {settings.title}
            </h1>
            <p 
              className="text-sm font-medium opacity-80 text-left w-full"
              style={{ color: settings.subtitleColor }}
            >
              {settings.subtitle}
            </p>
          </div>

          {/* Bottom Branding */}
          <div className="flex items-center gap-2">
            {settings.ccLogoUrl && (
              <img 
                src={settings.ccLogoUrl} 
                alt="CC Logo" 
                className="w-8 h-8 object-contain shrink-0"
              />
            )}
            <span 
              className="text-[10px] uppercase tracking-widest opacity-40 font-bold leading-none" 
              style={{ color: settings.ccLogoTextColor }}
            >
              {settings.ccLogoText}
            </span>
          </div>
        </div>

        {/* Center Section: Reserved (Empty space) */}
        <div className="absolute left-[250px] w-[200px] top-0 bottom-0 z-0"></div>

        {/* Right Section: Artwork - Guaranteed 250x500 area */}
        <div className="absolute right-0 top-0 bottom-0 w-[250px] h-full z-10">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {settings.artworkUrl ? (
              <img 
                src={settings.artworkUrl} 
                alt="Artwork" 
                className="w-full h-full"
                style={{ 
                  objectFit: settings.artworkFit,
                  display: 'block' 
                }}
              />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                <span className="text-[10px] text-zinc-700 uppercase tracking-widest">No Artwork</span>
              </div>
            )}
          </div>
        </div>

        {/* Subtle decorative overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)]"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
