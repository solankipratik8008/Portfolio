export const COLORS = {
  background: '#0a0118',
  backgroundSecondary: '#1a0a2e',
  glassBg: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  glassHighlight: 'rgba(255, 255, 255, 0.12)',
  accentPrimary: '#7C3AED',
  accentSecondary: '#2563EB',
  accentGradient: ['#7C3AED', '#2563EB'] as const,
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  section: 80,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 48,
  display: 64,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const GLASS_STYLE = {
  backgroundColor: COLORS.glassBg,
  borderWidth: 1,
  borderColor: COLORS.glassBorder,
  borderRadius: BORDER_RADIUS.lg,
};

export const SHADOWS = {
  glass: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
};

export const MAX_WIDTH = 1200;
export const NAVBAR_HEIGHT = 70;
