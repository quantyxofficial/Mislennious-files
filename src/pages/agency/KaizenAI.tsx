import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateMetaTags } from '../../utils/seo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Trash2, ChevronDown, Menu, X,
    Plus, User, Copy, Check, Loader2, AlertCircle,
    SquarePen, Search, FolderPlus, Folder, ChevronRight, Info
} from 'lucide-react';
import { useAI, ModelType } from '../../context/AIContext';
import { sendChatMessage, QUICK_ACTIONS, selectModelAutomatically } from '../../services/AIService';
import { Logo } from '../../components/ui/Logo';

// Premium Model Badge Colors
const ModelBadgeColors: Record<ModelType, string> = {
    'gemini': 'bg-white/10 text-white border-white/20',
    'gemma-4b': 'bg-white/10 text-white border-white/20',
    'gemini-flash': 'bg-white/10 text-white border-white/20',
    'deepseek-r1': 'bg-white/10 text-white border-white/20',
    'auto': 'bg-white/10 text-white border-white/20'
};

export const KaizenAI: React.FC = () => {
    const {
        model, setModel,
        chatHistory, addMessage,
        sessions, activeSessionId, createSession, loadSession, deleteSession,
        models, theme, toggleTheme,
        folders, createFolder, renameFolder, deleteFolder, moveSessionToFolder
    } = useAI();

    useEffect(() => {
        updateMetaTags({
            title: 'Kaizen AI — Free AI Chat Assistant for Data Science & ML | KaizenStat',
            description: 'Kaizen AI is KaizenStat\'s free AI chat assistant powered by multiple models. Get instant help with machine learning, data science, Python, and statistics — no signup required.',
            keywords: ['kaizen ai', 'free ai chat', 'data science ai assistant', 'ml help', 'kaizenstat ai', 'free chatbot', 'ai tutor data science'],
            canonical: 'https://www.kaizenstat.com/kaizen-ai',
            ogType: 'website',
            twitterCard: 'summary_large_image',
        });
    }, []);

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showModelSelector, setShowModelSelector] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
    const [autoModelPicked, setAutoModelPicked] = useState<ModelType | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const modelSelectorRef = useRef<HTMLDivElement>(null);
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState<(() => void) | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set());
    const searchInputRef = useRef<HTMLInputElement>(null);

    const toggleFolder = (id: string) => {
        const next = new Set(collapsedFolders);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setCollapsedFolders(next);
    };

    const filteredSessions = searchQuery.trim()
        ? sessions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : null;

    // Page-specific dark mode (permanently dark)
    const isDarkMode = true;

    // Close sidebar on mobile when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle Click Outside Model Selector
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target as Node)) {
                setShowModelSelector(false);
            }
        };

        if (showModelSelector) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showModelSelector]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isLoading]);

    // Handle send message
    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');
        setError(null);

        // Add user message
        addMessage({
            role: 'user',
            content: userMessage,
            model
        });

        setIsLoading(true);
        setError(null);
        
        // Create AbortController for stopping generation
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await sendChatMessage({
                message: userMessage,
                personality: 'teacher',
                model,
                chatHistory,
                signal: controller.signal
            });

            if (response.error) {
                setError(response.error);
            } else {
                addMessage({
                    role: 'assistant',
                    content: response.content,
                    model: response.modelUsed
                });
                
                if (model === 'auto') {
                    setAutoModelPicked(response.modelUsed);
                }
            }
        } catch (err: any) {
            if (err.name === 'AbortError') {
                console.log('Generation stopped by user');
            } else {
                setError('Failed to get response. Please try again.');
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    const stopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsLoading(false);
        }
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Copy message to clipboard
    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const currentModel = models.find(m => m.id === model);

    return (
        <div className="dark">
            <div className="flex h-[100dvh] overflow-hidden font-sans selection:bg-white/10 bg-black text-white">
                {/* Mobile Backdrop */}
                <AnimatePresence>
                    {sidebarOpen && window.innerWidth < 768 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        />
                    )}
                </AnimatePresence>

                {/* 
              =============================================
              SIDEBAR
              =============================================
            */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 260, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ 
                                type: "spring", 
                                damping: 25, 
                                stiffness: 200,
                                opacity: { duration: 0.2 }
                            }}
                            className="flex flex-col h-full flex-shrink-0 z-50 fixed inset-y-0 left-0 lg:relative bg-black overflow-hidden"
                        >
                            <div className="w-[260px] h-full flex flex-col">

                            {/* Sidebar Header */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="font-black text-xl tracking-tighter text-white uppercase flex items-center gap-2">
                                        KAIZEN <span className="px-1.5 py-0.5 rounded-sm bg-white/10 text-white text-[9px] uppercase tracking-[0.2em] font-mono border border-white/20">AI</span>
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-lg transition-colors md:hidden hover:bg-white/5 text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-3 pb-4 pt-2 space-y-0.5">
                                 <button
                                    onClick={() => createSession()}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/[0.03] text-white group"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                                            <Logo className="w-3.5 h-3.5 text-white/60" />
                                        </div>
                                        <span className="text-[11px] font-medium text-white/70 group-hover:text-white transition-colors">New chat</span>
                                    </div>
                                    <SquarePen className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
                                </button>

                                <button 
                                    onClick={() => createSession(true)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04] text-white group"
                                >
                                    <Plus className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                                    <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors">Temporary chat</span>
                                </button>

                                <button 
                                    onClick={() => {
                                        setShowSearch(s => !s);
                                        setTimeout(() => searchInputRef.current?.focus(), 50);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04] text-white group"
                                >
                                    <Search className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                                    <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors">Search chats</span>
                                </button>

                                {showSearch && (
                                    <div className="px-1 pt-1">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            placeholder="Search..."
                                            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white/70 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
                                        />
                                    </div>
                                )}

                                <button 
                                    onClick={createFolder}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04] text-white group"
                                >
                                    <FolderPlus className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
                                    <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors">New folder</span>
                                </button>
                            </div>

                            {/* Chat History List */}
                            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700/20">
                                
                                {/* Search Results */}
                                {filteredSessions && (
                                    <div className="space-y-0.5">
                                        <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                                            {filteredSessions.length} result{filteredSessions.length !== 1 ? 's' : ''}
                                        </div>
                                        {filteredSessions.length === 0 ? (
                                            <p className="px-3 py-4 text-[11px] text-white/20 text-center">No chats found</p>
                                        ) : filteredSessions.map(session => (
                                            <div
                                                key={session.id}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                                                    session.id === activeSessionId ? 'bg-white/5 text-white' : 'text-white/40 hover:bg-white/[0.03] hover:text-white/70'
                                                }`}
                                                onClick={() => { loadSession(session.id); setSearchQuery(''); setShowSearch(false); }}
                                            >
                                                <p className="text-[11px] truncate flex-1">{session.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Folders */}
                                {!filteredSessions && <div className="space-y-1">
                                    {folders.map(folder => (
                                        <div 
                                            key={folder.id}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                const sessionId = e.dataTransfer.getData('sessionId');
                                                moveSessionToFolder(sessionId, folder.id);
                                            }}
                                            className="group/folder"
                                        >
                                            <div 
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.02] text-white/30 hover:text-white/60 group cursor-pointer"
                                                onClick={() => toggleFolder(folder.id)}
                                            >
                                                <ChevronRight className={`w-3 h-3 opacity-30 group-hover:opacity-70 transition-transform ${!collapsedFolders.has(folder.id) ? 'rotate-90' : ''}`} />
                                                <Folder className="w-3 h-3" />
                                                {editingFolderId === folder.id ? (
                                                    <input 
                                                        autoFocus
                                                        className="bg-transparent border-none outline-none text-[11px] text-white w-full"
                                                        defaultValue={folder.name}
                                                        onBlur={(e) => {
                                                            renameFolder(folder.id, e.target.value);
                                                            setEditingFolderId(null);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                renameFolder(folder.id, (e.target as HTMLInputElement).value);
                                                                setEditingFolderId(null);
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <span 
                                                        className="text-[11px] flex-1 truncate"
                                                        onDoubleClick={() => setEditingFolderId(folder.id)}
                                                    >
                                                        {folder.name}
                                                    </span>
                                                )}
                                                <button 
                                                    onClick={() => setShowDeleteWarning(() => () => deleteFolder(folder.id))}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                            
                                            {!collapsedFolders.has(folder.id) && (
                                                <div className="ml-4 pl-2 border-l border-white/[0.04] space-y-0.5 mt-0.5">
                                                    {sessions.filter(s => s.folderId === folder.id).map(session => (
                                                        <div
                                                            key={session.id}
                                                            draggable
                                                            onDragStart={(e) => e.dataTransfer.setData('sessionId', session.id)}
                                                            className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                                                session.id === activeSessionId ? 'bg-white/5 text-white/80' : 'text-white/25 hover:text-white/50'
                                                            }`}
                                                            onClick={() => loadSession(session.id)}
                                                        >
                                                            <p className="text-[10px] truncate flex-1">{session.title}</p>
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    moveSessionToFolder(session.id, null);
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-white/60 transition-all mr-1"
                                                                title="Move to recent"
                                                            >
                                                                <X className="w-2.5 h-2.5" />
                                                            </button>
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowDeleteWarning(() => () => deleteSession(session.id));
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400"
                                                            >
                                                                <Trash2 className="w-2.5 h-2.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>}

                                {/* Root Sessions */}
                                {!filteredSessions && <div className="space-y-0.5">
                                    {sessions.filter(s => !s.folderId).length > 0 && (
                                        <div 
                                            className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/15 hover:text-white/40 transition-colors cursor-default"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                const sessionId = e.dataTransfer.getData('sessionId');
                                                moveSessionToFolder(sessionId, null);
                                            }}
                                        >
                                            Recent
                                        </div>
                                    )}
                                    {sessions.filter(s => !s.folderId).map((session) => (
                                         <div
                                            key={session.id}
                                            draggable
                                            onDragStart={(e) => e.dataTransfer.setData('sessionId', session.id)}
                                            className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                                                session.id === activeSessionId
                                                    ? 'bg-white/[0.04] text-white/90'
                                                    : 'text-white/35 hover:bg-white/[0.02] hover:text-white/65'
                                            }`}
                                            onClick={() => loadSession(session.id)}
                                        >
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-[11px] truncate">{session.title}</p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowDeleteWarning(() => () => deleteSession(session.id));
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1 transition-all hover:text-red-400/70"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>}
                            </div>

                            {/* User / Settings Footer */}
                            <div className="p-4 space-y-2 relative">
                                <div className="flex items-center gap-1.5 px-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500/40 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">Local Storage Active</span>
                                    <div className="ml-0.5 flex items-center group/privacy">
                                        <Info className="w-2.5 h-2.5 text-white/15 hover:text-white/40 cursor-pointer transition-colors" />
                                        <div className="absolute bottom-[calc(100%-8px)] left-4 right-4 opacity-0 pointer-events-none group-hover/privacy:opacity-100 transition-opacity duration-200 z-[100]">
                                            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-3 shadow-2xl text-left backdrop-blur-xl">
                                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Privacy First</p>
                                                <p className="text-[9px] text-white/30 leading-relaxed">All chats are saved locally in your browser. We don't store your conversations on our servers.</p>
                                            </div>
                                            <div className="w-2 h-2 bg-[#0a0a0a] border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-[118px]" />
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to="/"
                                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all border border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/30 hover:text-white group"
                                >
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Exit to Hub</span>
                                    <ChevronDown className="w-3 h-3 rotate-90 opacity-20 group-hover:opacity-100" />
                                </Link>
                            </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 
              =============================================
              MAIN CHAT AREA
              =============================================
            */}
                <div 
                    className="flex-1 flex flex-col relative h-full overflow-hidden"
                >

                    {/* Mobile Header / Sidebar Toggle */}
                     <div 
                        className="absolute top-0 left-0 right-0 z-10 h-14 flex items-center justify-between px-4 bg-black"
                    >
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md hover:bg-white/10 text-white/60 transition-colors"
                                title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Model Dropdown */}
                            <div className="relative" ref={modelSelectorRef}>
                                 <button
                                    onClick={() => setShowModelSelector(!showModelSelector)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black hover:bg-white/5 text-white transition-all"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                                        {model === 'auto' ? (autoModelPicked ? `Auto: ${autoModelPicked}` : 'Auto Select') : currentModel?.label}
                                    </span>
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showModelSelector ? 'rotate-180' : 'text-white/40'}`} />
                                </button>

                                <AnimatePresence>
                                    {showModelSelector && (
                                         <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-white/10 bg-black shadow-2xl overflow-hidden z-[100]"
                                        >
                                            <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Select Model</span>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                {models.map((m) => (
                                                    <button
                                                        key={m.id}
                                                        onClick={() => {
                                                            setModel(m.id);
                                                            setShowModelSelector(false);
                                                        }}
                                                        className={`w-full px-4 py-3 rounded-xl text-left transition-all flex items-center justify-between group/item
                                                        ${model === m.id
                                                                ? 'bg-white/10 border border-white/10'
                                                                : 'hover:bg-white/5 border border-transparent'}
                                                    `}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${model === m.id ? 'text-white' : 'text-white/60'}`}>{m.label}</span>
                                                                </div>
                                                                <p className="text-[9px] text-white/20 tracking-tight mt-0.5 uppercase">{m.description}</p>
                                                            </div>
                                                        </div>
                                                        {model === m.id && (
                                                            <Check className="w-3.5 h-3.5 text-white" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-8">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Projects', path: '/#projects' },
                                { name: 'Team', path: '/founder-connect' },
                                { name: 'Practice', path: '/practice' }
                            ].map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all duration-300 relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                onClick={() => createSession()}
                                className="p-3 rounded-none transition-colors hover:bg-white/10 text-white"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto pt-20 pb-4 scroll-smooth">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6">
                             {chatHistory.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="min-h-[80vh] flex flex-col items-center justify-center text-center"
                                >
                                    <div className="w-20 h-20 rounded-[2.5rem] mb-10 flex items-center justify-center border border-white/20 bg-white/5">
                                        <Logo className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-5xl font-black mb-4 tracking-tighter text-white uppercase">
                                        KAIZEN <span className="opacity-20">AI</span>
                                    </h2>
                                    <p className="max-w-md mb-16 text-white/20 font-bold text-[10px] tracking-[0.3em] uppercase leading-relaxed">
                                        Intelligent AutoML & Data Diagnostics Assistant
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                                        {QUICK_ACTIONS.slice(0, 4).map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setInputValue(action.prompt)}
                                                className="p-6 rounded-3xl text-left transition-all border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] group"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                                                        {action.label}
                                                    </span>
                                                </div>
                                                <p className="text-[12px] font-medium text-white/10 group-hover:text-white/30 transition-colors line-clamp-1 italic">
                                                    {action.prompt}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="space-y-6 pb-4">
                                    {chatHistory.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="w-full border-b border-transparent last:border-0"
                                        >
                                            <div className="max-w-3xl mx-auto px-4 py-8 flex gap-4 md:gap-6">
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-white/10 ${msg.role === 'user' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Logo className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="prose prose-sm max-w-none break-words prose-invert prose-p:leading-relaxed prose-p:mb-4 prose-pre:rounded-none prose-pre:border prose-pre:border-white/10">
                                                        {msg.role === 'assistant' ? (
                                                            <div dangerouslySetInnerHTML={{
                                                                __html: msg.content
                                                                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
                                                                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                                                                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                                            }} />
                                                        ) : (
                                                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    {msg.role === 'assistant' && (
                                                        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => copyToClipboard(msg.content, msg.id)}
                                                                className="p-1 text-white/40 hover:text-white transition-colors"
                                                            >
                                                                {copiedId === msg.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Loading Stream Indicator */}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="max-w-3xl mx-auto px-4 py-8 flex gap-4 md:gap-6"
                                        >
                                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-white/10 bg-black text-white">
                                                <Logo className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 flex items-center gap-4">
                                                <div className="flex gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_0ms]" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_200ms]" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_400ms]" />
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">Thinking...</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mx-auto max-w-md flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-none text-red-500 text-sm"
                                        >
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} className="h-4" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 
                  =============================================
                  INPUT AREA
                  =============================================
                */}
                     <div className="p-4 relative z-20 pb-[max(2rem,env(safe-area-inset-bottom))] bg-black">
                        <div className="max-w-2xl mx-auto relative group">
                             <div className="relative flex items-center gap-2 rounded-full px-5 py-2.5 border border-white/20 bg-black focus-within:border-white/40 transition-all duration-300">
                                {isLoading && (
                                    <button
                                        onClick={stopGeneration}
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all text-[9px] font-bold uppercase tracking-widest z-50"
                                    >
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-sm animate-pulse" />
                                        Stop
                                    </button>
                                )}
                                <textarea
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about Python, AutoML, or KaizenStat..."
                                    className={`flex-1 bg-transparent resize-none focus:outline-none py-1.5 max-h-32 min-h-[24px] text-base md:text-[13px] text-white placeholder:text-gray-500
                                `}
                                    rows={1}
                                    style={{
                                        height: 'auto',
                                        overflow: 'hidden'
                                    }}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    className={`p-2.5 rounded-full transition-all duration-300 ${inputValue.trim() && !isLoading
                                            ? 'bg-white text-black shadow-lg shadow-white/10 hover:scale-110 active:scale-90'
                                            : 'bg-white/5 text-white/10 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-3">
                                <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase">
                                    KaizenStat AI
                                </p>
                                <span className="text-[9px] px-2 py-0.5 rounded-none border border-white/10 text-white/20 font-mono tracking-widest uppercase">
                                    Engine: {model === 'auto' && autoModelPicked ? autoModelPicked : (currentModel?.name || 'KAIZEN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Warning Modal */}
            <AnimatePresence>
                {showDeleteWarning && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setShowDeleteWarning(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-xs bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl shadow-2xl text-center"
                        >
                            <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-4" />
                            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Delete Action</h3>
                            <p className="text-[11px] text-white/40 mb-6 leading-relaxed">
                                Are you sure? This action will permanently remove your locally saved data.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteWarning(null)}
                                    className="flex-1 py-2 rounded-xl bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        showDeleteWarning();
                                        setShowDeleteWarning(null);
                                    }}
                                    className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

