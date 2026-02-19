import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { BUILT_PROJECTS } from '../constants/data';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

function BuiltCard({ project }: { project: (typeof BUILT_PROJECTS)[0] }) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconWrap, { backgroundColor: `${project.color}20` }]}>
          <Ionicons
            name={project.icon as any}
            size={24}
            color={project.color}
          />
        </View>
        <Pressable
          onPress={() => Linking.openURL(project.githubUrl)}
          style={({ hovered }: any) => [
            styles.ghBtn,
            hovered && styles.ghBtnHovered,
          ]}
        >
          <Ionicons name="logo-github" size={18} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.desc}>{project.description}</Text>

      <View style={styles.tags}>
        {project.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { borderColor: `${project.color}40` }]}>
            <Text style={[styles.tagText, { color: project.color }]}>{tag}</Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

export default function BuiltProjectsSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Hands-On Projects"
        subtitle="Real applications I've built and shipped — iOS, web, and beyond"
      />

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {BUILT_PROJECTS.map((project) => (
          <View
            key={project.id}
            style={[
              styles.cardWrapper,
              isMobile && styles.cardWrapperMobile,
              isTablet && styles.cardWrapperTablet,
            ]}
          >
            <BuiltCard project={project} />
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
    gap: SPACING.lg,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  cardWrapper: {
    width: '30%',
    minWidth: 300,
  },
  cardWrapperMobile: {
    width: '100%',
    minWidth: 0,
  },
  cardWrapperTablet: {
    width: '46%',
  },
  card: {
    height: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghBtnHovered: {
    backgroundColor: COLORS.glassHighlight,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  desc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginTop: 'auto' as any,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
