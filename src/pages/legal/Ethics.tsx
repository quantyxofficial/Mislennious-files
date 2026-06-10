import { motion } from 'motion/react';
import { Heart, Scale, Cpu, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/sections/Navbar';
import { Footer } from '../../components/sections/Footer';

export default function Ethics() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
        
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
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter">AI & Data Ethics.</h1>
          </div>
          
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-16">
            Our commitment to ethical computing ensures that every contribution to KaizenStat serves the greater good of human intelligence.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-emerald-400" />
                Foundational Principles
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed space-y-4">
                <p>
                  At KSoC, we believe that AI development must be:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Unbiased:</strong> Ensuring datasets and models are representative and fair.</li>
                  <li><strong>Transparent:</strong> Every optimization and validation step is documented and verifiable.</li>
                  <li><strong>Human-Centric:</strong> AI is a tool to augment, not replace, human creativity and intellect.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Heart className="w-5 h-5 text-emerald-400" />
                Data Integrity
              </h2>
              <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed space-y-4">
                <p>
                  The quality of AI starts with the integrity of the data providers. We commit to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Preventing the use of synthetic data that degrades foundational model quality.</li>
                  <li>Validating real-world participation metrics with rigorous analytical oversight.</li>
                  <li>Encouraging sustainable computing practices to reduce the carbon footprint of model training.</li>
                </ul>
              </div>
            </section>

            <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-3">Our Ethical Pledge</h3>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "We pledge to never weaponize data or build models that intentionally marginalize or deceive. KaizenStat is a platform for progress, built on the pillars of truth and technical honesty."
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
