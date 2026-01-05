
export enum BackgroundType {
  SOLID = 'solid',
  GRADIENT = 'gradient',
  IMAGE = 'image'
}

export type FitMode = 'contain' | 'cover';

export interface SplashSettings {
  aeLogoUrl: string;
  ccLogoUrl: string;
  artworkUrl: string;
  artworkFit: FitMode;
  backgroundUrl: string;
  bgType: BackgroundType;
  bgColor: string;
  bgGradient: string;
  gradientStart: string;
  gradientEnd: string;
  title: string;
  subtitle: string;
  ccLogoText: string;
  titleColor: string;
  subtitleColor: string;
  ccLogoTextColor: string;
  preset: string;
  fontFamily: string;
}

export type Preset = 'dark' | 'light' | 'neon' | 'creative';
