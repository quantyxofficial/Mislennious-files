import { ModelType, ChatMessage } from '../contexts/AIContext';

// ===================================
// API CONFIGURATION
// ===================================

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Gemini API Keys (Google AI Studio - rotated randomly)
const GEMINI_API_KEYS = [
    import.meta.env.VITE_GEMINI_KEY_1 || '',
    import.meta.env.VITE_GEMINI_KEY_2 || '',
    import.meta.env.VITE_GEMINI_KEY_3 || ''
].filter(key => key.length > 0);

// OpenRouter API Keys - MAPPED TO SPECIFIC MODELS
const OPENROUTER_MODEL_KEYS: Record<string, string> = {
    'gemma-4b': import.meta.env.VITE_OPENROUTER_GEMMA_4B || '',
    'gemini-flash': import.meta.env.VITE_OPENROUTER_GEMINI_FLASH || '',
    'deepseek-r1': import.meta.env.VITE_OPENROUTER_DEEPSEEK_R1 || ''
};

// OpenRouter Model IDs
const OPENROUTER_MODELS: Record<string, string> = {
    'gemma-4b': 'google/gemma-3-4b-it',
    'gemini-flash': 'google/gemini-2.0-flash-exp:free',
    'deepseek-r1': 'deepseek/deepseek-r1:free'
};

// Per-model optimized configs for REAL-TIME feel
const MODEL_CONFIGS: Record<string, { maxTokens: number; temperature: number; historyLimit: number }> = {
    'gemini': { maxTokens: 400, temperature: 0.3, historyLimit: 2 },      // Direct Google - FAST
    'gemma-4b': { maxTokens: 200, temperature: 0.2, historyLimit: 2 },    // Ultra-short responses
    'gemini-flash': { maxTokens: 400, temperature: 0.3, historyLimit: 2 },// OpenRouter Gemini
    'deepseek-r1': { maxTokens: 400, temperature: 0.3, historyLimit: 3 }  // DeepReasoning
};

// Get a random Gemini API key
const getRandomGeminiKey = (): string => {
    if (GEMINI_API_KEYS.length === 0) {
        console.warn('No Gemini API keys configured');
        return '';
    }
    const randomIndex = Math.floor(Math.random() * GEMINI_API_KEYS.length);
    return GEMINI_API_KEYS[randomIndex];
};

// Get OpenRouter API key for SPECIFIC model
const getOpenRouterKey = (model: string): string => {
    const key = OPENROUTER_MODEL_KEYS[model];
    if (!key) {
        console.warn(`No API key for model: ${model}`);
        return '';
    }
    return key;
};

interface ChatRequest {
    message: string;
    personality: string;
    model: ModelType;
    chatHistory: ChatMessage[];
}

interface ChatResponse {
    content: string;
    error?: string;
}

// Simple, fast system prompt - responds naturally to ANY input
const buildSystemPrompt = (): string => {
    return `You are Kaizen AI, a Python and Data Science expert.
RULES:
- Talk like a human, not a robot. Be friendly, slightly casual, but precise.
- Use natural language (e.g., "Sure!", "Here's how...", "Great question").
- Keep answers CONCISE (1-3 sentences) unless asked for details.
- For code, give extremely minimal, working examples.
- Don't lecture. Just help.
- If user greets, greet back warmly.`;
};

/**
 * Send message using Google Gemini API (with rotating keys)
 */
async function sendGeminiMessage(
    message: string,
    personality: string,
    chatHistory: ChatMessage[]
): Promise<ChatResponse> {
    const apiKey = getRandomGeminiKey();

    if (!apiKey) {
        // Fallback to OpenRouter Gemini Flash
        console.log('No Gemini keys available, trying OpenRouter Gemini Flash...');
        return sendOpenRouterMessage(message, personality, 'gemini-flash' as ModelType, chatHistory);
    }

    const systemPrompt = buildSystemPrompt();
    const config = MODEL_CONFIGS['gemini'];

    // Build conversation history for Gemini format (limited for speed)
    const contents = [
        {
            role: 'user',
            parts: [{ text: systemPrompt }]
        },
        {
            role: 'model',
            parts: [{ text: 'Got it. How can I help?' }]
        },
        ...chatHistory.slice(-config.historyLimit).flatMap(msg => [{
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }]),
        {
            role: 'user',
            parts: [{ text: message }]
        }
    ];

    try {
        const response = await fetch(`${GEMINI_BASE_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: config.temperature,
                    topK: 15,
                    topP: 0.85,
                    maxOutputTokens: config.maxTokens
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Gemini API Error:', errorData);

            // If quota exceeded, fallback to OpenRouter Gemini Flash
            if (response.status === 429 || errorData.error?.message?.includes('quota')) {
                console.log('Gemini quota exceeded, falling back to OpenRouter...');
                return sendOpenRouterMessage(message, personality, 'gemini-flash' as ModelType, chatHistory);
            }

            return {
                content: '',
                error: `Gemini API Error: ${errorData.error?.message || response.statusText}`
            };
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        return { content };
    } catch (error) {
        console.error('Gemini network error:', error);
        // Network error, try fallback
        return sendOpenRouterMessage(message, personality, 'gemini-flash' as ModelType, chatHistory);
    }
}

/**
 * Send message using OpenRouter API with model-specific keys
 */
async function sendOpenRouterMessage(
    message: string,
    personality: string,
    model: ModelType,
    chatHistory: ChatMessage[],
    fallbackAttempt: number = 0
): Promise<ChatResponse> {
    const apiKey = getOpenRouterKey(model);
    const modelId = OPENROUTER_MODELS[model] || OPENROUTER_MODELS['deepseek-r1'];

    if (!apiKey) {
        // Try fallback chain
        const fallbackModels: ModelType[] = ['deepseek-r1', 'gemma-4b', 'gemini-flash'];
        const nextFallback = fallbackModels.find(m => m !== model);

        if (nextFallback) {
            console.log(`No API key for ${model}, trying ${nextFallback}...`);
            return sendOpenRouterMessage(message, personality, nextFallback, chatHistory, fallbackAttempt + 1);
        }

        return { content: '', error: 'No API keys configured for any model' };
    }

    const systemPrompt = buildSystemPrompt();
    const config = MODEL_CONFIGS[model] || MODEL_CONFIGS['deepseek-r1'];

    // Build messages for OpenRouter format (limited history for speed)
    const messages = [
        {
            role: 'system',
            content: systemPrompt
        },
        ...chatHistory.slice(-config.historyLimit).map(msg => ({
            role: msg.role,
            content: msg.content
        })),
        {
            role: 'user',
            content: message
        }
    ];

    try {
        const response = await fetch(OPENROUTER_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Kaizen AI - Data Science Tutor'
            },
            body: JSON.stringify({
                model: modelId,
                messages,
                temperature: config.temperature,
                max_tokens: config.maxTokens,
                top_p: 0.85
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`OpenRouter API Error (${model}):`, errorData);

            // If this model fails, try fallback chain (max 3 attempts)
            if (fallbackAttempt < 3) {
                const fallbackModels: ModelType[] = ['deepseek-r1', 'gemma-4b', 'gemini-flash'];
                const nextFallback = fallbackModels.find(m => m !== model);

                if (nextFallback) {
                    console.log(`${model} failed, trying ${nextFallback}...`);
                    return sendOpenRouterMessage(message, personality, nextFallback, chatHistory, fallbackAttempt + 1);
                }
            }

            return {
                content: '',
                error: `API Error: ${errorData.error?.message || response.statusText}`
            };
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        return { content };
    } catch (error) {
        console.error(`OpenRouter network error (${model}):`, error);

        // Network error, try fallback
        if (fallbackAttempt < 3) {
            const fallbackModels: ModelType[] = ['deepseek-r1', 'gemma-4b', 'gemini-flash'];
            const nextFallback = fallbackModels.find(m => m !== model);

            if (nextFallback) {
                return sendOpenRouterMessage(message, personality, nextFallback, chatHistory, fallbackAttempt + 1);
            }
        }

        return {
            content: '',
            error: 'Network error. Please check your connection and try again.'
        };
    }
}

/**
 * Main function to send chat message - routes to appropriate API
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    const { message, personality, model, chatHistory } = request;

    // Route to appropriate API based on model selection
    if (model === 'gemini') {
        return sendGeminiMessage(message, personality, chatHistory);
    } else {
        return sendOpenRouterMessage(message, personality, model, chatHistory);
    }
}

/**
 * Quick actions for the chat interface
 */
export const QUICK_ACTIONS = [
    { label: 'Explain Pandas DataFrame', prompt: 'Explain what a Pandas DataFrame is with examples' },
    { label: 'NumPy vs Lists', prompt: 'What\'s the difference between NumPy arrays and Python lists?' },
    { label: 'Linear Regression', prompt: 'Explain linear regression in simple terms with Python code' },
    { label: 'Data Cleaning Tips', prompt: 'What are the best practices for data cleaning in Python?' },
    { label: 'Matplotlib Basics', prompt: 'Show me how to create basic plots with Matplotlib' },
];
