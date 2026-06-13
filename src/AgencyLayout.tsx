import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollManager } from './components/agency/ScrollManager';
import { Navbar } from './components/sections/Navbar';
import { Footer } from './components/sections/Footer';



export const Layout: React.FC = () => {
    const location = useLocation();
    return (
        <div className="relative min-h-screen w-full bg-black text-slate-200">

            {/* Content Layer - Promoted to z-10 to sit above background */}
            <div className="relative z-10 flex flex-col">
                {location.pathname !== '/kaizen-ai' && <Navbar />}

                <div className={`lg:pl-0 flex-grow ${location.pathname !== '/kaizen-ai' ? 'pt-[80px]' : ''}`}>
                    <main className="relative z-10 w-full flex-grow">
                        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                            <Outlet />
                        </Suspense>
                    </main>
                </div>

                {/* Global Footer */}
                {!/^\/(study|practice)\/[^/]+\/.+/.test(location.pathname) && location.pathname !== '/kaizen-ai' && !location.pathname.startsWith('/member') && !location.pathname.startsWith('/student') && <Footer />}

                {/* Persistent Scroll Manager */}
                <ScrollManager />
            </div>
        </div>
    );
};
