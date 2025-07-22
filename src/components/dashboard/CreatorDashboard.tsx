import { StatsCard } from './StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { mockResponsesByDay, mockResponsesByCountry, mockSessionData } from '@/data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Plus,
  BarChart3,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#ff7300', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#8884D8'];

export function CreatorDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your surveys today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/templates')}>
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button variant="brand" onClick={() => navigate('/builder/survey')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Survey
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Forms"
          value="5"
          description="3 surveys, 2 quizzes"
          icon={FileText}
          trend={{ value: 20, isPositive: true }}
        />
        <StatsCard
          title="Total Responses"
          value="847"
          description="This month"
          icon={MessageSquare}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Avg. Completion Rate"
          value="78%"
          description="Across all forms"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value="234"
          description="Last 30 days"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Responses by Day */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Responses by Day
            </CardTitle>
            <CardDescription>
              Daily response trends for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockResponsesByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Responses by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Responses by Country
            </CardTitle>
            <CardDescription>
              Geographic distribution of your responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockResponsesByCountry}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockResponsesByCountry.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Session Matrix Table */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Day and Time Combinations</CardTitle>
          <CardDescription>
            Session and conversion data by hour of the day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Hour</th>
                  <th className="text-left p-2 font-medium">Sessions</th>
                  <th className="text-left p-2 font-medium">Conversion</th>
                  <th className="text-left p-2 font-medium">Conversion %</th>
                </tr>
              </thead>
              <tbody>
                {mockSessionData.map((row, index) => {
                  const conversionRate = ((row.conversion / row.session) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{row.hour}:00</td>
                      <td className="p-2">{row.session}</td>
                      <td className="p-2">{row.conversion}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          parseFloat(conversionRate) > 30 
                            ? 'bg-success/10 text-success' 
                            : parseFloat(conversionRate) > 20 
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {conversionRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Created Surveys Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">My Created Surveys: Forms and Quizzes</CardTitle>
          <CardDescription>
            All your forms with performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-primary/5">
                  <th className="text-left p-3 font-medium">Survey name</th>
                  <th className="text-left p-3 font-medium">
                    Open rate
                    <span className="text-primary ml-1">▼</span>
                  </th>
                  <th className="text-left p-3 font-medium">
                    Completion rate
                    <span className="text-primary ml-1">▼</span>
                  </th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">&lt;Form #1&gt;</td>
                  <td className="p-3">80%</td>
                  <td className="p-3">25%</td>
                  <td className="p-3 text-primary">Stats|Edit|View|Disable</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">&lt;Quiz #1&gt;</td>
                  <td className="p-3">67%</td>
                  <td className="p-3">12%</td>
                  <td className="p-3 text-primary">Stats|Edit|View|Disable</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">&lt;Form #2&gt;</td>
                  <td className="p-3">49%</td>
                  <td className="p-3">7%</td>
                  <td className="p-3 text-primary">Stats|Edit|View|Disable</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">&lt;Quiz #2&gt;</td>
                  <td className="p-3">99%</td>
                  <td className="p-3">10%</td>
                  <td className="p-3 text-primary">Stats|Edit|View|Disable</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3">&lt;Form #3&gt;</td>
                  <td className="p-3">88%</td>
                  <td className="p-3">22%</td>
                  <td className="p-3 text-primary">Stats|Edit|View|Disable</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              &lt;&lt;&lt; Previous page
            </div>
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
              Display 20 records
            </div>
            <div className="text-sm text-muted-foreground">
              Next page &gt;&gt;&gt;
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}