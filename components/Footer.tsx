import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { PERSONAL_INFO, NAV_LINKS } from '../constants/data';
import ExternalLink from './ExternalLink';

interface FooterProps {
  onNavPress: (sectionId: string) => void;
}

export default function Footer({ onNavPress }: FooterProps) {
  const socialLinks = [
    { icon: 'logo-github' as const, url: PERSONAL_INFO.github },
    { icon: 'logo-linkedin' as const, url: PERSONAL_INFO.linkedin },
    { icon: 'mail-outline' as const, url: `mailto:${PERSONAL_INFO.email}` },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.top}>
          <View style={styles.brandCol}>
            <Text style={styles.logo}>
              {'< '}
              <Text style={styles.logoAccent}>{PERSONAL_INFO.name.split(' ')[0]}</Text>
              {' />'}
            </Text>
            <Text style={styles.tagline}>{PERSONAL_INFO.tagline}</Text>
          </View>

          <View style={styles.linksCol}>
            <Text style={styles.colTitle}>Quick Links</Text>
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Pressable key={link.sectionId} onPress={() => onNavPress(link.sectionId)}>
                <Text style={styles.footerLink}>{link.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.socialCol}>
            <Text style={styles.colTitle}>Connect</Text>
            <View style={styles.socialRow}>
              {socialLinks.map((social) => (
                <ExternalLink
                  key={social.icon}
                  href={social.url}
                  style={({ hovered }: any) => [
                    styles.socialBtn,
                    hovered && styles.socialBtnHovered,
                  ]}
                >
                  <Ionicons name={social.icon} size={20} color={COLORS.textSecondary} />
                </ExternalLink>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.copyright}>
          {'\u00A9'} {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: COLORS.glassBorder,
    paddingVertical: SPACING.xxl,
  },
  inner: {
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.lg,
  },
  top: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xxl,
    marginBottom: SPACING.xl,
  },
  brandCol: {
    flex: 2,
    minWidth: 200,
  },
  logo: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  logoAccent: {
    color: COLORS.accentPrimary,
  },
  tagline: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    maxWidth: 300,
  },
  linksCol: {
    flex: 1,
    minWidth: 120,
  },
  colTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  footerLink: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  socialCol: {
    flex: 1,
    minWidth: 120,
  },
  socialRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  socialBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtnHovered: {
    backgroundColor: COLORS.glassHighlight,
    borderColor: COLORS.accentPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.glassBorder,
    marginBottom: SPACING.lg,
  },
  copyright: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
