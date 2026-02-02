import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { CertificateDesign } from '../components/certificate/CertificateDesign';

// ... 


export const CertificateGenerator = () => {
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
                body: JSON.stringify({ email }),
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
                    templateId: 'default'
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
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [certRef.current.clientWidth, certRef.current.clientHeight]
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, certRef.current.clientWidth, certRef.current.clientHeight);
            pdf.save(`Certificate-${certData.uniqueId}.pdf`);
        } catch (err) {
            console.error('Download failed', err);
        }
    };

    return (
        <div className="w-full pt-24 pb-8 px-4">
            {/* Main Container */}
            <div className="max-w-7xl w-full mx-auto">
                {step === 'verify' && (
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left: Verification Form */}
                        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-xl">
                            <h1 className="text-3xl font-serif font-bold text-lux-text mb-3 tracking-tight">Get Your Certificate</h1>
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
                            {/* Wrapper to constrain layout flow to visual size */}
                            <div className="relative w-[300px] h-[424px] shadow-2xl rounded overflow-hidden border border-stone-200">
                                <div className="absolute top-0 left-0 bg-white origin-top-left transform scale-[0.5]"
                                    style={{
                                        width: '600px',
                                        height: '848px',
                                        backgroundImage: 'url(/certificate-template.png)',
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    {/* Demo Content */}
                                    <div className="absolute top-[28%] left-[12%] text-left w-[450px]">
                                        <h2 className="text-xl font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible opacity-40">
                                            Your Name
                                        </h2>
                                    </div>
                                    <div className="absolute top-[30.5%] left-[12%] text-left w-[450px]">
                                        <p className="text-sm font-serif text-black whitespace-nowrap overflow-visible opacity-40">
                                            your.email@example.com
                                        </p>
                                    </div>
                                    <div className="absolute top-[41.2%] left-[13%] text-left w-[400px]">
                                        <h2 className="text-sm font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible opacity-40">
                                            Your Name,
                                        </h2>
                                    </div>
                                    {/* Demo User Image Placeholder */}
                                    <div className="absolute top-[28%] right-[12%] w-[110px] h-[130px] rounded-sm border-2 border-dashed border-gray-300 z-10 bg-gray-50 flex items-center justify-center opacity-60">
                                        <div className="text-center">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-[7px] text-gray-400 font-mono uppercase tracking-wide">Photo</span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-[55px] right-[40px] opacity-40 p-1 bg-white/50 rounded-lg">
                                        <QRCode
                                            value="https://kaizenstat.com"
                                            size={40}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        />
                                    </div>
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

                        {/* Certificate Canvas - Portrait Mode (A4 approx ratio) */}
                        <div
                            className="relative mb-8 overflow-hidden bg-white shadow-2xl bg-cover bg-center bg-no-repeat"
                            ref={certRef}
                            style={{
                                width: '600px',
                                height: '848px',
                                backgroundImage: 'url(/certificate-template.png)'
                            }}
                        >

                            {/* Overlay Content */}
                            {/* Overlay Content */}
                            {/* To: Name */}
                            <div className="absolute top-[28%] left-[12%] text-left w-[450px]">
                                <h2 className="text-xl font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                    {userData.name}
                                </h2>
                            </div>

                            {/* To: Email */}
                            <div className="absolute top-[30.5%] left-[12%] text-left w-[450px]">
                                <p className="text-sm font-serif text-black whitespace-nowrap overflow-visible">
                                    {certData.email}
                                </p>
                            </div>

                            {/* Dear [Name], */}
                            <div className="absolute top-[41.2%] left-[13%] text-left w-[400px]">
                                <h2 className="text-sm font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                    {userData.name},
                                </h2>
                            </div>

                            {/* User Uploaded Image */}
                            {userData.userImage && (
                                <div className="absolute top-[28%] right-[12%] w-[110px] h-[130px] rounded-sm overflow-hidden border border-gray-300 shadow-sm z-10 bg-white">
                                    <img src={userData.userImage} alt="User" className="w-full h-full object-cover" />
                                </div>
                            )}

                            {/* QR Code - Moved slightly to avoid overlapping signatures */}
                            <div className="absolute bottom-[55px] right-[40px] opacity-90 p-1 bg-white/50 rounded-lg">
                                <QRCode
                                    value={`${window.location.origin}/verify/${certData.uniqueId}`}
                                    size={40}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                />
                            </div>

                            <div className="absolute bottom-[40px] right-[40px] text-[8px] text-gray-500 font-mono text-center w-[40px]">
                                ID: {certData.uniqueId}
                            </div>
                        </div>

                        <div className="flex gap-4">
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
