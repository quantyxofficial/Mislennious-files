import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/sections/Navbar';
import { Footer } from '../../components/sections/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
        
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-mono mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO MISSION
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter">Privacy Policy.</h1>
          </div>
          
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-16">
            At KaizenStat, we prioritize the protection of your intellectual contributions and personal data. This policy outlines how we handle information within our Open-Source ecosystem.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-cyan-400" />
                Data Collection
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed space-y-4">
                <p>
                  We only collect data that is essential for your participation in the Summer of Computation (KSoC). This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Public GitHub profile information and repository contributions.</li>
                  <li>LinkedIn profile links for career verification and networking.</li>
                  <li>Basic contact information provided during registration for project coordination.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-5 h-5 text-cyan-400" />
                How We Use Your Data
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed space-y-4">
                <p>
                  Your information is used exclusively to facilitate the program:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Validation:</strong> To verify your technical contributions and award certifications.</li>
                  <li><strong>Visibility:</strong> To showcase your skills to our network of premier institutional and corporate partners.</li>
                  <li><strong>Evolution:</strong> To improve the KSoC platform experience based on user engagement metrics.</li>
                </ul>
              </div>
            </section>

            <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-3">Our Transparency Promise</h3>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "KaizenStat will never sell your personal data. We are a student-led initiative built on trust. Your contributions are yours, and your data remains your property."
              </p>
            </section>
          </div>

          <div className="mt-24 pt-8 border-t border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Last Updated: May 2026 • Version 1.0.0
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
