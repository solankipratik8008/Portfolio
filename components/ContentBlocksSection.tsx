import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import { getEmbedUrl } from '../utils/videoUtils';
import GlassCard from './GlassCard';
import ExternalLink from './ExternalLink';

export default function ContentBlocksSection() {
  const { contentBlocks } = useData();

  const visible = (contentBlocks || []).filter((b: any) => b.visible !== false);
  if (visible.length === 0) return null;

  return (
    <View style={styles.container}>
      {visible.map((block: any) => (
        <View key={block.id} style={styles.blockWrapper}>
          <GlassCard>
            {block.title ? <Text style={styles.blockTitle}>{block.title}</Text> : null}

            {block.type === 'text' && block.content ? (
              <Text style={styles.blockContent}>{block.content}</Text>
            ) : null}

            {block.type === 'image' && block.imageUrl ? (
              <Image
                source={{ uri: block.imageUrl }}
                style={styles.blockImage}
                resizeMode="contain"
              />
            ) : null}

            {block.type === 'video' && block.videoUrl ? (
              <View style={styles.iframeContainer}>
                {Platform.OS === 'web' ? (
                  <iframe
                    src={getEmbedUrl(block.videoUrl) || ''}
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 } as any}
                    allowFullScreen
                  />
                ) : null}
              </View>
            ) : null}

            {block.type === 'links' && block.links && block.links.length > 0 ? (
              <View style={styles.linksContainer}>
                {block.links.map((link: any, i: number) => (
                  <ExternalLink key={i} href={link.url} style={styles.linkItem}>
                    <Ionicons name="link-outline" size={16} color={COLORS.accentPrimary} />
                    <Text style={styles.linkLabel}>{link.label}</Text>
                  </ExternalLink>
                ))}
              </View>
            ) : null}
          </GlassCard>
        </View>
      ))}
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
    gap: SPACING.lg,
  },
  blockWrapper: {},
  blockTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  blockContent: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 26,
  },
  blockImage: {
    width: '100%' as any,
    height: 300,
    borderRadius: BORDER_RADIUS.md,
  },
  iframeContainer: {
    width: '100%' as any,
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  } as any,
  linksContainer: {
    gap: SPACING.sm,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  } as any,
  linkLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.accentPrimary,
    fontWeight: '500',
  },
});
