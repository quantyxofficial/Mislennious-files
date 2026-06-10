import { ModelType, ChatMessage } from '../context/AIContext';

// ===================================
// SMART RESPONSES (Generic / No-AI)
// ===================================

const SMART_RESPONSES: Record<string, string> = {
    // 1. Library & Community Basics
    'what is kaizenstat': 'An intelligent AutoML and data diagnostics Python library built by our student community.',
    'what is kaizenstat collective': 'Our student community building open-source data science tools and libraries.',
    'what do i gain from kaizenstat collective': 'Experience in building package ecosystems, data science, and library contributions.',
    'who are you': 'I am KaizenStat AI, representing a student community making data science and AutoML libraries easier for developers.',
    'what do you do': 'I help developers and students understand and build Python libraries for AutoML and data diagnostics.',
    
    // 2. Getting Started
    'how do i start': 'Install our library via "pip install kaizenstat" and check out our quickstart docs.',
    'how to install': 'Run "pip install kaizenstat" in your terminal to get started with the core package.',
    'what is your target': 'Making data preparation, cleaning, and model benchmarking seamless in Python.',
    'how to contribute': 'Contribute by writing core fixes, adding feature support, or improving library documentation.',
    'where is the code': 'You can find our code repositories on GitHub under the KaizenStat organization.',
    
    // 3. Data Science & AutoML
    'what is automl': 'Automated Machine Learning, which automates model training, tuning, and selection.',
    'what is data diagnostics': 'Analyzing datasets for anomalies, missing values, skewness, and quality issues.',
    'does it support gpu': 'Yes, the library provides GPU acceleration for compatible model training.',
    'what models are supported': 'XGBoost, LightGBM, CatBoost, RandomForest, and other standard estimators.',
    
    // Greetings & Casual
    'hi': 'KaizenStat AI — Developer tool guide. Ask me about our Python libraries and AutoML tools.',
    'hello': 'Greetings! Ready to build? Ask me anything about Python, Data Science, or KaizenStat libraries.',
    'hey': 'Hey! Ready to code? I help simplify your data science development workflows with KaizenStat.',
    'how are you': 'I am functioning at peak efficiency and ready to assist you with our data science libraries.',
    'whats up': 'Just working on our AutoML package. How can I help you code today?',
    'sup': 'Ready to code. What library question do you have today?',
    'good to know': 'Glad it helps. Ask me about Python, AutoML, or our library features.',
    'cool': 'Let\'s build something great. What is your next technical question?',
    'nice': 'Excellent. Ask me about our model healing or data diagnostic tools.',
    'ok': 'Understood. Ready for your next query.',
    'okay': 'Understood. Ready for your next query.',
    'thanks': 'You\'re welcome! Keep building great Python libraries.',
    'thank you': 'Happy to help. Let me know your next question.',
    'bye': 'Goodbye! Keep coding and making development easier.',
    'goodbye': 'See you! Go make something amazing.'
};

export function getSmartResponse(message: string): string | null {
    const cleanMsg = message.toLowerCase().trim()
        .replace(/[?!.]/g, '')
        .replace(/\s+/g, ' ');
    
    // Direct match
    if (SMART_RESPONSES[cleanMsg]) return SMART_RESPONSES[cleanMsg];
    
    // Keyword match
    for (const key in SMART_RESPONSES) {
        if (cleanMsg.includes(key) && key.length > 5) {
            return SMART_RESPONSES[key];
        }
    }
    
    return null;
}

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
    'deepseek-r1': import.meta.env.VITE_OPENROUTER_DEEPSEEK_R1 || '',
    'global': import.meta.env.VITE_OPENROUTER_KEY || ''
};

// OpenRouter Model IDs
const OPENROUTER_MODELS: Record<string, string> = {
    'gemma-4b': 'google/gemma-3-4b-it',
    'gemini-flash': 'google/gemini-2.0-flash-exp:free',
    'deepseek-r1': 'deepseek/deepseek-r1' // Removed :free for better stability
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
    if (key) return key;
    
    // Fallback to global key
    const globalKey = OPENROUTER_MODEL_KEYS['global'];
    if (globalKey) return globalKey;
    
    console.warn(`No API key found for ${model} and no global key available`);
    return '';
};

interface ChatRequest {
    message: string;
    personality: string;
    model: ModelType;
    chatHistory: ChatMessage[];
    signal?: AbortSignal;
}

interface InternalChatResponse {
    content: string;
    error?: string;
}

interface ChatResponse extends InternalChatResponse {
    modelUsed: ModelType;
}

// Ultra-concise action-focused mentor prompt
const buildSystemPrompt = (): string => {
    return `You are "KaizenStat AI", representing a student community that builds Python data science libraries (like KaizenStat for AutoML and data diagnostics) to simplify developer workflows.
KNOWLEDGE BASE:
- KaizenStat commands & APIs:
  * "kz audit" / "KaizenStat.audit()": Run diagnostics on raw dataset (missing values, duplicates, imbalance, dead/constant features, cardinality).
  * "kz heal" / "KaizenStat.heal()": Data preparation (median/mode imputation, datetime parsing, drop constants, encode category text).
  * "kz benchmark" / "KaizenStat.benchmark()": Automated training & ranking of pipelines (LightGBM, XGBoost, CatBoost, RandomForest, ExtraTrees).
  * "kz auto" / "KaizenStat.auto()": Full end-to-end flow (Audit -> Heal -> Benchmark).
  * "kz explain" / "KaizenStat.explain()": Plain-English explanation of model results/recommendations.
  * "kz codegen" / "KaizenStat.codegen()": Generate standalone, dependency-free Python scripts for training top pipelines.
  * "kz export-model" / "KaizenStat.save_model()": Save the trained model pipeline to .joblib binary.
  * "kz report" / "KaizenStat.report()": Generate an interactive HTML profile report (with column search, charts, metrics).
  * "kz serve" / "KaizenStat.serve()": Launch local Streamlit dashboard.
  * "kz analyze" / "KaizenStat.analyze()": Run cognitive data analysis over dataset using LLMs.
  * "kz ask" / "KaizenStat.ask()": Natural language querying over dataset (e.g. correlations).
  * "kz ask --followup": Multi-turn chat memory.
  * "kz improve" / "KaizenStat.improve()": AI suggestions for custom pipeline feature engineering improvements.
  * "kz status": System/hardware status (detects CUDA, MPS, VRAM, loaded dataset info).
  * "kz reset": Reset context memory.
- FAQs:
  * Data privacy: 100% local processing. Only column stats/metadata are sent to AI reasoning APIs if opted-in; row data never leaves local system.
  * Difference from auto-sklearn/TPOT: Instant setup, robust crash-proofing, active healing, interactive reports instead of logs.
  * Compute: Automatic GPU/hardware acceleration (CUDA / Apple Silicon MPS) with zero setup.

ROLE:
- Answer technical queries using the knowledge base.
- STAY PASSIVE: Only answer what the user asks. 
- DO NOT start teaching without a specific question.
- DO NOT provide unsolicited tasks, challenges, or "next steps" unless asked.
- Goal: Resolve the current query INSTANTLY and stop.
 
STRICT RESPONSE RULES:
- MAX 1 SENTENCE (15-20 words hard limit).
- Be direct, actionable, and technical.
- No conversational filler or unsolicited advice.`;
};

/**
 * Automatically select the best model based on the query complexity
 */
export function selectModelAutomatically(query: string): ModelType {
    const q = query.toLowerCase();
    
    // Deep reasoning for complex architectural or deep DS questions
    if (q.includes('architecture') || q.includes('design') || q.includes('complex') || q.includes('refactor') || q.includes('reasoning') || q.includes('why')) {
        return 'deepseek-r1';
    }
    
    // Fast flash for simple Python/Hackathon tasks
    if (q.includes('python') || q.includes('code') || q.includes('hackathon') || q.includes('fast') || q.includes('script') || q.includes('how to')) {
        return 'gemini-flash';
    }
    
    // Default to standard Gemini for general mentoring
    return 'gemini';
}

/**
 * Send message using Google Gemini API (with rotating keys)
 */
async function sendGeminiMessage(
    message: string,
    personality: string,
    chatHistory: ChatMessage[],
    signal?: AbortSignal
): Promise<InternalChatResponse> {
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
            signal,
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
    fallbackAttempt: number = 0,
    signal?: AbortSignal
): Promise<InternalChatResponse> {
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
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'KaizenStat AI Guide',
                'Content-Type': 'application/json'
            },
            signal,
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
    const { message, personality, model, chatHistory, signal } = request;

    // 1. Check for smart generic response first
    const smartResponse = getSmartResponse(message);
    if (smartResponse) {
        // Return instantly
        return { content: smartResponse, modelUsed: 'auto' };
    }

    // 2. Handle Automatic Model Selection
    let targetModel = model;
    if (model === 'auto') {
        targetModel = selectModelAutomatically(message);
    }

    // 3. Route to appropriate API based on model selection
    let response: InternalChatResponse;
    if (targetModel === 'gemini') {
        response = await sendGeminiMessage(message, personality, chatHistory, signal);
    } else {
        response = await sendOpenRouterMessage(message, personality, targetModel as ModelType, chatHistory, 0, signal);
    }

    return { ...response, modelUsed: targetModel as ModelType };
}

/**
 * Quick actions for the chat interface
 */
export const QUICK_ACTIONS = [
    { label: 'Run Audit', prompt: 'How do I run a diagnostics sweep with kz audit?' },
    { label: 'Heal Dataset', prompt: 'How does KaizenStat heal missing values and categories?' },
    { label: 'Benchmark Models', prompt: 'How do I train and rank pipelines with kz benchmark?' },
    { label: 'Code Generation', prompt: 'How does the explainability (codegen) work?' },
    { label: 'Data Privacy', prompt: 'Is my dataset uploaded to the cloud?' },
];
