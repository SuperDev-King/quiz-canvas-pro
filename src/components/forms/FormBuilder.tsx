import React, { useState } from 'react';
import { Question, QuestionType, QuestionOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy, Upload, Link, Image, GripVertical, X } from 'lucide-react';

interface FormBuilderProps {
  formType: 'survey' | 'quiz';
  onSave: (formData: any) => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ formType, onSave }) => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const questionTypes: { value: QuestionType; label: string; icon: string }[] = [
    { value: 'short-answer', label: 'Short answer', icon: '📝' },
    { value: 'long-answer', label: 'Long answer', icon: '📄' },
    { value: 'email', label: 'E-mail', icon: '📧' },
    { value: 'number', label: 'Number', icon: '🔢' },
    { value: 'multiple-choice', label: 'Multiple Choice', icon: '🔘' },
    { value: 'checkbox', label: 'Checkboxes', icon: '☑️' },
    { value: 'dropdown', label: 'Drop down', icon: '📋' },
    { value: 'linear-scale', label: 'Linear scale', icon: '📊' },
    { value: 'star-rating', label: 'Star rating', icon: '⭐' },
    { value: 'smiley-faces', label: 'Smiley faces', icon: '😊' },
  ];

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      type,
      title: '',
      description: '',
      required: false,
      order: questions.length + 1,
      options: type === 'multiple-choice' || type === 'checkbox' || type === 'dropdown' 
        ? [{ id: 'opt1', text: '' }] 
        : undefined,
      minValue: type === 'linear-scale' || type === 'star-rating' ? 1 : undefined,
      maxValue: type === 'linear-scale' ? 10 : type === 'star-rating' ? 5 : undefined,
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    setSelectedQuestion(updatedQuestion);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
    setSelectedQuestion(null);
  };

  const duplicateQuestion = (question: Question) => {
    const newQuestion = {
      ...question,
      id: `q${Date.now()}`,
      order: questions.length + 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    const currentIndex = questions.findIndex(q => q.id === questionId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === questions.length - 1)
    ) return;

    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newQuestions[currentIndex], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[currentIndex]];
    
    // Update order numbers
    newQuestions.forEach((q, index) => {
      q.order = index + 1;
    });
    
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    const formData = {
      title: formTitle,
      description: formDescription,
      type: formType,
      questions: questions,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(formData);
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 bg-background border-r p-4 space-y-2">
        <Button variant="default" className="w-full justify-start">
          Home
        </Button>
        <Button variant="secondary" className="w-full justify-start bg-primary text-primary-foreground">
          Forms
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Quizzes
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Templates
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Responses
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Terms
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Upgrade
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Form Builder */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-2xl font-bold">Create a form</div>
            
            {/* Form Details */}
            <div className="space-y-4">
              <div>
                <Label>Form Title (0/100):</Label>
                <Input 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Enter form title"
                  className="bg-green-50 border-green-300"
                />
              </div>
              <div>
                <Label>Description (0/1000):</Label>
                <Textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter form description"
                  className="bg-green-50 border-green-300"
                />
              </div>
            </div>

            {/* Add Question Dropdown */}
            <div className="bg-green-50 border border-green-300 rounded-lg p-4">
              <Select onValueChange={(value) => addQuestion(value as QuestionType)}>
                <SelectTrigger className="w-full bg-green-600 text-white">
                  <SelectValue placeholder="Add a question" />
                </SelectTrigger>
                <SelectContent>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {questionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* Question Types Quick Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => addQuestion('short-answer')}
                className="bg-green-100 border-green-300"
              >
                Short answer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuestion('long-answer')}
                className="bg-gray-100"
              >
                Long answer
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="outline" 
                onClick={() => addQuestion('email')}
                className="bg-green-100 border-green-300"
              >
                E-mail
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuestion('number')}
                className="bg-gray-100"
              >
                Number
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuestion('multiple-choice')}
                className="bg-green-100 border-green-300"
              >
                Multiple Choice
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuestion('dropdown')}
                className="bg-gray-100"
              >
                Drop down
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => addQuestion('linear-scale')}
                className="bg-gray-100"
              >
                Linear scale
              </Button>
              <Button 
                variant="outline" 
                onClick={() => addQuestion('star-rating')}
                className="bg-green-100 border-green-300"
              >
                Star rating
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="relative">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <span className="font-semibold">{index + 1}.</span>
                      <Badge variant="outline">{question.type.replace('-', ' ')}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveQuestion(question.id, 'up')}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveQuestion(question.id, 'down')}
                        disabled={index === questions.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => duplicateQuestion(question)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`required-${question.id}`}>Required</Label>
                        <Switch
                          id={`required-${question.id}`}
                          checked={question.required}
                          onCheckedChange={(checked) => 
                            updateQuestion({ ...question, required: checked })
                          }
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input
                        placeholder="Question title"
                        value={question.title}
                        onChange={(e) => 
                          updateQuestion({ ...question, title: e.target.value })
                        }
                      />
                      <Textarea
                        placeholder="Description (optional)"
                        value={question.description || ''}
                        onChange={(e) => 
                          updateQuestion({ ...question, description: e.target.value })
                        }
                        className="min-h-[60px]"
                      />
                      
                      {/* Question Type Selector */}
                      <Select 
                        value={question.type}
                        onValueChange={(value) => 
                          updateQuestion({ ...question, type: value as QuestionType })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {questionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Options for multiple choice, checkbox, dropdown */}
                      {(question.type === 'multiple-choice' || question.type === 'checkbox' || question.type === 'dropdown') && (
                        <div className="space-y-2">
                          <Label>Options:</Label>
                          {question.options?.map((option, optIndex) => (
                            <div key={option.id} className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                {question.type === 'multiple-choice' && <div className="w-4 h-4 border border-gray-300 rounded-full" />}
                                {question.type === 'checkbox' && <div className="w-4 h-4 border border-gray-300 rounded" />}
                                {question.type === 'dropdown' && <span>{optIndex + 1}.</span>}
                              </div>
                              <Input
                                placeholder={`Option ${optIndex + 1}`}
                                value={option.text}
                                onChange={(e) => {
                                  const newOptions = [...(question.options || [])];
                                  newOptions[optIndex] = { ...option, text: e.target.value };
                                  updateQuestion({ ...question, options: newOptions });
                                }}
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const newOptions = question.options?.filter((_, i) => i !== optIndex) || [];
                                  updateQuestion({ ...question, options: newOptions });
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newOption = { id: `opt${Date.now()}`, text: '' };
                              const newOptions = [...(question.options || []), newOption];
                              updateQuestion({ ...question, options: newOptions });
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Option
                          </Button>
                          
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={question.options?.some(opt => opt.text === 'Other') || false}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  const newOptions = [...(question.options || []), { id: 'other', text: 'Other' }];
                                  updateQuestion({ ...question, options: newOptions });
                                } else {
                                  const newOptions = question.options?.filter(opt => opt.text !== 'Other') || [];
                                  updateQuestion({ ...question, options: newOptions });
                                }
                              }}
                            />
                            <Label>Add 'Other' Option</Label>
                          </div>
                        </div>
                      )}

                      {/* Linear Scale Configuration */}
                      {question.type === 'linear-scale' && (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Label>Min:</Label>
                            <Input
                              type="number"
                              className="w-20"
                              value={question.minValue || 1}
                              onChange={(e) => 
                                updateQuestion({ ...question, minValue: parseInt(e.target.value) })
                              }
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label>Max:</Label>
                            <Input
                              type="number"
                              className="w-20"
                              value={question.maxValue || 10}
                              onChange={(e) => 
                                updateQuestion({ ...question, maxValue: parseInt(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Image className="h-4 w-4 mr-1" />
                              Add Image
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Image</DialogTitle>
                            </DialogHeader>
                            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                              <Button>Choose Image</Button>
                              <p className="text-sm text-muted-foreground mt-2">OR</p>
                              <p className="text-sm text-muted-foreground">Drag & Drop Image Here</p>
                              <Button variant="ghost" className="mt-4">Cancel</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button size="sm" variant="outline">
                          <Link className="h-4 w-4 mr-1" />
                          Add Video/Link
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add Question Button */}
              <Button
                variant="outline"
                className="w-full h-12 border-dashed border-primary text-primary hover:bg-primary/5"
                onClick={() => {
                  // Show question type selector
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question
              </Button>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <Button onClick={handleSave} size="lg">
                Save Form
              </Button>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="w-96 bg-gray-50 border-l p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Preview</span>
              <div className="flex items-center gap-1 bg-white rounded border">
                <Button
                  size="sm"
                  variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                  onClick={() => setPreviewDevice('desktop')}
                  className="p-2"
                >
                  🖥️
                </Button>
                <Button
                  size="sm"
                  variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                  onClick={() => setPreviewDevice('tablet')}
                  className="p-2"
                >
                  📱
                </Button>
                <Button
                  size="sm"
                  variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                  onClick={() => setPreviewDevice('mobile')}
                  className="p-2"
                >
                  📱
                </Button>
              </div>
            </div>
            
            <div className={`bg-orange-100 rounded-lg p-4 ${
              previewDevice === 'mobile' ? 'max-w-xs mx-auto' : 
              previewDevice === 'tablet' ? 'max-w-sm mx-auto' : 'w-full'
            }`}>
              <div className="text-center text-sm text-muted-foreground">
                Display here (in real time) how the actual form will look
              </div>
              
              {formTitle && (
                <div className="mt-4">
                  <h3 className="font-semibold">{formTitle}</h3>
                  {formDescription && (
                    <p className="text-sm text-muted-foreground mt-1">{formDescription}</p>
                  )}
                </div>
              )}
              
              <div className="space-y-4 mt-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white rounded p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium">{index + 1}.</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {question.title || 'Question title'}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        {question.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {question.description}
                          </div>
                        )}
                        
                        {/* Preview different question types */}
                        <div className="mt-2">
                          {question.type === 'short-answer' && (
                            <div className="h-8 bg-gray-100 rounded border text-xs flex items-center px-2 text-gray-500">
                              Short answer text
                            </div>
                          )}
                          {question.type === 'long-answer' && (
                            <div className="h-16 bg-gray-100 rounded border text-xs flex items-start p-2 text-gray-500">
                              Long answer text...
                            </div>
                          )}
                          {question.type === 'email' && (
                            <div className="h-8 bg-gray-100 rounded border text-xs flex items-center px-2 text-gray-500">
                              email@example.com
                            </div>
                          )}
                          {question.type === 'number' && (
                            <div className="h-8 bg-gray-100 rounded border text-xs flex items-center px-2 text-gray-500">
                              123
                            </div>
                          )}
                          {question.type === 'multiple-choice' && (
                            <div className="space-y-1">
                              {question.options?.map((option, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                                  <span>{option.text || `Option ${idx + 1}`}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {question.type === 'checkbox' && (
                            <div className="space-y-1">
                              {question.options?.map((option, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <div className="w-3 h-3 border border-gray-300 rounded"></div>
                                  <span>{option.text || `Option ${idx + 1}`}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {question.type === 'star-rating' && (
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className="text-yellow-400">⭐</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};