import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  ClipboardList, 
  Calendar,
  HelpCircle,
  Briefcase,
  FolderOpen,
  Bell,
  Activity,
  FileText,
  User
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employee', label: 'Employee', icon: Users },
    { path: '/payroll', label: 'Payroll', icon: Wallet },
    { path: '/pay-slip', label: 'Pay Slip', icon: FileText },
    { path: '/attendance', label: 'Attendance', icon: ClipboardList },
    { path: '/request-center', label: 'Request Center', icon: HelpCircle },
    { path: '/career-database', label: 'Career Database', icon: Briefcase },
    { path: '/document-manager', label: 'Document manager', icon: FolderOpen },
    { path: '/notices', label: 'Notice Board', icon: Bell },
    { path: '/activity-log', label: 'Activity Log', icon: Activity },
    { path: '/exit-interview', label: 'Exit Interview', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-gray-900 px-2 py-1 rounded font-bold text-sm">
            N
          </div>
          <span className="text-xl font-bold">Nebs-IT</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-6 py-3 transition ${
                isActive
                  ? 'bg-blue-600 border-l-4 border-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;