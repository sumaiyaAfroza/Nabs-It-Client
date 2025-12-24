import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ClipboardList,
  HelpCircle,
  Briefcase,
  FolderOpen,
  Bell,
  Activity,
  FileText,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import logo from '../../public/logoo.png';

const Sidebar = () => {
  const location = useLocation();
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 min-h-screen fixed left-0 top-0 bg-white">
          <div className="p-6 ">
        <div className="">
          <img src={logo} alt="" />
         
        </div>
      </div>

      <nav className="mt-4">
        <SidebarItem
          to="/"
          label="Dashboard"
          icon={LayoutDashboard}
          active={isActive("/")}
        />

        {/* Employee Dropdown */}
        <div>
          <button
            onClick={() => setEmployeeOpen(!employeeOpen)}
            className={`w-full flex items-center justify-between px-6 py-3 text-sm transition
              ${
                location.pathname.startsWith("/employee")
                  ? "bg-gray-100 text-gray-900 border-r-4 border-amber-600"
                  : "text-gray-700 hover:bg-gray-100 hover:border-r-4 hover:border-amber-600"
              }`}
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Employee</span>
            </div>
            {employeeOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {employeeOpen && (
            <div className="ml-10 mt-1 space-y-1">
              <SubItem to="/employee/list" label="Employee List" />
              <SubItem to="/employee/add" label="Add Employee" />
               <SubItem to="/employee/report" label="Performance Report" />
              <SubItem to="/employee/history" label="Performance History" />
            </div>
          )}
        </div>

        <SidebarItem to="/payroll" label="Payroll" icon={Wallet} active={isActive("/payroll")} />
        <SidebarItem to="/attendance" label="Attendance" icon={ClipboardList} active={isActive("/attendance")} />
        <SidebarItem to="/request-center" label="Request Center" icon={HelpCircle} active={isActive("/request-center")} />
        <SidebarItem to="/career-database" label="Career Database" icon={Briefcase} active={isActive("/career-database")} />
        <SidebarItem to="/document-manager" label="Document Manager" icon={FolderOpen} active={isActive("/document-manager")} />
        <SidebarItem to="/notices" label="Notice Board" icon={Bell} active={isActive("/notices")} />
        <SidebarItem to="/activity-log" label="Activity Log" icon={Activity} active={isActive("/activity-log")} />
        <SidebarItem to="/profile" label="Profile" icon={User} active={isActive("/profile")} />
      </nav>
    </div>
  );
};


const SidebarItem = ({ to, label, icon: Icon, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-6 py-3 text-sm transition
      ${
        active
          ? "bg-gray-100 text-black border-r-4 border-amber-600"
          : "text-gray-700 hover:bg-gray-100 hover:border-r-3 hover:border-amber-600"
      }`}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </Link>
);

const SubItem = ({ to, label }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-3 py-2 text-sm rounded transition
        ${
          active
            ? "text-amber-600 font-medium"
            : "text-gray-600 hover:text-amber-600"
        }`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;
