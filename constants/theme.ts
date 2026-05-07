export const COLORS = {
  background: '#0D1117',
  backgroundSecondary: '#161B22',
  glassBg: 'rgba(22, 27, 34, 0.95)',
  glassBorder: 'rgba(48, 54, 61, 0.9)',
  glassHighlight: 'rgba(48, 54, 61, 0.6)',
  accentPrimary: '#3B82F6',
  accentSecondary: '#06B6D4',
  accentGradient: ['#3B82F6', '#06B6D4'] as const,
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  success: '#22C55E',
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
  section: 56,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  hero: 44,
  display: 58,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const MAX_WIDTH = 1200;
export const NAVBAR_HEIGHT = 64;
