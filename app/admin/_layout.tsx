import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Slot, useSegments, useRouter } from 'expo-router';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminLayout() {
  const segments = useSegments();
  const { user, loading } = useAuth();
  const router = useRouter();
  const isLoginPage = segments[segments.length - 1] === 'login';

  if (isLoginPage) {
    return <Slot />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accentPrimary} />
      </View>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      router.replace('/admin/login');
    }
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.redirectText}>Redirecting to login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AdminSidebar />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  redirectText: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
});
