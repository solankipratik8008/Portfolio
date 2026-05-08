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
  const { personalInfo, stats } = useData();
  const { currentPreset } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const hasResume = !!(personalInfo as any).resumeUrl && (personalInfo as any).resumeUrl !== '#';
  const hasPhoto = !!(personalInfo as any).photoUrl;

  return (
    <View style={styles.container}>
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
          <View style={[styles.avatarContainer, { borderColor: COLORS.accentPrimary }]}>
            <Image
              source={{ uri: (personalInfo as any).photoUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        )}

        <Text style={styles.greeting}>iOS Developer</Text>
        <Text style={[styles.name, isMobile && styles.nameMobile]}>
          {personalInfo.name}
        </Text>

        <View style={styles.roleBadgeContainer}>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{personalInfo.role}</Text>
          </View>
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
              colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Ionicons name="briefcase-outline" size={17} color="#fff" />
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
              <Ionicons name="download-outline" size={17} color={COLORS.accentPrimary} />
              <Text style={[styles.secondaryButtonText, { color: COLORS.accentPrimary }]}>
                Resume
              </Text>
            </ExternalLink>
          )}
        </View>

        {/* Stats bar — deduplicate by label as a safety guard */}
        {(() => {
          const unique = stats.filter(
            (s, i, arr) => arr.findIndex((x) => x.label === s.label) === i
          ).slice(0, 6);
          return (
            <View style={[styles.statsBar, isMobile && styles.statsBarMobile]}>
              {unique.map((stat, i) => (
                <View key={stat.label} style={[styles.statItem, i < unique.length - 1 && styles.statItemBorder]}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          );
        })()}

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
              <Ionicons name={social.icon} size={20} color={COLORS.textSecondary} />
            </ExternalLink>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'web' ? ('88vh' as any) : 620,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: NAVBAR_HEIGHT,
    paddingBottom: SPACING.xl,
  },
  content: {
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    ...SHADOWS.glow,
  },
  avatar: {
    width: 96,
    height: 96,
  },
  greeting: {
    fontSize: FONT_SIZES.sm,
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
    letterSpacing: -1.5,
  },
  nameMobile: {
    fontSize: FONT_SIZES.hero,
  },
  roleBadgeContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  roleBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderRadius: 9999,
  },
  roleText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.accentPrimary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 560,
    lineHeight: 26,
    marginBottom: SPACING.lg,
  },
  taglineMobile: {
    fontSize: FONT_SIZES.sm,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  buttonsMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  primaryButtonHovered: {
    opacity: 0.88,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 11,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
  },
  secondaryButtonHovered: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  statsBarMobile: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statItem: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  statItemBorder: {
    borderRightWidth: 1,
    borderRightColor: COLORS.glassBorder,
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.accentPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  socials: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconHovered: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
});
