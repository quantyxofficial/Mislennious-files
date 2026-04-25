import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, ShieldCheck, RefreshCw, Upload, Download, Search, Eye, EyeOff } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { CertificateDesign } from '../../components/certificate/CertificateDesign';
import { useRef } from 'react';
import { createClient } from '../../lib/supabase/client';

interface AllowedEmail {
    id: string;
    email: string;
    name?: string;
    position?: string;
    category?: string;
    is_used: boolean;
    created_at: string;
}

export const AdminDashboard = () => {
    const [emails, setEmails] = useState<AllowedEmail[]>([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search state for emails
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newPosition, setNewPosition] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [adminPassword, setAdminPassword] = useState(''); // Store verified password
    const [refreshKey, setRefreshKey] = useState(0);

    const [error, setError] = useState(''); // Custom error state

    useEffect(() => {
        if (isAuthenticated) {
            fetchEmails();
        }
    }, [isAuthenticated]);

    const fetchEmails = async () => {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('allowed_emails')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setEmails(data || []);
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter emails based on search
    const filteredEmails = emails.filter(email => {
        const matchesCategory = (selectedCategory === 'Tech Blog' || selectedCategory === 'Tech Blog Completion')
            ? (email.category === 'Tech Blog' || !email.category) // Legacy support: Null = Tech Blog/Default
            : email.category === selectedCategory;

        return matchesCategory && (
            email.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (email.name && email.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const handleRefresh = () => {
        fetchEmails();
        setRefreshKey(prev => prev + 1);
    };

    const handleAddEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) return;

        const supabase = createClient();
        try {
            const { error } = await supabase
                .from('allowed_emails')
                .insert({
                    email: newEmail,
                    name: newName,
                    position: newPosition,
                    category: selectedCategory
                });

            if (!error) {
                setNewEmail('');
                setNewName('');
                setNewPosition('');
                fetchEmails();
            } else {
                alert('Failed to add email: ' + error.message);
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

            const lines = text.split(/\r?\n/);
            const emailsToAdd: { name: string; email: string; position?: string; category: string }[] = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                const columns = line.split(',').map(c => c.trim());
                if (columns[3]?.toLowerCase() === 'email' || columns[1]?.toLowerCase() === 'name') continue;

                const name = columns[1];
                const email = columns[3]; // Assuming Column D is Email based on user request (Wait, user screenshot shows C is Email, D is Position)
                // Actually user screenshot: A=SL, B=NAME, C=EMAIL, D=POSITION
                // So columns[0]=SL, columns[1]=NAME, columns[2]=EMAIL, columns[3]=POSITION

                // Let's re-read the screenshot layout.
                // A=SL. NO, B=NAME, C=EMAIL, D=POSITION
                // CSV split by comma.
                // If the CSV matches that:
                // col[0] -> SL
                // col[1] -> Name
                // col[2] -> Email
                // col[3] -> Position

                // My previous code allowed column 3 to be email.
                // I should allow both or stick to user screenshot.
                // Let's assume the user uses the format in screenshot.

                const possibleEmail = columns[2]?.includes('@') ? columns[2] : columns[3];
                const possibleName = columns[1];
                const position = columns[3];

                if (possibleEmail && possibleEmail.includes('@')) {
                    emailsToAdd.push({
                        name: possibleName || '',
                        email: possibleEmail,
                        position: position || '',
                        category: selectedCategory || 'Core Team'
                    });
                }
            }

            if (emailsToAdd.length === 0) {
                alert('No valid emails found in CSV. Format should be: Sl.No, Name, Phone, Email');
                return;
            }

            if (confirm(`Found ${emailsToAdd.length} emails. Upload?`)) {
                const supabase = createClient();
                try {
                    const { error } = await supabase
                        .from('allowed_emails')
                        .upsert(emailsToAdd.map(e => ({
                            email: e.email,
                            name: e.name,
                            position: e.position,
                            category: e.category
                        })), { onConflict: 'email,category' });

                    if (!error) {
                        alert('Successfully uploaded emails');
                        fetchEmails();
                    } else {
                        alert('Failed to upload emails: ' + error.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    };

    const handleDeleteEmail = async (id: string) => {
        if (!confirm('Are you sure you want to delete this email?')) return;
        const supabase = createClient();
        try {
            const { error } = await supabase
                .from('allowed_emails')
                .delete()
                .eq('id', id);
            
            if (!error) {
                fetchEmails();
            } else {
                alert('Error deleting email: ' + error.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                setAdminPassword(password);
                setIsAuthenticated(true);
            } else {
                // If proxy fails (server down), vite returns 504/502/503
                if (res.status === 504 || res.status === 502 || res.status === 503) {
                    setError('Error: Backend server is not running.');
                } else {
                    const data = await res.json().catch(() => ({}));
                    setError(data.error || 'Incorrect password');
                }
            }
        } catch (error) {
            setError('Connection failed. Backend may be offline.');
        }
    };

    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-brand-black relative">
                <div className="bg-brand-gray/10 p-8 rounded-xl border border-white/10 w-full max-w-md relative z-10">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:border-brand-purple"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white font-medium py-3 rounded-lg transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>

                {/* Custom Error Popup */}
                {error && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1a1a1a] border border-red-500/30 p-6 rounded-xl shadow-2xl max-w-sm w-full"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <ShieldCheck className="text-red-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Access Denied</h3>
                                    <p className="text-white/60 text-sm mt-1">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError('')}
                                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        );

    }

    if (!selectedCategory) {
        // Category Selection View
        const categories = [
            { id: 'Tech Blog', color: 'bg-blue-500', icon: <RefreshCw /> },
            { id: 'Tech Blog Completion', color: 'bg-emerald-500', icon: <ShieldCheck /> },
            { id: 'Graphic Design', color: 'bg-pink-500', icon: <Upload /> },
            { id: 'Core Team', color: 'bg-purple-500', icon: <ShieldCheck /> }
        ];

        return (
            <div className="min-h-screen pt-24 pb-12 px-4 bg-brand-black">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <ShieldCheck className="text-brand-purple" />
                            Admin Dashboard
                        </h1>
                        <button onClick={() => { setIsAuthenticated(false); setAdminPassword(''); }} className="text-white/60 hover:text-white">
                            Logout
                        </button>
                    </div>

                    <h2 className="text-xl text-white/60 mb-6 font-mono text-center">Select Department</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map(cat => (
                            <motion.button
                                key={cat.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`h-40 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-4 ${cat.color}/10 hover:${cat.color}/20 transition-all`}
                            >
                                <div className={`p-4 rounded-full ${cat.color}/20 text-white`}>
                                    {cat.icon}
                                </div>
                                <span className="text-xl font-bold text-white">{cat.id}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-brand-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedCategory(null)} className="text-white/60 hover:text-white">
                            &larr; Back
                        </button>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <span className="text-brand-purple">{selectedCategory}</span>
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleRefresh} className="text-white/60 hover:text-white flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg transition-colors">
                            <RefreshCw size={16} />
                            Refresh Data
                        </button>
                        <button onClick={() => { setIsAuthenticated(false); setAdminPassword(''); }} className="text-white/60 hover:text-white">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email Whitelist Section */}
                    <div className="bg-brand-gray/10 rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Allowed Emails</h2>

                        {/* Search Input for Emails */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                            <input
                                type="text"
                                placeholder="Search emails or names..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-brand-purple"
                            />
                        </div>

                        <form onSubmit={handleAddEmail} className="bg-black/20 p-4 rounded-lg border border-white/5 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                <input
                                    type="email"
                                    placeholder="Authorized Email..."
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-purple w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Name (Optional)"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-purple w-full"
                                />
                                {selectedCategory === 'Core Team' && (
                                    <input
                                        type="text"
                                        placeholder="Position / Role"
                                        value={newPosition}
                                        onChange={(e) => setNewPosition(e.target.value)}
                                        className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-purple w-full"
                                    />
                                )}
                                <button
                                    type="submit"
                                    className="bg-brand-purple/20 hover:bg-brand-purple/40 text-brand-purple border border-brand-purple/50 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    <span className="md:hidden lg:inline">Add</span>
                                </button>
                            </div>
                        </form>

                        <div className="mb-4">
                            <label className="flex items-center justify-center gap-2 cursor-pointer w-full bg-white/5 border border-white/10 border-dashed rounded-lg p-4 hover:bg-white/10 transition-colors">
                                <Upload className="text-white/40" />
                                <span className="text-white/60 text-sm">Upload CSV (Sl.No, Name, Email, Position)</span>
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>

                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredEmails.map((item) => (
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
                                            {item.position && <span className="ml-2 bg-brand-purple/20 text-brand-purple text-[10px] px-2 py-0.5 rounded">{item.position}</span>}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.is_used ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {item.is_used ? 'Certificate Generated' : 'Pending'}
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
                            {filteredEmails.length === 0 && !loading && (
                                <p className="text-white/40 text-center py-4">No emails found.</p>
                            )}
                        </div>
                    </div>

                    {/* Certificates Section */}
                    <div className="bg-brand-gray/10 rounded-xl border border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Issued Certificates</h2>
                        <CertificateList key={refreshKey} adminPassword={adminPassword} onUnauthorized={() => setIsAuthenticated(false)} selectedCategory={selectedCategory} />
                    </div>
                </div>

                <BulkGenerator
                    emails={filteredEmails}
                    adminPassword={adminPassword}
                    selectedCategory={selectedCategory}
                    onSuccess={handleRefresh}
                />
                <VerifyTool />
            </div>
        </div>
    );
};

const CertificateList = ({ adminPassword, onUnauthorized, selectedCategory }: { adminPassword: string, onUnauthorized: () => void, selectedCategory: string | null }) => {
    const [certs, setCerts] = useState<any[]>([]);
    const [certSearch, setCertSearch] = useState(''); // Search state for certs
    const [actionLoading, setActionLoading] = useState<Record<string, string | null>>({});

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .order('issued_at', { ascending: false });
            
            if (error) throw error;
            setCerts(data || []);
        } catch (e) { console.error(e); }
    };

    // Filter certs based on search
    const filteredCerts = certs.filter(cert => {
        const matchesCategory = (selectedCategory === 'Tech Blog' || selectedCategory === 'Tech Blog Completion')
            ? (cert.category === 'Tech Blog' || !cert.category) // Legacy support
            : cert.category === selectedCategory;

        return matchesCategory && (
            cert.name.toLowerCase().includes(certSearch.toLowerCase()) ||
            cert.email.toLowerCase().includes(certSearch.toLowerCase()) ||
            cert.unique_id.toLowerCase().includes(certSearch.toLowerCase())
        );
    });

    const handleRevoke = async (id: string) => {
        if (!confirm('Revoke this certificate? This cannot be undone.')) return;
        setActionLoading(prev => ({ ...prev, [id]: 'revoke' }));
        const supabase = createClient();
        try {
            const { error } = await supabase
                .from('certificates')
                .update({ revoked: true })
                .eq('id', id);
            
            if (!error) fetchCerts();
        } catch (e) { console.error(e); }
        setActionLoading(prev => ({ ...prev, [id]: null }));
    };

    const handleDelete = async (id: string) => {
        if (!confirm('DELETE this certificate? This will remove it completely and reset the email so the user can generate it again.')) return;
        setActionLoading(prev => ({ ...prev, [id]: 'delete' }));
        const supabase = createClient();
        try {
            // 1. Get cert to find email
            const { data: cert } = await supabase.from('certificates').select('email').eq('id', id).single();
            
            if (cert) {
                // 2. Delete Cert
                const { error: delError } = await supabase.from('certificates').delete().eq('id', id);
                
                if (!delError) {
                    // 3. Reset Email Lock
                    await supabase.from('allowed_emails').update({ is_used: false }).eq('email', cert.email);
                    
                    setCerts(prev => prev.filter(c => c.id !== id));
                    fetchCerts();
                }
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
            cert.unique_id,
            new Date(cert.issued_at).toLocaleString(),
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
            {/* Search Input for Certificates */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                    type="text"
                    placeholder="Search certificates..."
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-brand-purple"
                />
            </div>

            <div className="flex justify-end mb-4">
                <button onClick={downloadCSV} className="text-xs bg-brand-lime/10 text-brand-lime border border-brand-lime/20 px-3 py-1.5 rounded-lg hover:bg-brand-lime/20 flex items-center gap-2">
                    Download CSV
                </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {filteredCerts.map((cert) => (
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
                                <span className="bg-white/5 px-2 py-0.5 rounded text-brand-purple">{cert.unique_id}</span>
                                <span>{new Date(cert.issued_at).toLocaleDateString()}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredCerts.length === 0 && <p className="text-white/40 text-center py-4">No certificates found.</p>}
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
        const supabase = createClient();
        try {
            const { data: cert, error } = await supabase
                .from('certificates')
                .select('*')
                .eq('unique_id', code)
                .maybeSingle();

            if (!error && cert) {
                setResult({ valid: !cert.revoked, certificate: cert });
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
                            <p className="text-white/60 text-xs">Date: {new Date(result.certificate.issued_at).toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p className="text-red-400 font-bold">✗ Invalid or Revoked Certificate</p>
                    )}
                </div>
            )}
        </div>
    );
};

const BulkGenerator = ({ emails, adminPassword, selectedCategory, onSuccess }: { emails: AllowedEmail[], adminPassword: string, selectedCategory: string | null, onSuccess: () => void }) => {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const certRef = useRef<HTMLDivElement>(null);
    const [currentCert, setCurrentCert] = useState<{ name: string, email: string, uniqueId: string, position?: string, category?: string } | null>(null);

    const generateAll = async () => {
        if (!emails.length) return alert('No emails to generate');
        if (!confirm(`Generate and verify certificates for all authorized users? This will register them in the system.`)) return;

        setGenerating(true);
        setProgress(0);
        const zip = new JSZip();
        const supabase = createClient();

        try {
            // 1. Get all allowed emails for the category (already passed in via props 'emails')
            const targetEmails = emails;

            const results = [];

            for (let i = 0; i < targetEmails.length; i++) {
                const record = targetEmails[i];
                let cert = null;

                // Check if certificate already exists
                const { data: existingCert } = await supabase
                    .from('certificates')
                    .select('*')
                    .eq('email', record.email)
                    .eq('category', record.category)
                    .maybeSingle();
                
                cert = existingCert;

                if (!cert) {
                    const uniqueId = Math.random().toString(36).substring(2, 10).toUpperCase();
                    const { data: newCert, error: certError } = await supabase
                        .from('certificates')
                        .insert({
                            unique_id: uniqueId,
                            email: record.email,
                            name: record.name || 'Participant',
                            position: record.position,
                            category: record.category,
                            template_id: 'default'
                        })
                        .select()
                        .single();
                    
                    if (!certError && newCert) {
                        cert = newCert;
                        // Mark as used
                        await supabase
                            .from('allowed_emails')
                            .update({ is_used: true })
                            .eq('id', record.id);
                    }
                }

                if (cert) {
                    setCurrentCert({
                        name: cert.name,
                        email: cert.email,
                        uniqueId: cert.unique_id,
                        position: cert.position,
                        category: cert.category
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
                }

                setProgress(Math.round(((i + 1) / targetEmails.length) * 100));
            }

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `${selectedCategory || 'All'}_Certificates.zip`);
            onSuccess();

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
                {generating ? 'Generating PDFs...' : `Download ${selectedCategory || 'All'} Certificates (PDF ZIP)`}
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
                        position={currentCert.position}
                        category={currentCert.category}
                    />
                )}
            </div>
        </div>
    );
};
