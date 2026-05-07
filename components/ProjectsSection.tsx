import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import { getEmbedUrl } from '../utils/videoUtils';
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
  const hasImage = !!(project.imageUrl);
  const hasVideo = !!(project.videoUrl);
  const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
  const embedUrl = hasVideo ? getEmbedUrl(project.videoUrl) : null;

  return (
    <GlassCard style={styles.projectCard}>
      {/* Thumbnail: image if available, otherwise colored icon */}
      <View style={[styles.projectThumb, { backgroundColor: `${project.color}12` }]}>
        {hasImage ? (
          <Image
            source={{ uri: project.imageUrl }}
            style={styles.thumbImage}
            resizeMode="cover"
          />
        ) : (
          <Ionicons
            name={PROJECT_ICONS[project.id] || 'code-slash'}
            size={44}
            color={project.color}
          />
        )}
      </View>

      {/* Pillar badge */}
      <View style={[styles.pillarBadge, { borderColor: `${project.color}40` }]}>
        <Text style={[styles.pillarText, { color: project.color }]}>
          {project.pillar}
        </Text>
      </View>

      <Text style={styles.projectTitle}>{project.title}</Text>
      <Text style={styles.projectDesc} numberOfLines={4}>{project.description}</Text>

      <View style={styles.tags}>
        {project.tags.slice(0, 5).map((tag: string) => (
          <View key={tag} style={[styles.tag, { borderColor: `${project.color}30` }]}>
            <Text style={[styles.tagText, { color: project.color }]}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Embedded video demo */}
      {hasVideo && embedUrl && Platform.OS === 'web' && (
        <View style={styles.videoContainer}>
          <iframe
            src={embedUrl}
            title={`${project.title} demo`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 8,
            } as any}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </View>
      )}

      {/* Links */}
      <View style={styles.projectLinks}>
        {project.githubUrl && project.githubUrl !== '#' && (
          <ExternalLink
            href={project.githubUrl}
            style={({ hovered }: any) => [
              styles.linkBtn,
              styles.linkBtnGhost,
              hovered && styles.linkBtnGhostHovered,
            ]}
          >
            <Ionicons name="logo-github" size={16} color={COLORS.textSecondary} />
            <Text style={styles.linkBtnText}>Source</Text>
          </ExternalLink>
        )}

        {hasLiveUrl && (
          <ExternalLink
            href={project.liveUrl}
            style={({ hovered }: any) => [
              styles.linkBtn,
              styles.linkBtnPrimary,
              hovered && styles.linkBtnPrimaryHovered,
            ]}
          >
            <Ionicons name="open-outline" size={16} color="#fff" />
            <Text style={styles.linkBtnPrimaryText}>Live Demo</Text>
          </ExternalLink>
        )}

        {hasVideo && !embedUrl && (
          <ExternalLink
            href={project.videoUrl}
            style={({ hovered }: any) => [
              styles.linkBtn,
              styles.linkBtnVideo,
              hovered && styles.linkBtnVideoHovered,
            ]}
          >
            <Ionicons name="play-circle-outline" size={16} color={COLORS.accentPrimary} />
            <Text style={styles.linkBtnVideoText}>Watch Demo</Text>
          </ExternalLink>
        )}
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
        title="Featured Projects"
        subtitle="Advanced iOS applications across 5 engineering pillars"
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
    gap: SPACING.md,
    flexWrap: 'wrap',
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
    marginBottom: SPACING.sm,
  },
  cardWrapperTablet: {
    width: '47%',
  },
  projectCard: {
    height: '100%',
  },
  projectThumb: {
    height: 120,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  pillarBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  pillarText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  projectTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  projectDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: SPACING.md,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: SPACING.md,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  videoContainer: {
    width: '100%' as any,
    aspectRatio: 16 / 9,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: SPACING.md,
  } as any,
  projectLinks: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: 'auto' as any,
    paddingTop: SPACING.sm,
    flexWrap: 'wrap',
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  linkBtnGhost: {
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  linkBtnGhostHovered: {
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  linkBtnText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  linkBtnPrimary: {
    backgroundColor: COLORS.accentPrimary,
    borderWidth: 0,
  },
  linkBtnPrimaryHovered: {
    opacity: 0.85,
  },
  linkBtnPrimaryText: {
    fontSize: FONT_SIZES.xs,
    color: '#fff',
    fontWeight: '600',
  },
  linkBtnVideo: {
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
  },
  linkBtnVideoHovered: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
  },
  linkBtnVideoText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.accentPrimary,
    fontWeight: '500',
  },
});
