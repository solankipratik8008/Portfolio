import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { useData } from '../../contexts/DataContext';

export default function AdminNavLinks() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Navigation Links"
      collectionName="navLinks"
      fields={[
        { key: 'label', label: 'Label', type: 'text' as const },
        { key: 'href', label: 'Href (e.g. #projects)', type: 'text' as const },
        { key: 'order', label: 'Order', type: 'number' as const },
      ]}
      titleField="label"
      subtitleField="href"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField
            label="Label"
            value={formData.label || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, label: v }))}
            placeholder="e.g. Projects"
          />
          <AdminFormField
            label="Href"
            value={formData.href || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, href: v }))}
            placeholder="e.g. #projects"
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
