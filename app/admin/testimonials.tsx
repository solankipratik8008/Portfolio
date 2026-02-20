import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { useData } from '../../contexts/DataContext';

const FIELDS = [
  { key: 'quote', label: 'Quote', type: 'textarea' as const },
  { key: 'name', label: 'Name', type: 'text' as const },
  { key: 'role', label: 'Role', type: 'text' as const },
  { key: 'company', label: 'Company', type: 'text' as const },
  { key: 'order', label: 'Order', type: 'number' as const },
];

export default function AdminTestimonials() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Testimonials"
      collectionName="testimonials"
      fields={FIELDS}
      titleField="name"
      subtitleField="company"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField label="Quote" value={formData.quote || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, quote: v }))} multiline />
          <AdminFormField label="Name" value={formData.name || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, name: v }))} />
          <AdminFormField label="Role" value={formData.role || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, role: v }))} />
          <AdminFormField label="Company" value={formData.company || ''} onChangeText={(v) => setFormData((p: any) => ({ ...p, company: v }))} />
          <AdminFormField label="Order" value={String(formData.order ?? 0)} onChangeText={(v) => setFormData((p: any) => ({ ...p, order: parseInt(v) || 0 }))} keyboardType="numeric" />
        </>
      )}
    />
  );
}
