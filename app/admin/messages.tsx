import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { getCollectionData, deleteDocument, updateDocument } from '../../services/firestoreService';
import GlassCard from '../../components/GlassCard';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const data = await getCollectionData<Message>('messages', 'order');
    setMessages(data.reverse()); // newest first
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id: string) => {
    await updateDocument('messages', id, { read: true });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMsg = async (id: string) => {
    await deleteDocument('messages', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount} new</Text>
          </View>
        )}
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.accentPrimary} style={{ marginTop: 40 }} />
      ) : messages.length === 0 ? (
        <GlassCard style={styles.emptyCard}>
          <Ionicons name="mail-outline" size={40} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No messages yet</Text>
        </GlassCard>
      ) : (
        messages.map((msg) => (
          <GlassCard key={msg.id} style={[styles.card, !msg.read && styles.cardUnread]}>
            <View style={styles.cardHeader}>
              <View style={styles.senderInfo}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={18} color={COLORS.accentPrimary} />
                </View>
                <View>
                  <Text style={styles.senderName}>{msg.name}</Text>
                  <Text style={styles.senderEmail}>{msg.email}</Text>
                </View>
              </View>
              <View style={styles.actions}>
                {!msg.read && (
                  <Pressable onPress={() => markRead(msg.id)} style={styles.actionBtn}>
                    <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.accentPrimary} />
                  </Pressable>
                )}
                <Pressable onPress={() => deleteMsg(msg.id)} style={styles.actionBtn}>
                  <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </Pressable>
              </View>
            </View>

            <Text style={styles.messageText}>{msg.message}</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </Text>
              {!msg.read && <View style={styles.unreadDot} />}
            </View>
          </GlassCard>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: SPACING.xl },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  badge: {
    backgroundColor: COLORS.accentPrimary,
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: SPACING.section,
    gap: SPACING.md,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.md,
  },
  card: {
    marginBottom: SPACING.md,
  },
  cardUnread: {
    borderColor: COLORS.accentPrimary,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  senderName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  senderEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.accentPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionBtn: {
    padding: SPACING.xs,
  },
  messageText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentPrimary,
  },
});
