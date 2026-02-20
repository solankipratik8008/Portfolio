import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import AdminArrayField from '../../components/admin/AdminArrayField';
import { useData } from '../../contexts/DataContext';

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'pillar', label: 'Pillar', type: 'text' as const },
  { key: 'tags', label: 'Tags', type: 'array' as const },
  { key: 'githubUrl', label: 'GitHub URL', type: 'text' as const },
  { key: 'liveUrl', label: 'Live URL', type: 'text' as const },
  { key: 'color', label: 'Color (hex)', type: 'text' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

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
          <AdminFormField label="Title" value={formData.title || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))} />
          <AdminFormField label="Description" value={formData.description || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, description: v }))} multiline />
          <AdminFormField label="Pillar" value={formData.pillar || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, pillar: v }))} placeholder="e.g. AI — LLM Integration" />
          <AdminArrayField label="Tags" items={formData.tags || []} onChange={(v) => setFormData((p: any) => ({ ...p, tags: v }))} placeholder="e.g. Swift" />
          <AdminFormField label="GitHub URL" value={formData.githubUrl || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, githubUrl: v }))} />
          <AdminFormField label="Live URL" value={formData.liveUrl || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, liveUrl: v }))} />
          <AdminFormField label="Color (hex)" value={formData.color || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, color: v }))} placeholder="#7C3AED" />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}
