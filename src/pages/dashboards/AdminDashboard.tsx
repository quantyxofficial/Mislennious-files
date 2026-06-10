import { useEffect, useState } from 'react';
import { useAgencyAuth } from '../../context/AgencyAuthContext';
import { Navbar } from '../../components/sections/Navbar';
import { dashboardService } from '../../services/api/dashboard.service';
import { Users, FolderGit2, Trophy, ShieldAlert, Plus, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAgencyAuth();
  const [stats, setStats] = useState({ totalStudents: 0, totalProjects: 0, totalMentors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const data = await dashboardService.getAdminDashboardOverview();
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      <main className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h1 className="text-3xl font-bold">Command Center</h1>
            </div>
            <p className="text-slate-400">System Administrator: {user?.name}</p>
          </div>
          <button 
            onClick={signOut} 
            className="px-6 py-2.5 rounded-full border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all"
          >
            Terminate Session
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <Activity className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-4xl font-light tracking-tight mb-2">
              {loading ? <span className="animate-pulse">--</span> : stats.totalStudents}
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">Active Students</p>
          </div>

          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <Activity className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-4xl font-light tracking-tight mb-2">
              {loading ? <span className="animate-pulse">--</span> : stats.totalProjects}
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">Project Database</p>
          </div>

          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <Activity className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-4xl font-light tracking-tight mb-2">
              {loading ? <span className="animate-pulse">--</span> : stats.totalMentors}
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">Registered Mentors</p>
          </div>
        </div>

        {/* Management Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Projects & Assignments */}
          <div className="glass-bento p-8 rounded-3xl border border-white/10 flex flex-col h-[500px]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white">Project Database</h2>
                <p className="text-sm text-slate-400 mt-1">Manage projects and mentor assignments.</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">Awaiting Live Database Sync</p>
            </div>
          </div>

          {/* User Management */}
          <div className="flex flex-col gap-6">
            <div className="glass-bento p-8 rounded-3xl border border-white/10 flex-1">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Access Control</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage student and mentor identities.</p>
                </div>
                <Users className="w-5 h-5 text-slate-500" />
              </div>
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Sync Required</p>
              </div>
            </div>

            <div className="glass-bento p-8 rounded-3xl border border-white/10 flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center mb-6 relative z-10">
                <div>
                  <h2 className="text-lg font-semibold text-white">Global Leaderboard</h2>
                  <p className="text-sm text-slate-400 mt-1">Monitor rankings and override scores.</p>
                </div>
                <Trophy className="w-5 h-5 text-amber-500/50" />
              </div>
              <button className="w-full py-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest hover:bg-amber-500/20 transition-all text-center">
                Access Audit Logs
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
