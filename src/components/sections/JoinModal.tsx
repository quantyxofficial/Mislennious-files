import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, User, Users, Briefcase } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole: string;
}

export function JoinModal({ isOpen, onClose, defaultRole }: JoinModalProps) {
  const [role, setRole] = useState(defaultRole || "Contributor");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-lg"
          >
            <div className="bg-[#020617] border border-white/10 rounded-3xl p-6 md:p-8 m-4 shadow-2xl relative overflow-hidden">
              {/* Glow effects */}
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none transition-colors duration-500
                ${role === 'Contributor' ? 'bg-cyan-500/20' : 
                  role === 'Mentor' ? 'bg-purple-500/20' : 'bg-emerald-500/20'}
              `} />

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-light text-white mb-2">Join the <span className="italic">Initiative</span></h3>
                <p className="text-sm font-light text-slate-400">Fill out your details and select how you'd like to contribute.</p>
              </div>

              <form className="space-y-5 relative z-10" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">I want to apply as:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Contributor', icon: User, color: 'hover:border-cyan-500/50 hover:bg-cyan-500/10', activeClass: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' },
                        { id: 'Mentor', icon: Users, color: 'hover:border-purple-500/50 hover:bg-purple-500/10', activeClass: 'border-purple-500/50 bg-purple-500/10 text-purple-400' },
                        { id: 'Partner', icon: Briefcase, color: 'hover:border-emerald-500/50 hover:bg-emerald-500/10', activeClass: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' }
                      ].map(r => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={`
                            flex flex-col items-center gap-2 p-3 rounded-xl border transition-all
                            ${role === r.id ? r.activeClass : 'border-white/5 bg-white/[0.02] text-slate-400 ' + r.color}
                          `}
                        >
                          <r.icon className="w-5 h-5" />
                          <span className="text-[10px] font-mono tracking-widest uppercase">{r.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Your Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      {role === 'Partner' ? 'Company / Organization URL' : 'GitHub / LinkedIn URL'}
                    </label>
                    <input 
                      type="url" 
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="https://"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Brief Message</label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder={
                        role === 'Partner' ? 'Tell us about your organization...' : 
                        role === 'Mentor' ? 'What domains are you expert in?' : 
                        'What technologies do you want to work on?'
                      }
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3.5 text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    Submit Application
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
