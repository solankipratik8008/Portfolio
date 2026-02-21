import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import { useData } from '../../contexts/DataContext';

const BLOCK_TYPES = ['text', 'image', 'video', 'links'] as const;

function ContentBlockForm({ formData, setFormData }: { formData: any; setFormData: any }) {
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const addLink = () => {
    if (!linkLabel || !linkUrl) return;
    const links = formData.links || [];
    setFormData((p: any) => ({ ...p, links: [...links, { label: linkLabel, url: linkUrl }] }));
    setLinkLabel('');
    setLinkUrl('');
  };

  const removeLink = (i: number) => {
    const links = [...(formData.links || [])];
    links.splice(i, 1);
    setFormData((p: any) => ({ ...p, links }));
  };

  return (
    <>
      <AdminFormField
        label="Title"
        value={formData.title || ''}
        onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))}
        placeholder="Section title"
      />

      <Text style={styles.fieldLabel}>Block Type</Text>
      <View style={styles.typeRow}>
        {BLOCK_TYPES.map((t) => (
          <Pressable
            key={t}
            onPress={() => setFormData((p: any) => ({ ...p, type: t }))}
            style={[styles.typeBtn, formData.type === t && styles.typeBtnActive]}
          >
            <Text style={[styles.typeBtnText, formData.type === t && styles.typeBtnTextActive]}>
              {t}
            </Text>
          </Pressable>
        ))}
      </View>

      {(!formData.type || formData.type === 'text') && (
        <AdminFormField
          label="Content"
          value={formData.content || ''}
          onChangeText={(v) => setFormData((p: any) => ({ ...p, content: v }))}
          multiline
          placeholder="Your text content..."
        />
      )}

      {formData.type === 'image' && (
        <AdminFormField
          label="Image URL"
          value={formData.imageUrl || ''}
          onChangeText={(v) => setFormData((p: any) => ({ ...p, imageUrl: v }))}
          placeholder="https://..."
        />
      )}

      {formData.type === 'video' && (
        <AdminFormField
          label="Video URL (YouTube / Vimeo)"
          value={formData.videoUrl || ''}
          onChangeText={(v) => setFormData((p: any) => ({ ...p, videoUrl: v }))}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      )}

      {formData.type === 'links' && (
        <View>
          <Text style={styles.fieldLabel}>Links</Text>
          {(formData.links || []).map((link: any, i: number) => (
            <View key={i} style={styles.linkRow}>
              <Text style={styles.linkText}>{link.label} → {link.url}</Text>
              <Pressable onPress={() => removeLink(i)}>
                <Text style={{ color: COLORS.error, fontWeight: '600' }}>✕</Text>
              </Pressable>
            </View>
          ))}
          <View style={styles.addLinkRow}>
            <View style={{ flex: 1 }}>
              <AdminFormField
                label="Label"
                value={linkLabel}
                onChangeText={setLinkLabel}
                placeholder="e.g. GitHub"
              />
            </View>
            <View style={{ flex: 2 }}>
              <AdminFormField
                label="URL"
                value={linkUrl}
                onChangeText={setLinkUrl}
                placeholder="https://..."
              />
            </View>
            <Pressable onPress={addLink} style={styles.addLinkBtn}>
              <Text style={styles.addLinkBtnText}>Add</Text>
            </Pressable>
          </View>
        </View>
      )}

      <Text style={styles.fieldLabel}>Visibility</Text>
      <Pressable
        onPress={() => setFormData((p: any) => ({ ...p, visible: p.visible === false ? true : false }))}
        style={[styles.typeBtn, formData.visible !== false && styles.typeBtnActive]}
      >
        <Text style={[styles.typeBtnText, formData.visible !== false && styles.typeBtnTextActive]}>
          {formData.visible === false ? 'Hidden' : 'Visible'}
        </Text>
      </Pressable>

      <AdminFormField
        label="Order"
        value={String(formData.order ?? 0)}
        onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))}
        keyboardType="numeric"
      />
    </>
  );
}

export default function AdminContentBlocks() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Content Blocks"
      collectionName="contentBlocks"
      fields={[
        { key: 'title', label: 'Title', type: 'text' as const },
        { key: 'type', label: 'Type', type: 'text' as const },
        { key: 'order', label: 'Order', type: 'number' as const },
      ]}
      titleField="title"
      subtitleField="type"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <ContentBlockForm formData={formData} setFormData={setFormData} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  typeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  typeBtn: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  typeBtnActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderColor: COLORS.accentPrimary,
  },
  typeBtnText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  typeBtnTextActive: {
    color: COLORS.accentPrimary,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.glassBg,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  linkText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  addLinkRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'flex-end',
  },
  addLinkBtn: {
    backgroundColor: COLORS.accentPrimary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  addLinkBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FONT_SIZES.sm,
  },
});
