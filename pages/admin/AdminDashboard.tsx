import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ShieldCheck, RefreshCw, Upload, Download } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { CertificateDesign } from '../../components/certificate/CertificateDesign';
import { useRef } from 'react';

interface AllowedEmail {
    id: string;
    email: string;
    name?: string;
    isUsed: boolean;
    createdAt: string;
}

export const AdminDashboard = () => {
    const [emails, setEmails] = useState<AllowedEmail[]>([]);
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            fetchEmails();
        }
    }, [isAuthenticated]);

    const fetchEmails = async () => {
        try {
            const res = await fetch('/api/admin/emails');
            if (res.ok) {
                const data = await res.json();
                setEmails(data);
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchEmails();
        setRefreshKey(prev => prev + 1);
    };

    const handleAddEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        try {
            const res = await fetch('/api/admin/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newEmail, name: newName }),
            });
            if (res.ok) {
                setNewEmail('');
                setNewName('');
                fetchEmails();
            } else {
                alert('Failed to add email. It might already exist.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            if (!text) return;

            // Simple CSV Parser
            // Expected format: Sl. No., NAME, PHONE NO., EMAIL
            // We need NAME (index 1) and EMAIL (index 3)

            const lines = text.split(/\r?\n/);
            const emailsToAdd: { name: string; email: string }[] = [];

            // Skip header if strictly matching known headers, or just try to parse
            // Assuming first row might be header. 
            // Better: loop all, check if it looks like email.

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                // Handle basic CSV splitting (ignoring quoted commas for now as simple names/emails usually don't have them)
                const columns = line.split(',').map(c => c.trim());

                // If this is the header row, skip
                if (columns[3]?.toLowerCase() === 'email' || columns[1]?.toLowerCase() === 'name') continue;

                const name = columns[1];
                const email = columns[3];

                if (email && email.includes('@')) {
                    emailsToAdd.push({ name: name || '', email });
                }
            }

            if (emailsToAdd.length === 0) {
                alert('No valid emails found in CSV. Format should be: Sl.No, Name, Phone, Email');
                return;
            }

            if (confirm(`Found ${emailsToAdd.length} emails. Upload?`)) {
                try {
                    const res = await fetch('/api/admin/emails/bulk', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ emails: emailsToAdd }),
                    });

                    if (res.ok) {
                        const data = await res.json();
                        alert(data.message);
                        fetchEmails();
                    } else {
                        alert('Failed to upload emails');
                    }
                } catch (error) {
                    console.error(error);
                    alert('Error uploading emails');
                }
            }

            // Reset input
            e.target.value = '';
        };
        reader.readAsText(file);
    };

    const handleDeleteEmail = async (id: string) => {
        if (!confirm('Are you sure you want to delete this email?')) return;
        try {
            const res = await fetch(`/api/admin/emails/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchEmails();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-brand-black">
                <div className="bg-brand-gray/10 p-8 rounded-xl border border-white/10 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple"
                        />
                        <button
                            type="submit"
                            className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white font-medium py-3 rounded-lg transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-brand-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <ShieldCheck className="text-brand-purple" />
                        Admin Dashboard
                    </h1>
                    <div className="flex gap-4">
                        <button onClick={handleRefresh} className="text-white/60 hover:text-white flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg transition-colors">
                            <RefreshCw size={16} />
                            Refresh Data
                        </button>
                        <button onClick={() => setIsAuthenticated(false)} className="text-white/60 hover:text-white">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email Whitelist Section */}
                    <div className="bg-brand-gray/10 rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Allowed Emails</h2>
                        <form onSubmit={handleAddEmail} className="flex flex-col gap-2 mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Authorized Email..."
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-purple"
                                />
                                <input
                                    type="text"
                                    placeholder="Name (Optional)"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-purple"
                                />
                                <button
                                    type="submit"
                                    className="bg-brand-purple/20 hover:bg-brand-purple/40 text-brand-purple border border-brand-purple/50 p-2 rounded-lg transition-colors"
                                >
                                    <Plus size={24} />
                                </button>
                            </div>
                        </form>

                        <div className="mb-4">
                            <label className="flex items-center justify-center gap-2 cursor-pointer w-full bg-white/5 border border-white/10 border-dashed rounded-lg p-4 hover:bg-white/10 transition-colors">
                                <Upload className="text-white/40" />
                                <span className="text-white/60 text-sm">Upload CSV (Sl.No, Name, Phone, Email)</span>
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>

                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {emails.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/5"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-white font-medium">{item.email}</p>
                                            {item.name && <span className="text-white/50 text-xs">({item.name})</span>}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.isUsed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {item.isUsed ? 'Certificate Generated' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteEmail(item.id)}
                                        className="text-white/40 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                            {emails.length === 0 && !loading && (
                                <p className="text-white/40 text-center py-4">No emails authorized yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Certificates Section */}
                    <div className="bg-brand-gray/10 rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Issued Certificates</h2>
                        <CertificateList key={refreshKey} />
                    </div>
                </div>

                <BulkGenerator emails={emails} onSuccess={handleRefresh} />
                <VerifyTool />
            </div>
        </div>
    );
};

const CertificateList = () => {
    const [certs, setCerts] = useState<any[]>([]);
    const [actionLoading, setActionLoading] = useState<Record<string, string | null>>({});

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        try {
            const res = await fetch('/api/admin/certificates');
            if (res.ok) setCerts(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleRevoke = async (id: string) => {
        if (!confirm('Revoke this certificate? This cannot be undone.')) return;
        setActionLoading(prev => ({ ...prev, [id]: 'revoke' }));
        try {
            const res = await fetch(`/api/admin/certificates/${id}/revoke`, { method: 'PATCH' });
            if (res.ok) fetchCerts();
        } catch (e) { console.error(e); }
        setActionLoading(prev => ({ ...prev, [id]: null }));
    };

    const handleDelete = async (id: string) => {
        if (!confirm('DELETE this certificate? This will remove it completely and reset the email so the user can generate it again.')) return;
        setActionLoading(prev => ({ ...prev, [id]: 'delete' }));
        try {
            const res = await fetch(`/api/admin/certificates/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // Optimistic removal
                setCerts(prev => prev.filter(c => c.id !== id));
                fetchCerts();
            } else {
                alert('Failed to delete. Check console.');
            }
        } catch (e) {
            console.error(e);
            alert('Error deleting certificate');
        }
        setActionLoading(prev => ({ ...prev, [id]: null }));
    };

    const downloadCSV = () => {
        const headers = ["Name", "Email", "Unique ID", "Issued At", "Status"];
        const rows = certs.map(cert => [
            cert.name,
            cert.email,
            cert.uniqueId,
            new Date(cert.issuedAt).toLocaleString(),
            cert.revoked ? "Revoked" : "Valid"
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "issued_certificates.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={downloadCSV} className="text-xs bg-brand-lime/10 text-brand-lime border border-brand-lime/20 px-3 py-1.5 rounded-lg hover:bg-brand-lime/20 flex items-center gap-2">
                    Download CSV
                </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {certs.map((cert) => (
                        <motion.div
                            layout
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            className="p-3 bg-black/30 rounded-lg border border-white/5 flex flex-col gap-1"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white font-medium">{cert.name}</p>
                                    <p className="text-white/40 text-xs">{cert.email}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    {cert.revoked ? (
                                        <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full self-start">Revoked</span>
                                    ) : (
                                        <button
                                            onClick={() => handleRevoke(cert.id)}
                                            disabled={!!actionLoading[cert.id]}
                                            className="text-[10px] border border-yellow-500/50 text-yellow-400 px-2 py-0.5 rounded-full hover:bg-yellow-500/10 disabled:opacity-50 transition-all"
                                        >
                                            {actionLoading[cert.id] === 'revoke' ? 'Wait...' : 'Revoke'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(cert.id)}
                                        disabled={!!actionLoading[cert.id]}
                                        className="text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
                                    >
                                        {actionLoading[cert.id] === 'delete' ? <span className="text-xs animate-pulse">...</span> : <Trash2 size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="text-[10px] text-white/20 font-mono mt-1 flex justify-between">
                                <span className="bg-white/5 px-2 py-0.5 rounded text-brand-purple">{cert.uniqueId}</span>
                                <span>{new Date(cert.issuedAt).toLocaleDateString()}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {certs.length === 0 && <p className="text-white/40 text-center py-4">No certificates issued.</p>}
            </div>
        </div>
    );
};

const VerifyTool = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkCert = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch(`/api/verify/${code}`);
            if (res.ok) {
                const data = await res.json();
                setResult(data);
            } else {
                setResult({ valid: false });
            }
        } catch (e) {
            setResult({ valid: false });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand-gray/10 rounded-xl border border-white/10 p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Verify Certificate</h2>
            <form onSubmit={checkCert} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter Certificate ID"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-purple"
                />
                <button type="submit" className="bg-brand-purple hover:bg-brand-purple/80 text-white px-4 py-2 rounded-lg font-medium">
                    {loading ? '...' : 'Check'}
                </button>
            </form>
            {result && (
                <div className={`mt-4 p-4 rounded-lg border ${result.valid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    {result.valid ? (
                        <div>
                            <p className="text-green-400 font-bold mb-1">✓ Valid Certificate</p>
                            <p className="text-white text-sm">Issued to: <span className="font-bold">{result.certificate.name}</span></p>
                            <p className="text-white/60 text-xs text-sm">Email: {result.certificate.email}</p>
                            <p className="text-white/60 text-xs">Date: {new Date(result.certificate.issuedAt).toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p className="text-red-400 font-bold">✗ Invalid or Revoked Certificate</p>
                    )}
                </div>
            )}
        </div>
    );
};

const BulkGenerator = ({ emails, onSuccess }: { emails: AllowedEmail[], onSuccess: () => void }) => {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const certRef = useRef<HTMLDivElement>(null);
    const [currentCert, setCurrentCert] = useState<{ name: string, email: string, uniqueId: string } | null>(null);

    const generateAll = async () => {
        if (!emails.length) return alert('No emails to generate');
        if (!confirm(`Generate and verify certificates for all authorized users? This will register them in the system.`)) return;

        setGenerating(true);
        setProgress(0);
        const zip = new JSZip();

        try {
            // 1. Sync with backend to ensure certificates exist and get real IDs
            const res = await fetch('/api/admin/certificates/bulk-issue', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to synchronize certificates with backend');

            const issuedCerts = await res.json(); // Array of { uniqueId, name, email }

            if (issuedCerts.length === 0) {
                alert('No certificates found to generate.');
                return;
            }

            // 2. Generate PDFs using the REAL data from backend
            for (let i = 0; i < issuedCerts.length; i++) {
                const cert = issuedCerts[i];

                setCurrentCert({
                    name: cert.name || 'Participant',
                    email: cert.email,
                    uniqueId: cert.uniqueId // REAL ID from backend
                });

                // Wait for React to render
                await new Promise(resolve => setTimeout(resolve, 500));

                if (certRef.current) {
                    try {
                        const dataUrl = await toPng(certRef.current, { quality: 1.0, pixelRatio: 2 });
                        const pdf = new jsPDF({
                            orientation: 'portrait',
                            unit: 'px',
                            format: [600, 848]
                        });
                        pdf.addImage(dataUrl, 'PNG', 0, 0, 600, 848);

                        const safeName = (cert.name || cert.email).replace(/[^a-z0-9]/gi, '_');
                        const fileName = `${safeName}_Certificate.pdf`;
                        zip.file(fileName, pdf.output('blob'));
                    } catch (innerError) {
                        console.error(`Failed to render cert for ${cert.email}`, innerError);
                    }
                }

                setProgress(Math.round(((i + 1) / issuedCerts.length) * 100));
            }

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "All_Certificates.zip");
            onSuccess(); // Refresh the dashboard data

        } catch (error: any) {
            console.error(error);
            alert(`Failed to generate batch: ${error.message || 'Unknown error'}`);
        } finally {
            setGenerating(false);
            setCurrentCert(null);
        }
    };

    return (
        <div className="bg-brand-gray/10 rounded-xl border border-white/10 p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Bulk Actions</h2>
                {generating && <span className="text-brand-lime text-sm animate-pulse">{progress}% Complete</span>}
            </div>

            <button
                onClick={generateAll}
                disabled={generating || emails.length === 0}
                className="w-full bg-brand-white/5 hover:bg-brand-purple/20 border border-white/10 hover:border-brand-purple text-white p-4 rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
                <Download size={20} />
                {generating ? 'Generating PDFs...' : 'Download All Certificates (PDF ZIP)'}
            </button>

            {/* Hidden Render Area - Moved off-screen instead of opacity-0 for better capture reliability */}
            <div className="fixed top-0 left-[-9999px]" style={{ width: '600px', height: '848px' }}>
                {currentCert && (
                    <CertificateDesign
                        key={currentCert.uniqueId} // Force fresh re-mount
                        ref={certRef}
                        name={currentCert.name}
                        email={currentCert.email}
                        uniqueId={currentCert.uniqueId}
                    />
                )}
            </div>
        </div>
    );
};
