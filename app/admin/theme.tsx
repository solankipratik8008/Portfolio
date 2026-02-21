import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { useTheme, THEME_PRESETS, ThemePreset, ThemeHistoryEntry } from '../../contexts/ThemeContext';
import GlassCard from '../../components/GlassCard';

export default function AdminTheme() {
  const { currentPreset, applyPreset, themeHistory, restoreHistorical, isDark, toggleDark, loading } = useTheme();
  const [applying, setApplying] = useState<string | null>(null);

  const handleApply = async (preset: ThemePreset) => {
    setApplying(preset.name);
    await applyPreset(preset);
    setApplying(null);
  };

  const handleRestore = async (entry: ThemeHistoryEntry) => {
    setApplying(entry.name + entry.changedAt);
    await restoreHistorical(entry);
    setApplying(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Theme Customization</Text>

      {/* Dark / Light Mode */}
      <GlassCard style={styles.section}>
        <Text style={styles.sectionTitle}>Display Mode</Text>
        <Pressable onPress={toggleDark} style={styles.modeRow}>
          <LinearGradient
            colors={isDark ? ['#1a0a2e', '#0a0118'] : ['#f8f6ff', '#ede8ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.modeSwatch}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.modeName}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
            <Text style={styles.modeDesc}>Tap to toggle</Text>
          </View>
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={24}
            color={isDark ? '#7C3AED' : '#F59E0B'}
          />
        </Pressable>
      </GlassCard>

      {/* Color Presets */}
      <GlassCard style={styles.section}>
        <Text style={styles.sectionTitle}>Color Presets</Text>
        {loading ? (
          <ActivityIndicator color={COLORS.accentPrimary} />
        ) : (
          <View style={styles.presetGrid}>
            {THEME_PRESETS.map((preset) => {
              const isActive = currentPreset.name === preset.name;
              const isApplying = applying === preset.name;
              return (
                <Pressable
                  key={preset.name}
                  onPress={() => handleApply(preset)}
                  disabled={applying !== null}
                  style={[styles.presetCard, isActive && styles.presetCardActive]}
                >
                  <LinearGradient
                    colors={[preset.primary, preset.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.presetSwatch}
                  />
                  <View style={styles.presetInfo}>
                    <Text style={styles.presetName}>{preset.name}</Text>
                    {isApplying ? (
                      <ActivityIndicator size="small" color={preset.primary} />
                    ) : isActive ? (
                      <Ionicons name="checkmark-circle" size={16} color={preset.primary} />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </GlassCard>

      {/* Theme History */}
      {themeHistory.length > 0 && (
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>History (last 10)</Text>
          {themeHistory.map((entry) => {
            const key = entry.name + entry.changedAt;
            return (
              <View key={entry.id} style={styles.historyRow}>
                <LinearGradient
                  colors={[entry.primary, entry.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.historySwatch}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyName}>{entry.name}</Text>
                  <Text style={styles.historyDate}>
                    {new Date(entry.changedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </Text>
                </View>
                <Pressable
                  onPress={() => handleRestore(entry)}
                  disabled={applying !== null}
                  style={styles.restoreBtn}
                >
                  {applying === key ? (
                    <ActivityIndicator size="small" color={COLORS.accentPrimary} />
                  ) : (
                    <Ionicons name="refresh-outline" size={20} color={COLORS.accentPrimary} />
                  )}
                </Pressable>
              </View>
            );
          })}
        </GlassCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.xl, gap: SPACING.lg, maxWidth: 700 },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  section: { marginBottom: 0 },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  modeSwatch: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
  },
  modeName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  modeDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  presetCard: {
    width: 140,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    overflow: 'hidden',
    backgroundColor: COLORS.glassBg,
  },
  presetCardActive: {
    borderColor: COLORS.accentPrimary,
    borderWidth: 2,
  },
  presetSwatch: {
    height: 48,
  },
  presetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  presetName: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
  historySwatch: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
  },
  historyName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  historyDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },
  restoreBtn: {
    padding: SPACING.sm,
  },
});
