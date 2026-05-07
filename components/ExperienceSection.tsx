import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

function TimelineItem({ item, isLast }: { item: any; isLast: boolean }) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLine}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>
      <GlassCard style={styles.timelineCard}>
        <Text style={styles.duration}>{item.duration}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <Text style={styles.company}>{item.company}</Text>
        {item.description.map((desc, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bullet}>{'  \u2022  '}</Text>
            <Text style={styles.bulletText}>{desc}</Text>
          </View>
        ))}
      </GlassCard>
    </View>
  );
}

export default function ExperienceSection() {
  const { experiences } = useData();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <SectionTitle title="Experience" subtitle="My professional journey" />

      <View style={styles.timeline}>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            item={exp}
            isLast={index === experiences.length - 1}
          />
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
  timeline: {
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },
  timelineItem: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  timelineLine: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accentPrimary,
    borderWidth: 2,
    borderColor: COLORS.background,
    zIndex: 1,
    marginTop: 28,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
  },
  timelineCard: {
    flex: 1,
    marginBottom: SPACING.lg,
  },
  duration: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accentPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  role: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  company: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  bullet: {
    color: COLORS.accentPrimary,
    fontSize: FONT_SIZES.sm,
  },
  bulletText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});
