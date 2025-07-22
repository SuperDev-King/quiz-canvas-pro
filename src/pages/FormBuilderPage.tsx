import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormBuilder } from '@/components/forms/FormBuilder';
import { toast } from 'sonner';

export const FormBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: 'survey' | 'quiz' }>();
  
  const handleSave = (formData: any) => {
    // Simulate saving form
    console.log('Saving form:', formData);
    toast.success(`${type === 'quiz' ? 'Quiz' : 'Survey'} saved successfully!`);
    navigate('/dashboard');
  };

  if (!type || (type !== 'survey' && type !== 'quiz')) {
    navigate('/dashboard');
    return null;
  }

  return <FormBuilder formType={type} onSave={handleSave} />;
};