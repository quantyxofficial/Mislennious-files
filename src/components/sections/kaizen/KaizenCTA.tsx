import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Users, Trophy, Database, TrendingUp } from 'lucide-react';

export function KaizenCTA() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    
    const subject = encodeURIComponent('Contact from KaizenStat Developer');
    const body = encodeURIComponent(`Sender: ${email}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:founders@kaizenstat.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 relative border-t border-white/5 bg-transparent" id="connect">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative bg-transparent border border-white/10 rounded-[2rem] p-8 md:p-10 overflow-hidden transition-all"
        >
          {/* Subtle minimal ambient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[80px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Community */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider mb-6 bg-white/[0.02]">
                  Developer Collective
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-tight mb-3">
                  Join early developers debugging real ML failures every week.
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light mb-5">
                  Not a passive group — an active community running weekly challenges on real datasets. Debug together, improve faster.
                </p>

                {/* Community features */}
                <div className="space-y-3">
                  {[
                    { icon: <Trophy   className="w-3.5 h-3.5" />, color: 'text-amber-400',  label: 'Weekly ML debugging challenges' },
                    { icon: <Database className="w-3.5 h-3.5" />, color: 'text-cyan-400',   label: 'Real datasets — not toy examples' },
                    { icon: <TrendingUp className="w-3.5 h-3.5" />, color: 'text-emerald-400', label: 'Track your improvement over time' },
                  ].map(({ icon, color, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className={`${color} shrink-0`}>{icon}</span>
                      <span className="text-xs text-slate-400 font-light">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://chat.whatsapp.com/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25d366] hover:bg-[#20ba56] text-black font-extrabold text-[10px] uppercase tracking-widest rounded-full transition-all active:scale-95 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  Join the Community
                </a>
                <p className="text-[10px] text-slate-600 mt-2 font-mono">Free · growing community · weekly drops</p>
              </div>
            </div>

            {/* Divider Line (Visible on larger screens) */}
            <div className="hidden lg:block lg:col-span-1 w-px bg-white/5 my-2" />

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/5 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight uppercase tracking-wider">Email the Founders</h4>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="w-full bg-transparent border-b border-white/10 focus:border-white py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-white py-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white hover:bg-slate-100 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-full transition-all active:scale-95 cursor-pointer"
                >
                  {submitted ? 'Opening Mail Client...' : 'Send to Founders'}
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
