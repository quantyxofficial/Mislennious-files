import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function KaizenFooter() {
  return (
    <footer className="bg-[#0a0a14] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">
              KaizenStat
            </span>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <Link to="/docs" className="hover:text-cyan-400 transition-colors">Documentation</Link>
            <Link to="/founder-connect" className="hover:text-cyan-400 transition-colors">Team</Link>
            <a href="https://github.com/kaizenstat" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="https://pypi.org/project/kaizenstat/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">PyPI</a>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KaizenStat. Released under the MIT License.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Built for modern data scientists.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}