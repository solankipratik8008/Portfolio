import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { PERSONAL_INFO, STATS } from '../constants/data';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function AboutSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <SectionTitle title="About Me" subtitle="Get to know me better" />

      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={[styles.imageContainer, isMobile && styles.imageContainerMobile]}>
          <GlassCard style={styles.avatarCard}>
            <Image
              source={require('../assets/profile.png')}
              style={styles.avatarImage}
            />
          </GlassCard>
        </View>

        <View style={[styles.textContent, isMobile && styles.textContentMobile]}>
          <Text style={styles.bio}>{PERSONAL_INFO.bio}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={18} color={COLORS.accentPrimary} />
              <Text style={styles.infoText}>{PERSONAL_INFO.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={18} color={COLORS.accentPrimary} />
              <Text style={styles.infoText}>{PERSONAL_INFO.email}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.statsRow, isMobile && styles.statsRowMobile]}>
        {STATS.map((stat) => (
          <GlassCard key={stat.label} style={[styles.statCard, isMobile && styles.statCardMobile]}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </GlassCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.section,
  },
  content: {
    flexDirection: 'row',
    gap: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  contentMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainerMobile: {
    marginBottom: SPACING.lg,
  },
  avatarCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
  },
  avatarImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: COLORS.accentPrimary,
  },
  textContent: {
    flex: 2,
    justifyContent: 'center',
  },
  textContentMobile: {
    alignItems: 'center',
  },
  bio: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 26,
    marginBottom: SPACING.lg,
    textAlign: 'left',
  },
  infoRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statsRowMobile: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    minWidth: 140,
    paddingVertical: SPACING.lg,
  },
  statCardMobile: {
    flex: 0,
    width: '45%',
    marginBottom: SPACING.md,
  },
  statValue: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '800',
    color: COLORS.accentPrimary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
