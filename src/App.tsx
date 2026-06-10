/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { DocsPage } from './pages/DocsPage';
import { Dashboard } from './pages/Dashboard';
import { SimulationPage } from './pages/SimulationPage';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Ethics from './pages/legal/Ethics';
import Login from './pages/Login';
import FounderConnect from './pages/FounderConnect';
import MentorDashboard from './pages/dashboards/MentorDashboard';
import { BackgroundScene } from './components/3d/BackgroundScene';
import { CustomCursor } from './components/ui/CustomCursor';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AgencyRoutes } from './routes/AgencyRoutes';
import { AgencyAuthProvider } from './context/AgencyAuthContext';
import { AIProvider } from './context/AIContext';

// Only render heavy 3D on pages that actually use it
const HEAVY_BG_PATHS = ['/', '/competitions', '/docs', '/simulation', '/dashboard'];

function AppShell() {
  const location = useLocation();
  const showBg = HEAVY_BG_PATHS.includes(location.pathname);

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
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/founder-connect" element={<FounderConnect />} />
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
