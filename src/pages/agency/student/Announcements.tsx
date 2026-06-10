import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Megaphone, Info, AlertTriangle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Announcement {
  id: string;
  type: 'alert' | 'megaphone' | 'info';
  title: string;
  date: string;
  content: string;
  created_at?: string;
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setAnnouncements(data);
      } else {
        // Fallback to demo data
        setAnnouncements([
          {
            id: '1',
            type: 'alert',
            title: 'Platform Maintenance Scheduled',
            date: 'Oct 24, 2026',
            content: 'The KaizenStat AutoML clusters will undergo routine maintenance this Saturday at 02:00 AM UTC for approximately 4 hours. Job queues will be paused during this window.',
          },
          {
            id: '2',
            type: 'megaphone',
            title: 'New "kz codegen" Feature Released!',
            date: 'Oct 22, 2026',
            content: 'We are thrilled to announce the new code generation engine! You can now generate standalone, dependency-free Python scripts of your best-performing models directly from the CLI.',
          },
          {
            id: '3',
            type: 'info',
            title: 'Welcome to the new Member Dashboard',
            date: 'Oct 15, 2026',
            content: 'The new unified Member Dashboard is now live. You can manage your profile, view upcoming competitions, and generate your virtual ID card all in one place.',
          }
        ]);
      }
    } catch (err) {
      console.error('Error loading announcements:', err);
      // Use demo data on error
      setAnnouncements([
        {
          id: '1',
          type: 'alert',
          title: 'Platform Maintenance Scheduled',
          date: 'Oct 24, 2026',
          content: 'The KaizenStat AutoML clusters will undergo routine maintenance this Saturday at 02:00 AM UTC for approximately 4 hours. Job queues will be paused during this window.',
        },
        {
          id: '2',
          type: 'megaphone',
          title: 'New "kz codegen" Feature Released!',
          date: 'Oct 22, 2026',
          content: 'We are thrilled to announce the new code generation engine! You can now generate standalone, dependency-free Python scripts of your best-performing models directly from the CLI.',
        },
        {
          id: '3',
          type: 'info',
          title: 'Welcome to the new Member Dashboard',
          date: 'Oct 15, 2026',
          content: 'The new unified Member Dashboard is now live. You can manage your profile, view upcoming competitions, and generate your virtual ID card all in one place.',
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl flex items-center justify-center min-h-[300px]"
      >
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Announcements</h1>
          <p className="text-slate-400">Updates, alerts, and news from the KaizenStat KSoC team.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Bell className="w-6 h-6 text-slate-300" />
        </div>
      </div>

      <div className="space-y-6">
        {announcements.map((announcement) => {
          let Icon = Info;
          let color = 'text-cyan-400';
          let bg = 'bg-cyan-500/10 border-cyan-500/20';

          if (announcement.type === 'alert') {
            Icon = AlertTriangle;
            color = 'text-amber-400';
            bg = 'bg-amber-500/10 border-amber-500/20';
          } else if (announcement.type === 'megaphone') {
            Icon = Megaphone;
            color = 'text-emerald-400';
            bg = 'bg-emerald-500/10 border-emerald-500/20';
          }

          return (
            <div key={announcement.id} className="group bg-zinc-900/60 border border-white/5 rounded-2xl p-6 hover:bg-zinc-900/90 transition-all flex gap-5 gpu-accelerated">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border flex-shrink-0 ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">{announcement.title}</h3>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{announcement.date}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {announcement.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
