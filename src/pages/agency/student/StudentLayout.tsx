import { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Trophy, CreditCard, Bell, BookOpen } from 'lucide-react';

const tabs = [
  { path: '/member', name: 'Member Info', icon: User },
  { path: '/practice', name: 'Learn Free', icon: BookOpen },
  { path: '/member/competitions', name: 'Competitions', icon: Trophy },
  { path: '/member/id-card', name: 'Member ID Card', icon: CreditCard },
  { path: '/member/announcements', name: 'Announcements', icon: Bell },
];

export function StudentLayout() {
  const location = useLocation();

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-[#020202]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 gpu-accelerated">
            <div className="sticky top-[104px] bg-[#09090b] border border-white/5 rounded-2xl p-4 shadow-xl">
              <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 px-4">Member Dashboard</h2>
              <nav className="flex flex-col gap-2">
                {tabs.map((tab) => {
                  const isActive = location.pathname === tab.path;
                  const Icon = tab.icon;
                  return (
                    <Link
                      key={tab.path}
                      to={tab.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="text-sm font-medium">{tab.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
 
          {/* Main Content Area */}
          <div className="flex-1 bg-[#09090b] border border-white/5 rounded-3xl p-6 md:p-10 shadow-xl min-h-[400px] gpu-accelerated">
            <Suspense fallback={
              <div className="h-full w-full min-h-[300px] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Outlet />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
}
