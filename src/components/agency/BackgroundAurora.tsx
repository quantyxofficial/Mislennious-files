import React from 'react';

export const BackgroundAurora: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden touch-none select-none">
            {/* Noise Texture - Faint grain for realism */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay noise-bg"></div>

            {/* Blob 1: Middle Left - Violet/Purple Splash */}
            <div className="absolute top-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full 
                bg-violet-300 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-purple
                dark:bg-indigo-600 dark:mix-blend-screen dark:blur-[120px] dark:opacity-[0.15]"></div>

            {/* Blob 2: Middle Right - Cyan/Blue Splash */}
            <div className="absolute top-[30%] right-[20%] w-[45vw] h-[45vw] rounded-full 
                bg-cyan-300 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-blue animation-delay-2000
                dark:bg-blue-600 dark:mix-blend-screen dark:blur-[120px] dark:opacity-[0.15]"></div>

            {/* Blob 3: Center Offset - Pink/Rose Accent */}
            <div className="absolute bottom-[20%] left-[35%] w-[40vw] h-[40vw] rounded-full 
                bg-rose-200 mix-blend-multiply filter blur-[100px] opacity-60 animate-blob-teal animation-delay-4000
                dark:bg-fuchsia-600 dark:mix-blend-screen dark:blur-[120px] dark:opacity-[0.1]"></div>
        </div>
    );
};
