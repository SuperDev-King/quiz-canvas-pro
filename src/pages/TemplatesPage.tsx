import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockTemplates } from '@/data/mockData';

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'customer-feedback', name: 'Customer Feedback', color: 'bg-blue-100 text-blue-800' },
    { id: 'school-use', name: 'School Use', color: 'bg-green-100 text-green-800' },
    { id: 'healthcare-use', name: 'Healthcare Use', color: 'bg-red-100 text-red-800' },
    { id: 'general-feedback', name: 'General Feedback', color: 'bg-purple-100 text-purple-800' },
  ];

  const handleUseTemplate = (template: any) => {
    // Navigate to form builder with template data
    navigate('/builder/survey', { state: { template } });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">Choose from our pre-built templates to get started quickly</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template) => {
            const category = categories.find(c => c.id === template.category);
            return (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className={category?.color}>
                      {category?.name}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <strong>Preview:</strong> {template.preview}
                    </div>
                    <div className="text-sm">
                      <strong>Questions:</strong> {template.questions.length}
                    </div>
                    <Button 
                      onClick={() => handleUseTemplate(template)}
                      className="w-full"
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};