import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { 
  Home, 
  FileText, 
  HelpCircle, 
  Layout, 
  Settings, 
  MessageSquare, 
  FileCheck, 
  CreditCard,
  Users,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  roles: ('admin' | 'creator')[];
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: 'Home', href: '/dashboard', roles: ['admin', 'creator'] },
  { icon: FileText, label: 'Forms', href: '/forms', roles: ['creator'] },
  { icon: HelpCircle, label: 'Quizzes', href: '/quizzes', roles: ['creator'] },
  { icon: Layout, label: 'Templates', href: '/templates', roles: ['creator'] },
  { icon: MessageSquare, label: 'Responses', href: '/responses', roles: ['creator'] },
  { icon: Users, label: 'User Management', href: '/users', roles: ['admin'] },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', roles: ['admin'] },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ['admin', 'creator'] },
  { icon: FileCheck, label: 'Terms', href: '/terms', roles: ['creator'] },
  { icon: CreditCard, label: 'Upgrade', href: '/upgrade', roles: ['creator'] },
];

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredItems = sidebarItems.filter(item => 
    user?.role && item.roles.includes(user.role as 'admin' | 'creator')
  );

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">Survey Platform</h2>
            <p className="text-xs text-muted-foreground capitalize">{user?.role} Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard' && location.pathname === '/');
          
          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-left",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-left text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}