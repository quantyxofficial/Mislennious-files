import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function KaizenNavbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto bg-[#0f0f1a]/70 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            KaizenStat
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <Link to="/docs" className="hover:text-cyan-400 transition-colors">Documentation</Link>
          <a href="https://github.com/kaizenstat-python" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/docs"
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
