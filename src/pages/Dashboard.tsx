import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Network, Search, Bell, Settings, User, Code2, Rocket, Heart, BookOpen, MapPin, Clock, MessageSquare, Terminal, LogOut, IdCard, GitPullRequest, CircleDot, Star, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Logo } from '../components/ui/Logo';

const MOCK_PROFILES = [
  {
    role: "Mentor",
    name: "Elena Rodriguez",
    username: "@elenacodes",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    tagline: "Staff SWE guiding the next gen of open source builders.",
    location: "Barcelona, ES (CET)",
    languages: ["EN", "ES"],
    skills: { primary: ["React", "TypeScript", "Node.js"], secondary: ["GraphQL", "Rust"] },
    stats: { prs: 1420, repos: 34, mentoring: 12 },
    preferences: { interests: ["Mentoring", "Pair programming"], time: "Weekends & Evenings" },
    causes: ["Education", "Accessibility", "Open Web"],
    journey: "I've maintained major JS ecosystems for 8 years. Now looking to help newcomers land their first big PR.",
    hue: "from-purple-500 to-indigo-500"
  },
  {
    role: "Contributor",
    name: "Alex Chen",
    username: "@alexchen_dev",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    tagline: "Fullstack tinkerer. I fix bugs before you find them.",
    location: "Seattle, WA (PST)",
    languages: ["EN", "ZH"],
    skills: { primary: ["Go", "PostgreSQL", "Docker"], secondary: ["Kubernetes", "Python"] },
    stats: { prs: 340, repos: 18, mentoring: 0 },
    preferences: { interests: ["Hackathons", "Bug bounties"], time: "20hrs/week" },
    causes: ["Developer Tools", "Privacy", "Climate Tech"],
    journey: "Currently diving deep into distributed systems. Looking for Go projects that need performance optimization.",
    hue: "from-cyan-400 to-blue-500"
  },
  {
    role: "Maintainer",
    name: "Marcus Johnson",
    username: "@marcusj_os",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    tagline: "Building scalable data pipelines and managing chaos.",
    location: "London, UK (GMT)",
    languages: ["EN"],
    skills: { primary: ["Rust", "C++", "WASM"], secondary: ["Python", "AWS"] },
    stats: { prs: 890, repos: 12, mentoring: 5 },
    preferences: { interests: ["Code review", "Architecture"], time: "Full-time OSS" },
    causes: ["Decentralization", "AI Safety", "Performance"],
    journey: "Creator of the DataForge lib. Always open to reviewing PRs from eager contributors who read the contributing guidelines.",
    hue: "from-emerald-400 to-cyan-500"
  }
];

const ProfileCard: React.FC<{ profile: typeof MOCK_PROFILES[0] }> = ({ profile }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-bento rounded-[2rem] border border-white/5 overflow-hidden flex flex-col hover:border-white/10 transition-colors shadow-[0_0_40px_rgba(0,0,0,0.5)]"
    >
      {/* Header / Core Identity */}
      <div className={`p-6 relative overflow-hidden`}>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${profile.hue}`} />
        <div className="absolute top-0 right-0 p-4 opacity-10 blur-xl">
           <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${profile.hue}`} />
        </div>
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="relative">
            <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full border-2 border-white/10 object-cover" />
            <div className={`absolute -bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-gradient-to-r ${profile.hue} text-white shadow-lg whitespace-nowrap`}>
              {profile.role}
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-lg font-bold text-white truncate">{profile.name}</h3>
            <p className="text-slate-400 text-xs font-mono mb-2">{profile.username}</p>
            <p className="text-sm text-slate-300 leading-snug">{profile.tagline}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-6 text-xs text-slate-400 relative z-10 font-mono">
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-400" /> {profile.location}</span>
          <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-slate-400" /> {profile.languages.join(", ")}</span>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5 flex-1 flex flex-col gap-6">
        
        {/* Skills */}
        <div>
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-3 flex items-center gap-2"><Terminal className="w-3 h-3" /> Tech Stack</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.skills.primary.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/5 text-xs font-medium text-white shadow-sm glow-hover">{s}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.secondary.map(s => (
              <span key={s} className="px-2.5 py-1 rounded-md bg-transparent border border-white/5 text-xs text-slate-400">{s}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
           <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <span className="text-lg font-mono text-white font-semibold">{profile.stats.prs}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Commits</span>
           </div>
           <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <span className="text-lg font-mono text-white font-semibold">{profile.stats.repos}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Repos</span>
           </div>
           <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center">
              <span className="text-lg font-mono text-white font-semibold">{profile.stats.mentoring}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Mentees</span>
           </div>
        </div>

        {/* Preferences & Causes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 flex items-center gap-1.5"><Heart className="w-3 h-3" /> Causes</h4>
            <div className="flex flex-col gap-1">
              {profile.causes.map(c => <span key={c} className="text-xs text-slate-300">• {c}</span>)}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Availability</h4>
            <span className="text-xs text-slate-300">{profile.preferences.time}</span>
            <div className="mt-2 text-[10px] text-cyan-400 font-mono bg-cyan-400/10 px-2 py-1 rounded inline-block">
               {profile.preferences.interests[0]}
            </div>
          </div>
        </div>
        
        {/* Journey */}
        <div className="mt-auto pt-4 border-t border-white/5">
           <p className="text-xs text-slate-400 italic leading-relaxed">"{profile.journey}"</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'constellation' | 'contributions' | 'projects' | 'mentorship' | 'identity'>('constellation');
  
  // Identity Form State
  const [idData, setIdData] = useState({
    name: "Satoshi Nakamoto",
    role: "Core Developer",
    username: "@satoshi",
    bio: "Building the future of decentralized collaboration.",
    skills: "Rust, Go, Cryptography",
    theme: "from-cyan-400 to-blue-500"
  });

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors text-cyan-400">
              <Logo className="w-5 h-5" />
            </div>
            <span className="font-semibold tracking-tight text-white">KSoC</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('constellation')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border ${activeTab === 'constellation' ? 'bg-white/5 text-white border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <User className={`w-4 h-4 ${activeTab === 'constellation' ? 'text-cyan-400' : ''}`} />
            Constellation View
          </button>
          <button 
            onClick={() => setActiveTab('contributions')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border ${activeTab === 'contributions' ? 'bg-white/5 text-white border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <Code2 className={`w-4 h-4 ${activeTab === 'contributions' ? 'text-cyan-400' : ''}`} />
            My Contributions
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border ${activeTab === 'projects' ? 'bg-white/5 text-white border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <Rocket className={`w-4 h-4 ${activeTab === 'projects' ? 'text-cyan-400' : ''}`} />
            Find Projects
          </button>
          <button 
            onClick={() => setActiveTab('mentorship')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border ${activeTab === 'mentorship' ? 'bg-white/5 text-white border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'mentorship' ? 'text-cyan-400' : ''}`} />
            Mentorship
          </button>
          <button 
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border ${activeTab === 'identity' ? 'bg-white/5 text-white border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}
          >
            <IdCard className={`w-4 h-4 ${activeTab === 'identity' ? 'text-cyan-400' : ''}`} />
            ID Card
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-medium text-xs transition-colors">
            <Settings className="w-3.5 h-3.5" />
            Settings
          </a>
          <Link to="/" className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-slate-400 hover:text-slate-300 hover:bg-white/5 font-medium text-[10px] uppercase tracking-wider transition-colors mt-2">
            <LogOut className="w-3 h-3" />
            Exit
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -mt-32 -mr-32" />
        
        {/* Topbar */}
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-10">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by skill, language, or interest..." 
              className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all font-mono"
            />
          </div>
          <div className="flex items-center gap-6 ml-4">
            <Link to="/" className="text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-wider md:hidden font-medium">
              <LogOut className="w-3 h-3" />
              Exit
            </Link>
            <button className="text-slate-400 hover:text-white transition-colors relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
            </button>
            <div className="w-px h-6 bg-white/10" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/20 p-0.5">
               <img src="https://i.pravatar.cc/150?img=11" alt="Me" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </header>
        
        {/* Scrollable Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
           
           <div className="max-w-6xl mx-auto">
              {activeTab === 'constellation' && (
                <>
                  {/* Header */}
                  <div className="flex items-end justify-between mb-10">
                    <div>
                        <h1 className="text-3xl tracking-tight font-bold text-white mb-2">Constellation Builder</h1>
                        <p className="text-slate-400 text-sm">Discover mentors, contributors, and maintainers matching your stack.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-sm font-medium transition-colors border border-white/5">
                          Filter
                        </button>
                        <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm font-medium transition-colors border border-cyan-500/30">
                          Match me
                        </button>
                    </div>
                  </div>

                  {/* Profiles Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MOCK_PROFILES.map((profile, i) => (
                        <ProfileCard key={i} profile={profile} />
                    ))}
                    
                    {/* Empty State / Add profile card placeholder */}
                    <div className="glass-bento rounded-[2rem] border border-white/5 border-dashed flex flex-col items-center justify-center p-8 text-center bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer min-h-[400px]">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                          <span className="text-2xl text-slate-400">+</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Expand Your Constellation</h3>
                        <p className="text-slate-400 text-sm max-w-[200px]">Invite developers or sync your organization's GitHub repository.</p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'contributions' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl tracking-tight font-bold text-white mb-2">My Contributions</h1>
                        <p className="text-slate-400 text-sm">Your active pull requests, reviewed code, and filed issues.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { type: 'pr', status: 'merged', repo: 'kaizen/core', title: 'Add tensor parallel execution strategy', date: '2 days ago' },
                      { type: 'issue', status: 'open', repo: 'kaizen/docs', title: 'Missing documentation for node operators', date: '5 days ago' },
                      { type: 'pr', status: 'review', repo: 'kaizen/ui', title: 'Implement constrained layout mode', date: '1 week ago' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                        <div className={`p-2 rounded-full ${item.type === 'pr' ? 'bg-purple-500/10 text-purple-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {item.type === 'pr' ? <GitPullRequest className="w-5 h-5" /> : <CircleDot className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm flex items-center gap-2">
                             {item.title} 
                             <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                               item.status === 'merged' ? 'bg-purple-500/20 text-purple-300' : 
                               item.status === 'open' ? 'bg-emerald-500/20 text-emerald-300' : 
                               'bg-yellow-500/20 text-yellow-300'
                             }`}>{item.status}</span>
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">{item.repo} • {item.date}</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl tracking-tight font-bold text-white mb-2">Find Projects</h1>
                        <p className="text-slate-400 text-sm">Repositories looking for contributors matching your skill set.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "NeuralNet Core", lang: "C++", stars: "4.2k", needs: "Performance tuning" },
                      { name: "Decentralized DB", lang: "Rust", stars: "8.9k", needs: "Good first issues" },
                      { name: "React Components", lang: "TypeScript", stars: "1.2k", needs: "Accessibility" },
                      { name: "Data Pipeline", lang: "Python", stars: "3.4k", needs: "Testing" }
                    ].map((proj, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-bold">{proj.name}</h3>
                          <span className="flex items-center gap-1 text-xs text-slate-400"><Star className="w-3 h-3" /> {proj.stars}</span>
                        </div>
                        <div className="flex gap-2">
                           <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">{proj.lang}</span>
                           <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{proj.needs}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Looking for active maintainers to help scale open-source infrastructure.</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'mentorship' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl tracking-tight font-bold text-white mb-2">Mentorship Program</h1>
                        <p className="text-slate-400 text-sm">Connect with experienced developers to accelerate your learning.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {MOCK_PROFILES.filter(p => p.role === "Mentor").map((profile, i) => (
                        <ProfileCard key={i} profile={profile} />
                     ))}
                     <div className="glass-bento rounded-[2rem] border border-white/5 border-dashed flex flex-col items-center justify-center p-8 text-center bg-white/[0.01] hover:bg-white/[0.03] transition-colors min-h-[300px]">
                        <BookOpen className="w-8 h-8 text-slate-400 mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">Become a Mentor</h3>
                        <p className="text-slate-400 text-sm max-w-[200px] mb-4">Share your knowledge and help guide the next generation.</p>
                        <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Apply Now</button>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'identity' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                   <div className="flex items-end justify-between mb-8">
                      <div>
                          <h1 className="text-3xl tracking-tight font-bold text-white mb-2">Create your KSoC Member ID</h1>
                          <p className="text-slate-400 text-sm">Generate your sharable constellation identity badge.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
                       {/* Form */}
                       <div className="lg:col-span-5 space-y-4 glass-bento p-6 rounded-3xl border border-white/5">
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Display Name</label>
                             <input type="text" value={idData.name} onChange={e => setIdData({...idData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Username</label>
                             <input type="text" value={idData.username} onChange={e => setIdData({...idData, username: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Role</label>
                             <input type="text" value={idData.role} onChange={e => setIdData({...idData, role: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Bio</label>
                             <textarea rows={2} value={idData.bio} onChange={e => setIdData({...idData, bio: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-none" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Top Skills (comma separated)</label>
                             <input type="text" value={idData.skills} onChange={e => setIdData({...idData, skills: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-500/50" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Theme Color</label>
                             <div className="flex gap-2">
                               {['from-cyan-400 to-blue-500', 'from-purple-500 to-indigo-500', 'from-emerald-400 to-cyan-500', 'from-orange-400 to-red-500'].map(theme => (
                                 <button key={theme} onClick={() => setIdData({...idData, theme})} className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme} ${idData.theme === theme ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`} />
                               ))}
                             </div>
                          </div>
                       </div>

                       {/* Preview Card */}
                       <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[400px] p-8 glass-bento rounded-3xl border border-white/5 relative overflow-visible">
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-br ${idData.theme} opacity-[0.12] blur-[100px] rounded-full pointer-events-none`} />
                          
                          <div id="id-card-element" className="w-full max-w-[420px] aspect-[1.586/1] rounded-3xl p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-white/10 relative group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                            <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-2xl" />
                            <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}}></div>
                            
                            <div className="h-full w-full rounded-3xl p-7 flex flex-col relative z-10 overflow-hidden">
                               <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${idData.theme} opacity-[0.15] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none`} />
                               
                               {/* Card Header */}
                               <div className="flex justify-between items-start w-full relative z-10">
                                 <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-4">
                                      <Network className="w-4 h-4 text-white/50" />
                                      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">KSoC Member</span>
                                    </div>
                                    <h2 className="text-2xl font-semibold tracking-tight text-white leading-none mb-1.5">{idData.name || 'Your Name'}</h2>
                                    <p className="text-xs font-mono text-slate-400">{idData.username || '@username'}</p>
                                 </div>
                                 
                                 <div className="relative group/qr cursor-pointer transition-transform duration-300 hover:scale-105">
                                    <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover/qr:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                                    <div className="p-2 bg-white/95 rounded-xl shadow-lg relative border border-white/10 ring-1 ring-black/5">
                                      <QRCodeSVG value={`https://kaizenstat.app/u/${idData.username.replace('@', '') || 'demo'}`} size={60} level="M" includeMargin={false} />
                                    </div>
                                    <div className="absolute -bottom-6 w-full text-center opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300 text-[9px] text-zinc-400 font-mono tracking-widest uppercase">Scan</div>
                                 </div>
                               </div>

                               <div className="mt-auto relative z-10 w-full">
                                 {/* Card Body - Bio */}
                                 <div className="text-sm font-light text-slate-300 line-clamp-2 mb-4 max-w-[85%]">
                                   {idData.bio || 'Add a short bio describing your expertise...'}
                                 </div>

                                 {/* Card Footer */}
                                 <div className="flex justify-between items-end w-full">
                                   <div className="flex flex-wrap gap-2 max-w-[70%]">
                                      {(idData.skills ? idData.skills.split(',') : []).map((s, i) => (
                                        <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-medium text-slate-300 uppercase tracking-wider backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors">
                                          {s.trim()}
                                        </span>
                                      ))}
                                   </div>
                                   <div className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${idData.theme} text-[9px] uppercase font-bold tracking-widest text-white shadow-lg shadow-black/20`}>
                                     {idData.role || 'Role'}
                                   </div>
                                 </div>
                               </div>
                            </div>
                          </div>
                          
                          <p className="text-xs text-slate-400 mt-10 text-center flex items-center gap-2">
                             <IdCard className="w-3.5 h-3.5" /> Present this QR code to connect instantly.
                          </p>
                       </div>
                    </div>
                </motion.div>
              )}
           </div>
           
        </div>
      </main>
    </div>
  );
}

