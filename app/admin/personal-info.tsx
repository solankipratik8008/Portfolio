import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { useData } from '../../contexts/DataContext';
import {
  setDocument,
  getCollectionData,
  addDocument,
  deleteDocument,
  uploadFile,
  deleteFile,
} from '../../services/firestoreService';
import AdminFormField from '../../components/admin/AdminFormField';

export default function AdminPersonalInfo() {
  const { personalInfo, stats, refetch } = useData();
  const [form, setForm] = useState(personalInfo);
  const [statsList, setStatsList] = useState(stats.map((s, i) => ({ ...s, order: i })));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const resumeInputRef = useRef<any>(null);
  const photoInputRef = useRef<any>(null);

  useEffect(() => {
    setForm(personalInfo);
  }, [personalInfo]);

  useEffect(() => {
    setStatsList(stats.map((s, i) => ({ ...s, order: i })));
  }, [stats]);

  const handleResumeUpload = async (e: any) => {
    if (Platform.OS !== 'web') return;
    const file: File = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const url = await uploadFile('resumes/resume.pdf', file);
      setForm((prev) => ({ ...prev, resumeUrl: url }));
    } catch (err: any) {
      alert('Resume upload failed: ' + err.message);
    } finally {
      setUploadingResume(false);
    }
  };

  const handlePhotoUpload = async (e: any) => {
    if (Platform.OS !== 'web') return;
    const file: File = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop() || 'jpg';
    setUploadingPhoto(true);
    try {
      const url = await uploadFile(`photos/profile.${ext}`, file);
      setForm((prev) => ({ ...prev, photoUrl: url }));
    } catch (err: any) {
      alert('Photo upload failed: ' + err.message);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await deleteFile('resumes/resume.pdf');
    } catch {}
    setForm((prev) => ({ ...prev, resumeUrl: '#' }));
  };

  const handleDeletePhoto = async () => {
    const currentUrl = (form as any).photoUrl as string;
    if (currentUrl) {
      try {
        // Extract path from storage URL for deletion
        const match = currentUrl.match(/photos%2F([^?]+)/);
        if (match) await deleteFile(`photos/${decodeURIComponent(match[1])}`);
      } catch {}
    }
    setForm((prev) => ({ ...prev, photoUrl: '' }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await setDocument('personalInfo', 'main', form);

      // Delete existing stats and re-add
      const existing = await getCollectionData<any>('stats');
      for (const item of existing) {
        await deleteDocument('stats', item.id);
      }
      for (let i = 0; i < statsList.length; i++) {
        const { order, ...rest } = statsList[i] as any;
        await addDocument('stats', { ...rest, order: i });
      }

      refetch();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      alert('Error saving: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addStat = () => {
    setStatsList([...statsList, { label: '', value: '', order: statsList.length }]);
  };

  const removeStat = (index: number) => {
    setStatsList(statsList.filter((_, i) => i !== index));
  };

  const updateStat = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...statsList];
    updated[index] = { ...updated[index], [field]: val };
    setStatsList(updated);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Personal Info</Text>
        <Pressable onPress={handleSave} disabled={saving} style={styles.saveBtnWrap}>
          <LinearGradient
            colors={saved ? ['#10B981', '#059669'] : [COLORS.accentPrimary, COLORS.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.saveBtn, saving && { opacity: 0.6 }]}
          >
            {saving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : saved ? (
              <>
                <Ionicons name="checkmark-circle" size={18} color="#fff" />
                <Text style={styles.saveBtnText}>Saved!</Text>
              </>
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Info</Text>
        <AdminFormField label="Name" value={form.name} onChangeText={(v) => updateField('name', v)} />
        <AdminFormField label="Role" value={form.role} onChangeText={(v) => updateField('role', v)} />
        <AdminFormField label="Tagline" value={form.tagline} onChangeText={(v) => updateField('tagline', v)} multiline />
        <AdminFormField label="Bio" value={form.bio} onChangeText={(v) => updateField('bio', v)} multiline />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <AdminFormField label="Email" value={form.email} onChangeText={(v) => updateField('email', v)} keyboardType="email-address" />
        <AdminFormField label="Phone" value={form.phone} onChangeText={(v) => updateField('phone', v)} />
        <AdminFormField label="Location" value={form.location} onChangeText={(v) => updateField('location', v)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Links</Text>
        <AdminFormField label="GitHub URL" value={form.github} onChangeText={(v) => updateField('github', v)} />
        <AdminFormField label="LinkedIn URL" value={form.linkedin} onChangeText={(v) => updateField('linkedin', v)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resume & Photo</Text>

        {/* Resume upload */}
        <Text style={styles.uploadLabel}>Resume (PDF)</Text>
        <View style={styles.uploadRow}>
          {Platform.OS === 'web' && (
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleResumeUpload}
            />
          )}
          <Pressable
            onPress={() => resumeInputRef.current?.click()}
            style={styles.uploadBtn}
            disabled={uploadingResume}
          >
            {uploadingResume ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={16} color="#fff" />
                <Text style={styles.uploadBtnText}>Upload PDF</Text>
              </>
            )}
          </Pressable>
          {(form as any).resumeUrl && (form as any).resumeUrl !== '#' && (
            <>
              <Text style={styles.uploadedLabel} numberOfLines={1}>
                ✓ Resume uploaded
              </Text>
              <Pressable onPress={handleDeleteResume} style={styles.deleteFileBtn}>
                <Ionicons name="trash-outline" size={16} color={COLORS.error} />
              </Pressable>
            </>
          )}
        </View>

        {/* Photo upload */}
        <Text style={[styles.uploadLabel, { marginTop: SPACING.lg }]}>Profile Photo</Text>
        <View style={styles.uploadRow}>
          {Platform.OS === 'web' && (
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
          )}
          <Pressable
            onPress={() => photoInputRef.current?.click()}
            style={styles.uploadBtn}
            disabled={uploadingPhoto}
          >
            {uploadingPhoto ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="image-outline" size={16} color="#fff" />
                <Text style={styles.uploadBtnText}>Upload Photo</Text>
              </>
            )}
          </Pressable>
          {(form as any).photoUrl ? (
            <>
              <Image
                source={{ uri: (form as any).photoUrl }}
                style={styles.photoThumb}
              />
              <Pressable onPress={handleDeletePhoto} style={styles.deleteFileBtn}>
                <Ionicons name="trash-outline" size={16} color={COLORS.error} />
              </Pressable>
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.statsHeader}>
          <Text style={styles.sectionTitle}>Stats</Text>
          <Pressable onPress={addStat} style={styles.addStatBtn}>
            <Ionicons name="add-circle" size={20} color={COLORS.accentPrimary} />
            <Text style={styles.addStatText}>Add Stat</Text>
          </Pressable>
        </View>
        {statsList.map((stat, i) => (
          <View key={i} style={styles.statRow}>
            <View style={{ flex: 2 }}>
              <AdminFormField label="Label" value={stat.label} onChangeText={(v) => updateStat(i, 'label', v)} />
            </View>
            <View style={{ flex: 1 }}>
              <AdminFormField label="Value" value={stat.value} onChangeText={(v) => updateStat(i, 'value', v)} />
            </View>
            <Pressable onPress={() => removeStat(i)} style={styles.removeStatBtn}>
              <Ionicons name="close-circle" size={22} color={COLORS.error} />
            </Pressable>
          </View>
        ))}
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
    maxWidth: 700,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  saveBtnWrap: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  addStatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  addStatText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.accentPrimary,
    fontWeight: '500',
  },
  statRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'flex-end',
  },
  removeStatBtn: {
    padding: 4,
    marginBottom: SPACING.md,
  },
  uploadLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.accentPrimary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  uploadedLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  photoThumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.accentPrimary,
  },
  deleteFileBtn: {
    padding: 4,
  },
});
