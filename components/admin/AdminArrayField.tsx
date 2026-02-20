import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function AdminArrayField({ label, items, onChange, placeholder }: Props) {
  const addItem = () => onChange([...items, '']);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));
  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.row}>
          <TextInput
            style={styles.input}
            value={item}
            onChangeText={(text) => updateItem(index, text)}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textMuted}
          />
          <Pressable onPress={() => removeItem(index)} style={styles.removeBtn}>
            <Ionicons name="close-circle" size={22} color={COLORS.error} />
          </Pressable>
        </View>
      ))}
      <Pressable onPress={addItem} style={styles.addBtn}>
        <Ionicons name="add-circle" size={18} color={COLORS.accentPrimary} />
        <Text style={styles.addText}>Add Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  input: {
    flex: 1,
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
  removeBtn: {
    padding: 4,
  },
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
