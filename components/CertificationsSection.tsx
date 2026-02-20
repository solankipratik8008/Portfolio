import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';
import ExternalLink from './ExternalLink';

function CertCard({ cert }: { cert: any }) {
  return (
    <ExternalLink
      href={cert.verifyUrl}
      style={({ hovered }: any) => [hovered && { transform: [{ scale: 1.02 }] }]}
    >
      <GlassCard style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.iconWrap}>
            <Ionicons name={cert.icon as any} size={22} color={COLORS.accentPrimary} />
          </View>
          <View style={styles.issuerBadge}>
            <Text style={styles.issuerText}>{cert.issuer}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>{cert.title}</Text>

        <View style={styles.verifyRow}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.verifyText}>Verified Certificate</Text>
          <Ionicons name="open-outline" size={14} color={COLORS.textMuted} />
        </View>
      </GlassCard>
    </ExternalLink>
  );
}

export default function CertificationsSection() {
  const { certifications } = useData();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Certifications"
        subtitle="Verified credentials that back up my skills"
      />

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {certifications.map((cert) => (
          <View
            key={cert.id}
            style={[styles.cardWrapper, isMobile && styles.cardWrapperMobile]}
          >
            <CertCard cert={cert} />
          </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  cardWrapper: {
    width: '18%',
    minWidth: 210,
  },
  cardWrapperMobile: {
    width: '100%',
    minWidth: 0,
  },
  card: {
    height: '100%',
    paddingVertical: SPACING.lg,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  issuerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  issuerText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    lineHeight: 22,
  },
  verifyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto' as any,
  },
  verifyText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.success,
    fontWeight: '500',
    flex: 1,
  },
});
