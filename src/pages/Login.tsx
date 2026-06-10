import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/sections/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { success, error: loginError, user: loggedInUser } = await login(email);
    
    if (success && loggedInUser) {
      // Route them directly to their specific role dashboard
      navigate(`/${loggedInUser.role}`, { replace: true });
    } else {
      setError(loginError || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 relative overflow-hidden">
      <Navbar />
      
      {/* Blurred Dashboard Background Illusion */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-80">
        
        {/* Ambient Glows to bleed through the glass */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />

        {/* Mock Top Nav / Header Area */}
        <div className="absolute top-24 left-8 right-8 h-12 border-b border-white/10 flex items-center justify-between px-4">
          <div className="w-48 h-6 bg-white/5 rounded-md" />
          <div className="w-24 h-8 bg-white/5 rounded-full" />
        </div>
        
        {/* Mock Dashboard Grid */}
        <div className="absolute top-48 left-8 right-8 bottom-8 max-w-7xl mx-auto flex flex-col gap-6">
          <div className="w-64 h-8 bg-white/5 rounded-md mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/50" />
            <div className="h-40 rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/50" />
            <div className="h-40 rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/50 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="h-[400px] rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/50" />
            <div className="h-[400px] rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/50 hidden lg:block" />
          </div>
        </div>

        {/* The Heavy Blur Glass Layer */}
        <div className="absolute inset-0 backdrop-blur-[16px] bg-[#020617]/20" />
      </div>

      <main className="pt-32 pb-24 px-4 flex items-center justify-center min-h-[90vh] relative z-10">
        <div className="w-full max-w-md">
          <div className="glass-bento p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6 mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Portal Access</h1>
            <p className="text-sm text-slate-400 text-center mb-8 font-light">
              Enter your authorized email to access your dashboard.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-mono">Email Address</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="admin@kaizenstat.com"
                  required
                />
              </div>

              {/* Development Quick Access Shortcuts */}
              <div className="pt-2 pb-4">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mb-2 text-center">Dev Shortcuts (Bypass DB)</p>
                <div className="flex justify-center gap-2">
                  <button type="button" onClick={() => setEmail('admin')} className="px-3 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] uppercase tracking-wider font-bold hover:bg-red-500/20 transition-colors">
                    admin
                  </button>
                  <button type="button" onClick={() => setEmail('mentor')} className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase tracking-wider font-bold hover:bg-emerald-500/20 transition-colors">
                    mentor
                  </button>
                  <button type="button" onClick={() => setEmail('student')} className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] uppercase tracking-wider font-bold hover:bg-cyan-500/20 transition-colors">
                    student
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-bold text-sm py-3 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
