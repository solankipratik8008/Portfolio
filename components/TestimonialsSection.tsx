import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH } from '../constants/theme';
import { TESTIMONIALS } from '../constants/data';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[0] }) {
  return (
    <GlassCard style={styles.card}>
      <Ionicons
        name="chatbubble-ellipses"
        size={32}
        color={COLORS.accentPrimary}
        style={styles.quoteIcon}
      />
      <Text style={styles.quote}>"{item.quote}"</Text>
      <View style={styles.author}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color={COLORS.accentPrimary} />
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>
            {item.role} at {item.company}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

export default function TestimonialsSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      <SectionTitle title="Testimonials" subtitle="What people say about me" />

      {isMobile ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={320}
        >
          {TESTIMONIALS.map((item) => (
            <View key={item.id} style={styles.scrollCard}>
              <TestimonialCard item={item} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.grid}>
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </View>
      )}
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
  scrollContent: {
    paddingRight: SPACING.lg,
  },
  scrollCard: {
    width: 300,
    marginRight: SPACING.md,
  },
  card: {
    flex: 1,
    minWidth: 280,
  },
  quoteIcon: {
    marginBottom: SPACING.md,
    opacity: 0.6,
  },
  quote: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  role: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
});
