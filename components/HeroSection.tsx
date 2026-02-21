import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, NAVBAR_HEIGHT, SHADOWS } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import ExternalLink from './ExternalLink';

interface HeroSectionProps {
  onViewWork: () => void;
}

export default function HeroSection({ onViewWork }: HeroSectionProps) {
  const { personalInfo } = useData();
  const { currentPreset } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const hasResume = !!(personalInfo as any).resumeUrl && (personalInfo as any).resumeUrl !== '#';
  const hasPhoto = !!(personalInfo as any).photoUrl;

  return (
    <View style={styles.container}>
      {/* Decorative gradient orbs */}
      <View style={[styles.orb, styles.orb1, { backgroundColor: currentPreset.primary }]} />
      <View style={[styles.orb, styles.orb2, { backgroundColor: currentPreset.secondary }]} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: isMobile ? SPACING.lg : SPACING.xl,
          },
        ]}
      >
        {/* Profile photo */}
        {hasPhoto && (
          <View style={[styles.avatarContainer, { borderColor: currentPreset.primary }]}>
            <Image
              source={{ uri: (personalInfo as any).photoUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        )}

        <Text style={styles.greeting}>Hello, I'm</Text>
        <Text style={[styles.name, isMobile && styles.nameMobile]}>
          {personalInfo.name}
        </Text>
        <View style={styles.roleContainer}>
          <LinearGradient
            colors={[currentPreset.primary, currentPreset.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.roleBadge}
          >
            <Text style={styles.roleText}>{personalInfo.role}</Text>
          </LinearGradient>
        </View>
        <Text style={[styles.tagline, isMobile && styles.taglineMobile]}>
          {personalInfo.tagline}
        </Text>

        <View style={[styles.buttons, isMobile && styles.buttonsMobile]}>
          <Pressable
            onPress={onViewWork}
            style={({ hovered }: any) => [
              styles.primaryButton,
              hovered && styles.primaryButtonHovered,
            ]}
          >
            <LinearGradient
              colors={[currentPreset.primary, currentPreset.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Ionicons name="logo-apple" size={18} color="#fff" />
              <Text style={styles.buttonText}>View My Work</Text>
            </LinearGradient>
          </Pressable>

          {hasResume && (
            <ExternalLink
              href={(personalInfo as any).resumeUrl}
              style={({ hovered }: any) => [
                styles.secondaryButton,
                hovered && styles.secondaryButtonHovered,
              ]}
            >
              <Ionicons name="download-outline" size={18} color={currentPreset.primary} />
              <Text style={[styles.secondaryButtonText, { color: currentPreset.primary }]}>
                Download Resume
              </Text>
            </ExternalLink>
          )}
        </View>

        <View style={styles.socials}>
          {[
            { icon: 'logo-github' as const, url: personalInfo.github },
            { icon: 'logo-linkedin' as const, url: personalInfo.linkedin },
            { icon: 'mail-outline' as const, url: `mailto:${personalInfo.email}` },
          ].map((social) => (
            <ExternalLink
              key={social.icon}
              href={social.url}
              style={({ hovered }: any) => [
                styles.socialIcon,
                hovered && styles.socialIconHovered,
              ]}
            >
              <Ionicons name={social.icon} size={22} color={COLORS.textSecondary} />
            </ExternalLink>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : 700,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: NAVBAR_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.15,
  },
  orb1: {
    width: 400,
    height: 400,
    top: -100,
    right: -100,
  },
  orb2: {
    width: 300,
    height: 300,
    bottom: -50,
    left: -80,
  },
  content: {
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    ...SHADOWS.glow,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  greeting: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.accentPrimary,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZES.display,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    letterSpacing: -1,
  },
  nameMobile: {
    fontSize: FONT_SIZES.hero,
  },
  roleContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  roleBadge: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 9999,
  },
  roleText: {
    fontSize: FONT_SIZES.md,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 30,
    marginBottom: SPACING.xl,
  },
  taglineMobile: {
    fontSize: FONT_SIZES.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  buttonsMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  primaryButtonHovered: {
    opacity: 0.9,
    transform: [{ scale: 1.02 }],
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accentPrimary,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
  },
  secondaryButtonHovered: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    transform: [{ scale: 1.02 }],
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  socials: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconHovered: {
    backgroundColor: COLORS.glassHighlight,
    borderColor: COLORS.accentPrimary,
  },
});
