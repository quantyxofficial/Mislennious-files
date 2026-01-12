import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { GeminiStrategist } from './components/GeminiStrategist';
import { Navbar } from './components/Navbar';
import { Contact } from './components/Contact';

export const Layout: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            {/* Mac OS Style "Aurora" Mesh Gradient Background + Dynamic Grid Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F0F4F8]">

                {/* Deep Atmospheric Base */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-purple-50/20 to-white" />

                {/* Moving Aurora Orbs */}
                <motion.div
                    animate={{
                        transform: ['translate(0%, 0%) scale(1)', 'translate(20%, 10%) scale(1.1)', 'translate(0%, 0%) scale(1)'],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply"
                />

                <motion.div
                    animate={{
                        transform: ['translate(0%, 0%) scale(1)', 'translate(-15%, 20%) scale(1.2)', 'translate(0%, 0%) scale(1)'],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-400/20 rounded-full blur-[100px] mix-blend-multiply"
                />

                <motion.div
                    animate={{
                        transform: ['translate(0%, 0%) scale(1)', 'translate(10%, -10%) scale(0.9)', 'translate(0%, 0%) scale(1)'],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-teal-300/20 rounded-full blur-[100px] mix-blend-multiply"
                />

                <motion.div
                    animate={{
                        transform: ['translate(0%, 0%)', 'translate(-10%, -15%)', 'translate(0%, 0%)'],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-rose-300/20 rounded-full blur-[80px] mix-blend-multiply"
                />

                {/* GRID OVERLAY */}
                <div
                    className="absolute inset-0 z-0 opacity-100"
                    style={{
                        backgroundImage: `
               linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
             `,
                        backgroundSize: '40px 40px',
                        maskImage: `
                radial-gradient(circle at 50% 50%, black 0%, rgba(0,0,0,0.1) 50%, transparent 80%),
                radial-gradient(circle at 10% 10%, rgba(0,0,0,1) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(0,0,0,0.8) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.3) 0%, transparent 30%),
                radial-gradient(circle at 20% 80%, rgba(0,0,0,0.3) 0%, transparent 30%)
             `,
                        WebkitMaskImage: `
                radial-gradient(circle at 50% 50%, black 0%, rgba(0,0,0,0.1) 50%, transparent 80%),
                radial-gradient(circle at 10% 10%, rgba(0,0,0,1) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(0,0,0,0.8) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.3) 0%, transparent 30%),
                radial-gradient(circle at 20% 80%, rgba(0,0,0,0.3) 0%, transparent 30%)
             `,
                    }}
                />
            </div>

            <div className="relative z-10 text-lux-text min-h-screen selection:bg-blue-500/30 selection:text-lux-text">
                <CustomCursor />
                <Navbar />

                <div className="lg:pl-0">
                    <main className="relative z-10 w-full">
                        <Outlet />
                    </main>
                </div>

                {/* Use Contact footer for all pages except home (which includes it in Home.tsx) */}
                {!isHomePage && <Contact />}

                <GeminiStrategist />
            </div>
        </>
    );
};
