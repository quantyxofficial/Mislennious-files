import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CertificateDesign } from '../components/certificate/CertificateDesign';
import { createClient } from '../lib/supabase/client';


export const CertificateGenerator = () => {
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template') || 'default';
    
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'verify' | 'form' | 'preview'>('verify');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({ name: '', college: '' });
    const [certData, setCertData] = useState<any>(null);
    const certRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        console.log('Starting verification for:', email);
        
        try {
            const supabase = createClient();
            
            // 1. Check if the email is in allowed_emails
            const { data: allowed, error: allowedError } = await supabase
                .from('allowed_emails')
                .select('*')
                .eq('email', email.trim())
                .maybeSingle();

            if (allowedError) {
                console.error('Database error during allowed check:', allowedError);
                throw new Error(allowedError.message);
            }

            if (!allowed) {
                console.warn('Email not found in allowed_emails');
                setError('Email not authorized');
                setIsLoading(false);
                return;
            }

            console.log('Email authorized:', allowed);

            // 2. Check if already generated for this template
            const { data: existing, error: certError } = await supabase
                .from('certificates')
                .select('*')
                .eq('email', email.trim())
                .eq('template_id', templateId)
                .maybeSingle();

            if (existing) {
                console.log('Certificate already exists:', existing);
                setCertData(existing);
                setUserData({ name: existing.name, college: '' });
                setStep('preview');
            } else {
                console.log('Proceeding to generation form');
                if (allowed.name) setUserData(prev => ({ ...prev, name: allowed.name }));
                setStep('form');
            }
        } catch (err: any) {
            console.error('CRITICAL VERIFICATION ERROR:', err);
            setError(`Connection Error: ${err.message || 'Please check your internet'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        console.log('Generating certificate for:', email);
        
        try {
            const supabase = createClient();
            
            // 1. Get allowed info again to be sure
            const { data: allowed, error: allowedError } = await supabase
                .from('allowed_emails')
                .select('*')
                .eq('email', email.trim())
                .maybeSingle();

            if (allowedError || !allowed) {
                console.error('Final check failed:', allowedError);
                setError('Authorization lost. Please refresh.');
                setIsLoading(false);
                return;
            }

            const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();

            // 2. Create Certificate
            const { data: cert, error: certError } = await supabase
                .from('certificates')
                .insert({
                    unique_id: uniqueId,
                    email: email.trim(),
                    name: userData.name,
                    position: allowed.position,
                    category: allowed.category,
                    template_id: templateId,
                })
                .select()
                .single();

            if (certError) {
                console.error('Insert error:', certError);
                setError(`Failed to create certificate: ${certError.message}`);
                setIsLoading(false);
                return;
            }

            // 3. Mark as used
            await supabase
                .from('allowed_emails')
                .update({ is_used: true })
                .eq('id', allowed.id);

            console.log('Generation successful:', cert);
            setCertData(cert);
            setStep('preview');
        } catch (err: any) {
            console.error('CRITICAL GENERATION ERROR:', err);
            setError(`Generation failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadPDF = async () => {
        if (!certRef.current) return;
        try {
            const dataUrl = await toPng(certRef.current, { quality: 1.0 });
            const isLandscape = templateId === 'tech-blog-completion';
            const width = isLandscape ? 848 : 600;
            const height = isLandscape ? 600 : 848;

            const pdf = new jsPDF({
                orientation: isLandscape ? 'landscape' : 'portrait',
                unit: 'px',
                format: [width, height]
            });
            console.log('PDF Download triggered for:', certData.name, 'with ID:', certData.unique_id);
            pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
            pdf.save(`Certificate-${certData.name.replace(/\s+/g, '_')}-${certData.unique_id}.pdf`);
        } catch (err) {
            console.error('Download failed', err);
        }
    };

    const isCompletion = templateId === 'tech-blog-completion';

    return (
        <div className="w-full pt-24 pb-8 px-4">
            {/* Main Container */}
            <div className="max-w-7xl w-full mx-auto">
                {step === 'verify' && (
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left: Verification Form */}
                        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-xl">
                            <h1 className="text-3xl font-serif font-bold text-lux-text mb-3 tracking-tight">
                                {isCompletion ? 'Download Completion Certificate' : 'Get Your Joining Certificate'}
                            </h1>
                            <p className="text-lux-muted mb-6 text-sm">Enter your authorized email to proceed securely.</p>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-lg mb-6 text-sm font-medium"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleVerify} className="space-y-6">
                                <div>
                                    <label className="block text-lux-text text-xs font-bold uppercase tracking-wider mb-2 ml-1 opacity-70">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3.5 text-lux-text placeholder-stone-400 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all shadow-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-brand-black text-white hover:bg-stone-800 font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify Email'
                                    )}
                                </button>
                            </form>

                            <p className="mt-8 text-xs text-lux-muted leading-relaxed text-center">
                                Made a mistake with your name or photo? <br />
                                Email us at <a href="mailto:founders@kaizenstat.com" className="text-brand-purple hover:underline font-bold">founders@kaizenstat.com</a> for regeneration.
                            </p>
                        </div>

                        <div className="hidden md:flex flex-col items-center justify-center">
                            <div className="text-center mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[9px] font-bold uppercase tracking-widest border border-brand-purple/20">Sample Preview</span>
                            </div>
                            <div className={isCompletion ? "relative w-[424px] h-[300px] shadow-2xl rounded overflow-hidden border border-stone-200" : "relative w-[300px] h-[424px] shadow-2xl rounded overflow-hidden border border-stone-200"}>
                                <div className="absolute top-0 left-0 bg-white origin-top-left transform scale-[0.5]">
                                    <CertificateDesign
                                        name="Your Name"
                                        email="your.email@example.com"
                                        uniqueId="DEMO123"
                                        templateId={templateId}
                                        verificationUrl="https://kaizenstat.com"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'form' && (
                    <div className="max-w-md mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-xl">
                        <h1 className="text-3xl font-serif font-bold text-lux-text mb-8 text-center tracking-tight">Enter Details</h1>
                        <form onSubmit={handleGenerate} className="space-y-6">
                            <div>
                                <label className="block text-lux-text text-xs font-bold uppercase tracking-wider mb-2 ml-1 opacity-70">Full Name (as on certificate)</label>
                                <input
                                    type="text"
                                    required
                                    value={userData.name}
                                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                                    className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3.5 text-lux-text placeholder-stone-400 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all shadow-sm"
                                />
                            </div>

                            <button type="submit" className="w-full bg-brand-black text-white font-bold py-3.5 rounded-lg hover:bg-stone-800 transition-all transform hover:scale-[1.02] shadow-lg mt-4">
                                Generate Certificate
                            </button>
                        </form>
                    </div>
                )}

                {step === 'preview' && certData && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-serif font-bold text-lux-text mb-8">Certificate Generated!</h1>

                        <CertificateDesign
                            ref={certRef}
                            name={certData.name}
                            email={certData.email}
                            uniqueId={certData.unique_id}
                            category={certData.category}
                            position={certData.position}
                            templateId={templateId}
                        />

                        <div className="flex gap-4 mt-8">
                            <button onClick={downloadPDF} className="bg-brand-black hover:bg-stone-800 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg">
                                Download PDF
                            </button>
                            <button onClick={() => {
                                setStep('verify');
                                setEmail('');
                                setUserData({ name: '', college: '' });
                                setCertData(null);
                                setError('');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }} className="bg-white hover:bg-stone-50 text-lux-text border border-stone-200 px-8 py-3 rounded-lg shadow-sm transition-colors">
                                Create Another
                            </button>
                        </div>

                        <p className="mt-8 text-xs text-lux-muted text-center max-w-md mx-auto leading-relaxed">
                            Made a mistake with your name or photo? <br />
                            Email us at <a href="mailto:founders@kaizenstat.com" className="text-brand-purple hover:underline font-bold">founders@kaizenstat.com</a> for regeneration.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
