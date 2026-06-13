import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, User as UserIcon, Menu, X as MenuX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { useAgencyAuth } from '../../context/AgencyAuthContext';
import { AuthModal } from '../agency/AuthModal';
import { AVATAR_COMPONENTS_MAP } from '../avatars/AvatarComponents';

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link to={to} className={`relative py-2 transition-colors ${active ? 'text-white' : 'hover:text-white'}`}>
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          layout
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAgencyAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 lg:px-12 py-5 border-b border-white/[0.05] backdrop-blur-xl bg-black/40"
      >
        {/* Logo */}
        <div className="absolute left-6 lg:left-12 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="w-9 h-9 text-white group-hover:rotate-[15deg] transition-transform duration-700 ease-out" />
            <span className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
              KAIZEN<span className="font-light opacity-50">STAT</span>
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <NavLink to="/" label="Home" active={isActive('/')} />
          <NavLink to="/docs" label="Docs" active={isActive('/docs')} />
          <NavLink to="/founder-connect" label="Team" active={isActive('/founder-connect')} />
          <Link
            to="/kaizenstat-summer-of-computation"
            className={`relative py-2 transition-colors ${isActive('/kaizenstat-summer-of-computation') ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            KSoC
            {isActive('/kaizenstat-summer-of-computation') && (
              <motion.div layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        </nav>

        {/* Right */}
        <div className="absolute right-6 lg:right-12 flex items-center gap-3">
          <a href="https://pypi.org/project/kaizenstat/" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:border-white/20 transition-all">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="py-a" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%">
                  <stop offset="0%" stopColor="#387EB8"/><stop offset="100%" stopColor="#366994"/>
                </linearGradient>
                <linearGradient id="py-b" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%">
                  <stop offset="0%" stopColor="#FFE052"/><stop offset="100%" stopColor="#FFC331"/>
                </linearGradient>
              </defs>
              <path fill="url(#py-a)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
              <path fill="url(#py-b)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
            </svg>
            Checkout
          </a>

          {/* Mobile menu button */}
          {user && (
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              {isMobileMenuOpen ? <MenuX className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <div className="relative">
            {user ? (
              <div className="relative" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
                <Link to="/student" className="relative group flex items-center">
                  {/* Professional avatar */}
                  <div className="relative w-9 h-9">
                    <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/15 group-hover:ring-white/40 transition-all duration-200 bg-slate-800">
                      {user.user_metadata?.avatar_url ? (
                        (() => {
                          const avatarUrl = user.user_metadata.avatar_url as string;
                          if (avatarUrl.startsWith('builtin:')) {
                            const avatarId = avatarUrl.replace('builtin:', '');
                            const AvatarComponent = AVATAR_COMPONENTS_MAP[avatarId];
                            return AvatarComponent ? (
                              <div className="w-full h-full scale-150 translate-y-1 overflow-hidden">
                                <AvatarComponent />
                              </div>
                            ) : null;
                          }
                          return <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />;
                        })()
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-700">
                          <UserIcon className="w-4 h-4 text-slate-300" />
                        </div>
                      )}
                    </div>
                    {/* Online status dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black" />
                  </div>
                </Link>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-4 w-52 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden pointer-events-auto"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-xs font-bold text-white truncate">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-2 border-b border-white/10">
                        {[
                          { to: '/student', label: 'Member Info', color: 'bg-cyan-500/40' },
                          { to: '/student/competitions', label: 'Competitions', color: 'bg-emerald-500/40' },
                          { to: '/student/id-card', label: 'Member ID Card', color: 'bg-purple-500/40' },
                          { to: '/student/announcements', label: 'Announcements', color: 'bg-amber-500/40' },
                        ].map(({ to, label, color }) => (
                          <Link key={to} to={to}
                            className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                            <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                            {label}
                          </Link>
                        ))}
                      </div>
                      <button onClick={() => signOut()}
                        className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-red-400 hover:bg-white/5 transition-colors flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" />Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/student"
                className="px-5 py-2 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 shadow-xl shadow-white/5 active:scale-95 flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5" />Dashboard
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-2">
              {[
                { to: '/student', label: 'Member Info' },
                { to: '/student/competitions', label: 'Competitions' },
                { to: '/student/id-card', label: 'Member ID Card' },
                { to: '/student/announcements', label: 'Announcements' },
              ].map(({ to, label }) => (
                <Link key={to} to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                  {label}
                </Link>
              ))}
              <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-white/10 transition-colors">
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
