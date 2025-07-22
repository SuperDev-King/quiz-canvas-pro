import { StatsCard } from './StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCreators, mockDashboardStats } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Activity,
  Search,
  MoreHorizontal,
  UserCheck,
  UserX
} from 'lucide-react';
import { useState } from 'react';

const systemMetrics = [
  { month: 'Jan', users: 65, forms: 24, responses: 340 },
  { month: 'Feb', users: 78, forms: 31, responses: 425 },
  { month: 'Mar', users: 82, forms: 28, responses: 380 },
  { month: 'Apr', users: 95, forms: 42, responses: 520 },
  { month: 'May', users: 103, forms: 38, responses: 485 },
  { month: 'Jun', users: 112, forms: 45, responses: 580 },
];

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCreators = mockCreators.filter(creator =>
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor platform activity and manage users.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Creators"
          value={mockCreators.length}
          description={`${mockCreators.filter(c => c.isActive).length} active`}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Forms"
          value={mockDashboardStats.totalForms}
          description="Across all creators"
          icon={FileText}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Responses"
          value={mockDashboardStats.totalResponses.toLocaleString()}
          description="This month"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Platform Health"
          value="98.5%"
          description="Uptime this month"
          icon={Activity}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>
              User and form creation trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#ff7300" strokeWidth={2} />
                <Line type="monotone" dataKey="forms" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Response Volume</CardTitle>
            <CardDescription>
              Monthly response trends across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>Creator Management</CardTitle>
          <CardDescription>
            Manage creator accounts and monitor their activity
          </CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Creator</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Forms</th>
                  <th className="text-left p-3 font-medium">Responses</th>
                  <th className="text-left p-3 font-medium">Avg. Completion</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreators.map((creator) => (
                  <tr key={creator.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {creator.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(creator.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{creator.email}</td>
                    <td className="p-3">{creator.totalForms}</td>
                    <td className="p-3">{creator.totalResponses.toLocaleString()}</td>
                    <td className="p-3">{creator.avgCompletionRate}%</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        creator.isActive 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {creator.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          {creator.isActive ? (
                            <>
                              <UserX className="h-3 w-3 mr-1" />
                              Disable
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-3 w-3 mr-1" />
                              Enable
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}