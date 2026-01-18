import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Personality Types
export type PersonalityType = 'teacher' | 'friend' | 'senior-dev' | 'mentor' | 'exam-helper';

// Model Types - Includes fallback
export type ModelType = 'gemini' | 'gemma-4b' | 'gemini-flash' | 'deepseek-r1';

export interface PersonalityOption {
    id: PersonalityType;
    name: string;
    icon: string;
    description: string;
    systemPrompt: string;
}

export interface ModelOption {
    id: ModelType;
    name: string;
    label: string;
    description: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    personality?: PersonalityType;
    model?: ModelType;
}

// Session Interface
export interface Session {
    id: string;
    title: string;
    messages: ChatMessage[];
    updatedAt: Date;
    preview: string;
}

interface AIContextState {
    personality: PersonalityType;
    setPersonality: (p: PersonalityType) => void;
    model: ModelType;
    setModel: (m: ModelType) => void;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    setSkillLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;

    // Session Management
    sessions: Session[];
    activeSessionId: string | null;
    activeSession: Session | undefined;
    createSession: () => void;
    loadSession: (id: string) => void;
    deleteSession: (id: string) => void;
    clearAllSessions: () => void;
    updateSessionTitle: (id: string, newTitle: string) => void;

    // Chat Actions
    chatHistory: ChatMessage[];
    addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    clearHistory: () => void;

    personalities: PersonalityOption[];
    models: ModelOption[];
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    toggleTheme: () => void;
}

// Personality Definitions with System Prompts
export const PERSONALITIES: PersonalityOption[] = [
    {
        id: 'teacher',
        name: 'Teacher',
        icon: '👨‍🏫',
        description: 'Formal, structured, exam-focused explanations',
        systemPrompt: `You are a patient Python Data Science teacher named Kaizen.
Your teaching style:
- Explain concepts clearly in simple English first, then add complexity
- Use proper headings, bullet points, and structured formatting
- Include Python code examples with detailed comments
- Focus on exam-relevant concepts and common interview questions
- Warn about common mistakes students make
- Use real-life analogies to explain abstract concepts
- Always assume the user is a student learning data science`
    },
    {
        id: 'friend',
        name: 'Friend',
        icon: '🤝',
        description: 'Casual, motivating, simple explanations',
        systemPrompt: `You are a friendly study buddy named Kaizen who loves Python and Data Science.
Your style:
- Keep it casual and motivating - you're here to help, not lecture!
- Use simple words and avoid heavy jargon unless asked
- Be encouraging - celebrate small wins
- Focus on intuition over theory
- Share quick tips and tricks
- Use emojis occasionally to keep it fun 🎯
- Make complex things feel approachable`
    },
    {
        id: 'senior-dev',
        name: 'Senior Dev',
        icon: '🧑‍💻',
        description: 'Direct, practical, industry best practices',
        systemPrompt: `You are a senior Python data scientist with 10+ years of industry experience.
Your style:
- Be direct and concise - time is valuable
- Focus on production-ready code and best practices
- Emphasize performance optimization and clean code
- Share real-world gotchas and edge cases
- Assume some prior knowledge - skip the basics unless asked
- Recommend industry-standard tools and libraries
- Point out code smells and anti-patterns`
    },
    {
        id: 'mentor',
        name: 'Data Mentor',
        icon: '📊',
        description: 'Project-oriented, career advice',
        systemPrompt: `You are a Data Science career mentor named Kaizen.
Your focus:
- Project-oriented explanations - always think about practical applications
- Provide career advice and resume-building tips
- Explain the "why" not just the "how"
- Suggest project ideas and portfolio improvements
- Guide on industry trends and in-demand skills
- Help with interview preparation
- Recommend learning paths and resources`
    },
    {
        id: 'exam-helper',
        name: 'Exam Helper',
        icon: '🧪',
        description: 'Short, precise, exam-format answers',
        systemPrompt: `You are an exam preparation assistant for Data Science named Kaizen.
Your format:
- Provide SHORT, PRECISE answers optimized for exams
- Structure answers in 2-mark, 5-mark, or 7-mark format when relevant
- Include key definitions with examples
- Highlight important formulas and concepts
- Use bullet points for quick revision
- Focus on what's likely to be tested
- Include quick memory tricks and mnemonics`
    }
];

// Model Definitions - All available models
export const MODELS: ModelOption[] = [
    {
        id: 'gemini',
        name: 'Gemini 2.0 Flash',
        label: '⚡ Gemini 2.0',
        description: 'Instant Response'
    },
    {
        id: 'gemma-4b',
        name: 'Gemma 3 4B',
        label: '🚀 Gemma 3 4B',
        description: 'Ultra Fast'
    },
    {
        id: 'deepseek-r1',
        name: 'DeepSeek R1',
        label: '🧠 DeepSeek R1',
        description: 'Deep Reasoning'
    },
    {
        id: 'gemini-flash',
        name: 'Gemini 2.0 Flash (OR)',
        label: '✨ Gemini 2.0 OR',
        description: 'OpenRouter'
    }
];

// Personality to Model Mapping - Auto-select optimal model
export const PERSONALITY_MODEL_MAP: Record<PersonalityType, ModelType> = {
    'friend': 'gemma-4b',        // Casual, fast
    'teacher': 'deepseek-r1',    // Deep reasoning for teaching
    'mentor': 'deepseek-r1',     // Deep reasoning for guidance
    'exam-helper': 'gemini',     // Fast accurate answers
    'senior-dev': 'gemini'       // Speed coding
};

const AIContext = createContext<AIContextState | undefined>(undefined);

// Session Interface
export interface Session {
    id: string;
    title: string;
    messages: ChatMessage[];
    updatedAt: Date;
    preview: string;
}

interface AIContextState {
    personality: PersonalityType;
    setPersonality: (p: PersonalityType) => void;
    model: ModelType;
    setModel: (m: ModelType) => void;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    setSkillLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;

    // Session Management
    sessions: Session[];
    activeSessionId: string | null;
    activeSession: Session | undefined;
    createSession: () => void;
    loadSession: (id: string) => void;
    deleteSession: (id: string) => void;
    clearAllSessions: () => void;
    updateSessionTitle: (id: string, newTitle: string) => void;

    // Chat Actions
    chatHistory: ChatMessage[]; // Kept for backward compat (alias for activeSession.messages)
    addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    clearHistory: () => void; // Deprecated, aliases to createSession

    personalities: PersonalityOption[];
    models: ModelOption[];
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    toggleTheme: () => void;
}

// ... existing Personality/Model configs ...

const STORAGE_KEYS = {
    personality: 'kaizen-ai-personality',
    model: 'kaizen-ai-model',
    skillLevel: 'kaizen-ai-skill-level',
    sessions: 'kaizen-ai-sessions', // New key for all sessions
    activeSessionId: 'kaizen-ai-active-session-id', // New key
    theme: 'kaizen-ai-theme'
};

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // ... existing preferences state ...
    const [personality, setPersonalityState] = useState<PersonalityType>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.personality);
        return (saved as PersonalityType) || 'teacher';
    });
    const [model, setModelState] = useState<ModelType>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.model);
        return (saved as ModelType) || 'gemini';
    });
    const [skillLevel, setSkillLevelState] = useState<'beginner' | 'intermediate' | 'advanced'>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.skillLevel);
        return (saved as 'beginner' | 'intermediate' | 'advanced') || 'beginner';
    });
    const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.theme);
        return (saved as 'light' | 'dark') || 'dark';
    });

    // Session State
    const [sessions, setSessions] = useState<Session[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.sessions);
        if (saved) {
            try {
                return JSON.parse(saved).map((s: Session) => ({
                    ...s,
                    updatedAt: new Date(s.updatedAt),
                    messages: s.messages.map(m => ({
                        ...m,
                        timestamp: new Date(m.timestamp)
                    }))
                }));
            } catch { return []; }
        }
        return [];
    });

    const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEYS.activeSessionId) || null;
    });

    // Persistence Effects
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.personality, personality); }, [personality]);
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.model, model); }, [model]);
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.skillLevel, skillLevel); }, [skillLevel]);
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.theme, theme); }, [theme]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
    }, [sessions]);

    useEffect(() => {
        if (activeSessionId) {
            localStorage.setItem(STORAGE_KEYS.activeSessionId, activeSessionId);
        } else {
            localStorage.removeItem(STORAGE_KEYS.activeSessionId);
        }
    }, [activeSessionId]);

    // Initialize default session if none exist
    useEffect(() => {
        if (sessions.length === 0 && !activeSessionId) {
            createSession();
        }
    }, []);

    // Helper: Generate ID
    const generateId = () => crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`;

    // Actions
    const createSession = () => {
        const newSession: Session = {
            id: generateId(),
            title: 'New Conversation',
            messages: [],
            updatedAt: new Date(),
            preview: 'Start a new chat...'
        };
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
    };

    const loadSession = (id: string) => {
        if (sessions.find(s => s.id === id)) {
            setActiveSessionId(id);
        }
    };

    const deleteSession = (id: string) => {
        const newSessions = sessions.filter(s => s.id !== id);
        setSessions(newSessions);
        if (activeSessionId === id) {
            setActiveSessionId(newSessions.length > 0 ? newSessions[0].id : null);
            if (newSessions.length === 0) createSession();
        }
    };

    const clearAllSessions = () => {
        setSessions([]);
        setActiveSessionId(null);
        localStorage.removeItem(STORAGE_KEYS.sessions);
        localStorage.removeItem(STORAGE_KEYS.activeSessionId);
        setTimeout(() => createSession(), 0);
    };

    const updateSessionTitle = (id: string, newTitle: string) => {
        setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
    };

    // Derived State
    const activeSession = sessions.find(s => s.id === activeSessionId);

    const addMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        if (!activeSessionId) {
            createSession(); // Should trigger re-render, but safest to wait or force logic. 
            // Better: create explicitly if missing.
            // For now, assume activeSessionId exists due to init effect.
        }

        setSessions(prev => {
            return prev.map(session => {
                if (session.id === activeSessionId) {
                    const newMessage: ChatMessage = {
                        ...msg,
                        id: generateId(),
                        timestamp: new Date()
                    };

                    // Auto-generate title from first user message
                    let newTitle = session.title;
                    if (session.messages.length === 0 && msg.role === 'user') {
                        newTitle = msg.content.slice(0, 30) + (msg.content.length > 30 ? '...' : '');
                    }

                    return {
                        ...session,
                        title: newTitle,
                        messages: [...session.messages, newMessage],
                        updatedAt: new Date(),
                        preview: newMessage.content.slice(0, 50)
                    };
                }
                return session;
            });
        });
    };

    // Backward compatibility Wrappers
    const chatHistory = activeSession ? activeSession.messages : [];
    const clearHistory = createSession; // "New Chat" button maps to this

    const setPersonality = (p: PersonalityType) => {
        setPersonalityState(p);
        const optimalModel = PERSONALITY_MODEL_MAP[p];
        if (optimalModel) setModelState(optimalModel);
    };
    const setModel = (m: ModelType) => setModelState(m);
    const setSkillLevel = (level: 'beginner' | 'intermediate' | 'advanced') => setSkillLevelState(level);
    const setTheme = (t: 'light' | 'dark') => setThemeState(t);
    const toggleTheme = () => setThemeState(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <AIContext.Provider value={{
            personality, setPersonality,
            model, setModel,
            skillLevel, setSkillLevel,

            // Session Stuff
            sessions,
            activeSessionId,
            activeSession,
            createSession,
            loadSession,
            deleteSession,
            clearAllSessions,
            updateSessionTitle,

            chatHistory,
            addMessage,
            clearHistory,

            personalities: PERSONALITIES,
            models: MODELS,
            theme, setTheme, toggleTheme
        }}>
            {children}
        </AIContext.Provider>
    );
};

export const useAI = () => {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error('useAI must be used within an AIProvider');
    }
    return context;
};
