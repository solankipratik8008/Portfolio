import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions, Platform } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import { getEmbedUrl, isYouTubeShort } from '../utils/videoUtils';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function VideoSection() {
  const { videos } = useData();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!videos || videos.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionTitle title="Videos" subtitle="Demos and walkthroughs" />
      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {videos.map((video: any) => {
          const embedUrl = getEmbedUrl(video.url);
          if (!embedUrl) return null;
          const isShort = isYouTubeShort(video.url);
          return (
            <View key={video.id} style={[styles.videoCard, isMobile && styles.videoCardMobile, isShort && styles.videoCardShort]}>
              <GlassCard style={styles.card}>
                <View style={[styles.iframeContainer, isShort && styles.iframeContainerShort]}>
                  {Platform.OS === 'web' ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: 8,
                      } as any}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : null}
                </View>
                <Text style={styles.videoTitle}>{video.title}</Text>
                {video.description ? (
                  <Text style={styles.videoDesc}>{video.description}</Text>
                ) : null}
              </GlassCard>
            </View>
          );
        })}
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
  },
  gridMobile: {
    flexDirection: 'column',
  },
  videoCard: {
    flex: 1,
    minWidth: 300,
  },
  videoCardMobile: {
    minWidth: '100%' as any,
  },
  videoCardShort: {
    flex: 0,
    width: 280,
  },
  card: {
    padding: SPACING.md,
  },
  iframeContainer: {
    width: '100%' as any,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: SPACING.md,
  } as any,
  iframeContainerShort: {
    aspectRatio: 9 / 16,
  },
  videoTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  videoDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
