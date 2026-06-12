import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, MapPin, BookOpen, Calendar, AlertCircle, Github,
  Link as LinkIcon, Check, Mail, CheckCircle2, Linkedin,
  FileText, ExternalLink as ExtIcon, X,
} from 'lucide-react';
import { useAgencyAuth } from '../../../context/AgencyAuthContext';
import { supabase } from '../../../lib/supabase';
import {
  AvatarMale1, AvatarMale2, AvatarMale3,
  AvatarFemale1, AvatarFemale2, AvatarFemale3,
  AvatarTech1, AvatarTech2, AvatarTech3,
  AvatarRobot, AvatarNinja,
  AvatarAstronaut, AvatarWizard, AvatarSamurai, AvatarViking,
  AvatarGamer, AvatarArtist, AvatarAlien, AvatarPirate, AvatarDetective,
  AvatarStickBasic, AvatarStickDancer, AvatarStickNinja, AvatarStickCoder,
} from '../../../components/avatars/AvatarComponents';

interface StudentProfile {
  full_name: string; university: string; major: string;
  graduation_year: string; bio: string; github_url: string;
  portfolio_url: string; linkedin_url: string; resume_url: string;
  avatar_url: string;
}

const empty: StudentProfile = {
  full_name: '', university: '', major: '', graduation_year: '',
  bio: '', github_url: '', portfolio_url: '', linkedin_url: '',
  resume_url: '', avatar_url: '',
};

const ACADEMIC = [
  { key: 'full_name' as const,       label: 'Full Name',       icon: User,     required: true,  placeholder: 'Your full name' },
  { key: 'university' as const,      label: 'University',      icon: MapPin,   required: true,  placeholder: 'Your institution' },
  { key: 'major' as const,           label: 'Major / Field',   icon: BookOpen, required: true,  placeholder: 'Field of study' },
  { key: 'graduation_year' as const, label: 'Graduation Year', icon: Calendar, required: false, placeholder: '2026' },
];

const LINKS = [
  { key: 'github_url' as const,    label: 'GitHub',    icon: Github,   placeholder: 'https://github.com/username' },
  { key: 'linkedin_url' as const,  label: 'LinkedIn',  icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { key: 'portfolio_url' as const, label: 'Portfolio', icon: LinkIcon, placeholder: 'https://yourportfolio.com' },
  { key: 'resume_url' as const,    label: 'Resume',    icon: FileText, placeholder: 'https://drive.google.com/...' },
];

type AvatarEntry = { id: string; label: string; component: React.FC };
const AVATAR_CATEGORIES: { label: string; emoji: string; items: AvatarEntry[] }[] = [
  {
    label: 'Dev Crew', emoji: '💻',
    items: [
      { id: 'male1',   label: 'Dev',      component: AvatarMale1 },
      { id: 'male2',   label: 'Dev II',   component: AvatarMale2 },
      { id: 'male3',   label: 'Nerd',     component: AvatarMale3 },
      { id: 'female1', label: 'Dev F',    component: AvatarFemale1 },
      { id: 'female2', label: 'Dev F II', component: AvatarFemale2 },
      { id: 'female3', label: 'Dev F III',component: AvatarFemale3 },
      { id: 'tech1',   label: 'Hacker',   component: AvatarTech1 },
      { id: 'tech2',   label: 'Research', component: AvatarTech2 },
      { id: 'tech3',   label: 'Cyber',    component: AvatarTech3 },
      { id: 'robot',   label: 'Robot',    component: AvatarRobot },
      { id: 'ninja',   label: 'Ninja',    component: AvatarNinja },
    ],
  },
  {
    label: 'Legends', emoji: '⚔️',
    items: [
      { id: 'astronaut', label: 'Astronaut', component: AvatarAstronaut },
      { id: 'wizard',    label: 'Wizard',    component: AvatarWizard },
      { id: 'samurai',   label: 'Samurai',   component: AvatarSamurai },
      { id: 'viking',    label: 'Viking',    component: AvatarViking },
      { id: 'pirate',    label: 'Pirate',    component: AvatarPirate },
      { id: 'detective', label: 'Detective', component: AvatarDetective },
      { id: 'gamer',     label: 'Gamer',     component: AvatarGamer },
      { id: 'artist',    label: 'Artist',    component: AvatarArtist },
      { id: 'alien',     label: 'Alien',     component: AvatarAlien },
    ],
  },
  {
    label: 'Stick Figures', emoji: '🕴️',
    items: [
      { id: 'stickbasic',   label: 'Classic',  component: AvatarStickBasic },
      { id: 'stickdancer',  label: 'Dancer',   component: AvatarStickDancer },
      { id: 'stickninja',   label: 'Ninja',    component: AvatarStickNinja },
      { id: 'stickcoder',   label: 'Coder',    component: AvatarStickCoder },
    ],
  },
];
const AVATAR_COMPONENTS = AVATAR_CATEGORIES.flatMap(c => c.items);

function AvatarDisplay({ avatarUrl, initials, size = 'md' }: { avatarUrl: string; initials: string; size?: 'sm' | 'md' }) {
  const found = AVATAR_COMPONENTS.find(a => `builtin:${a.id}` === avatarUrl);
  const px = size === 'sm' ? 'w-full h-full' : 'w-full h-full';
  if (found) return <found.component />;
  if (avatarUrl && !avatarUrl.startsWith('builtin:')) {
    return <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />;
  }
  return <span className={`font-bold text-white ${size === 'sm' ? 'text-base' : 'text-2xl'}`}>{initials}</span>;
}

// ── Main component ─────────────────────────────────────────────────────────

export function StudentInfo() {
  const { user: authUser, loading: authLoading, signInWithEmail } = useAgencyAuth();
  const user = authUser;

  const [saved, setSaved]             = useState<StudentProfile>(empty);
  const [draft, setDraft]             = useState<StudentProfile>(empty);
  const [isLoading, setIsLoading]     = useState(true);
  const [isSaving, setIsSaving]       = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [activeField, setActiveField] = useState<keyof StudentProfile | null>(null);
  const [avatarModal, setAvatarModal] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent]   = useState(false);
  const [magicEmail, setMagicEmail]   = useState('');
  const isDirty = JSON.stringify(draft) !== JSON.stringify(saved);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.id) { setIsLoading(false); return; }
    loadProfile();
  }, [authLoading, user?.id]);

  const loadProfile = async () => {
    if (!user?.id) { setIsLoading(false); return; }
    setIsLoading(true);
    try {
      const { data } = await supabase.from('student_profiles').select('*').eq('user_id', user.id).maybeSingle();
      const unisexAvatars = ['robot', 'ninja', 'tech1', 'tech2', 'tech3'];
      const randomAvatar = unisexAvatars[Math.floor(Math.random() * unisexAvatars.length)];
      const base: StudentProfile = data ? {
        full_name: data.full_name || user?.user_metadata?.full_name || '',
        university: data.university || '', major: data.major || '',
        graduation_year: data.graduation_year || '', bio: data.bio || '',
        github_url: data.github_url || '', portfolio_url: data.portfolio_url || '',
        linkedin_url: data.linkedin_url || '', resume_url: data.resume_url || '',
        avatar_url: data.avatar_url || `builtin:${randomAvatar}`,
      } : { ...empty, full_name: user?.user_metadata?.full_name || '', avatar_url: `builtin:${randomAvatar}` };
      setSaved(base); setDraft(base);
      if (user?.id && (!data || !data.avatar_url)) {
        await supabase.from('student_profiles').upsert({ user_id: user.id, avatar_url: `builtin:${randomAvatar}` }, { onConflict: 'user_id' });
        await supabase.auth.updateUser({ data: { avatar_url: `builtin:${randomAvatar}` } });
      }
    } catch {
      const unisexAvatars = ['robot', 'ninja', 'tech1', 'tech2', 'tech3'];
      const randomAvatar = unisexAvatars[Math.floor(Math.random() * unisexAvatars.length)];
      const fb = { ...empty, full_name: user?.user_metadata?.full_name || '', avatar_url: `builtin:${randomAvatar}` };
      setSaved(fb); setDraft(fb);
    } finally { setIsLoading(false); }
  };

  const handleSave = async () => {
    if (!user?.id) { setError('You must be signed in.'); return; }
    if (!draft.full_name?.trim()) { setError('Full Name is required.'); return; }
    if (!draft.university?.trim()) { setError('University is required.'); return; }
    if (!draft.major?.trim()) { setError('Major / Field is required.'); return; }
    setError(null); setIsSaving(true);
    const { error: upsertError } = await supabase.from('student_profiles')
      .upsert({ user_id: user.id, ...draft }, { onConflict: 'user_id' });
    setIsSaving(false);
    if (upsertError) { setError(`Save failed: ${upsertError.message}`); return; }
    setSaved(draft); setActiveField(null); setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDiscard = () => { setDraft(saved); setActiveField(null); setError(null); };

  const handleBuiltInAvatar = async (id: string) => {
    const val = `builtin:${id}`;
    const newDraft = { ...draft, avatar_url: val };
    setDraft(newDraft);
    if (user?.id) {
      await supabase.from('student_profiles').upsert({ user_id: user.id, ...newDraft }, { onConflict: 'user_id' });
      await supabase.auth.updateUser({ data: { avatar_url: val } });
      setSaved(newDraft);
    }
    setAvatarModal(false);
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = magicEmail.trim() || user?.email;
    if (!target) return;
    setResendLoading(true);
    try { await signInWithEmail(target); setResendSent(true); } catch {}
    finally { setResendLoading(false); }
  };

  const set = (key: keyof StudentProfile, val: string) => setDraft(d => ({ ...d, [key]: val }));

  const initials = draft.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'KS';
  const completion = Math.round(
    [draft.full_name, draft.university, draft.major, draft.graduation_year, draft.bio, draft.github_url, draft.linkedin_url]
      .filter(Boolean).length / 7 * 100
  );

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <>
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="pb-24">

      {/* ── Profile Hero ── */}
      <div className="relative rounded-2xl overflow-hidden mb-6 border border-white/[0.06]"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}>
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => setAvatarModal(true)}>
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#0f2744,#1a1a2e)' }}>
                <AvatarDisplay avatarUrl={draft.avatar_url} initials={initials} />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <span className="text-[9px] text-white/80 font-mono">Change</span>
              </div>
              {user?.email_confirmed_at && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#09090b] flex items-center justify-center pointer-events-none">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              )}
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-white tracking-tight truncate">{draft.full_name || 'Your Name'}</h1>
              <p className="text-sm text-slate-400 mt-0.5 truncate">{user?.email}</p>
              {(draft.university || draft.major) && (
                <p className="text-xs text-slate-500 mt-1">{[draft.major, draft.university].filter(Boolean).join(' · ')}</p>
              )}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 max-w-[160px] h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${completion}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: completion === 100 ? 'rgb(52,211,153)' : 'linear-gradient(90deg,rgb(6,182,212),rgb(139,92,246))' }} />
                </div>
                <span className="text-[10px] font-mono text-slate-500">{completion}% complete</span>
              </div>
            </div>

            {/* Top Save */}
            <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
              {isDirty && (
                <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  onClick={handleDiscard}
                  className="px-3 py-2 rounded-xl border border-white/[0.08] text-xs text-slate-500 hover:text-white transition-all">
                  Discard
                </motion.button>
              )}
              <button onClick={handleSave} disabled={isSaving || !isDirty}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isDirty ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'border border-white/[0.06] bg-white/[0.02] text-white/30 cursor-not-allowed'
                } disabled:opacity-60`}>
                {isSaving ? <><div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Saving</> : <><Check className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Alerts ── */}
      <AnimatePresence>
        {error && (
          <motion.div key="err" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mb-5 px-4 py-3 rounded-xl bg-red-500/[0.08] border border-red-500/20 flex items-center gap-3 text-red-400 text-sm overflow-hidden">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            <button onClick={() => setError(null)} className="ml-auto flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
          </motion.div>
        )}
        {saveSuccess && (
          <motion.div key="ok" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mb-5 px-4 py-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm overflow-hidden">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Saved successfully.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <Section label="Academic" icon="🎓">
          <div className="grid sm:grid-cols-2 gap-3">
            {ACADEMIC.map(f => (
              <InlineField key={f.key} label={f.label} icon={<f.icon className="w-3.5 h-3.5" />}
                required={f.required} active={activeField === f.key}
                onActivate={() => setActiveField(f.key)} onBlur={() => setActiveField(null)}>
                <input type="text" value={draft[f.key]} onChange={e => set(f.key, e.target.value)}
                  placeholder={f.placeholder} readOnly={activeField !== f.key}
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white/20 pt-1 cursor-pointer focus:cursor-text" />
              </InlineField>
            ))}
          </div>
        </Section>

        <Section label="Identity" icon="🪪">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.07] flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">Email Address</p>
                  <p className="text-sm text-white">{user?.email}</p>
                </div>
              </div>
              {user?.email_confirmed_at
                ? <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                : <span className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full font-medium"><AlertCircle className="w-3 h-3" /> Unverified</span>
              }
            </div>
            {!user?.email_confirmed_at && !resendSent && (
              <motion.form onSubmit={handleSendMagicLink} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-4 pt-4 border-t border-white/[0.05] flex gap-2">
                <input type="email" value={magicEmail} onChange={e => setMagicEmail(e.target.value)}
                  placeholder={user?.email || 'Enter your email'}
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors" />
                <button type="submit" disabled={resendLoading}
                  className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap">
                  {resendLoading ? <div className="w-3 h-3 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" /> : <Mail className="w-3 h-3" />}
                  Send link
                </button>
              </motion.form>
            )}
            {resendSent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Magic link sent — check your inbox.
              </motion.p>
            )}
          </div>
        </Section>

        <Section label="Links" icon="🔗">
          <div className="grid sm:grid-cols-2 gap-3">
            {LINKS.map(l => (
              <InlineField key={l.key} label={l.label} icon={<l.icon className="w-3.5 h-3.5" />}
                active={activeField === l.key} onActivate={() => setActiveField(l.key)} onBlur={() => setActiveField(null)}>
                {activeField === l.key
                  ? <input type="url" value={draft[l.key]} onChange={e => set(l.key, e.target.value)}
                      placeholder={l.placeholder} autoFocus
                      className="w-full bg-transparent text-white text-xs font-mono focus:outline-none placeholder-white/20 pt-1" />
                  : draft[l.key]
                  ? <a href={draft[l.key]} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group pt-1 min-w-0">
                      <span className="truncate">{draft[l.key].replace(/^https?:\/\//, '')}</span>
                      <ExtIcon className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  : <p className="text-xs text-white/20 italic pt-1">Click to add</p>
                }
              </InlineField>
            ))}
          </div>
        </Section>

        <Section label="About" icon="✍️">
          <div onClick={() => setActiveField('bio')}
            className={`rounded-xl border p-5 transition-all cursor-pointer ${activeField === 'bio' ? 'border-white/20 bg-white/[0.04]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'}`}>
            {activeField === 'bio'
              ? <textarea autoFocus name="bio" value={draft.bio} onChange={e => set('bio', e.target.value)}
                  onBlur={() => setActiveField(null)} rows={5}
                  placeholder="Tell us about yourself — your interests, career goals, and what you're building..."
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white/20 resize-none leading-relaxed" />
              : <p className={`text-sm leading-relaxed ${draft.bio ? 'text-slate-300' : 'text-white/25 italic'}`}>
                  {draft.bio || 'Click to add a bio…'}
                </p>
            }
          </div>
        </Section>
      </div>

      {/* ── Floating Save Bar ── */}
      <AnimatePresence>
        {isDirty && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 shadow-2xl"
            style={{ background: 'rgba(9,9,11,0.92)', backdropFilter: 'blur(20px)' }}>
            <span className="text-xs text-slate-400 whitespace-nowrap">Unsaved changes</span>
            <div className="w-px h-4 bg-white/10" />
            <button onClick={handleDiscard} className="text-xs text-slate-500 hover:text-white transition-colors px-2 py-1">Discard</button>
            <button onClick={handleSave} disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all disabled:opacity-50">
              {isSaving ? <><div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Saving…</> : <><Check className="w-3.5 h-3.5" /> Save Changes</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>

      {/* ── Avatar Picker — bottom drawer style ── */}
      <AnimatePresence>
        {avatarModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[99]"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
              onClick={() => setAvatarModal(false)}
            />

            {/* Drawer — slides down from top */}
            <motion.div
              initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 right-0 z-[100] rounded-b-3xl overflow-hidden"
              style={{ background: 'linear-gradient(180deg, rgba(5,5,10,1) 0%, rgba(10,10,15,0.99) 100%)', boxShadow: '0 20px 60px rgba(6,182,212,0.12)' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pb-3 pt-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Title row */}
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-white font-bold text-lg tracking-tight">Pick Your Avatar</p>
                  <p className="text-slate-500 text-xs mt-0.5">Tap one to set it as your profile</p>
                </div>
                <button onClick={() => setAvatarModal(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categorized avatar grid */}
              <div className="px-4 pb-8 space-y-6">
                {AVATAR_CATEGORIES.map((cat, ci) => (
                  <div key={cat.label}>
                    {/* Category heading */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm">{cat.emoji}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">{cat.label}</span>
                      <div className="flex-1 h-px bg-white/[0.05]" />
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-3">
                      {cat.items.map((av, i) => {
                        const isSelected = draft.avatar_url === `builtin:${av.id}`;
                        return (
                          <motion.button
                            key={av.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (ci * 0.05) + i * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleBuiltInAvatar(av.id)}
                            className="relative flex flex-col items-center gap-1.5 group"
                          >
                            <div className={`relative w-full aspect-square rounded-2xl overflow-hidden transition-all duration-200 ${
                              isSelected
                                ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black shadow-lg shadow-cyan-500/40'
                                : 'ring-1 ring-white/10 group-hover:ring-cyan-400/40 group-hover:shadow-md group-hover:shadow-cyan-500/10'
                            }`}>
                              <av.component />
                              {isSelected && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  className="absolute inset-0 bg-cyan-400/10" />
                              )}
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/50 z-10"
                              >
                                <Check className="w-3 h-3 text-black" strokeWidth={3} />
                              </motion.div>
                            )}
                            <span className={`text-[9px] font-mono uppercase tracking-wider truncate w-full text-center transition-colors ${
                              isSelected ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'
                            }`}>{av.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Section({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-sm">{icon}</span>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">{label}</span>
        <div className="flex-1 h-px bg-white/[0.05]" />
      </div>
      {children}
    </section>
  );
}

function InlineField({ label, icon, required, active, onActivate, onBlur, children }: {
  label: string; icon: React.ReactNode; required?: boolean;
  active: boolean; onActivate: () => void; onBlur: () => void;
  children: React.ReactNode;
}) {
  return (
    <div onClick={onActivate} onBlur={onBlur}
      className={`rounded-xl border p-4 transition-all duration-150 cursor-pointer ${
        active ? 'border-white/20 bg-white/[0.04] ring-1 ring-white/[0.06]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03]'
      }`}>
      <div className="flex items-center gap-2 text-slate-500 mb-0.5">
        {icon}
        <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
        {required && <span className="text-red-400/60 text-[10px]">*</span>}
        {!active && <span className="ml-auto text-[9px] text-white/15 font-mono">click to edit</span>}
      </div>
      {children}
    </div>
  );
}
