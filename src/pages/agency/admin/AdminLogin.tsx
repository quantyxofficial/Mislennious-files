import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Loader, Chrome } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Verify admin credentials against Supabase
      const { data, error: fetchError } = await supabase
        .from('admins')
        .select('id, email, password_hash, is_active')
        .eq('email', email)
        .single();

      if (fetchError || !data) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      if (!data.is_active) {
        setError('This admin account is inactive');
        setIsLoading(false);
        return;
      }

      // Simple password comparison (in production, use bcrypt)
      if (data.password_hash !== password) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Update last login
      await supabase
        .from('admins')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);

      // Store admin session
      sessionStorage.setItem('ks_admin_id', data.id);
      sessionStorage.setItem('ks_admin_email', data.email);

      // Log the login
      await supabase
        .from('admin_logs')
        .insert({
          admin_id: data.id,
          action: 'LOGIN',
          resource: 'auth',
          details: { method: 'password', timestamp: new Date().toISOString() }
        });

      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // After Google OAuth redirect, verify the returned user is an admin
  useEffect(() => {
    const checkOAuthReturn = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      // Only run if we came back from an OAuth flow (hash contains access_token)
      const isOAuthReturn = window.location.hash.includes('access_token') ||
        sessionStorage.getItem('admin_google_pending') === '1';
      if (!isOAuthReturn) return;

      sessionStorage.removeItem('admin_google_pending');
      setIsGoogleLoading(true);

      try {
        const userEmail = session.user.email;

        if (userEmail !== 'quantyx.official@gmail.com') {
          await supabase.auth.signOut();
          setError('Access denied. Only the authorized admin account may sign in with Google.');
          setIsGoogleLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('admins')
          .select('id, email, is_active')
          .eq('email', userEmail)
          .single();

        if (fetchError || !data) {
          await supabase.auth.signOut();
          setError('This Google account is not registered as an admin');
          setIsGoogleLoading(false);
          return;
        }

        if (!data.is_active) {
          await supabase.auth.signOut();
          setError('This admin account is inactive');
          setIsGoogleLoading(false);
          return;
        }

        await supabase.from('admins').update({ last_login: new Date().toISOString() }).eq('id', data.id);
        sessionStorage.setItem('ks_admin_id', data.id);
        sessionStorage.setItem('ks_admin_email', data.email);

        await supabase.from('admin_logs').insert({
          admin_id: data.id,
          action: 'LOGIN',
          resource: 'auth',
          details: { method: 'google_oauth', timestamp: new Date().toISOString() }
        });

        navigate('/admin/dashboard');
      } catch (err) {
        console.error('OAuth return error:', err);
        setError('An error occurred verifying your Google account.');
        setIsGoogleLoading(false);
      }
    };

    checkOAuthReturn();
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);
    try {
      sessionStorage.setItem('admin_google_pending', '1');
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin/login`,
        },
      });
      if (oauthError) {
        sessionStorage.removeItem('admin_google_pending');
        setError(oauthError.message || 'Failed to start Google login');
        setIsGoogleLoading(false);
      }
      // on success, browser redirects to Google — no further code runs here
    } catch (err) {
      console.error('Google login error:', err);
      sessionStorage.removeItem('admin_google_pending');
      setError('An error occurred. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-lux-glass border border-lux-glassBorder flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-lux-text" />
          </div>
          <h1 className="text-3xl font-serif text-lux-text mb-2">Admin Portal</h1>
          <p className="text-lux-muted">Verify your credentials to continue</p>
        </div>

        {/* Form */}
        <div className="glass-bento rounded-2xl p-8 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-3">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kaizenstat.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-lux-text/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-3">
                <Lock className="w-4 h-4" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-lux-text/50 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-lux-text text-lux-cream font-semibold uppercase tracking-widest rounded-full hover:bg-lux-text/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lux-glassBorder" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-black text-lux-muted">OR</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full py-3 bg-lux-glass border border-lux-glassBorder text-lux-text font-semibold uppercase tracking-widest rounded-full hover:border-lux-text/30 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isGoogleLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Chrome className="w-4 h-4" />
                Google Login
              </>
            )}
          </button>

          <p className="text-center text-xs text-lux-muted/60 mt-6">
            🔒 Protected admin area. Unauthorized access is logged.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
