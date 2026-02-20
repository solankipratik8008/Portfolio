import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { seedAllData } from '../../services/seedFirestore';

export default function AdminDashboard() {
  const { user } = useAuth();
  const data = useData();
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedAllData();
      setSeedDone(true);
      data.refetch();
    } catch (e: any) {
      alert('Seed failed: ' + e.message);
    } finally {
      setSeeding(false);
    }
  };

  const stats = [
    { label: 'Projects', count: data.projects.length, icon: 'rocket-outline' },
    { label: 'Built Projects', count: data.builtProjects.length, icon: 'hammer-outline' },
    { label: 'Certifications', count: data.certifications.length, icon: 'ribbon-outline' },
    { label: 'Experience', count: data.experiences.length, icon: 'briefcase-outline' },
    { label: 'Education', count: data.education.length, icon: 'school-outline' },
    { label: 'Testimonials', count: data.testimonials.length, icon: 'chatbubble-outline' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Welcome back!</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Ionicons name={stat.icon as any} size={28} color={COLORS.accentPrimary} />
            <Text style={styles.statCount}>{stat.count}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.seedSection}>
        <Text style={styles.seedTitle}>Seed Database</Text>
        <Text style={styles.seedDesc}>
          First time? Click below to populate Firestore with your existing portfolio data.
          Only do this once.
        </Text>
        <Pressable
          onPress={handleSeed}
          disabled={seeding || seedDone}
          style={styles.seedBtnWrap}
        >
          <LinearGradient
            colors={seedDone ? ['#10B981', '#059669'] : [COLORS.accentPrimary, COLORS.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.seedBtn, (seeding || seedDone) && { opacity: 0.7 }]}
          >
            {seeding ? (
              <ActivityIndicator color="#fff" />
            ) : seedDone ? (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.seedBtnText}>Data Seeded Successfully!</Text>
              </>
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                <Text style={styles.seedBtnText}>Seed All Data to Firestore</Text>
              </>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.xl,
  },
  greeting: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textMuted,
    marginBottom: SPACING.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  statCard: {
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: 160,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statCount: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
  seedSection: {
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    maxWidth: 500,
  },
  seedTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  seedDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  seedBtnWrap: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  seedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  seedBtnText: {
    color: '#fff',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
