import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollManager } from './components/ScrollManager';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { BackgroundAurora } from './components/BackgroundAurora';

export const Layout: React.FC = () => {
    const location = useLocation();
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-lux-cream dark:bg-black transition-colors duration-500">
            {/* Global Aurora Background */}
            <BackgroundAurora />

            {/* Content Layer - Promoted to z-10 to sit above background */}
            <div className="relative z-10 flex flex-col">
                {location.pathname !== '/kaizen-ai' && <Navbar />}

                <div className="lg:pl-0 flex-grow flex flex-col">
                    <main className="relative z-10 w-full flex-grow">
                        <Outlet />
                    </main>
                </div>

                {/* Global Footer */}
                {!/^\/(study|practice)\/[^/]+\/.+/.test(location.pathname) && location.pathname !== '/kaizen-ai' && <Footer />}

                {/* Persistent Scroll Manager */}
                <ScrollManager />
            </div>
        </div>
    );
};
