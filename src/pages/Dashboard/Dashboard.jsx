import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { BookPlus, BookOpen, Repeat2, Building2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const actions = [
    { to: "/add-book", icon: BookPlus, label: "Add a book", desc: "List a book for exchange", color: "from-indigo-500 to-pink-500" },
    { to: "/my-books", icon: BookOpen, label: "My books", desc: "View and manage your listings", color: "from-pink-500 to-amber-500" },
    { to: "/exchange", icon: Repeat2, label: "Exchange requests", desc: "Incoming and outgoing", color: "from-teal-500 to-indigo-500" },
    { to: "/universities", icon: Building2, label: "By university", desc: "Browse by university", color: "from-amber-500 to-rose-500" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-3xl">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-1">Dashboard</h1>
        <p className="text-indigo-700/80">Welcome, {user?.name}. Manage your books and exchanges.</p>
        <div className="grid gap-4 mt-8 sm:grid-cols-2">
          {actions.map(({ to, icon: Icon, label, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 p-4 rounded-xl border border-indigo-200/80 bg-white/80 hover:shadow-lg hover:shadow-indigo-500/15 hover:border-indigo-300 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <Icon className="text-white" size={24} />
              </div>
              <div>
                <p className="font-semibold text-indigo-900">{label}</p>
                <p className="text-sm text-indigo-600/70">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
