import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useWindowDimensions,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, MAX_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { PERSONAL_INFO } from '../constants/data';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function ContactSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    const subject = `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    Linking.openURL(`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const contactItems = [
    { icon: 'mail-outline' as const, label: 'Email', value: PERSONAL_INFO.email, url: `mailto:${PERSONAL_INFO.email}` },
    { icon: 'call-outline' as const, label: 'Phone', value: PERSONAL_INFO.phone, url: `tel:${PERSONAL_INFO.phone}` },
    { icon: 'location-outline' as const, label: 'Location', value: PERSONAL_INFO.location, url: undefined },
  ];

  const socialLinks = [
    { icon: 'logo-github' as const, url: PERSONAL_INFO.github, label: 'GitHub' },
    { icon: 'logo-linkedin' as const, url: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
  ];

  return (
    <View style={styles.container}>
      <SectionTitle title="Get In Touch" subtitle="Let's build something great together" />

      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={[styles.infoSide, isMobile && styles.infoSideMobile]}>
          <GlassCard style={styles.infoCard}>
            <Text style={styles.infoTitle}>Contact Information</Text>
            <Text style={styles.infoSubtitle}>
              Feel free to reach out. I'm always open to new opportunities and interesting projects.
            </Text>

            {contactItems.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => item.url && Linking.openURL(item.url)}
                style={styles.contactItem}
              >
                <View style={styles.contactIcon}>
                  <Ionicons name={item.icon} size={20} color={COLORS.accentPrimary} />
                </View>
                <View>
                  <Text style={styles.contactLabel}>{item.label}</Text>
                  <Text style={styles.contactValue}>{item.value}</Text>
                </View>
              </Pressable>
            ))}

            <View style={styles.socialRow}>
              {socialLinks.map((social) => (
                <Pressable
                  key={social.label}
                  onPress={() => Linking.openURL(social.url)}
                  style={({ hovered }: any) => [
                    styles.socialBtn,
                    hovered && styles.socialBtnHovered,
                  ]}
                >
                  <Ionicons name={social.icon} size={22} color={COLORS.textSecondary} />
                </Pressable>
              ))}
            </View>
          </GlassCard>
        </View>

        <View style={[styles.formSide, isMobile && styles.formSideMobile]}>
          <GlassCard style={styles.formCard}>
            <Text style={styles.formTitle}>Send a Message</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor={COLORS.textMuted}
                value={form.name}
                onChangeText={(name) => setForm({ ...form, name })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Email</Text>
              <TextInput
                style={styles.input}
                placeholder="john@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                value={form.email}
                onChangeText={(email) => setForm({ ...form, email })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Tell me about your project..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={form.message}
                onChangeText={(message) => setForm({ ...form, message })}
              />
            </View>

            <Pressable
              onPress={handleSubmit}
              style={({ hovered }: any) => [
                styles.submitButton,
                hovered && styles.submitButtonHovered,
              ]}
            >
              <LinearGradient
                colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                <Ionicons name="send" size={18} color="#fff" />
                <Text style={styles.submitText}>Send Message</Text>
              </LinearGradient>
            </Pressable>
          </GlassCard>
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
  },
  contentMobile: {
    flexDirection: 'column',
  },
  infoSide: {
    flex: 1,
  },
  infoSideMobile: {
    marginBottom: SPACING.lg,
  },
  formSide: {
    flex: 1.2,
  },
  formSideMobile: {},
  infoCard: {
    height: '100%',
  },
  infoTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  infoSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtnHovered: {
    backgroundColor: COLORS.glassHighlight,
    borderColor: COLORS.accentPrimary,
  },
  formCard: {},
  formTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : ({} as any)),
  } as any,
  textarea: {
    minHeight: 120,
    paddingTop: SPACING.md,
  },
  submitButton: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    marginTop: SPACING.sm,
  },
  submitButtonHovered: {
    opacity: 0.9,
    transform: [{ scale: 1.01 }],
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  submitText: {
    color: '#fff',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
