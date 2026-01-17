import React from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollManager } from './components/ScrollManager';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export const Layout: React.FC = () => {
    return (
        <>
            {/* Mac OS Style "Aurora" Mesh Gradient Background + Dynamic Grid Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F0F4F8]">

                {/* Deep Atmospheric Base */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-purple-50/20 to-white" />

                {/* Optimized CSS-Native Aurora Orbs - GPU Accelerated
                    Reduced blur from 80px to 60px for better fill-rate performance.
                    Reduced opacity for better text visibility.
                */}
                <div
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[60px] gpu-accelerated animate-blob-blue"
                />

                <div
                    className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[60px] gpu-accelerated animate-blob-purple"
                />

                <div
                    className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-teal-400/20 rounded-full blur-[60px] gpu-accelerated animate-blob-teal"
                />

                {/* Simplified GRID OVERLAY - Single Radial Mask for Performance */}
                <div
                    className="absolute inset-0 z-0 opacity-60"
                    style={{
                        backgroundImage: `
               linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
             `,
                        backgroundSize: '40px 40px',
                        /* Replaced complex 3-part mask with single center-out fade - reduced vignette */
                        maskImage: `radial-gradient(ellipse at center, black 60%, transparent 90%)`,
                        WebkitMaskImage: `radial-gradient(ellipse at center, black 60%, transparent 90%)`,
                    }}
                />
            </div>

            <div className="relative z-10 text-lux-text min-h-screen selection:bg-blue-500/30 selection:text-lux-text">
                <Navbar />

                <div className="lg:pl-0">
                    <main className="relative z-10 w-full">
                        <Outlet />
                    </main>
                </div>

                {/* Global Footer */}
                <Footer />

                {/* Persistent Scroll Manager: Handles async updates and back button restoration */}
                <ScrollManager />

            </div>
        </>
    );
};
