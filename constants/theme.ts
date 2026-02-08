/**
 * MetricMe pedometer app theme – dark UI with yellow accent.
 * Tailwind-like tokens for spacing, radius, and typography.
 */

import { Platform } from 'react-native';

// Palette (from reference)
const Palette = {
  background: '#0D0D0D',
  surface: '#121212',
  surfaceElevated: '#1A1A1A',
  card: '#161616',
  primary: '#FACC15',
  primaryMuted: '#EAB308',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textMuted: '#6B7280',
  border: '#27272A',
  success: '#22C55E',
  tint: '#FACC15',
  tabIconDefault: '#71717A',
  tabIconSelected: '#FACC15',
};

export const Colors = {
  ...Palette,
  light: {
    text: '#11181C',
    background: Palette.surface,
    tint: Palette.primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: Palette.primary,
  },
  dark: {
    text: Palette.text,
    background: Palette.background,
    tint: Palette.primary,
    icon: Palette.textSecondary,
    tabIconDefault: Palette.tabIconDefault,
    tabIconSelected: Palette.tabIconSelected,
  },
};

// Spacing (Tailwind-like: 1 = 4px)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
};

// Border radius
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

// Typography scale
export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// Custom font names (loaded via @expo-google-fonts/dm-sans in root layout)
export const FontFamily = {
  regular: 'DMSans_400Regular',
  semiBold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

