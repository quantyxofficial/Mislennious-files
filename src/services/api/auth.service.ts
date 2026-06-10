import { supabase } from '../../lib/supabase';
import { User, UserRole } from '../../types/models';

/**
 * For initial development, we simulate authentication by querying the public.users table.
 * In a full production environment, this should be replaced with Supabase Auth (auth.users).
 */

const SESSION_KEY = 'kaizenstat_mock_session';

export const authService = {
  // Simulate login by finding a user by email
  async login(email: string): Promise<{ user: User | null; error: Error | null }> {
    // Development Backdoor: Bypass DB for rapid testing
    if (['admin', 'mentor', 'student'].includes(email.toLowerCase())) {
      const devUser: User = {
        id: `dev-${email}`,
        name: `Dev ${email.charAt(0).toUpperCase() + email.slice(1)}`,
        role: email.toLowerCase() as UserRole,
        email: `${email}@dev.local`,
        created_at: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(devUser));
      return { user: devUser, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      
      if (data) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
      }

      return { user: data as User, error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      return { user: null, error };
    }
  },

  // Get current session from local storage
  getCurrentUser(): User | null {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr) as User;
    } catch {
      return null;
    }
  },

  // Logout
  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  },
  
  // Utility to create a test user quickly if none exists
  async createTestUser(name: string, email: string, role: UserRole) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, role }])
      .select()
      .single();
      
    return { data, error };
  }
};
