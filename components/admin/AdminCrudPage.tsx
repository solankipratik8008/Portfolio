import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';
import {
  getCollectionData,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../../services/firestoreService';
import AdminCard from './AdminCard';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'array' | 'skills';
  placeholder?: string;
}

interface Props {
  title: string;
  collectionName: string;
  fields: FieldConfig[];
  titleField: string;
  subtitleField?: string;
  onDataChange?: () => void;
  renderForm: (
    formData: Record<string, any>,
    setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  ) => React.ReactNode;
}

export default function AdminCrudPage({
  title,
  collectionName,
  fields,
  titleField,
  subtitleField,
  onDataChange,
  renderForm,
}: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getCollectionData(collectionName);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [collectionName]);

  const getEmptyForm = (): Record<string, any> => {
    const empty: Record<string, any> = { order: items.length };
    fields.forEach((f) => {
      if (f.type === 'array') empty[f.key] = [];
      else if (f.type === 'skills') empty[f.key] = [];
      else if (f.type === 'number') empty[f.key] = 0;
      else empty[f.key] = '';
    });
    return empty;
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData(getEmptyForm());
    setModalVisible(true);
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    const data: Record<string, any> = {};
    fields.forEach((f) => {
      data[f.key] = item[f.key] ?? (f.type === 'array' || f.type === 'skills' ? [] : '');
    });
    data.order = item.order ?? 0;
    setFormData(data);
    setModalVisible(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        await updateDocument(collectionName, editingId, formData);
      } else {
        await addDocument(collectionName, formData);
      }
      setModalVisible(false);
      await fetchItems();
      onDataChange?.();
    } catch (e: any) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (Platform.OS === 'web' && !window.confirm('Delete this item?')) return;
    await deleteDocument(collectionName, id);
    await fetchItems();
    onDataChange?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={openAdd} style={styles.addBtnWrap}>
          <LinearGradient
            colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addBtn}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addBtnText}>Add New</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.accentPrimary} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {items.length === 0 ? (
            <Text style={styles.emptyText}>No items yet. Click "Add New" to create one.</Text>
          ) : (
            items.map((item) => (
              <AdminCard
                key={item.id}
                title={item[titleField] || 'Untitled'}
                subtitle={subtitleField ? item[subtitleField] : undefined}
                onEdit={() => openEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </ScrollView>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingId ? 'Edit' : 'Add'} {title.replace(/s$/, '')}
              </Text>

              {renderForm(formData, setFormData)}

              <View style={styles.modalActions}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
                <Pressable onPress={handleSave} disabled={saving} style={styles.saveBtnWrap}>
                  <LinearGradient
                    colors={[COLORS.accentPrimary, COLORS.accentSecondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.saveBtn, saving && { opacity: 0.6 }]}
                  >
                    {saving ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <Text style={styles.saveBtnText}>Save</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
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
  addBtnWrap: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  addBtnText: {
    color: '#fff',
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modal: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '85%',
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  cancelBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  cancelBtnText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
  saveBtnWrap: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  saveBtn: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
