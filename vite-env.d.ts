/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENROUTER_API_KEY: string;
    readonly VITE_GEMINI_KEY_1: string;
    readonly VITE_GEMINI_KEY_2: string;
    readonly VITE_GEMINI_KEY_3: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
