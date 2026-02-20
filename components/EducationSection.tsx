import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function EducationSection() {
  const { education } = useData();

  return (
    <View style={styles.container}>
      <SectionTitle title="Education" subtitle="My academic background" />

      <View style={styles.cards}>
        {education.map((edu) => (
          <GlassCard key={edu.id} style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name="school-outline" size={28} color={COLORS.accentPrimary} />
            </View>
            <Text style={styles.degree}>{edu.degree}</Text>
            <Text style={styles.institution}>{edu.institution}</Text>
            <Text style={styles.year}>{edu.year}</Text>
            <Text style={styles.description}>{edu.description}</Text>
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
  cards: {
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
    gap: SPACING.lg,
  },
  card: {
    paddingVertical: SPACING.xl,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  degree: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  institution: {
    fontSize: FONT_SIZES.md,
    color: COLORS.accentPrimary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  year: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
