import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, XCircle, AlertTriangle, ArrowRight, Search, Download, Award } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { CertificateDesign } from '../../components/agency/certificate/CertificateDesign';

// ── VERIFY TAB ──────────────────────────────────────────────────────────────

const VerifyTab = () => {
    const { uniqueId } = useParams();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'valid' | 'invalid' | 'revoked'>('idle');
    const [certData, setCertData] = useState<any>(null);
    const [inputCode, setInputCode] = useState('');

    useEffect(() => {
        if (uniqueId) verifyCertificate(uniqueId);
    }, [uniqueId]);

    const verifyCertificate = async (id: string) => {
        setLoading(true);
        const supabase = createClient();
        try {
            const { data: cert, error } = await supabase
                .from('certificates').select('*')
                .eq('unique_id', id.toUpperCase()).maybeSingle();
            if (!error && cert) {
                setStatus(cert.revoked ? 'revoked' : 'valid');
                if (!cert.revoked) setCertData(cert);
            } else {
                setStatus('invalid');
            }
        } catch { setStatus('invalid'); }
        finally { setLoading(false); }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputCode.trim()) verifyCertificate(inputCode.trim());
    };

    const reset = () => { setStatus('idle'); setInputCode(''); setCertData(null); };

    return (
        <div className="space-y-4">
            {(status === 'idle' || status === 'invalid') && (
                <div className="glass-bento rounded-2xl p-6 space-y-4">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lux-muted/50" />
                            <input
                                type="text"
                                placeholder="Certificate ID  (e.g. X9Y2Z1)"
                                value={inputCode}
                                onChange={e => setInputCode(e.target.value.toUpperCase())}
                                className="w-full bg-lux-glass border border-lux-glassBorder rounded-xl pl-9 pr-4 py-3 text-sm text-lux-text placeholder-lux-muted/40 focus:border-white/20 focus:outline-none transition-colors font-mono tracking-widest"
                            />
                        </div>
                        <button
                            type="submit" disabled={loading || !inputCode.trim()}
                            className="px-6 py-3 bg-lux-text text-lux-cream text-xs font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-lux-text/90 transition-colors disabled:opacity-40 flex items-center gap-2 whitespace-nowrap"
                        >
                            {loading
                                ? <span className="w-4 h-4 border-2 border-lux-cream/30 border-t-lux-cream rounded-full animate-spin" />
                                : <>Verify <ArrowRight size={12} /></>
                            }
                        </button>
                    </form>

                    {status === 'invalid' && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                            <XCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-400">Certificate Not Found</p>
                                <p className="text-xs text-lux-muted mt-0.5">No record matches <span className="font-mono text-lux-text">{inputCode}</span>. Check for typos.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {loading && status === 'idle' && (
                <div className="glass-bento rounded-2xl p-10 flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-2 border-lux-muted/20 border-t-lux-muted rounded-full animate-spin" />
                    <span className="text-sm text-lux-muted font-mono">Verifying…</span>
                </div>
            )}

            {status === 'valid' && certData && (
                <div className="glass-bento rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <ShieldCheck size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Verified · Official Document</p>
                            <h2 className="font-serif text-2xl text-lux-text">Certificate Valid</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Issued To', value: certData.name, mono: false },
                            { label: 'Certificate ID', value: certData.unique_id, mono: true },
                            { label: 'Email', value: certData.email, mono: false },
                            { label: 'Issued Date', value: new Date(certData.issued_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }), mono: false },
                        ].map(({ label, value, mono }) => (
                            <div key={label} className="bg-lux-glass border border-lux-glassBorder rounded-xl p-3">
                                <p className="text-[10px] text-lux-muted uppercase tracking-widest mb-1">{label}</p>
                                <p className={`text-sm text-lux-text font-semibold truncate ${mono ? 'font-mono' : ''}`}>{value}</p>
                            </div>
                        ))}
                    </div>
                    {certData.position && (
                        <div className="bg-lux-glass border border-lux-glassBorder rounded-xl p-3">
                            <p className="text-[10px] text-lux-muted uppercase tracking-widest mb-1">Role / Position</p>
                            <p className="text-sm text-lux-text font-semibold">{certData.position}</p>
                        </div>
                    )}
                    <button onClick={reset} className="w-full text-xs text-lux-muted hover:text-lux-text transition-colors py-2 border border-lux-glassBorder rounded-xl">
                        Verify Another
                    </button>
                </div>
            )}

            {status === 'revoked' && (
                <div className="glass-bento rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle size={20} className="text-amber-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Revoked</p>
                            <h2 className="font-serif text-2xl text-lux-text">Certificate Revoked</h2>
                        </div>
                    </div>
                    <p className="text-sm text-lux-muted leading-relaxed">This certificate has been officially revoked and is no longer valid.</p>
                    <button onClick={reset} className="w-full text-xs text-lux-muted hover:text-lux-text transition-colors py-2 border border-lux-glassBorder rounded-xl">
                        Verify Another
                    </button>
                </div>
            )}
        </div>
    );
};

// ── GENERATE TAB ─────────────────────────────────────────────────────────────

const GenerateTab = () => {
    const [templateId, setTemplateId] = useState('default');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'verify' | 'form' | 'preview'>('verify');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [certData, setCertData] = useState<any>(null);
    const certRef = useRef<HTMLDivElement>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            const supabase = createClient();
            const { data: allowed, error: ae } = await supabase
                .from('allowed_emails').select('*').eq('email', email.trim()).maybeSingle();
            if (ae || !allowed) { setError('Email not authorized. Contact founders@kaizenstat.com'); setLoading(false); return; }

            const { data: existing } = await supabase
                .from('certificates').select('*')
                .eq('email', email.trim()).eq('template_id', templateId).maybeSingle();

            if (existing) { setCertData(existing); setStep('preview'); }
            else { if (allowed.name) setName(allowed.name); setStep('form'); }
        } catch (err: any) { setError(err.message || 'Connection error'); }
        finally { setLoading(false); }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            const supabase = createClient();
            const { data: allowed } = await supabase
                .from('allowed_emails').select('*').eq('email', email.trim()).maybeSingle();
            if (!allowed) { setError('Authorization lost. Please refresh.'); setLoading(false); return; }

            const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();
            const { data: cert, error: ce } = await supabase
                .from('certificates')
                .insert({ unique_id: uniqueId, email: email.trim(), name, position: allowed.position, category: allowed.category, template_id: templateId })
                .select().single();
            if (ce) { setError(ce.message); setLoading(false); return; }

            await supabase.from('allowed_emails').update({ is_used: true }).eq('id', allowed.id);
            setCertData(cert); setStep('preview');
        } catch (err: any) { setError(err.message); }
        finally { setLoading(false); }
    };

    const downloadPDF = async () => {
        if (!certRef.current || !certData) return;
        const isLandscape = templateId === 'tech-blog-completion';
        const [w, h] = isLandscape ? [848, 600] : [600, 848];
        const dataUrl = await toPng(certRef.current, { quality: 1.0 });
        const pdf = new jsPDF({ orientation: isLandscape ? 'landscape' : 'portrait', unit: 'px', format: [w, h] });
        pdf.addImage(dataUrl, 'PNG', 0, 0, w, h);
        pdf.save(`Certificate-${certData.name.replace(/\s+/g, '_')}-${certData.unique_id}.pdf`);
    };

    const reset = () => { setStep('verify'); setEmail(''); setName(''); setCertData(null); setError(''); };

    return (
        <div className="space-y-4">
            {step === 'verify' && (
                <div className="glass-bento rounded-2xl p-6 space-y-5">
                    {/* Template picker */}
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted">Certificate Type</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'default', label: 'Joining Certificate' },
                                { id: 'tech-blog-completion', label: 'Completion Certificate' },
                            ].map(t => (
                                <button
                                    key={t.id} type="button"
                                    onClick={() => setTemplateId(t.id)}
                                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors ${templateId === t.id ? 'bg-lux-text text-lux-cream border-lux-text' : 'bg-lux-glass border-lux-glassBorder text-lux-muted hover:text-lux-text'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-lux-muted">Authorized Email</label>
                            <input
                                type="email" required value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-xs text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-white/20 transition-colors"
                            />
                        </div>
                        {error && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/15 text-xs text-red-400">
                                <XCircle size={13} className="mt-0.5 flex-shrink-0" /> {error}
                            </div>
                        )}
                        <button
                            type="submit" disabled={loading}
                            className="w-full py-3.5 bg-lux-text text-lux-cream text-xs font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-lux-text/90 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                        >
                            {loading
                                ? <span className="w-4 h-4 border-2 border-lux-cream/30 border-t-lux-cream rounded-full animate-spin" />
                                : <>Continue <ArrowRight size={12} /></>
                            }
                        </button>
                    </form>
                    <p className="text-[10px] text-lux-muted/40 text-center">
                        Not authorized? Email <a href="mailto:founders@kaizenstat.com" className="text-lux-muted hover:text-lux-text transition-colors">founders@kaizenstat.com</a>
                    </p>
                </div>
            )}

            {step === 'form' && (
                <div className="glass-bento rounded-2xl p-6 space-y-5">
                    <div>
                        <h3 className="font-serif text-xl text-lux-text">Your Details</h3>
                        <p className="text-xs text-lux-muted mt-1">Your name will appear exactly as entered on the certificate.</p>
                    </div>
                    <form onSubmit={handleGenerate} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-lux-muted">Full Name</label>
                            <input
                                type="text" required value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="As it should appear on certificate"
                                className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-xs text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-white/20 transition-colors"
                            />
                        </div>
                        {error && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/15 text-xs text-red-400">
                                <XCircle size={13} className="mt-0.5 flex-shrink-0" /> {error}
                            </div>
                        )}
                        <div className="flex gap-3">
                            <button type="button" onClick={reset} className="flex-1 py-3 text-xs text-lux-muted border border-lux-glassBorder rounded-xl hover:text-lux-text transition-colors">
                                Back
                            </button>
                            <button
                                type="submit" disabled={loading}
                                className="flex-1 py-3 bg-lux-text text-lux-cream text-xs font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-lux-text/90 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                            >
                                {loading
                                    ? <span className="w-4 h-4 border-2 border-lux-cream/30 border-t-lux-cream rounded-full animate-spin" />
                                    : 'Generate'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {step === 'preview' && certData && (
                <div className="glass-bento rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <Award size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Ready to Download</p>
                            <h2 className="font-serif text-2xl text-lux-text">Certificate Generated</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Name', value: certData.name },
                            { label: 'Certificate ID', value: certData.unique_id },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-lux-glass border border-lux-glassBorder rounded-xl p-3">
                                <p className="text-[10px] text-lux-muted uppercase tracking-widest mb-1">{label}</p>
                                <p className="text-sm text-lux-text font-semibold font-mono truncate">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={downloadPDF}
                            className="flex-1 py-3.5 bg-lux-text text-lux-cream text-xs font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-lux-text/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <Download size={13} /> Download PDF
                        </button>
                        <button onClick={reset} className="flex-1 py-3.5 text-xs text-lux-muted border border-lux-glassBorder rounded-xl hover:text-lux-text transition-colors">
                            Generate Another
                        </button>
                    </div>

                    {/* Hidden render for PDF capture */}
                    <div className="fixed top-0 left-[-9999px]" style={{ width: templateId === 'tech-blog-completion' ? '848px' : '600px' }}>
                        <CertificateDesign
                            ref={certRef}
                            name={certData.name}
                            email={certData.email}
                            uniqueId={certData.unique_id}
                            position={certData.position}
                            category={certData.category}
                            templateId={templateId}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export const CertificateVerify = () => {
    const [tab, setTab] = useState<'verify' | 'generate'>('verify');

    return (
        <div className="min-h-screen pt-24 pb-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg space-y-8">

                {/* Header */}
                <div className="text-center">
                    <span className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass mb-4">
                        Certificates
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                        {tab === 'verify' ? (
                            <>Verify <span className="italic font-light text-lux-muted">Authenticity</span></>
                        ) : (
                            <>Get Your <span className="italic font-light text-lux-muted">Certificate</span></>
                        )}
                    </h1>
                    <p className="text-sm text-lux-muted mt-3 leading-relaxed">
                        {tab === 'verify'
                            ? 'Enter the unique Certificate ID to confirm its validity.'
                            : 'Download your official KaizenStat certificate.'}
                    </p>
                </div>

                {/* Tab switcher */}
                <div className="flex bg-lux-glass border border-lux-glassBorder rounded-full p-1">
                    {(['verify', 'generate'] as const).map(t => (
                        <button
                            key={t} onClick={() => setTab(t)}
                            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-colors ${tab === t ? 'bg-lux-text text-lux-cream' : 'text-lux-muted hover:text-lux-text'}`}
                        >
                            {t === 'verify' ? 'Verify' : 'Get Certificate'}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {tab === 'verify' ? <VerifyTab /> : <GenerateTab />}

                <p className="text-center text-[10px] text-lux-muted/30 font-mono">
                    Issued by KaizenStat · Powered by Supabase
                </p>
            </div>
        </div>
    );
};
