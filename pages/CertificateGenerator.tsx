import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CertificateDesign } from '../components/certificate/CertificateDesign';


export const CertificateGenerator = () => {
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get('template') || 'default';
    
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'verify' | 'form' | 'preview'>('verify');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<{ name: string; college: string; userImage?: string }>({ name: '', college: '' });
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
        try {
            const res = await fetch('/api/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, templateId }),
            });
            const data = await res.json();

            if (res.ok && data.allowed) {
                if (data.isUsed && data.certificate) {
                    setCertData(data.certificate);
                    setUserData(prev => ({ ...prev, name: data.certificate.name }));
                    setStep('preview');
                } else {
                    if (data.name) {
                        setUserData(prev => ({ ...prev, name: data.name }));
                    }
                    setStep('form');
                }
            } else {
                setError(data.error || 'Verification failed');
            }
        } catch (err) {
            setError('System error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/generate-certificate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name: userData.name,
                    templateId: templateId
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setCertData(data.certificate);
                setStep('preview');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Generation failed.');
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
            pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
            pdf.save(`Certificate-${certData.uniqueId}.pdf`);
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

                        {/* Right: Demo Preview */}
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <div className="text-center mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[9px] font-bold uppercase tracking-widest border border-brand-purple/20">Sample Preview</span>
                            </div>
                            <div className="relative w-[300px] h-[424px] shadow-2xl rounded overflow-hidden border border-stone-200">
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

                            <div>
                                <label className="block text-lux-text text-xs font-bold uppercase tracking-wider mb-2 ml-1 opacity-70">Passport Photo (Optional)</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setUserData(prev => ({ ...prev, userImage: reader.result as string }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full text-sm text-stone-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-black file:text-white hover:file:bg-stone-800 cursor-pointer bg-white border border-stone-200 rounded-lg p-2 transition-colors shadow-sm"
                                    />
                                </div>
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
                            name={userData.name}
                            email={certData.email}
                            uniqueId={certData.uniqueId}
                            userImage={userData.userImage}
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
