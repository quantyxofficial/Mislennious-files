import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, XCircle, AlertCircle } from 'lucide-react';

export const CertificateVerify = () => {
    const { uniqueId } = useParams();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'valid' | 'invalid' | 'revoked'>('idle');
    const [certData, setCertData] = useState<any>(null);
    const [inputCode, setInputCode] = useState('');

    useEffect(() => {
        if (uniqueId) {
            setLoading(true);
            verifyCertificate(uniqueId);
        } else {
            setStatus('idle');
        }
    }, [uniqueId]);

    const verifyCertificate = async (id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/verify/${id}`);
            const data = await res.json();
            if (res.ok && data.valid) {
                if (data.certificate.revoked) {
                    setStatus('revoked');
                } else {
                    setStatus('valid');
                    setCertData(data.certificate);
                }
            } else {
                setStatus('invalid');
            }
        } catch (error) {
            setStatus('invalid');
        } finally {
            setLoading(false);
        }
    };

    const handleManualVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputCode.trim()) {
            verifyCertificate(inputCode.trim());
        }
    };

    if (loading) {
        return <div className="pt-16 pb-8 px-4 flex items-center justify-center text-lux-text font-serif animate-pulse">Verifying...</div>;
    }

    return (
        <div className="pt-16 pb-8 px-4 flex flex-col items-center">
            <div className="max-w-xl w-full">

                {/* Search Form */}
                {(status === 'idle' || status === 'invalid') && (
                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-xl transition-all">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-serif font-bold text-lux-text mb-3 tracking-tight">Verify Certificate</h1>
                            <p className="text-lux-muted text-sm">Enter the unique Certificate ID found on the document.</p>
                        </div>

                        <form onSubmit={handleManualVerify} className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Certificate ID (e.g. X9Y2Z1)"
                                value={inputCode}
                                onChange={e => setInputCode(e.target.value)}
                                className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-3.5 text-lux-text placeholder-stone-400 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none transition-all shadow-sm"
                            />
                            <button
                                type="submit"
                                className="bg-brand-black text-white hover:bg-stone-800 px-8 py-3.5 rounded-lg font-bold transition-all transform hover:scale-[1.02] shadow-lg"
                            >
                                Verify
                            </button>
                        </form>

                        {status === 'invalid' && (
                            <div className="mt-8 pt-6 border-t border-stone-100 animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                                        <XCircle size={24} />
                                    </div>
                                    <h2 className="text-lg font-bold text-red-600 mb-1">Certificate Not Found</h2>
                                    <p className="text-stone-500 text-sm">The ID "{inputCode}" matches no records.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Valid Certificate State */}
                {status === 'valid' && certData && (
                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-xl animate-in zoom-in-95 duration-300">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-lux-text mb-1">Certificate Valid</h1>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase tracking-widest">Official Document</span>
                        </div>

                        <div className="space-y-4 bg-white/50 p-6 rounded-xl border border-white/60 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Issued To</p>
                                    <p className="text-xl font-serif font-bold text-lux-text">{certData.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Email Account</p>
                                    <p className="text-lux-text font-medium">{certData.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Certificate ID</p>
                                    <p className="text-brand-purple font-mono font-medium bg-brand-purple/5 inline-block px-2 py-0.5 rounded text-sm">{certData.uniqueId}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Issued Date</p>
                                    <p className="text-lux-text font-medium">{new Date(certData.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => { setStatus('idle'); setInputCode(''); }}
                                className="text-stone-400 hover:text-brand-purple text-sm font-medium transition-colors"
                            >
                                Verify Another Certificate
                            </button>
                        </div>
                    </div>
                )}

                {/* Revoked State */}
                {status === 'revoked' && (
                    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-xl text-center animate-in zoom-in-95 duration-300">
                        <div className="mx-auto w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <AlertCircle className="text-amber-500" size={40} />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-amber-600 mb-2">Certificate Revoked</h1>
                        <p className="text-stone-500 max-w-xs mx-auto mb-8">This certificate has been officially revoked by the administration and is no longer valid.</p>

                        <button
                            onClick={() => { setStatus('idle'); setInputCode(''); }}
                            className="text-stone-400 hover:text-brand-black text-sm font-medium underline underline-offset-4 transition-colors"
                        >
                            Verify Another
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
