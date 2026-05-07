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

function BuiltCard({ project }: { project: any }) {
  const hasImage = !!(project.imageUrl);
  const hasVideo = !!(project.videoUrl);
  const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
  const embedUrl = hasVideo ? getEmbedUrl(project.videoUrl) : null;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}>
        {hasImage ? (
          <Image source={{ uri: project.imageUrl }} style={styles.headerImage} resizeMode="cover" />
        ) : (
          <View style={[styles.iconWrap, { backgroundColor: `${project.color}18` }]}>
            <Ionicons name={project.icon as any} size={22} color={project.color} />
          </View>
        )}

        <View style={styles.headerLinks}>
          {project.githubUrl && project.githubUrl !== '#' && (
            <ExternalLink
              href={project.githubUrl}
              style={({ hovered }: any) => [styles.iconBtn, hovered && styles.iconBtnHovered]}
            >
              <Ionicons name="logo-github" size={17} color={COLORS.textSecondary} />
            </ExternalLink>
          )}
          {hasLiveUrl && (
            <ExternalLink
              href={project.liveUrl}
              style={({ hovered }: any) => [styles.iconBtn, styles.iconBtnLive, hovered && styles.iconBtnLiveHovered]}
            >
              <Ionicons name="open-outline" size={15} color={COLORS.accentPrimary} />
              <Text style={styles.liveBtnText}>Live</Text>
            </ExternalLink>
          )}
        </View>
      </View>

      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.desc} numberOfLines={3}>{project.description}</Text>

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
              borderRadius: 6,
            } as any}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </View>
      )}

      {hasVideo && !embedUrl && (
        <ExternalLink
          href={project.videoUrl}
          style={({ hovered }: any) => [styles.watchBtn, hovered && styles.watchBtnHovered]}
        >
          <Ionicons name="play-circle-outline" size={15} color={COLORS.accentPrimary} />
          <Text style={styles.watchBtnText}>Watch Demo</Text>
        </ExternalLink>
      )}

      <View style={styles.tags}>
        {project.tags.slice(0, 4).map((tag: string) => (
          <View key={tag} style={[styles.tag, { borderColor: `${project.color}35` }]}>
            <Text style={[styles.tagText, { color: project.color }]}>{tag}</Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

export default function BuiltProjectsSection() {
  const { builtProjects } = useData();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Hands-On Projects"
        subtitle="Real applications I've built and shipped"
      />

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {builtProjects.map((project) => (
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
    gap: SPACING.md,
    justifyContent: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  cardWrapper: {
    width: '30%',
    minWidth: 290,
  },
  cardWrapperMobile: {
    width: '100%',
    minWidth: 0,
  },
  cardWrapperTablet: {
    width: '47%',
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
  headerImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLinks: {
    flexDirection: 'row',
    gap: SPACING.xs,
    alignItems: 'center',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnHovered: {
    borderColor: 'rgba(255,255,255,0.2)',
  },
  iconBtnLive: {
    flexDirection: 'row',
    gap: 4,
    width: 'auto' as any,
    paddingHorizontal: 10,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
  },
  iconBtnLiveHovered: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
  },
  liveBtnText: {
    fontSize: 11,
    color: COLORS.accentPrimary,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  desc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  videoContainer: {
    width: '100%' as any,
    aspectRatio: 16 / 9,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: SPACING.sm,
  } as any,
  watchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  watchBtnHovered: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
  },
  watchBtnText: {
    fontSize: 12,
    color: COLORS.accentPrimary,
    fontWeight: '500',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 'auto' as any,
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
});
