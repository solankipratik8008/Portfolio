import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import AdminArrayField from '../../components/admin/AdminArrayField';
import { useData } from '../../contexts/DataContext';

const FIELDS = [
  { key: 'role', label: 'Role', type: 'text' as const },
  { key: 'company', label: 'Company', type: 'text' as const },
  { key: 'duration', label: 'Duration', type: 'text' as const },
  { key: 'description', label: 'Description (bullets)', type: 'array' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

export default function AdminExperience() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Experience"
      collectionName="experiences"
      fields={FIELDS}
      titleField="role"
      subtitleField="company"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField label="Role" value={formData.role || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, role: v }))} />
          <AdminFormField label="Company" value={formData.company || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, company: v }))} />
          <AdminFormField label="Duration" value={formData.duration || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, duration: v }))} placeholder="e.g. Jan 2024 — Present" />
          <AdminArrayField label="Description (bullet points)" items={formData.description || []} onChange={(v) => setFormData((p: any) => ({ ...p, description: v }))} placeholder="Add a bullet point" />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}
