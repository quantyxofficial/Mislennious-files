/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { DocsPage } from './pages/DocsPage';
import { Dashboard } from './pages/Dashboard';
import { SimulationPage } from './pages/SimulationPage';
import Login from './pages/Login';
import FounderConnect from './pages/FounderConnect';
import MasuddarRahaman from './pages/founders/MasuddarRahaman';
import KritiSharma from './pages/founders/KritiSharma';
import AbhishiktaDutta from './pages/founders/AbhishiktaDutta';
import MentorDashboard from './pages/dashboards/MentorDashboard';
import { BackgroundScene } from './components/3d/BackgroundScene';
import { CustomCursor } from './components/ui/CustomCursor';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AgencyRoutes } from './routes/AgencyRoutes';
import { AgencyAuthProvider } from './context/AgencyAuthContext';
import { AIProvider } from './context/AIContext';
import { updateMetaTags, SEO_CONFIG, SEOConfig } from './utils/seo';

// Only render heavy 3D on pages that actually use it
const HEAVY_BG_PATHS = ['/', '/competitions', '/docs', '/simulation', '/dashboard'];
const isDocsPath = (p: string) => p === '/docs' || p.startsWith('/docs/');

function AppShell() {
  const location = useLocation();
  const showBg = HEAVY_BG_PATHS.includes(location.pathname) || isDocsPath(location.pathname);

  // Update SEO meta tags on route change
  useEffect(() => {
    // Map routes to SEO configs
    const routeMap: Record<string, SEOConfig> = {
      '/': SEO_CONFIG.home,
      '/docs': SEO_CONFIG.docs,
      '/competitions': SEO_CONFIG.competitions,
      '/founder-connect': SEO_CONFIG.team,
      '/simulation': SEO_CONFIG.simulation,
    };

    const pathname = location.pathname;

    // Chapter pages are handled inside DocsPage via useEffect — skip here
    if (!pathname.startsWith('/docs/')) {
      const seoConfig = routeMap[pathname];
      if (seoConfig) {
        updateMetaTags({
          ...seoConfig,
          canonical: `https://www.kaizenstat.com${pathname}`,
        });
      }
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-cyan-500/30 relative">
      <CustomCursor />
      {showBg && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundScene />
        </div>
      )}
      <div className="noise-bg" />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:chapterId" element={<DocsPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/founder-connect" element={<FounderConnect />} />
          <Route path="/masuddar-rahaman" element={<MasuddarRahaman />} />
          <Route path="/kriti-sharma" element={<KritiSharma />} />
          <Route path="/abhishikta-dutta" element={<AbhishiktaDutta />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/mentor/*"
            element={
              <ProtectedRoute allowedRoles={['mentor']}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={
            <AIProvider>
              <AgencyRoutes />
            </AIProvider>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AgencyAuthProvider>
          <AppShell />
        </AgencyAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
