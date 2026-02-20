import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';
import ExternalLink from './ExternalLink';

const PROJECT_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  '1': 'shield-checkmark',
  '2': 'chatbubbles',
  '3': 'cube',
  '4': 'wallet',
  '5': 'eye',
};

function ProjectCard({ project }: { project: any }) {
  return (
    <GlassCard glow style={styles.projectCard}>
      <View style={[styles.projectImage, { backgroundColor: `${project.color}20` }]}>
        <Ionicons
          name={PROJECT_ICONS[project.id] || 'code-slash'}
          size={48}
          color={project.color}
        />
      </View>

      <View style={[styles.pillarBadge, { borderColor: `${project.color}50` }]}>
        <Ionicons name="diamond" size={12} color={project.color} />
        <Text style={[styles.pillarText, { color: project.color }]}>
          {project.pillar}
        </Text>
      </View>

      <Text style={styles.projectTitle}>{project.title}</Text>
      <Text style={styles.projectDesc}>{project.description}</Text>

      <View style={styles.tags}>
        {project.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.projectLinks}>
        <ExternalLink
          href={project.githubUrl}
          style={({ hovered }: any) => [
            styles.projectLink,
            hovered && styles.projectLinkHovered,
          ]}
        >
          <Ionicons name="logo-github" size={18} color={COLORS.textSecondary} />
          <Text style={styles.projectLinkText}>Source Code</Text>
        </ExternalLink>
      </View>
    </GlassCard>
  );
}

export default function ProjectsSection() {
  const { projects } = useData();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Projects"
        subtitle="Each project targets a distinct pillar of iOS engineering excellence"
      />

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {projects.map((project) => (
          <View
            key={project.id}
            style={[
              styles.cardWrapper,
              isMobile && styles.cardWrapperMobile,
              isTablet && styles.cardWrapperTablet,
            ]}
          >
            <ProjectCard project={project} />
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
    gap: SPACING.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  cardWrapper: {
    width: '30%',
    minWidth: 320,
  },
  cardWrapperMobile: {
    width: '100%',
    minWidth: 0,
    marginBottom: SPACING.md,
  },
  cardWrapperTablet: {
    width: '46%',
  },
  projectCard: {
    height: '100%',
  },
  projectImage: {
    height: 140,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  pillarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
  },
  pillarText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  projectTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  projectDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tag: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  tagText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accentPrimary,
    fontWeight: '500',
  },
  projectLinks: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: 'auto' as any,
    paddingTop: SPACING.sm,
  },
  projectLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: COLORS.glassBg,
  },
  projectLinkHovered: {
    backgroundColor: COLORS.glassHighlight,
  },
  projectLinkText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
