import React from 'react';
import AdminCrudPage from '../../components/admin/AdminCrudPage';
import AdminFormField from '../../components/admin/AdminFormField';
import { useData } from '../../contexts/DataContext';

export default function AdminVideos() {
  const { refetch } = useData();

  return (
    <AdminCrudPage
      title="Videos"
      collectionName="videos"
      fields={[
        { key: 'title', label: 'Title', type: 'text' as const },
        { key: 'description', label: 'Description', type: 'textarea' as const },
        { key: 'url', label: 'YouTube / Vimeo URL', type: 'text' as const },
        { key: 'order', label: 'Order', type: 'number' as const },
      ]}
      titleField="title"
      subtitleField="url"
      onDataChange={refetch}
      renderForm={(formData, setFormData) => (
        <>
          <AdminFormField
            label="Title"
            value={formData.title || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, title: v }))}
            placeholder="e.g. App Demo"
          />
          <AdminFormField
            label="Description"
            value={formData.description || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, description: v }))}
            multiline
            placeholder="Short description of the video"
          />
          <AdminFormField
            label="YouTube or Vimeo URL"
            value={formData.url || ''}
            onChangeText={(v) => setFormData((p: any) => ({ ...p, url: v }))}
            placeholder="https://www.youtube.com/watch?v=..."
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
