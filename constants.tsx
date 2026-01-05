
import { SplashSettings, BackgroundType } from './types';

export const DEFAULT_SETTINGS: SplashSettings = {
  aeLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
  ccLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg',
  artworkUrl: 'https://picsum.photos/seed/ae-splash/400/500',
  artworkFit: 'cover',
  backgroundUrl: '',
  bgType: BackgroundType.GRADIENT,
  bgColor: '#1a1a1a',
  bgGradient: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
  gradientStart: '#1a1a1a',
  gradientEnd: '#000000',
  title: 'After Effects',
  subtitle: '2025 Release',
  ccLogoText: 'Adobe Creative Cloud',
  titleColor: '#ffffff',
  subtitleColor: '#a1a1aa',
  ccLogoTextColor: '#a1a1aa',
  preset: 'dark',
  fontFamily: 'Inter, sans-serif'
};

export const PRESETS: Record<string, Partial<SplashSettings>> = {
  dark: {
    bgColor: '#111111',
    bgGradient: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
    gradientStart: '#1e1e1e',
    gradientEnd: '#0a0a0a',
    titleColor: '#ffffff',
    subtitleColor: '#a1a1aa',
    ccLogoTextColor: '#a1a1aa',
    artworkFit: 'cover',
    bgType: BackgroundType.GRADIENT,
  },
  light: {
    bgColor: '#f4f4f5',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
    gradientStart: '#ffffff',
    gradientEnd: '#e4e4e7',
    titleColor: '#18181b',
    subtitleColor: '#71717a',
    ccLogoTextColor: '#71717a',
    artworkFit: 'cover',
    bgType: BackgroundType.GRADIENT,
  },
  neon: {
    bgColor: '#000000',
    bgGradient: 'linear-gradient(135deg, #1a0b2e 0%, #000000 100%)',
    gradientStart: '#1a0b2e',
    gradientEnd: '#000000',
    titleColor: '#d8b4fe',
    subtitleColor: '#818cf8',
    ccLogoTextColor: '#818cf8',
    artworkFit: 'cover',
    bgType: BackgroundType.GRADIENT,
  },
  creative: {
    bgColor: '#2e1065',
    bgGradient: 'radial-gradient(circle at top left, #4c1d95, #1e1b4b)',
    gradientStart: '#4c1d95',
    gradientEnd: '#1e1b4b',
    titleColor: '#ffffff',
    subtitleColor: '#c4b5fd',
    ccLogoTextColor: '#c4b5fd',
    artworkFit: 'cover',
    bgType: BackgroundType.GRADIENT,
  }
};
