import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, BookOpen, Calendar, AlertCircle, Github, Link as LinkIcon, Edit2, Check, Mail, CheckCircle2, Linkedin, FileText } from 'lucide-react';
import { useAgencyAuth } from '../../../context/AgencyAuthContext';
import { supabase } from '../../../lib/supabase';

interface StudentProfile {
  full_name: string;
  university: string;
  major: string;
  graduation_year: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
  linkedin_url: string;
  resume_url: string;
}

export function StudentInfo() {
  const { user: authUser, signInWithEmail } = useAgencyAuth();
  const user = authUser;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [magicEmail, setMagicEmail] = useState('');
  const [formData, setFormData] = useState<StudentProfile>({
    full_name: user?.user_metadata?.full_name || '',
    university: '',
    major: '',
    graduation_year: '',
    bio: '',
    github_url: '',
    portfolio_url: '',
    linkedin_url: '',
    resume_url: '',
  });

  useEffect(() => {
    if (!user?.id) return;
    loadProfile();
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user?.id) return;
    try {
      setError(null);
      setIsLoading(true);

      const { data, error: fetchError } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError) {
        setFormData(prev => ({ ...prev, full_name: user?.user_metadata?.full_name || '' }));
        setIsLoading(false);
        return;
      }

      if (data) {
        setFormData({
          full_name: data.full_name || user?.user_metadata?.full_name || '',
          university: data.university || '',
          major: data.major || '',
          graduation_year: data.graduation_year || '',
          bio: data.bio || '',
          github_url: data.github_url || '',
          portfolio_url: data.portfolio_url || '',
          linkedin_url: data.linkedin_url || '',
          resume_url: data.resume_url || '',
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?.id) {
      setError('You must be signed in to save your profile.');
      return;
    }

    // Validate required fields
    if (!formData.full_name?.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!formData.university?.trim()) {
      setError('University is required.');
      return;
    }
    if (!formData.major?.trim()) {
      setError('Major / Field is required.');
      return;
    }

    try {
      setError(null);
      setSaveSuccess(false);
      setIsSaving(true);

      const payload = {
        user_id: user.id,
        full_name: formData.full_name,
        university: formData.university,
        major: formData.major,
        graduation_year: formData.graduation_year,
        bio: formData.bio,
        github_url: formData.github_url,
        portfolio_url: formData.portfolio_url,
        linkedin_url: formData.linkedin_url,
        resume_url: formData.resume_url,
      };

      const { error: upsertError } = await supabase
        .from('student_profiles')
        .upsert(payload, { onConflict: 'user_id' });

      if (upsertError) {
        setError(`Save failed: ${upsertError.message}`);
        return;
      }

      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = magicEmail.trim() || user?.email;
    if (!target) return;
    setResendLoading(true);
    try {
      await signInWithEmail(target);
      setResendSent(true);
    } catch { }
    finally { setResendLoading(false); }
  };

  const inputClass = "w-full bg-transparent border-b border-lux-glassBorder pb-2 text-base font-serif text-lux-text focus:outline-none focus:border-lux-text/50 transition-colors placeholder-lux-muted/40";
  const monoInputClass = "w-full bg-transparent border-b border-lux-glassBorder pb-2 text-sm font-mono text-lux-text focus:outline-none focus:border-lux-text/50 transition-colors placeholder-lux-muted/40";

  const cardClass = (editing: boolean) =>
    `rounded-2xl p-6 border transition-all ${editing ? 'bg-lux-glass border-lux-glassBorder' : 'glass-bento'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-lux-glass border border-lux-glassBorder flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-serif font-bold text-lux-text">
                {formData.full_name?.charAt(0).toUpperCase() || 'S'}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-serif text-lux-text leading-tight">{formData.full_name || 'Member Profile'}</h1>
              <p className="text-sm text-lux-muted mt-2">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={isSaving}
            className={`px-6 py-3 rounded-full font-semibold tracking-wide transition-all flex items-center gap-2 flex-shrink-0 ${
              isEditing
                ? 'bg-lux-text text-lux-cream hover:bg-lux-text/90 disabled:opacity-60'
                : 'bg-lux-glass border border-lux-glassBorder text-lux-text hover:border-lux-text/30'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                Saving
              </>
            ) : isEditing ? (
              <><Check className="w-5 h-5" /> Save Changes</>
            ) : (
              <><Edit2 className="w-5 h-5" /> Edit Profile</>
            )}
          </button>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Profile saved successfully.</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-10">

        {/* ── Academic ── */}
        <section>
          <SectionDivider label="Academic" />
          <div className="grid md:grid-cols-2 gap-5">

            {/* Full Name */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <User className="w-4 h-4" /> Full Name <span className="text-red-400">*</span>
              </label>
              {isEditing ? (
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange}
                  className={inputClass} placeholder="Your full name" />
              ) : (
                <p className="text-lg font-serif text-lux-text">{formData.full_name || '–'}</p>
              )}
            </div>

            {/* Email */}
            <div className="rounded-2xl p-6 glass-bento">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <Mail className="w-4 h-4" /> Email Address
              </label>

              {user?.email_confirmed_at ? (
                <>
                  <p className="text-lg font-serif text-lux-text">{user.email}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mt-3">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified — QR code active
                  </p>
                </>
              ) : resendSent ? (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center gap-2 py-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <p className="text-sm font-semibold text-emerald-400">Magic link sent!</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Check your inbox and click the link to verify your email and unlock your QR code.
                  </p>
                  <button onClick={() => setResendSent(false)}
                    className="text-[11px] text-slate-500 hover:text-slate-300 underline mt-1 transition-colors">
                    Use a different email
                  </button>
                </motion.div>
              ) : (
                <>
                  <p className="flex items-center gap-1.5 text-[11px] text-amber-400 mb-4">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    Not verified — verify your email to unlock your QR code.
                  </p>
                  <form onSubmit={handleSendMagicLink} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-lux-muted/50" />
                      <input
                        type="email"
                        value={magicEmail}
                        onChange={e => setMagicEmail(e.target.value)}
                        placeholder={user?.email || 'Enter your email'}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-white/25 transition-colors"
                      />
                    </div>
                    <button type="submit" disabled={resendLoading}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all disabled:opacity-60">
                      {resendLoading
                        ? <div className="w-3.5 h-3.5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                        : <Mail className="w-3.5 h-3.5" />}
                      Send magic link
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* University */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <MapPin className="w-4 h-4" /> University <span className="text-red-400">*</span>
              </label>
              {isEditing ? (
                <input type="text" name="university" value={formData.university} onChange={handleChange}
                  className={inputClass} placeholder="Your institution" />
              ) : (
                <p className="text-base font-serif text-lux-text">{formData.university || '–'}</p>
              )}
            </div>

            {/* Major */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <BookOpen className="w-4 h-4" /> Major / Field <span className="text-red-400">*</span>
              </label>
              {isEditing ? (
                <input type="text" name="major" value={formData.major} onChange={handleChange}
                  className={inputClass} placeholder="Your field of study" />
              ) : (
                <p className="text-base font-serif text-lux-text">{formData.major || '–'}</p>
              )}
            </div>

            {/* Graduation */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <Calendar className="w-4 h-4" /> Expected Graduation
              </label>
              {isEditing ? (
                <input type="text" name="graduation_year" value={formData.graduation_year} onChange={handleChange}
                  className={inputClass} placeholder="2026" />
              ) : (
                <p className="text-base font-serif text-lux-text">{formData.graduation_year || '–'}</p>
              )}
            </div>

          </div>
        </section>

        {/* ── Links ── */}
        <section>
          <SectionDivider label="Links" />
          <div className="grid md:grid-cols-2 gap-5">

            {/* GitHub */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <Github className="w-4 h-4" /> GitHub
              </label>
              {isEditing ? (
                <input type="url" name="github_url" value={formData.github_url} onChange={handleChange}
                  className={monoInputClass} placeholder="https://github.com/username" />
              ) : formData.github_url ? (
                <ExternalLink href={formData.github_url} />
              ) : (
                <p className="text-lux-muted text-sm">Not provided</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </label>
              {isEditing ? (
                <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange}
                  className={monoInputClass} placeholder="https://linkedin.com/in/username" />
              ) : formData.linkedin_url ? (
                <ExternalLink href={formData.linkedin_url} />
              ) : (
                <p className="text-lux-muted text-sm">Not provided</p>
              )}
            </div>

            {/* Portfolio */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <LinkIcon className="w-4 h-4" /> Portfolio Website
              </label>
              {isEditing ? (
                <input type="url" name="portfolio_url" value={formData.portfolio_url} onChange={handleChange}
                  className={monoInputClass} placeholder="https://yourportfolio.com" />
              ) : formData.portfolio_url ? (
                <ExternalLink href={formData.portfolio_url} />
              ) : (
                <p className="text-lux-muted text-sm">Not provided</p>
              )}
            </div>

            {/* Resume */}
            <div className={cardClass(isEditing)}>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lux-muted mb-4">
                <FileText className="w-4 h-4" /> Resume / CV
              </label>
              {isEditing ? (
                <input type="url" name="resume_url" value={formData.resume_url} onChange={handleChange}
                  className={monoInputClass} placeholder="https://drive.google.com/..." />
              ) : formData.resume_url ? (
                <ExternalLink href={formData.resume_url} label="View Resume" />
              ) : (
                <p className="text-lux-muted text-sm">Not provided</p>
              )}
            </div>

          </div>
        </section>

        {/* ── Bio ── */}
        <section>
          <SectionDivider label="About" />
          <div className={`rounded-2xl p-8 border transition-all ${isEditing ? 'bg-lux-glass border-lux-glassBorder' : 'glass-bento'}`}>
            {isEditing ? (
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows={5}
                placeholder="Tell us about yourself, your interests, career goals, and what you're passionate about..."
                className="w-full bg-transparent text-lux-text focus:outline-none transition-colors placeholder-lux-muted/40 resize-none text-base leading-relaxed" />
            ) : (
              <p className={`leading-relaxed ${formData.bio ? 'text-lux-text' : 'text-lux-muted italic'}`}>
                {formData.bio || 'No bio added yet. Click Edit to add one.'}
              </p>
            )}
          </div>
        </section>

      </div>
    </motion.div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-gradient-to-r from-lux-glassBorder to-transparent" />
      <h2 className="text-base font-semibold text-lux-text uppercase tracking-[0.15em]">{label}</h2>
      <div className="h-px flex-1 bg-gradient-to-l from-lux-glassBorder to-transparent" />
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-lux-text hover:text-lux-muted transition-colors text-sm flex items-center gap-2 group font-mono">
      <span className="truncate">{label || href.replace(/^https?:\/\//, '')}</span>
      <LinkIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0 flex-shrink-0" />
    </a>
  );
}
