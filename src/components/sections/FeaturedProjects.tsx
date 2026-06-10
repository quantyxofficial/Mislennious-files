import { motion } from 'motion/react';
import { Star, GitMerge, BrainCircuit, Database, HardDrive, ShieldCheck, ArrowRight, CircleDot, Search } from 'lucide-react';
import { MouseEvent, useRef } from 'react';

const PROJECTS = [
  {
    title: "Data Documentation & Cleaning",
    description: "Perfect for beginners. Help clean datasets, fix documentation, and write basic data exploration notebooks.",
    icon: <Database className="w-5 h-5 text-slate-400" />,
    stack: ["Jupyter", "Pandas", "Markdown"],
    difficulty: "Beginner",
    stars: "1.2k",
    contributors: 450,
    openIssues: 124,
    goodFirstIssue: true,
    type: "BEGINNER TRACK"
  },
  {
    title: "WebCrawl Sanitization",
    description: "Write heuristics to remove PII and low-quality tokens from a 12TB multi-lingual dataset prior to indexing.",
    icon: <Database className="w-5 h-5 text-slate-400" />,
    stack: ["Spark", "Python", "Regex"],
    difficulty: "Intermediate",
    stars: "3.1k",
    contributors: 128,
    openIssues: 45,
    goodFirstIssue: false,
    type: "DATA CLEANSING"
  },
  {
    title: "Llama-3 Fine-Tuning",
    description: "Memory optimization for QLoRA fine-tuning on 8xH100 clusters. Goal: reduce VRAM requirements by 15%.",
    icon: <BrainCircuit className="w-5 h-5 text-slate-400" />,
    stack: ["PyTorch", "CUDA", "Transformers"],
    difficulty: "Advanced",
    stars: "14.2k",
    contributors: 342,
    openIssues: 12,
    goodFirstIssue: false,
    type: "MODEL OPTIMIZATION"
  }
];

function RepoCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="relative w-full h-full bg-black border border-white/10 p-6 flex flex-col items-start gap-5 hover:border-white/30 transition-colors duration-300">
      <div className="w-full flex justify-between items-start">
         <div className="flex items-center gap-3">
           {project.icon}
           <h3 className="text-xl font-medium text-white">{project.title}</h3>
         </div>
         <div className="flex flex-col items-end gap-2">
            <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border rounded-sm ${
               project.difficulty === 'Beginner' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
               project.difficulty === 'Intermediate' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
               'text-purple-400 border-purple-400/20 bg-purple-400/5'
             }`}>
               {project.difficulty}
             </span>
             {project.goodFirstIssue && (
               <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border rounded-sm text-purple-400 border-purple-400/20 bg-purple-400/5">
                 Good First Issue
               </span>
             )}
         </div>
      </div>
      
      <div className="flex-1">
        <p className="text-slate-400 font-light leading-relaxed text-sm">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 w-full">
        {project.stack.map(s => (
          <span key={s} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-slate-300">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 w-full flex items-center justify-between border-t border-white/10">
        <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
          <span className="flex items-center gap-1.5"><CircleDot className="w-3.5 h-3.5 text-emerald-400" /> {project.openIssues} Issues</span>
          <span className="flex items-center gap-1.5"><GitMerge className="w-3.5 h-3.5" /> {project.contributors} Contributors</span>
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {project.stars}</span>
        </div>
        <button className="text-xs font-medium text-white flex items-center gap-1.5 hover:text-slate-300 transition-colors">
          View Issues <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section className="py-24 relative z-20 bg-black/60 border-t border-white/5" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-16 flex flex-col items-start gap-4 border-b border-white/10 pb-8">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white">
            Live Repositories
          </h2>
          <p className="text-slate-400 font-light text-lg max-w-2xl">
            Real open-source projects. Find an issue, fork the repository, and submit your PR. Mentors review your code and merge successful updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div key={i} className="h-[280px]">
              <RepoCard project={project} />
            </div>
          ))}
          <div 
            className="h-[280px] bg-white/[0.02] border border-white/5 border-dashed flex flex-col items-center justify-center p-6 text-center hover:bg-white/[0.04] transition-colors cursor-pointer"
            onClick={() => window.open('https://github.com/kaizenstat', '_blank')}
          >
             <Search className="w-8 h-8 text-slate-500 mb-4" />
             <h3 className="text-xl font-medium text-white mb-2">Explore 50+ Real Projects</h3>
             <p className="text-sm font-light text-slate-400 mb-4">View the full list of integrated open-source repositories and verified issues.</p>
             <span className="text-xs font-mono text-cyan-400">Query Full Projects &rarr;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
