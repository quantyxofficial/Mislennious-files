import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MemberIdCardData {
  id_number: string;
  status: string;
  valid_thru: string;
  user_id: string;
}

interface StudentProfile {
  full_name: string;
  university: string;
  major: string;
}

export function MemberIdVerify() {
  const { shortId } = useParams();
  const [card, setCard] = useState<MemberIdCardData | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    verifyMemberId();
  }, [shortId]);

  const verifyMemberId = async () => {
    if (!shortId) {
      setError('Invalid member ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Look up member ID card by id_number (which is the shortId like KS-ABCD1234)
      const { data: cardData, error: cardError } = await supabase
        .from('student_id_cards')
        .select('*')
        .eq('id_number', shortId)
        .single();

      if (cardError || !cardData) {
        console.error('Verification error:', { cardError, shortId, noData: !cardData });
        setError(`Member ID "${shortId}" not found. Please ensure you have completed your profile setup and your email is verified.`);
        setLoading(false);
        return;
      }

      setCard(cardData);

      // Get student profile for additional details
      if (cardData.user_id) {
        const { data: profileData } = await supabase
          .from('student_profiles')
          .select('full_name, university, major')
          .eq('user_id', cardData.user_id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('An error occurred while verifying the member ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0a0a] to-[#0d0d1a] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="glass-bento rounded-3xl p-8 md:p-12 border border-white/10">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-slate-300">Verifying member ID...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-slate-400 mb-6">{error}</p>
              <p className="text-sm text-slate-500">
                If you believe this is an error, please contact support at founders@kaizenstat.com
              </p>
            </div>
          ) : card ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Member ID Verified ✓</h2>
              <p className="text-slate-400 mb-8">This is a valid KaizenStat member identification.</p>

              {/* Card Details */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4 text-left mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Member ID</p>
                  <p className="text-lg font-mono text-white">{card.id_number}</p>
                </div>

                {profile && (
                  <>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Name</p>
                      <p className="text-base text-white">{profile.full_name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">University</p>
                        <p className="text-sm text-slate-300">{profile.university || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Programme</p>
                        <p className="text-sm text-slate-300">{profile.major || '—'}</p>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Status</p>
                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">{card.status}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Valid Through</p>
                  <p className="text-sm text-white">{card.valid_thru}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-2 text-center">
                <p className="text-xs text-slate-500">
                  Scanned on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-xs text-slate-600 italic">
                  This member is part of the KaizenStat community of innovators and learners.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Back to home link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline"
          >
            Back to KaizenStat
          </a>
        </div>
      </motion.div>
    </div>
  );
}
