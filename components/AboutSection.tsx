import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import SectionTitle from './SectionTitle';

export default function AboutSection() {
  const { personalInfo } = useData();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const hasPhoto = !!(personalInfo as any).photoUrl;

  return (
    <View style={styles.container}>
      <SectionTitle title="About Me" subtitle="iOS Developer based in Waterloo, ON" />

      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {hasPhoto && (
          <View style={[styles.imageContainer, isMobile && styles.imageContainerMobile]}>
            <Image
              source={{ uri: (personalInfo as any).photoUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={[styles.textContent, (!hasPhoto || isMobile) && styles.textContentFull]}>
          <Text style={styles.bio}>{personalInfo.bio}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={15} color={COLORS.accentPrimary} />
              <Text style={styles.infoText}>{personalInfo.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={15} color={COLORS.accentPrimary} />
              <Text style={styles.infoText}>{personalInfo.email}</Text>
            </View>
          </View>
        </View>
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
  content: {
    flexDirection: 'row',
    gap: SPACING.xl,
    alignItems: 'flex-start',
  },
  contentMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    flexShrink: 0,
  },
  imageContainerMobile: {
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  textContent: {
    flex: 1,
  },
  textContentFull: {
    flex: 1,
  },
  bio: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
