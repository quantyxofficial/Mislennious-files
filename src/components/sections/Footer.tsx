import { Logo } from "../ui/Logo";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Github, MessageSquare, ArrowRight, Linkedin, Globe, Instagram, Mail, MapPin } from "lucide-react";
import { WorldMapSVG } from "../ui/WorldMapSVG";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Footer() {
  return (
    <footer className="relative w-full z-20 overflow-hidden bg-transparent pt-32 pb-12 border-t border-white/[0.05]" id="footer">
      {/* Delicate Space Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />


      <div className="absolute bottom-36 right-6 md:right-12 pointer-events-none select-none z-0 overflow-hidden max-w-full">
        <span className="text-6xl md:text-[8vw] font-black tracking-tighter block leading-none text-white/[0.18] text-right">
          KAIZENSTAT
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-4 pr-0 lg:pr-12">
            <div className="flex items-center gap-3 mb-8">
              <Logo className="w-12 h-12 text-white" />
              <span className="text-xl font-bold tracking-tighter text-white">
                KaizenStat
              </span>
            </div>
            <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-sm mb-8">
              Empowering the next generation of engineers to index, validate, and optimize the world's data for the future of intelligence.
            </p>

            <div className="space-y-4 mb-12">
              <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-4">Stay Updated</div>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Join our active community for real-time opportunity alerts and technical discussions.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500 text-black font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                <MessageSquare className="w-4 h-4" />
                Join WhatsApp Group
              </a>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <a href="https://github.com/Kaizenstat" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/kaizenstat/about/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/kaizenstat_official/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                  <a href="mailto:founders@kaizenstat.com" className="text-slate-400 hover:text-white transition-colors text-xs">founders@kaizenstat.com</a>
              </div>
              <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-400 text-xs">Park Street<br />Kolkata, WB 700016</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60 mb-6">
              Ecosystem
            </div>
            <ul className="space-y-4 text-[13px] text-slate-400 font-light">
              <li><Link to="/founder-connect" className="hover:text-cyan-400 transition-colors">Team</Link></li>
              <li><Link to="/events" className="hover:text-cyan-400 transition-colors">Events</Link></li>
              <li><Link to="/contribute" className="hover:text-cyan-400 transition-colors">KSoC</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link to="/kaizen-ai" className="hover:text-cyan-400 transition-colors">Kaizen AI</Link></li>
              <li><Link to="/verify" className="hover:text-cyan-400 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white/60 transition-colors text-white/20">Admin</Link></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60 mb-6">
              Courses
            </div>
            <ul className="space-y-4 text-[13px] text-slate-400 font-light">
              <li><Link to="/study/deep-learning" className="hover:text-cyan-400 transition-colors">Deep Learning</Link></li>
              <li><Link to="/study/machine-learning" className="hover:text-cyan-400 transition-colors">Machine Learning</Link></li>
              <li><Link to="/study/numpy" className="hover:text-cyan-400 transition-colors">NumPy</Link></li>
              <li><Link to="/study/pandas" className="hover:text-cyan-400 transition-colors">Pandas</Link></li>
              <li><Link to="/study/matplotlib" className="hover:text-cyan-400 transition-colors">Matplotlib</Link></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60 mb-6">
              Member Dashboard
            </div>
            <ul className="space-y-4 text-[13px] text-slate-400 font-light">
              <li><Link to="/student" className="hover:text-white transition-colors">Member Info & Update</Link></li>
              <li><Link to="/student/competitions" className="hover:text-white transition-colors">Upcoming Competitions</Link></li>
              <li><Link to="/student/id-card" className="hover:text-white transition-colors">Member ID Card</Link></li>
              <li><Link to="/student/announcements" className="hover:text-white transition-colors">Announcements</Link></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60 mb-6">
              Official Team
            </div>
            <ul className="space-y-4 text-[13px] text-slate-400 font-light">
              <li><a href="https://www.linkedin.com/in/masuddar-rahaman/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Masuddar Rahaman</a></li>
              <li><a href="https://www.linkedin.com/in/kriti-sharma-795116377/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Kriti Sharma</a></li>
              <li><a href="https://www.linkedin.com/in/abhishikta-dutta1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Abhishikta Dutta</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/[0.05] gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} KaizenStat
            </div>
            
            <div className="flex items-center gap-6 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span className="w-1 h-1 bg-white/10 rounded-full" />
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span className="w-1 h-1 bg-white/10 rounded-full" />
              <Link to="/ethics" className="hover:text-white transition-colors">Ethics</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">
            <span className="flex items-center gap-2 italic">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              "Continuous improvement is the soul of progress"
            </span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="text-cyan-400">KaizenStat Mission</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
