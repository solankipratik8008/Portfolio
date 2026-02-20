import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { useData } from '../../contexts/DataContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const FIELDS = [
  { key: 'title', label: 'Category Title', type: 'text' as const },
  { key: 'skills', label: 'Skills', type: 'skills' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

function SkillsEditor({
  skills,
  onChange,
}: {
  skills: { name: string; level: number }[];
  onChange: (skills: { name: string; level: number }[]) => void;
}) {
  const addSkill = () => onChange([...skills, { name: '', level: 50 }]);
  const removeSkill = (i: number) => onChange(skills.filter((_, idx) => idx !== i));
  const updateSkill = (i: number, field: 'name' | 'level', value: string) => {
    const updated = [...skills];
    if (field === 'level') updated[i] = { ...updated[i], level: parseInt(value) || 0 };
    else updated[i] = { ...updated[i], name: value };
    onChange(updated);
  };

  return (
    <View style={styles.skillsContainer}>
      <Text style={styles.label}>Skills</Text>
      {skills.map((skill, i) => (
        <View key={i} style={styles.skillRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            value={skill.name}
            onChangeText={(v) => updateSkill(i, 'name', v)}
            placeholder="Skill name"
            placeholderTextColor={COLORS.textMuted}
          />
          <TextInput
            style={[styles.input, { width: 60 }]}
            value={String(skill.level)}
            onChangeText={(v) => updateSkill(i, 'level', v)}
            placeholder="0-100"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
          />
          <Pressable onPress={() => removeSkill(i)} style={{ padding: 4 }}>
            <Ionicons name="close-circle" size={22} color={COLORS.error} />
          </Pressable>
        </View>
      ))}
      <Pressable onPress={addSkill} style={styles.addBtn}>
        <Ionicons name="add-circle" size={18} color={COLORS.accentPrimary} />
        <Text style={styles.addText}>Add Skill</Text>
      </Pressable>
    </View>
  );
}

export default function AdminSkills() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Skill Categories"
      collectionName="skillCategories"
      fields={FIELDS}
      titleField="title"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField label="Category Title" value={formData.title || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))} />
          <SkillsEditor skills={formData.skills || []} onChange={(v) => setFormData((p: any) => ({ ...p, skills: v }))} />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  skillsContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  } as any,
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
  },
  addText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.accentPrimary,
    fontWeight: '500',
  },
});
