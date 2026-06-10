import { useAgencyAuth } from '../../context/AgencyAuthContext';
import { Navbar } from '../../components/sections/Navbar';
import { BookOpen, Star, Trophy, ArrowRight, Activity } from 'lucide-react';

export default function StudentDashboard() {
  const { user, signOut } = useAgencyAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      <main className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <h1 className="text-3xl font-bold">Contributor Hub</h1>
            </div>
            <p className="text-slate-400">Welcome back, {user?.name}. Track your open-source journey.</p>
          </div>
          <button 
            onClick={signOut} 
            className="px-6 py-2.5 rounded-full border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assignments Panel */}
          <div className="glass-bento p-8 rounded-3xl border border-white/10 md:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Active Assignments</h2>
                  <p className="text-sm text-slate-400">Projects you are currently contributing to.</p>
                </div>
              </div>
            </div>

            <div className="h-48 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl relative z-10 bg-white/[0.01]">
              <div className="text-center">
                <p className="text-sm text-slate-500 font-mono uppercase tracking-widest mb-2">Awaiting Sync</p>
                <p className="text-xs text-slate-600">Connect to Supabase to view assignments</p>
              </div>
            </div>
          </div>

          {/* Rank & Scores Panel */}
          <div className="flex flex-col gap-6 md:col-span-1">
            {/* Global Rank */}
            <div className="glass-bento p-8 rounded-3xl border border-white/10 flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none group-hover:from-amber-500/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-1">Global Standing</p>
                <div className="text-4xl font-light tracking-tight text-white flex items-end gap-2">
                  <span className="animate-pulse text-amber-500">--</span>
                  <span className="text-sm text-slate-500 font-mono pb-1">/ 1429</span>
                </div>
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="glass-bento p-8 rounded-3xl border border-white/10 flex-1 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Star className="w-5 h-5" />
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-1">Total Score</p>
                <div className="text-4xl font-light tracking-tight text-white">
                  <span className="animate-pulse text-purple-400">--</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Awaiting mentor evaluation</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
