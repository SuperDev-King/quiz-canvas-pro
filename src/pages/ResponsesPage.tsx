import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Download, Eye, Filter } from 'lucide-react';
import { mockForms, mockResponses } from '@/data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const ResponsesPage: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResponses = mockResponses.filter(response => {
    const matchesForm = selectedForm === 'all' || response.formId === selectedForm;
    const matchesSearch = searchTerm === '' || 
      response.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.respondentId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesForm && matchesSearch;
  });

  const completionData = [
    { name: 'Completed', value: filteredResponses.filter(r => r.isCompleted).length },
    { name: 'Incomplete', value: filteredResponses.filter(r => !r.isCompleted).length },
  ];

  const countryData = filteredResponses.reduce((acc, response) => {
    acc[response.country] = (acc[response.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countryChartData = Object.entries(countryData).map(([country, count]) => ({
    name: country,
    value: count,
  }));

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const exportToExcel = () => {
    // Simulate Excel export
    console.log('Exporting to Excel:', filteredResponses);
    alert('Export functionality would download Excel file here');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Responses</h1>
            <p className="text-muted-foreground">View and analyze form responses</p>
          </div>
          <Button onClick={exportToExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Select value={selectedForm} onValueChange={setSelectedForm}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select form" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Forms</SelectItem>
              {mockForms.map((form) => (
                <SelectItem key={form.id} value={form.id}>
                  {form.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search by country or respondent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Completion Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responses by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={countryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Responses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Responses ({filteredResponses.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Respondent ID</TableHead>
                  <TableHead>Form Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Time (minutes)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResponses.map((response) => {
                  const form = mockForms.find(f => f.id === response.formId);
                  return (
                    <TableRow key={response.id}>
                      <TableCell className="font-mono">{response.respondentId}</TableCell>
                      <TableCell>{form?.title || 'Unknown Form'}</TableCell>
                      <TableCell>{response.country}</TableCell>
                      <TableCell>{new Date(response.completedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={response.isCompleted ? 'default' : 'secondary'}>
                          {response.isCompleted ? 'Complete' : 'Incomplete'}
                        </Badge>
                      </TableCell>
                      <TableCell>{Math.round(response.completionTime / 60)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};