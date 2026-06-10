import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Personality Types
export type PersonalityType = 'teacher' | 'friend' | 'senior-dev' | 'mentor' | 'exam-helper';

// Model Types - Includes fallback
export type ModelType = 'gemini' | 'gemma-4b' | 'gemini-flash' | 'deepseek-r1' | 'auto';

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
    isTemp?: boolean;
    folderId?: string | null;
}

export interface Folder {
    id: string;
    name: string;
    updatedAt: Date;
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
    createSession: (isTemp?: boolean) => void;
    loadSession: (id: string) => void;
    deleteSession: (id: string) => void;
    clearAllSessions: () => void;
    updateSessionTitle: (id: string, newTitle: string) => void;

    // Chat Actions
    chatHistory: ChatMessage[];
    addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    clearHistory: () => void;

    // Folder Management
    folders: Folder[];
    createFolder: () => void;
    renameFolder: (id: string, name: string) => void;
    deleteFolder: (id: string) => void;
    moveSessionToFolder: (sessionId: string, folderId: string | null) => void;

    personalities: PersonalityOption[];
    models: ModelOption[];
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Personality Definitions with System Prompts
export const PERSONALITIES: PersonalityOption[] = [
    {
        id: 'teacher',
        name: 'Teacher',
        icon: 'T',
        description: 'Formal, structured, exam-focused explanations',
        systemPrompt: `You are a patient Python Data Science teacher named Kaizen.`
    },
    {
        id: 'friend',
        name: 'Friend',
        icon: 'F',
        description: 'Casual, motivating, simple explanations',
        systemPrompt: `You are a friendly study buddy named Kaizen who loves Python and Data Science.`
    },
    {
        id: 'senior-dev',
        name: 'Senior Dev',
        icon: 'S',
        description: 'Direct, practical, industry best practices',
        systemPrompt: `You are a senior Python data scientist with 10+ years of industry experience.`
    },
    {
        id: 'mentor',
        name: 'Data Mentor',
        icon: 'M',
        description: 'Project-oriented, career advice',
        systemPrompt: `You are a Data Science career mentor named Kaizen.`
    },
    {
        id: 'exam-helper',
        name: 'Exam Helper',
        icon: 'E',
        description: 'Short, precise, exam-format answers',
        systemPrompt: `You are an exam preparation assistant for Data Science named Kaizen.`
    }
];

// Model Definitions - All available models
export const MODELS: ModelOption[] = [
    {
        id: 'auto',
        name: 'Auto Select',
        label: 'Auto Model',
        description: 'Optimized Selection'
    },
    {
        id: 'deepseek-r1',
        name: 'DeepSeek R1',
        label: 'DeepSeek R1',
        description: 'Deep Reasoning'
    },
    {
        id: 'gemini',
        name: 'Gemini 2.0 Flash',
        label: 'Gemini 2.0',
        description: 'Instant Response'
    },
    {
        id: 'gemma-4b',
        name: 'Gemma 3 4B',
        label: 'Gemma 3 4B',
        description: 'Ultra Fast'
    },
    {
        id: 'gemini-flash',
        name: 'Gemini 2.0 Flash (OR)',
        label: 'Gemini 2.0 OR',
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

// Context is created here
const AIContext = createContext<AIContextState | undefined>(undefined);

const STORAGE_KEYS = {
    personality: 'kaizen-ai-personality',
    model: 'kaizen-ai-model',
    skillLevel: 'kaizen-ai-skill-level',
    sessions: 'kaizen-ai-sessions',
    folders: 'kaizen-ai-folders',
    activeSessionId: 'kaizen-ai-active-session-id',
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
        return (saved as ModelType) || 'deepseek-r1';
    });
    const [skillLevel, setSkillLevelState] = useState<'beginner' | 'intermediate' | 'advanced'>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.skillLevel);
        return (saved as 'beginner' | 'intermediate' | 'advanced') || 'beginner';
    });

    // Force dark mode only
    const theme = 'dark';

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

    const [folders, setFolders] = useState<Folder[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.folders);
        if (saved) {
            try {
                return JSON.parse(saved).map((f: Folder) => ({
                    ...f,
                    updatedAt: new Date(f.updatedAt)
                }));
            } catch { return []; }
        }
        return [];
    });

    // Persistence Effects
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.personality, personality); }, [personality]);
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.model, model); }, [model]);
    useEffect(() => { localStorage.setItem(STORAGE_KEYS.skillLevel, skillLevel); }, [skillLevel]);

    // Theme is now always 'light' - no effect needed

    useEffect(() => {
        const persistSessions = sessions.filter(s => !s.isTemp);
        localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(persistSessions));
    }, [sessions]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.folders, JSON.stringify(folders));
    }, [folders]);

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
    const createSession = (isTemp = false) => {
        // Prevent multiple empty sessions
        const emptySession = sessions.find(s => s.messages.length === 0 && !s.isTemp);
        if (emptySession && !isTemp) {
            setActiveSessionId(emptySession.id);
            return;
        }

        const newSession: Session = {
            id: generateId(),
            title: isTemp ? 'Temporary Chat' : 'New Conversation',
            messages: [],
            updatedAt: new Date(),
            preview: isTemp ? 'This chat won\'t be saved' : 'Start a new chat...',
            isTemp
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
        setFolders([]);
        setActiveSessionId(null);
        localStorage.removeItem(STORAGE_KEYS.sessions);
        localStorage.removeItem(STORAGE_KEYS.folders);
        localStorage.removeItem(STORAGE_KEYS.activeSessionId);
        setTimeout(() => createSession(), 0);
    };

    const updateSessionTitle = (id: string, newTitle: string) => {
        setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle } : s));
    };

    const createFolder = () => {
        const newFolder: Folder = {
            id: generateId(),
            name: 'New Folder',
            updatedAt: new Date()
        };
        setFolders(prev => [newFolder, ...prev]);
    };

    const renameFolder = (id: string, name: string) => {
        setFolders(prev => prev.map(f => f.id === id ? { ...f, name, updatedAt: new Date() } : f));
    };

    const deleteFolder = (id: string) => {
        setFolders(prev => prev.filter(f => f.id !== id));
        // Move sessions to root
        setSessions(prev => prev.map(s => s.folderId === id ? { ...s, folderId: null } : s));
    };

    const moveSessionToFolder = (sessionId: string, folderId: string | null) => {
        setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, folderId } : s));
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
    // Theme functions removed - light mode only
    const toggleTheme = () => { }; // No-op

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

            // Folder Stuff
            folders,
            createFolder,
            renameFolder,
            deleteFolder,
            moveSessionToFolder,

            chatHistory,
            addMessage,
            clearHistory,

            personalities: PERSONALITIES,
            models: MODELS,
            theme, 
            setTheme: () => {},
            toggleTheme
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
