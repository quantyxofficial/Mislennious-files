import { useEffect, useState } from 'react';
import { useAgencyAuth } from '../../context/AgencyAuthContext';
import { Navbar } from '../../components/sections/Navbar';
import { dashboardService } from '../../services/api/dashboard.service';
import { ProjectWithDetails } from '../../types/models';
import { FolderGit2, Users, CheckCircle, ShieldCheck } from 'lucide-react';

export default function MentorDashboard() {
  const { user, signOut } = useAgencyAuth();
  const [projects, setProjects] = useState<ProjectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (user?.id) {
        const data = await dashboardService.getMentorDashboard(user.id);
        setProjects(data);
      }
      setLoading(false);
    }
    loadDashboard();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      <main className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h1 className="text-3xl font-bold">Mentor Control Hub</h1>
            </div>
            <p className="text-slate-400">Welcome, {user?.name}. Oversee your assigned projects and evaluate contributions.</p>
          </div>
          <button 
            onClick={signOut} 
            className="px-6 py-2.5 rounded-full border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all"
          >
            Sign Out
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-24 border border-white/5 rounded-3xl bg-white/[0.01]">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-cyan-400 animate-pulse font-mono uppercase tracking-widest">Syncing Database...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 border border-white/5 rounded-3xl bg-white/[0.01] flex flex-col items-center justify-center">
            <FolderGit2 className="w-12 h-12 text-slate-600 mb-4" />
            <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">No Active Assignments</p>
            <p className="text-xs text-slate-600 mt-2">Awaiting administrator allocation.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="glass-bento p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{project.name}</h2>
                      <p className="text-sm text-slate-400 mt-1">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-mono text-slate-300">{project.assignments?.length || 0} Students</span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Needs Evaluation
                  </h3>
                  
                  {project.assignments && project.assignments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.assignments.map((assignment) => (
                        <div key={assignment.student_id} className="flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                          <div className="mb-6">
                            <p className="font-medium text-slate-200">{assignment.users.name}</p>
                            <p className="text-xs text-slate-500 font-mono mt-1">{assignment.users.email}</p>
                          </div>
                          <button className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-emerald-500 hover:text-black transition-all">
                            Evaluate Student
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
                      <p className="text-xs text-slate-500 italic">No students assigned to this project.</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
