import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/sections/Navbar';
import { Footer } from '../../components/sections/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />
        
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
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter">Terms of Service.</h1>
          </div>
          
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-16">
            By participating in the KaizenStat Summer of Computation (KSoC), you agree to uphold our community standards and technical excellence.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                Participation Eligibility
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed space-y-4">
                <p>
                  KSoC is open to students, independent developers, and researchers globally. To participate, you must:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain an active GitHub account with a history of genuine contributions.</li>
                  <li>Commit to the full duration of the project you are assigned to.</li>
                  <li>Provide authentic identification and academic credentials if requested for verification.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-purple-400" />
                Code of Conduct
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed space-y-4">
                <p>
                  Technical excellence must be paired with mutual respect. We maintain a zero-tolerance policy for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Plagiarism or misattribution of open-source work.</li>
                  <li>Harassment or discrimination within community channels.</li>
                  <li>Misrepresentation of project status or engagement metrics.</li>
                </ul>
              </div>
            </section>

            <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-3">Open Source & Intellectual Property</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All work submitted during KSoC is and shall remain <strong>Open-Source</strong>. Contributors retain original authorship, but grant KaizenStat the right to showcase, validate, and index the work for the benefit of the global developer community.
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
