import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

function SkillBar({ name, level }: { name: string; level: number }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: level,
      duration: 1200,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{name}</Text>
        <Text style={styles.skillLevel}>{level}%</Text>
      </View>
      <View style={styles.skillBarBg}>
        <Animated.View style={[styles.skillBarFill, { width: animatedWidth }]}>
          <LinearGradient
            colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

export default function SkillsSection() {
  const { skillCategories } = useData();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <SectionTitle title="Skills" subtitle="Technologies I work with" />

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {skillCategories.map((category) => (
          <GlassCard key={category.title} style={[styles.categoryCard, isMobile && styles.categoryCardMobile]}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
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
  grid: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  gridMobile: {
    flexDirection: 'column',
  },
  categoryCard: {
    flex: 1,
  },
  categoryCardMobile: {
    marginBottom: SPACING.md,
  },
  categoryTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.accentPrimary,
    marginBottom: SPACING.lg,
  },
  skillItem: {
    marginBottom: SPACING.md,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  skillName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  skillLevel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },
  skillBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
});
