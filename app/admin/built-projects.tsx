import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import AdminArrayField from '../../components/admin/AdminArrayField';
import { useData } from '../../contexts/DataContext';

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'tags', label: 'Tags', type: 'array' as const },
  { key: 'githubUrl', label: 'GitHub URL', type: 'text' as const },
  { key: 'color', label: 'Color (hex)', type: 'text' as const },
  { key: 'icon', label: 'Icon (Ionicon name)', type: 'text' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

export default function AdminBuiltProjects() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Built Projects"
      collectionName="builtProjects"
      fields={FIELDS}
      titleField="title"
      subtitleField="icon"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField label="Title" value={formData.title || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))} />
          <AdminFormField label="Description" value={formData.description || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, description: v }))} multiline />
          <AdminArrayField label="Tags" items={formData.tags || []} onChange={(v) => setFormData((p: any) => ({ ...p, tags: v }))} placeholder="e.g. Swift" />
          <AdminFormField label="GitHub URL" value={formData.githubUrl || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, githubUrl: v }))} />
          <AdminFormField label="Color (hex)" value={formData.color || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, color: v }))} placeholder="#3B82F6" />
          <AdminFormField label="Icon (Ionicon name)" value={formData.icon || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, icon: v }))} placeholder="e.g. cloud, airplane, cafe" />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}
