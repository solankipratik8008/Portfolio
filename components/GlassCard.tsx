import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
}

export default function GlassCard({ children, style, glow }: GlassCardProps) {
  return (
    <View style={[styles.card, glow && styles.cardGlow, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.lg,
    padding: 20,
    ...SHADOWS.glass,
  },
  cardGlow: {
    borderColor: 'rgba(59, 130, 246, 0.3)',
    ...SHADOWS.glow,
  },
});
