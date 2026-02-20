import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

const MENU_ITEMS = [
  { label: 'Dashboard', icon: 'grid-outline', path: '/admin' },
  { label: 'Personal Info', icon: 'person-outline', path: '/admin/personal-info' },
  { label: 'Skills', icon: 'bar-chart-outline', path: '/admin/skills' },
  { label: 'Projects', icon: 'rocket-outline', path: '/admin/projects' },
  { label: 'Built Projects', icon: 'hammer-outline', path: '/admin/built-projects' },
  { label: 'Experience', icon: 'briefcase-outline', path: '/admin/experience' },
  { label: 'Education', icon: 'school-outline', path: '/admin/education' },
  { label: 'Certifications', icon: 'ribbon-outline', path: '/admin/certifications' },
  { label: 'Testimonials', icon: 'chatbubble-outline', path: '/admin/testimonials' },
  { label: 'Nav Links', icon: 'menu-outline', path: '/admin/nav-links' },
] as const;

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Admin Panel</Text>

      <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path ||
            (item.path !== '/admin' && pathname.startsWith(item.path));
          return (
            <Pressable
              key={item.path}
              onPress={() => router.push(item.path as any)}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={isActive ? COLORS.accentPrimary : COLORS.textMuted}
              />
              <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable onPress={() => router.push('/')} style={styles.menuItem}>
          <Ionicons name="eye-outline" size={20} color={COLORS.textMuted} />
          <Text style={styles.menuText}>View Site</Text>
        </Pressable>
        <Pressable onPress={logout} style={styles.menuItem}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={[styles.menuText, { color: COLORS.error }]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
    borderRightWidth: 1,
    borderRightColor: COLORS.glassBorder,
    paddingVertical: SPACING.lg,
    height: '100%' as any,
  },
  logo: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.accentPrimary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accentPrimary,
  },
  menuText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  menuTextActive: {
    color: COLORS.accentPrimary,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: COLORS.glassBorder,
    paddingTop: SPACING.md,
  },
});
