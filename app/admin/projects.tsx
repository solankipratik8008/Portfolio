import React, { useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import AdminArrayField from '../../components/admin/AdminArrayField';
import { useData } from '../../contexts/DataContext';
import { uploadFile } from '../../services/firestoreService';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'pillar', label: 'Pillar', type: 'text' as const },
  { key: 'tags', label: 'Tags', type: 'array' as const },
  { key: 'githubUrl', label: 'GitHub URL', type: 'text' as const },
  { key: 'liveUrl', label: 'Live URL', type: 'text' as const },
  { key: 'imageUrl', label: 'Image URL', type: 'text' as const },
  { key: 'videoUrl', label: 'Video URL', type: 'text' as const },
  { key: 'color', label: 'Color (hex)', type: 'text' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

function ImageUploadField({
  value,
  onChange,
  storagePath,
}: {
  value: string;
  onChange: (url: string) => void;
  storagePath: string;
}) {
  const inputRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any) => {
    if (Platform.OS !== 'web') return;
    const file: File = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop() || 'jpg';
    setUploading(true);
    try {
      const url = await uploadFile(`${storagePath}.${ext}`, file);
      onChange(url);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <View style={imgStyles.container}>
      <Text style={imgStyles.label}>Project Image</Text>
      {value ? (
        <Image
          source={{ uri: value }}
          style={imgStyles.preview}
          resizeMode="cover"
        />
      ) : null}
      {Platform.OS === 'web' && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
      )}
      <Pressable
        onPress={() => inputRef.current?.click()}
        style={imgStyles.uploadBtn}
      >
        {uploading ? (
          <ActivityIndicator size="small" color={COLORS.accentPrimary} />
        ) : (
          <Text style={imgStyles.uploadBtnText}>
            {value ? 'Change Image' : '+ Upload Image'}
          </Text>
        )}
      </Pressable>
      <AdminFormField
        label="Or paste image URL"
        value={value}
        onChangeText={onChange}
        placeholder="https://..."
      />
    </View>
  );
}

const imgStyles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  preview: {
    width: '100%' as any,
    height: 140,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  uploadBtn: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  uploadBtnText: {
    color: COLORS.accentPrimary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});

export default function AdminProjects() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Projects"
      collectionName="projects"
      fields={FIELDS}
      titleField="title"
      subtitleField="pillar"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField
            label="Title"
            value={formData.title || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))}
          />
          <AdminFormField
            label="Description"
            value={formData.description || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, description: v }))}
            multiline
          />
          <AdminFormField
            label="Pillar"
            value={formData.pillar || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, pillar: v }))}
            placeholder="e.g. AI — LLM Integration"
          />
          <AdminArrayField
            label="Tags"
            items={formData.tags || []}
            onChange={(v) => setFormData((p: any) => ({ ...p, tags: v }))}
            placeholder="e.g. Swift"
          />
          <AdminFormField
            label="GitHub URL"
            value={formData.githubUrl || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, githubUrl: v }))}
          />
          <AdminFormField
            label="Live URL (App Store / Web Demo)"
            value={formData.liveUrl || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, liveUrl: v }))}
            placeholder="https://apps.apple.com/..."
          />
          <ImageUploadField
            value={formData.imageUrl || ''}
            onChange={(url) => setFormData((p: any) => ({ ...p, imageUrl: url }))}
            storagePath={`projects/${formData.title || 'project'}_${Date.now()}`}
          />
          <AdminFormField
            label="Video / Demo URL (YouTube, Vimeo, etc.)"
            value={formData.videoUrl || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, videoUrl: v }))}
            placeholder="https://youtube.com/watch?v=..."
          />
          <AdminFormField
            label="Color (hex)"
            value={formData.color || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, color: v }))}
            placeholder="#3B82F6"
          />
          <AdminFormField
            label="Order"
            value={String(formData.order ?? 0)}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))}
            keyboardType="numeric"
          />
        </>
      )}
    />
  );
}
