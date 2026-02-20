import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { useData } from '../../contexts/DataContext';

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text' as const },
  { key: 'issuer', label: 'Issuer', type: 'text' as const },
  { key: 'verifyUrl', label: 'Verify URL', type: 'text' as const },
  { key: 'icon', label: 'Icon (Ionicon name)', type: 'text' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

export default function AdminCertifications() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Certifications"
      collectionName="certifications"
      fields={FIELDS}
      titleField="title"
      subtitleField="issuer"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField label="Title" value={formData.title || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))} />
          <AdminFormField label="Issuer" value={formData.issuer || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, issuer: v }))} placeholder="e.g. Coursera" />
          <AdminFormField label="Verify URL" value={formData.verifyUrl || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, verifyUrl: v }))} />
          <AdminFormField label="Icon (Ionicon name)" value={formData.icon || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, icon: v }))} placeholder="e.g. code-slash, analytics, layers" />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}
