import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';

const SERVICES = [
  "Web Development",
  "Data / Analytics",
  "AI / ML",
  "Marketing",
  "Design"
];

const BUDGETS = [
  "Under ₹25k",
  "₹25k – ₹50k",
  "₹50k – ₹1L",
  "₹1L+"
];

export const ProjectInquiry: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Frontend-only simulation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formState.service || !formState.budget) return;
    
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-lux-text text-white py-24 md:py-32 px-6 lg:px-24 rounded-t-[2.5rem] md:rounded-t-[4rem] relative z-20 -mb-12 shadow-2xl">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Context & Copy */}
            <div className="space-y-8 lg:sticky lg:top-32">
                <h2 className="font-serif text-5xl md:text-7xl leading-[0.95]">
                    Let’s Build <br/>
                    <span className="italic text-stone-400">The Future.</span>
                </h2>
                
                <div className="h-px w-24 bg-white/20 my-8"></div>

                <p className="text-lg md:text-xl text-stone-300 font-light leading-relaxed max-w-md">
                    Ready to engineer growth? Tell us about your vision. Our strategists are ready to architect your next breakthrough.
                </p>

                <div className="flex flex-col gap-4 text-sm text-stone-400 pt-8">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="uppercase tracking-widest">Accepting New Projects</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-stone-600"></div>
                         <span className="uppercase tracking-widest">Response time: &lt; 24 Hours</span>
                    </div>
                </div>
            </div>

            {/* Right Column: The Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center min-h-[500px]"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-8 text-green-400">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="font-serif text-4xl mb-4">Received.</h3>
                            <p className="text-stone-400 mb-8 max-w-xs mx-auto leading-relaxed">
                                Your briefing is on its way to our engineering team. We'll be in touch shortly.
                            </p>
                            <button 
                                onClick={() => { setIsSuccess(false); setFormState({ name: '', email: '', service: '', budget: '', details: ''}) }}
                                className="text-xs font-bold uppercase tracking-widest text-white hover:text-stone-300 transition-colors border-b border-white/30 pb-1"
                            >
                                Start New Inquiry
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit} 
                            className="space-y-8"
                        >
                            {/* Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 pl-1">Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formState.name}
                                        onChange={e => setFormState({...formState, name: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all font-sans"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 pl-1">Email</label>
                                    <input 
                                        required
                                        type="email" 
                                        value={formState.email}
                                        onChange={e => setFormState({...formState, email: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all font-sans"
                                        placeholder="jane@company.com"
                                    />
                                </div>
                            </div>

                            {/* Service Selection */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 pl-1">Service Interest</label>
                                <div className="flex flex-wrap gap-2">
                                    {SERVICES.map(service => (
                                        <button
                                            type="button"
                                            key={service}
                                            onClick={() => setFormState({...formState, service})}
                                            className={`px-4 py-3 rounded-full text-xs md:text-sm font-medium transition-all border ${
                                                formState.service === service 
                                                ? 'bg-white text-lux-text border-white' 
                                                : 'bg-white/5 text-stone-400 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 pl-1">Estimated Budget</label>
                                <div className="relative">
                                    <select 
                                        required
                                        value={formState.budget}
                                        onChange={e => setFormState({...formState, budget: e.target.value})}
                                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all cursor-pointer font-sans"
                                    >
                                        <option value="" disabled className="bg-stone-900 text-stone-500">Select a range</option>
                                        {BUDGETS.map(b => <option key={b} value={b} className="bg-stone-900">{b}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 pl-1">Project Brief</label>
                                <textarea 
                                    rows={4}
                                    value={formState.details}
                                    onChange={e => setFormState({...formState, details: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all resize-none font-sans"
                                    placeholder="Tell us about the problem you are solving..."
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-6">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-lux-text font-bold uppercase tracking-[0.2em] py-5 rounded-full hover:bg-stone-200 transition-all shadow-lg hover:shadow-white/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                                    data-hover
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            Submit Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>

                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
};