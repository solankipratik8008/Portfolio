import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { useData } from '../../contexts/DataContext';

const FIELDS = [
  { key: 'degree', label: 'Degree', type: 'text' as const },
  { key: 'institution', label: 'Institution', type: 'text' as const },
  { key: 'year', label: 'Year', type: 'text' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

export default function AdminEducation() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Education"
      collectionName="education"
      fields={FIELDS}
      titleField="degree"
      subtitleField="institution"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField label="Degree" value={formData.degree || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, degree: v }))} />
          <AdminFormField label="Institution" value={formData.institution || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, institution: v }))} />
          <AdminFormField label="Year" value={formData.year || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, year: v }))} placeholder="e.g. 2019 — 2023" />
          <AdminFormField label="Description" value={formData.description || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, description: v }))} multiline />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}
