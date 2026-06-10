import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, ArrowRight } from 'lucide-react';
import { useAgencyAuth } from '../../../context/AgencyAuthContext';
import { supabase } from '../../../lib/supabase';

interface Competition {
  id: string;
  title: string;
  description: string;
  prize: string;
  deadline: string;
  participants: number;
  status: 'open' | 'urgent' | 'upcoming';
  color: string;
}

export function UpcomingCompetitions() {
  const { user } = useAgencyAuth();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setCompetitions(data);
      } else {
        // Fallback to demo data
        setCompetitions([
          {
            id: '1',
            title: 'Global AutoML Challenge 2026',
            description: 'Build the most robust pipeline using KaizenStat on an imbalanced dataset with noisy features.',
            prize: '$5,000 + Internship',
            deadline: 'In 14 days',
            participants: 1240,
            status: 'open',
            color: 'emerald'
          },
          {
            id: '2',
            title: 'KSoC Deep Learning Sprint',
            description: 'Optimize a custom PyTorch model using KaizenStat hardware accelerators.',
            prize: '$2,000',
            deadline: 'In 3 days',
            participants: 856,
            status: 'urgent',
            color: 'orange'
          },
          {
            id: '3',
            title: 'Data Cleaning Hackathon',
            description: 'A 24-hour sprint to clean a highly corrupted medical dataset using the `kz heal` engine.',
            prize: 'Swag Kit',
            deadline: 'Starts Next Month',
            participants: 432,
            status: 'upcoming',
            color: 'cyan'
          }
        ]);
      }
    } catch (err) {
      console.error('Error loading competitions:', err);
      // Use demo data on error
      setCompetitions([
        {
          id: '1',
          title: 'Global AutoML Challenge 2026',
          description: 'Build the most robust pipeline using KaizenStat on an imbalanced dataset with noisy features.',
          prize: '$5,000 + Internship',
          deadline: 'In 14 days',
          participants: 1240,
          status: 'open',
          color: 'emerald'
        },
        {
          id: '2',
          title: 'KSoC Deep Learning Sprint',
          description: 'Optimize a custom PyTorch model using KaizenStat hardware accelerators.',
          prize: '$2,000',
          deadline: 'In 3 days',
          participants: 856,
          status: 'urgent',
          color: 'orange'
        },
        {
          id: '3',
          title: 'Data Cleaning Hackathon',
          description: 'A 24-hour sprint to clean a highly corrupted medical dataset using the `kz heal` engine.',
          prize: 'Swag Kit',
          deadline: 'Starts Next Month',
          participants: 432,
          status: 'upcoming',
          color: 'cyan'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (competitionId: string) => {
    if (!user?.id) {
      alert('Please login to join competitions');
      return;
    }

    try {
      const { error } = await supabase
        .from('competition_registrations')
        .insert({
          user_id: user.id,
          competition_id: competitionId,
          registered_at: new Date().toISOString(),
        });

      if (error) throw error;
      alert('Successfully joined the competition!');
    } catch (err) {
      console.error('Error joining competition:', err);
      alert('Failed to join competition');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl flex items-center justify-center min-h-[300px]"
      >
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Upcoming Competitions</h1>
        <p className="text-slate-400">Test your skills against the community and win exclusive prizes.</p>
      </div>

      <div className="grid gap-6">
        {competitions.map((comp) => (
          <div key={comp.id} className="group bg-zinc-900/60 border border-white/5 rounded-2xl p-6 hover:bg-zinc-900/90 transition-all relative overflow-hidden gpu-accelerated">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${comp.color}-500/10 blur-[50px] -z-10`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                    comp.status === 'urgent' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' :
                    comp.status === 'open' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                    'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
                  }`}>
                    {comp.status}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {comp.deadline}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">{comp.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{comp.description}</p>
              </div>

              <div className="flex flex-col md:items-end justify-center gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div className="flex flex-col gap-1 md:items-end">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Prize Pool</span>
                  <span className="text-lg font-bold text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    {comp.prize}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    {comp.participants}
                  </span>
                  <button
                    onClick={() => handleJoin(comp.id)}
                    className="flex items-center gap-2 text-xs font-bold text-black bg-white hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
                  >
                    Join <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
