
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  mockLogin: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AgencyAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }).catch(err => {
        console.error('Supabase session error:', err);
        setLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('Auth initialization error:', err);
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      window.location.reload(); // Force a clean state reset
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const mockLogin = (role: string) => {
    const mockUser = {
      id: `mock-${role}`,
      email: `${role}@kaizenstat.com`,
      user_metadata: {
        full_name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        avatar_url: null
      },
      role: 'authenticated'
    } as any;
    
    setUser(mockUser);
    setSession({ user: mockUser, access_token: 'mock-token' } as any);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithGoogle, signInWithGithub, signInWithEmail, signOut, mockLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAgencyAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAgencyAuth must be used within an AgencyAuthProvider');
  }
  return context;
};
