import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Sparkles, Trash2, ChevronDown, Moon, Sun, Menu, X,
    Plus, MessageSquare, Bot, User, Copy, Check, Loader2, AlertCircle,
    Settings, Zap
} from 'lucide-react';
import { useAI, ModelType } from '../contexts/AIContext';
import { sendChatMessage, QUICK_ACTIONS } from '../services/AIService';

// Premium Model Badge Colors
const ModelBadgeColors: Record<ModelType, string> = {
    'gemini': 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    'gemma-4b': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
    'gemini-flash': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20',
    'deepseek-r1': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
};

export const KaizenAI: React.FC = () => {
    const {
        model, setModel,
        chatHistory, addMessage,
        sessions, activeSessionId, createSession, loadSession, deleteSession,
        models, theme, toggleTheme
    } = useAI();

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showModelSelector, setShowModelSelector] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);

    // Page-specific dark mode (independent of global theme)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('kaizen-ai-theme');
        return saved === 'dark';
    });

    // Persist dark mode preference
    useEffect(() => {
        localStorage.setItem('kaizen-ai-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const togglePageTheme = () => setIsDarkMode(prev => !prev);

    // Close sidebar on mobile when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

        try {
            const response = await sendChatMessage({
                message: userMessage,
                personality: 'teacher',
                model,
                chatHistory
            });

            if (response.error) {
                setError(response.error);
            } else {
                addMessage({
                    role: 'assistant',
                    content: response.content,
                    model
                });
            }
        } catch (err) {
            setError('Failed to get response. Please try again.');
        } finally {
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
        <div className={isDarkMode ? 'dark' : ''}>
            <div className={`flex h-[100dvh] overflow-hidden font-sans selection:bg-violet-500/30
                ${isDarkMode ? 'bg-[#09090b] text-gray-100' : 'bg-transparent text-gray-900'}
            `}>
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
                <AnimatePresence mode="wait">
                    {sidebarOpen && (
                        <motion.div
                            initial={{ x: -280, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -280, opacity: 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className={`flex flex-col border-r h-full flex-shrink-0 z-50
                            fixed inset-y-0 left-0 w-[280px] md:relative md:w-auto
                            ${isDarkMode
                                    ? 'bg-[#0c0c0e] border-white/5'
                                    : 'bg-gray-50/80 border-gray-200 backdrop-blur-xl'}
                        `}
                        >
                            {/* Sidebar Header */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className={`font-bold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Kaizen AI
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-medium text-violet-500 uppercase tracking-wide leading-none">Beta Stage</span>
                                        <span className="text-[10px] text-gray-400">•</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className={`p-2 rounded-lg transition-colors md:hidden ${isDarkMode ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-gray-200/50 text-gray-500'}`}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-4 pb-2">
                                <button
                                    onClick={() => createSession()}
                                    className={`w-full group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 border 
                                    ${isDarkMode
                                            ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10 text-gray-200'
                                            : 'bg-white hover:bg-white/80 border-gray-200 hover:border-gray-300 shadow-sm text-gray-700'}
                                `}
                                >
                                    <Plus className={`w-4 h-4 transition-transform group-hover:rotate-90 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                                    <span className="font-medium text-sm">New conversation</span>
                                </button>
                            </div>

                            {/* Chat History List */}
                            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-700/20">
                                <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Recent
                                </div>
                                {sessions.length > 0 ? (
                                    sessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer
                                            ${session.id === activeSessionId
                                                    ? (isDarkMode ? 'bg-white/10 text-gray-100' : 'bg-white shadow-sm text-gray-900')
                                                    : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-800')}
                                        `}
                                            onClick={() => loadSession(session.id)}
                                        >
                                            <MessageSquare className={`w-4 h-4 shrink-0 ${session.id === activeSessionId ? (isDarkMode ? 'text-violet-400' : 'text-violet-600') : 'opacity-50'}`} />
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm truncate font-medium">{session.title}</p>
                                            </div>

                                            {/* Updated Delete Button - Visible on Group Hover */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteSession(session.id);
                                                }}
                                                className={`opacity-0 group-hover:opacity-100 p-1.5 rounded-md transition-all
                                                ${isDarkMode
                                                        ? 'hover:bg-red-500/20 text-gray-500 hover:text-red-400'
                                                        : 'hover:bg-red-50 text-gray-400 hover:text-red-500'}
                                            `}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>

                                            {session.id === activeSessionId && (
                                                <div className={`absolute left-0 w-0.5 h-4 bg-violet-500 rounded-r-full top-1/2 -translate-y-1/2`} />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className={`text-center py-8 px-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                        <p className="text-xs">No history yet</p>
                                    </div>
                                )}
                            </div>

                            {/* User / Settings Footer */}
                            <div className={`p-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-200'}`}>

                                <div className="flex items-center gap-2 pb-4">
                                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-500'}`} />
                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Data saved locally</span>
                                </div>

                                <button
                                    onClick={togglePageTheme}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors border
                                    ${isDarkMode
                                            ? 'bg-[#18181b] hover:bg-[#202023] border-white/5 text-gray-300'
                                            : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'}
                                `}
                                >
                                    <div className="flex items-center gap-3">
                                        {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                        <span className="text-sm font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                                    </div>
                                    <div className={`w-9 h-5 rounded-full relative transition-colors duration-200 ease-in-out ${isDarkMode ? 'bg-violet-600' : 'bg-gray-200'}`}>
                                        <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                </button>

                                <Link
                                    to="/"
                                    className={`mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                                    ${isDarkMode
                                            ? 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
                                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}
                                `}
                                >
                                    <ChevronDown className="w-4 h-4 rotate-90" />
                                    <span className="text-sm font-medium">Back to Home</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 
              =============================================
              MAIN CHAT AREA
              =============================================
            */}
                <div className="flex-1 flex flex-col relative h-full">

                    {/* Mobile Header / Sidebar Toggle */}
                    <div className={`
                    absolute top-0 left-0 right-0 z-10 h-16 flex items-center justify-between px-4 backdrop-blur-md border-b
                    ${isDarkMode ? 'bg-[#09090b]/80 border-white/5' : 'bg-white/80 border-gray-200/50'}
                `}>
                        <div className="flex items-center gap-3">
                            {!sidebarOpen && (
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                            )}

                            {/* Model Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowModelSelector(!showModelSelector)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all border
                                    ${isDarkMode
                                            ? 'hover:bg-white/5 border-white/5 hover:border-white/10 text-gray-200'
                                            : 'hover:bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700'}
                                `}
                                >
                                    <span className="text-sm font-medium">{currentModel?.label}</span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showModelSelector ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showModelSelector && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            className={`absolute top-full left-0 mt-2 w-72 rounded-xl border shadow-2xl overflow-hidden z-50
                                            ${isDarkMode ? 'bg-[#18181b] border-white/10' : 'bg-white border-gray-100 ring-1 ring-black/5'}
                                        `}
                                        >
                                            <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider border-b ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'}`}>
                                                Select Model
                                            </div>
                                            <div className="p-1.5 space-y-0.5">
                                                {models.map((m) => (
                                                    <button
                                                        key={m.id}
                                                        onClick={() => {
                                                            setModel(m.id);
                                                            setShowModelSelector(false);
                                                        }}
                                                        className={`w-full px-3 py-2.5 rounded-lg text-left transition-all flex items-start justify-between group
                                                        ${model === m.id
                                                                ? (isDarkMode ? 'bg-white/10' : 'bg-gray-100')
                                                                : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50')}
                                                    `}
                                                    >
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{m.label}</span>
                                                                <span className={`text-[10px] px-1.5 py-0.5 rounded border border-current opacity-60 ${ModelBadgeColors[m.id]} bg-transparent`}>
                                                                    AI
                                                                </span>
                                                            </div>
                                                            <p className={`text-xs mt-0.5 line-clamp-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                                {m.description}
                                                            </p>
                                                        </div>
                                                        {model === m.id && (
                                                            <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {[
                                { name: 'Practice', path: '/' },
                                { name: 'About', path: '/about' },
                                { name: 'Events', path: '/events' }
                            ].map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-xs font-bold uppercase tracking-wider transition-colors
                                    ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}
                                `}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                onClick={() => createSession()}
                                className={`p-3 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
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
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="min-h-[60vh] flex flex-col items-center justify-center text-center"
                                >
                                    <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center shadow-2xl relative
                                    ${isDarkMode ? 'bg-white/5 shadow-violet-500/10' : 'bg-white shadow-violet-500/20'}
                                `}>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 rounded-3xl blur-xl" />
                                        <Bot className={`w-10 h-10 relative z-10 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                                    </div>
                                    <h2 className={`text-3xl font-bold mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
                                    </h2>
                                    <p className={`max-w-md mb-12 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        I'm Kaizen, your advanced Data Science assistant. How can I facilitate your learning today?
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                                        {QUICK_ACTIONS.slice(0, 4).map((action, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setInputValue(action.prompt)}
                                                className={`p-4 rounded-xl text-left transition-all border group
                                                ${isDarkMode
                                                        ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10'
                                                        : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'}
                                            `}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={`font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                        {action.label}
                                                    </span>
                                                    <Zap className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                                                </div>
                                                <p className={`text-xs line-clamp-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                    "{action.prompt}"
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
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}
                                        >
                                            {/* Assistant Avatar */}
                                            {msg.role === 'assistant' && (
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-lg
                                                ${isDarkMode ? 'bg-violet-600 shadow-violet-900/20' : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-violet-500/30'}
                                            `}>
                                                    <Bot className="w-5 h-5 text-white" />
                                                </div>
                                            )}

                                            <div className={`relative max-w-[85%] md:max-w-[75%] lg:max-w-[65%] group`}>
                                                <div className={`rounded-2xl px-5 py-3.5 shadow-sm
                                                ${msg.role === 'user'
                                                        ? (isDarkMode
                                                            ? 'bg-white text-black rounded-tr-sm'
                                                            : 'bg-black text-white rounded-tr-sm')
                                                        : (isDarkMode
                                                            ? 'bg-[#18181b] border border-white/5 text-gray-200 rounded-tl-sm'
                                                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm')}
                                            `}>
                                                    <div className={`prose prose-sm max-w-none break-words
                                                    ${msg.role === 'user'
                                                            ? (isDarkMode
                                                                ? 'prose-headings:text-black prose-p:text-black prose-strong:text-black prose-li:text-black text-black'
                                                                : 'prose-headings:text-white prose-p:text-white prose-strong:text-white prose-li:text-white text-white')
                                                            : (isDarkMode
                                                                ? 'prose-invert text-gray-100 prose-p:text-gray-100 prose-headings:text-white prose-strong:text-white prose-li:text-gray-100 prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none [&_pre_code]:bg-transparent [&_pre_code]:text-gray-200 [&_pre_code]:p-0'
                                                                : 'prose-stone text-gray-900 prose-p:text-gray-900 prose-headings:text-black prose-strong:text-black prose-li:text-gray-900 prose-pre:bg-[#0d0d0d] prose-pre:text-gray-100 prose-pre:rounded-xl prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none [&_pre_code]:bg-transparent [&_pre_code]:text-gray-200 [&_pre_code]:p-0')}
                                                `}>
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
                                                </div>

                                                {/* Action Buttons for Assistant */}
                                                {msg.role === 'assistant' && (
                                                    <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-1">
                                                        <button
                                                            onClick={() => copyToClipboard(msg.content, msg.id)}
                                                            className={`p-1 rounded hover:bg-black/5 transition-colors flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                                                        >
                                                            {copiedId === msg.id ? (
                                                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                            ) : (
                                                                <Copy className="w-3.5 h-3.5" />
                                                            )}
                                                            <span>Copy</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* User Avatar */}
                                            {msg.role === 'user' && (
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-sm
                                                ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}
                                            `}>
                                                    <User className="w-5 h-5" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}

                                    {/* Loading Stream Indicator */}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex gap-4 md:gap-6"
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-lg
                                            ${isDarkMode ? 'bg-violet-600 shadow-violet-900/20' : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-violet-500/30'}
                                        `}>
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                            <div className={`rounded-2xl px-5 py-4 flex items-center gap-3 w-fit
                                            ${isDarkMode
                                                    ? 'bg-[#18181b] border border-white/5'
                                                    : 'bg-white border border-gray-100 shadow-sm'}
                                        `}>
                                                <div className="flex gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-[bounce_1s_infinite_0ms]" />
                                                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-[bounce_1s_infinite_200ms]" />
                                                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-[bounce_1s_infinite_400ms]" />
                                                </div>
                                                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Kaizen is thinking...</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mx-auto max-w-md flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm"
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
                    <div className={`p-4 relative z-20 pb-[max(1rem,env(safe-area-inset-bottom))]
                    ${isDarkMode ? 'bg-[#09090b]' : 'bg-white'}
                `}>
                        <div className="max-w-3xl mx-auto relative group">
                            {/* Gradient Glow Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl opacity-0 group-focus-within:opacity-20 transition-opacity blur-lg duration-500`} />

                            <div className={`relative flex items-end gap-2 rounded-2xl px-4 py-3 shadow-lg border transition-colors
                            ${isDarkMode
                                    ? 'bg-[#18181b] border-white/5 focus-within:border-white/10'
                                    : 'bg-white border-gray-200 focus-within:border-gray-300'}
                        `}>
                                <textarea
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about Python, Data Science, or anything..."
                                    className={`flex-1 bg-transparent resize-none focus:outline-none py-1.5 max-h-32 min-h-[24px] text-base md:text-sm
                                    ${isDarkMode
                                            ? 'text-gray-100 placeholder:text-gray-500'
                                            : 'text-gray-900 placeholder:text-gray-400'}
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
                                    className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center
                                    ${!inputValue.trim() || isLoading
                                            ? (isDarkMode ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed')
                                            : 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700 hover:scale-105 active:scale-95'}
                                `}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5 ml-0.5" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-3">
                                <p className={`text-[10px] text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Kaizen AI can make mistakes. Consider checking important information.
                                </p>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isDarkMode ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10' : 'border-emerald-200 text-emerald-600 bg-emerald-50'}`}>
                                    Running on {currentModel?.name || 'Kaizen AI'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

