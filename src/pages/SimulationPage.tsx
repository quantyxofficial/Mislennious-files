import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Lock, 
  Terminal, 
  ShieldAlert, 
  Cpu, 
  Code2, 
  Award,
  ChevronRight,
  ArrowRight,
  Loader2,
  Download,
  AlertTriangle,
  Play
} from 'lucide-react';
import { internshipProgram, Task } from '../data/internshipData';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';

type TaskStatus = 'locked' | 'unlocked' | 'evaluating' | 'completed';

export function SimulationPage() {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = Overview, 0-4 = Tasks, 5 = Certificate
  const [userName, setUserName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>(
    internshipProgram.tasks.map((_, i) => i === 0 ? 'unlocked' : 'locked')
  );
  const [feedback, setFeedback] = useState<string[]>(Array(5).fill(''));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleSubmit = (taskIndex: number) => {
    if (!currentAnswer.trim()) return;
    
    // Simulate Evaluation
    const newStatuses = [...taskStatuses];
    newStatuses[taskIndex] = 'evaluating';
    setTaskStatuses(newStatuses);

    setTimeout(() => {
      const statusesAfterEval = [...taskStatuses];
      statusesAfterEval[taskIndex] = 'completed';
      
      // Unlock next task if exists
      if (taskIndex + 1 < internshipProgram.tasks.length) {
        statusesAfterEval[taskIndex + 1] = 'unlocked';
      }
      setTaskStatuses(statusesAfterEval);
      
      const newFeedback = [...feedback];
      newFeedback[taskIndex] = "Evaluation complete. Logic formally verified against QR test cases. Systems nominal.";
      setFeedback(newFeedback);
      
      setCurrentAnswer('');
      
    }, 2000);
  };

  const certificateRef = useRef<HTMLDivElement>(null);

  const printCertificate = () => {
    window.print();
  };

  const getIconForIndex = (idx: number) => {
    switch (idx) {
      case 0: return <Code2 className="w-4 h-4" />;
      case 1: return <ShieldAlert className="w-4 h-4" />;
      case 2: return <Cpu className="w-4 h-4" />;
      case 3: return <Terminal className="w-4 h-4" />;
      case 4: return <Award className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="pt-24 pb-20 relative z-10 flex border-t border-white/[0.05]">
        
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-white/10 hidden lg:flex flex-col h-[calc(100vh-6rem)] sticky top-24">
          <div className="p-8 border-b border-white/10">
            <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-2 font-bold">Project Status</div>
            <h2 className="text-xl font-medium tracking-tight">Data Science Pipeline</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
            <button 
              onClick={() => setCurrentStep(-1)}
              className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all ${currentStep === -1 ? 'bg-white/10 text-white' : 'hover:bg-white/[0.03] text-slate-400'}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Play className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1">Briefing</div>
                <div className="text-xs opacity-70">Program Overview</div>
              </div>
            </button>

            {internshipProgram.tasks.map((task, idx) => (
              <button 
                key={task.id}
                disabled={taskStatuses[idx] === 'locked'}
                onClick={() => setCurrentStep(idx)}
                className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all ${
                  currentStep === idx 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : taskStatuses[idx] === 'locked'
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-white/[0.03] text-slate-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  taskStatuses[idx] === 'completed' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' :
                  currentStep === idx ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' :
                  'border-white/10 bg-white/5'
                }`}>
                  {taskStatuses[idx] === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                   taskStatuses[idx] === 'locked' ? <Lock className="w-4 h-4" /> : getIconForIndex(idx)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Module 0{idx + 1}</div>
                  <div className="text-xs font-medium truncate">{task.title.split(': ')[1]}</div>
                </div>
              </button>
            ))}

            <button 
              disabled={taskStatuses[4] !== 'completed'}
              onClick={() => setCurrentStep(5)}
              className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all mt-4 border ${currentStep === 5 ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : taskStatuses[4] === 'completed' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-transparent opacity-30 cursor-not-allowed'}`}
            >
              <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-1">Certification</div>
                <div className="text-xs opacity-70">Claim your credential</div>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 max-w-4xl mx-auto px-6 lg:px-12 py-10 w-full min-h-[calc(100vh-6rem)]">
          <AnimatePresence mode="wait">
            
            {/* Overview Step */}
            {currentStep === -1 && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-mono tracking-widest text-cyan-400 mb-6 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Data Science Challenge
                  </div>
                  <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-tight text-white mb-6">
                    {internshipProgram.title}
                  </h1>
                  <p className="text-lg text-slate-400 font-light leading-relaxed">
                    {internshipProgram.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-6">Program Objectives</h3>
                    <ul className="space-y-4">
                      {internshipProgram.objectives.map((obj, i) => (
                        <li key={i} className="flex gap-4 text-sm text-slate-300 font-light">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] flex items-center gap-4">
                      <Cpu className="w-8 h-8 text-cyan-500" />
                      <div>
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Industry</div>
                        <div className="font-medium">{internshipProgram.industry}</div>
                      </div>
                    </div>
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] flex items-center gap-4">
                      <Terminal className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Modules</div>
                        <div className="font-medium">5 Technical Challenges</div>
                      </div>
                    </div>
                  </div>
                </div>

                {!nameSubmitted ? (
                  <div className="p-8 border border-white/10 rounded-3xl bg-black relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-20 pointer-events-none" />
                    <div className="relative z-10">
                      <h3 className="text-xl font-medium mb-4">Initialize Identity</h3>
                      <p className="text-sm text-slate-400 mb-6">Enter your full name to generate your verified QR Certificate upon completion. (Zero Cost)</p>
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          placeholder="Your Full Name" 
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="flex-1 bg-transparent border-b border-white/20 py-3 px-2 text-lg focus:outline-none focus:border-white transition-colors"
                        />
                        <button 
                          onClick={() => { if(userName.trim()) setNameSubmitted(true); }}
                          disabled={!userName.trim()}
                          className="px-8 py-3 bg-white text-black rounded-full font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                          Begin <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setCurrentStep(0)}
                    className="w-full relative group h-20 bg-white text-black rounded-2xl overflow-hidden flex items-center justify-center font-medium tracking-wide text-lg border border-white/20"
                  >
                     <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                     <span className="relative z-10 flex items-center gap-3">Initialize Challenge <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                  </button>
                )}
              </motion.div>
            )}

            {/* Task View */}
            {currentStep >= 0 && currentStep <= 4 && (
              <motion.div 
                key={`task-${currentStep}`}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <header className="border-b border-white/10 pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="px-2 py-1 rounded border border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-white/5">
                      Module 0{currentStep + 1}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                      <AlertTriangle className="w-3 h-3" /> {internshipProgram.tasks[currentStep].difficulty}
                    </div>
                    <div className="text-xs text-slate-400 font-mono tracking-widest">{internshipProgram.tasks[currentStep].timeEstimate}</div>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6">
                    {internshipProgram.tasks[currentStep].title}
                  </h1>
                  <p className="text-lg text-slate-300 font-light leading-relaxed">
                    {internshipProgram.tasks[currentStep].scenario}
                  </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <section>
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Instructions
                      </h3>
                      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                        {internshipProgram.tasks[currentStep].instructions.map((inst, i) => (
                          <p key={i} className="text-sm font-light text-slate-300">{inst}</p>
                        ))}
                      </div>
                    </section>

                    <section>
                       <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4">Execution Environment</h3>
                       {taskStatuses[currentStep] === 'completed' ? (
                         <div className="p-8 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />
                            <div className="flex items-center gap-4 mb-4 text-emerald-400">
                              <CheckCircle2 className="w-6 h-6" />
                              <span className="font-bold tracking-wide">Validation Successful</span>
                            </div>
                            <p className="text-sm text-emerald-200/70 font-light">{feedback[currentStep]}</p>
                            
                            {/* Optional: Show reference answer after completion */}
                            <div className="mt-8 pt-6 border-t border-emerald-500/10">
                              <p className="text-xs font-mono text-emerald-500/50 uppercase tracking-widest mb-4">Reference Architecture</p>
                              <div className="text-xs font-mono text-slate-300 bg-black/50 p-4 rounded-xl overflow-x-auto border border-white/5 whitespace-pre-wrap">
                                {internshipProgram.tasks[currentStep].sampleAnswer}
                              </div>
                            </div>

                            <button 
                              onClick={() => setCurrentStep(currentStep === 4 ? 5 : currentStep + 1)}
                              className="mt-8 px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl flex items-center gap-2 hover:bg-emerald-400 transition-colors"
                            >
                              {currentStep === 4 ? 'Proceed to Certification' : 'Initialize Next Module'} <ArrowRight className="w-4 h-4" />
                            </button>
                         </div>
                       ) : (
                         <div className="space-y-4">
                           <textarea 
                             value={currentAnswer}
                             onChange={(e) => setCurrentAnswer(e.target.value)}
                             disabled={taskStatuses[currentStep] === 'evaluating'}
                             placeholder={`Enter your ${internshipProgram.tasks[currentStep].deliverable.toLowerCase()} here...`}
                             className="w-full h-64 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-sm font-mono text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none custom-scrollbar"
                           />
                           <div className="flex justify-between items-center">
                             <p className="text-xs text-slate-400 font-mono tracking-tight">Format: Code or Markdown</p>
                             <button
                               onClick={() => handleSubmit(currentStep)}
                               disabled={!currentAnswer.trim() || taskStatuses[currentStep] === 'evaluating'}
                               className="px-8 py-3 bg-white text-black rounded-xl font-medium tracking-wide flex items-center gap-2 disabled:opacity-50 hover:scale-105 transition-all"
                             >
                               {taskStatuses[currentStep] === 'evaluating' ? (
                                 <><Loader2 className="w-4 h-4 animate-spin" /> Verifying Node...</>
                               ) : (
                                 <><Play className="w-4 h-4" /> Run Compilation</>
                               )}
                             </button>
                           </div>
                         </div>
                       )}
                    </section>
                  </div>

                  <aside className="space-y-6">
                     <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
                       <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">Required Architectures</h4>
                       <div className="flex flex-wrap gap-2">
                         {internshipProgram.tasks[currentStep].skills.map((skill, i) => (
                           <span key={i} className="px-2 py-1 text-xs border border-white/10 rounded-md bg-white/5 text-slate-300">
                             {skill}
                           </span>
                         ))}
                       </div>
                     </div>

                     <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                       <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Code2 className="w-3 h-3" /> System Hints
                       </h4>
                       <ul className="space-y-3 list-disc pl-4 text-xs font-light text-slate-300">
                         {internshipProgram.tasks[currentStep].hints.map((hint, i) => (
                           <li key={i}>{hint}</li>
                         ))}
                       </ul>
                     </div>
                  </aside>
                </div>
              </motion.div>
            )}

            {/* Certificate Step */}
            {currentStep === 5 && (
              <motion.div 
                key="certificate"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="space-y-8 flex flex-col items-center"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Challenge Concluded</h1>
                  <p className="text-slate-400 font-light max-w-lg mx-auto">
                    You have successfully navigated the QR Data Science Project. Your verified credentials have been minted at zero cost.
                  </p>
                </div>

                {/* Printable Certificate Area */}
                <div 
                  ref={certificateRef}
                  className="w-full max-w-4xl bg-white text-black p-12 md:p-20 relative overflow-hidden print-exact shadow-2xl rounded-sm"
                  style={{ minHeight: '600px' }}
                >
                  {/* Certificate Graphics */}
                  <div className="absolute top-0 left-0 w-full h-8 bg-black" />
                  <div className="absolute top-8 left-0 w-8 h-[calc(100%-16px)] bg-neutral-100" />
                  <div className="absolute top-8 right-8 w-32 h-32 border-4 border-black/10 rounded-full flex items-center justify-center">
                    <div className="w-28 h-28 border-2 border-dashed border-black/20 rounded-full flex items-center justify-center">
                      <span className="font-mono text-xs font-bold text-black/30 tracking-widest rotate-45 select-none">VALIDATED</span>
                    </div>
                  </div>

                  <div className="relative z-10 pl-12">
                    <div className="flex items-center gap-3 mb-16">
                      <Cpu className="w-8 h-8 text-cyan-500" />
                      <span className="font-bold tracking-tighter text-xl">QR Data Collective</span>
                    </div>

                    <p className="text-sm font-mono uppercase tracking-[0.2em] text-slate-400 mb-4">QR Verified Certificate of Completion</p>
                    <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4 capitalize">
                      {userName || "Distinguished Data Scientist"}
                    </h2>
                    
                    <p className="text-lg text-neutral-600 mb-12 max-w-xl leading-relaxed">
                      Has successfully completed the highly rigorous <b>{internshipProgram.title}</b>. This individual has demonstrated exceptional proficiency in data engineering, predictive modeling, and analytics communication.
                    </p>

                    <div className="flex gap-16">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-2 w-48">Date Issued</div>
                        <div className="font-medium text-sm">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2 border-b border-neutral-200 pb-2 w-48">Issuing Authority</div>
                        <div className="font-medium text-sm">QR Verification Node</div>
                      </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-neutral-200">
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Competencies Verified</p>
                      <div className="flex flex-wrap gap-2 max-w-2xl">
                        {Array.from(new Set(internshipProgram.tasks.flatMap(t => t.skills))).map((skill, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200 text-neutral-600 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 print:hidden pt-8">
                  <button 
                    onClick={printCertificate}
                    className="px-8 py-4 bg-white text-black font-medium rounded-full flex items-center gap-3 hover:scale-105 transition-all"
                  >
                    <Download className="w-5 h-5" /> Download / Print Record
                  </button>
                  <button 
                    onClick={() => setCurrentStep(-1)}
                    className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all"
                  >
                    Return to Overview
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>
      </main>

      <Footer />
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-exact, .print-exact * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-exact {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 2cm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
