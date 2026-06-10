import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LogIn, Download, RefreshCw, Mail, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAgencyAuth } from '../../../context/AgencyAuthContext';
import { supabase } from '../../../lib/supabase';
import { AuthModal } from '../../../components/agency/AuthModal';
import { Logo } from '../../../components/ui/Logo';

interface Profile {
  full_name: string;
  university: string;
  major: string;
  graduation_year: string;
  linkedin_url: string;
  resume_url: string;
  github_url: string;
  portfolio_url: string;
}

function generateShortId(userId: string) {
  return `KS-${userId.replace(/-/g, '').substring(0, 8).toUpperCase()}`;
}

// Real scannable Code 128 barcode — pure SVG, no library
const CODE128_B_START = 104;
const CODE128_STOP    = 106;
const CODE128_CHARS   = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const CODE128_PATTERNS: Record<number, string> = {
  0:'11011001100',1:'11001101100',2:'11001100110',3:'10010011000',4:'10010001100',
  5:'10001001100',6:'10011001000',7:'10011000100',8:'10001100100',9:'11001001000',
  10:'11001000100',11:'11000100100',12:'10110011100',13:'10011011100',14:'10011001110',
  15:'10111001100',16:'10011101100',17:'10011100110',18:'11001110010',19:'11001011100',
  20:'11001001110',21:'11011100100',22:'11001110100',23:'11101101110',24:'11101001100',
  25:'11100101100',26:'11100100110',27:'11101100100',28:'11100110100',29:'11100110010',
  30:'11011011000',31:'11011000110',32:'11000110110',33:'10100011000',34:'10001011000',
  35:'10001000110',36:'10110001000',37:'10001101000',38:'10001100010',39:'11010001000',
  40:'11000101000',41:'11000100010',42:'10110111000',43:'10110001110',44:'10001101110',
  45:'10111011000',46:'10111000110',47:'10001110110',48:'11101110110',49:'11010001110',
  50:'11000101110',51:'11011101000',52:'11011100010',53:'11011101110',54:'11101011000',
  55:'11101000110',56:'11100010110',57:'11101101000',58:'11101100010',59:'11100011010',
  60:'11101111010',61:'11001000010',62:'11110001010',63:'10100110000',64:'10100001100',
  65:'10010110000',66:'10010000110',67:'10000101100',68:'10000100110',69:'10110010000',
  70:'10110000100',71:'10011010000',72:'10011000010',73:'10000110100',74:'10000110010',
  75:'11000010010',76:'11001010000',77:'11110111010',78:'11000010100',79:'10001111010',
  80:'10100111100',81:'10010111100',82:'10010011110',83:'10111100100',84:'10011110100',
  85:'10011110010',86:'11110100100',87:'11110010100',88:'11110010010',89:'11011011110',
  90:'11011110110',91:'11110110110',92:'10101111000',93:'10100011110',94:'10001011110',
  95:'10111101000',96:'10111100010',97:'11110101000',98:'11110100010',99:'10111011110',
  100:'10111101110',101:'11101011110',102:'11110101110',103:'11010000100',104:'11010010000',
  105:'11010011100',106:'1100011101011',
};

function encodeCode128(text: string): string {
  const codes: number[] = [CODE128_B_START];
  let checksum = CODE128_B_START;
  for (let i = 0; i < text.length; i++) {
    const idx = CODE128_CHARS.indexOf(text[i]);
    if (idx === -1) continue;
    codes.push(idx);
    checksum += idx * (i + 1);
  }
  codes.push(checksum % 103);
  codes.push(CODE128_STOP);
  return codes.map(c => CODE128_PATTERNS[c] ?? '').join('') + '11';
}

function Barcode({ value }: { value: string }) {
  const encoded = encodeCode128(value);
  const barWidth = 1.5;
  const height = 28;
  const totalWidth = encoded.length * barWidth;

  return (
    <svg width={totalWidth} height={height} viewBox={`0 0 ${totalWidth} ${height}`}>
      {encoded.split('').map((bit, i) =>
        bit === '1' ? (
          <rect key={i} x={i * barWidth} y={0} width={barWidth} height={height}
            fill="rgba(255,255,255,0.75)" />
        ) : null
      )}
    </svg>
  );
}

function Chip() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <rect x="0.5" y="0.5" width="43" height="33" rx="6" fill="url(#chipgrad)" stroke="rgba(255,220,120,0.25)" />
      <line x1="15" y1="0" x2="15" y2="34" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="29" y1="0" x2="29" y2="34" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0"  y1="11" x2="44" y2="11" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0"  y1="23" x2="44" y2="23" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <rect x="17" y="8" width="10" height="18" rx="2.5" fill="rgba(0,0,0,0.22)"
        stroke="rgba(255,220,120,0.18)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="chipgrad" x1="0" y1="0" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c8982a" />
          <stop offset="30%"  stopColor="#f5d170" />
          <stop offset="60%"  stopColor="#c07a20" />
          <stop offset="100%" stopColor="#e8b84b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IdCard({ user, profile, shortId, isEmailVerified }: {
  user: any;
  profile: Profile | null;
  shortId: string;
  isEmailVerified: boolean;
}) {
  const name       = profile?.full_name || user?.user_metadata?.full_name || 'Member';
  const university = profile?.university || '—';
  const major      = profile?.major || '—';
  const verifyUrl  = `${window.location.origin}/verify/${shortId}`;

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{
        width: 480,
        aspectRatio: '1.586',
        borderRadius: 20,
        background: 'linear-gradient(140deg, #111111 0%, #0a0a0a 40%, #141414 100%)',
        boxShadow: [
          '0 50px 120px rgba(0,0,0,0.95)',
          '0 20px 60px rgba(0,0,0,0.7)',
          '0 0 0 1px rgba(255,255,255,0.08)',
          'inset 0 1px 0 rgba(255,255,255,0.1)',
          'inset 0 -1px 0 rgba(255,255,255,0.03)',
        ].join(', '),
      }}
    >
      {/* Brushed texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,1) 1px, rgba(255,255,255,1) 2px)',
          backgroundSize: '100% 3px',
        }}
      />
      {/* Top-right radial light */}
      <div className="absolute pointer-events-none"
        style={{ top: -80, right: -80, width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)' }}
      />
      {/* Top shine */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 70%, transparent)' }}
      />

      <div className="absolute inset-0 z-10 flex flex-col" style={{ padding: '5% 7% 4% 7%' }}>

        {/* HEADER */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Logo className="w-6 h-6 text-white" />
            <div>
              <div className="text-[12px] font-black tracking-[0.16em] text-white leading-none">
                KAIZEN<span className="font-extralight opacity-35">STAT</span>
              </div>
              <div className="text-[9px] tracking-[0.22em] uppercase font-mono mt-[2px]"
                style={{ color: 'rgba(255,255,255,0.45)' }}>Member Identity Card</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="w-[5px] h-[5px] rounded-full bg-white flex-shrink-0"
              style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }} />
            <span className="text-[9px] font-bold tracking-[0.15em] text-white uppercase">Active</span>
          </div>
        </div>

        {/* NAME */}
        <div className="flex-shrink-0" style={{ marginTop: '5%' }}>
          <div className="text-[9px] tracking-[0.22em] uppercase font-mono mb-1"
            style={{ color: 'rgba(255,255,255,0.45)' }}>Member Name</div>
          <div className="font-bold text-white leading-none"
            style={{ fontSize: 20, letterSpacing: '0.05em', textShadow: '0 2px 20px rgba(255,255,255,0.12)' }}>
            {name.toUpperCase()}
          </div>
        </div>

        {/* INSTITUTION + PROGRAMME */}
        <div className="flex gap-6 flex-shrink-0" style={{ marginTop: '4%' }}>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-0.5"
              style={{ color: 'rgba(255,255,255,0.4)' }}>Institution</div>
            <div className="text-[11px] font-medium leading-snug"
              style={{ color: 'rgba(255,255,255,0.75)' }}>{university}</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-0.5"
              style={{ color: 'rgba(255,255,255,0.4)' }}>Programme</div>
            <div className="text-[11px] font-medium leading-snug"
              style={{ color: 'rgba(255,255,255,0.75)' }}>{major}</div>
          </div>
        </div>

        {/* CHIP + QR */}
        <div className="flex items-end justify-between flex-shrink-0" style={{ marginTop: '4%' }}>
          <div className="flex flex-col gap-2">
            <Chip />
            <div>
              <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-0.5"
                style={{ color: 'rgba(255,255,255,0.4)' }}>Member ID</div>
              <div className="text-[13px] font-bold font-mono tracking-[0.08em] text-white">{shortId}</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            {isEmailVerified ? (
              <>
                <div className="p-1.5 rounded-lg"
                  style={{ background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
                  <QRCodeSVG value={verifyUrl} size={54} bgColor="#ffffff" fgColor="#0a0a0a" level="M" includeMargin={false} />
                </div>
                <div className="text-[9px] font-mono tracking-[0.12em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>Scan to Verify</div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center rounded-lg gap-0.5"
                  style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.15)' }}>
                  <ShieldCheck className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.25)' }} />
                  <span className="text-[7px] font-mono tracking-wider uppercase text-center px-1 leading-tight"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>Verify{'\n'}Email</span>
                </div>
                <div className="text-[8px] font-mono tracking-[0.1em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>Pending</div>
              </>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="flex-shrink-0 mt-auto" style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: '3%' }} />

        {/* FOOTER */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="text-[9px] font-mono tracking-[0.1em] italic"
            style={{ color: 'rgba(255,255,255,0.28)' }}>Continuous improvement for ML pipelines.</div>
          <Barcode value={shortId} />
        </div>

      </div>

      {/* Bottom shine */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }}
      />
    </div>
  );
}

function CardBack({ profile, shortId }: { profile: Profile | null; shortId: string }) {
  const links = [
    { label: 'LinkedIn',  url: profile?.linkedin_url  },
    { label: 'Resume',    url: profile?.resume_url    },
    { label: 'GitHub',    url: profile?.github_url    },
    { label: 'Portfolio', url: profile?.portfolio_url },
  ].filter(l => l.url);

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{
        width: 480,
        aspectRatio: '1.586',
        borderRadius: 20,
        background: 'linear-gradient(140deg, #111111 0%, #0a0a0a 40%, #141414 100%)',
        boxShadow: [
          '0 50px 120px rgba(0,0,0,0.95)',
          '0 20px 60px rgba(0,0,0,0.7)',
          '0 0 0 1px rgba(255,255,255,0.08)',
          'inset 0 1px 0 rgba(255,255,255,0.1)',
          'inset 0 -1px 0 rgba(255,255,255,0.03)',
        ].join(', '),
      }}
    >
      {/* Brushed texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,1) 1px, rgba(255,255,255,1) 2px)', backgroundSize: '100% 3px' }}
      />
      {/* Top shine */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 70%, transparent)' }} />

      <div className="absolute inset-0 z-10 flex flex-col" style={{ padding: '5% 7% 5% 7%' }}>

        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 mb-4">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5 text-white opacity-50" />
            <span className="text-[10px] font-black tracking-[0.16em] text-white/40 uppercase">KaizenStat</span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">{shortId}</span>
        </div>

        {/* Title */}
        <div className="flex-shrink-0 mb-5">
          <div className="text-[9px] tracking-[0.22em] uppercase font-mono text-white/40 mb-1">Connect with me</div>
          <div className="text-[15px] font-bold text-white tracking-wide">{profile?.full_name?.toUpperCase() || 'MEMBER'}</div>
        </div>

        {/* QR codes grid */}
        {links.length > 0 ? (
          <div className="grid grid-cols-4 gap-3 flex-1 items-start">
            {links.map(({ label, url }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <a href={url!} target="_blank" rel="noopener noreferrer"
                  className="p-1.5 rounded-lg block transition-opacity hover:opacity-80"
                  style={{ background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                  <QRCodeSVG value={url!} size={72} bgColor="#ffffff" fgColor="#0a0a0a" level="M" />
                </a>
                <a href={url!} target="_blank" rel="noopener noreferrer"
                  className="text-[8px] font-mono tracking-[0.12em] uppercase text-center hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {label} ↗
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 opacity-40">
            <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase text-center">
              Add LinkedIn, Resume, GitHub<br />or Portfolio in Member Info
            </p>
          </div>
        )}

        {/* Footer divider */}
        <div className="mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-[8px] font-mono tracking-[0.12em] text-white/20 italic text-center">
            Scan any QR code to connect · kaizenstat.com
          </div>
        </div>

      </div>

      {/* Bottom shine */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />
    </div>
  );
}

export function VirtualIdCard() {
  const { user, signInWithEmail } = useAgencyAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shortId = user ? generateShortId(user.id) : 'KS-PREVIEW0';
  const isEmailVerified = !!(user?.email_confirmed_at);

  useEffect(() => {
    if (user?.id) loadProfile();
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('student_profiles')
        .select('full_name, university, major, graduation_year, linkedin_url, resume_url, github_url, portfolio_url')
        .eq('user_id', user.id)
        .single();
      if (data) setProfile({
        ...data,
        linkedin_url: data.linkedin_url || '',
        resume_url: data.resume_url || '',
        github_url: data.github_url || '',
        portfolio_url: data.portfolio_url || '',
      });

      const { error: cardError } = await supabase.from('student_id_cards').upsert({
        user_id: user.id,
        id_number: generateShortId(user.id),
        status: 'ACTIVE',
        valid_thru: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      if (cardError) {
        console.error('Failed to create/update ID card:', cardError);
      }
    } catch (err) {
      console.error('Profile load error:', err);
    }
    finally { setIsLoading(false); }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    setResendLoading(true);
    try {
      await signInWithEmail(user.email);
      setResendSent(true);
    } catch { }
    finally { setResendLoading(false); }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const domtoimage = await import('dom-to-image-more');
      const dataUrl = await domtoimage.default.toPng(cardRef.current, {
        width: cardRef.current.offsetWidth * 3,
        height: cardRef.current.offsetHeight * 3,
        style: {
          transform: 'scale(3)',
          transformOrigin: 'top left',
          borderRadius: '20px',
        },
        bgcolor: '#0a0a0a',
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `kaizenstat-id-${shortId}.png`;
      a.click();
    } catch (e) { console.error('Download failed:', e); }
  };

  // Not signed in — show sign-in gate
  if (!user) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Member Identity Card</h1>
          <p className="text-slate-400 text-sm">Your official KaizenStat digital ID card.</p>
        </div>

        {/* Demo card — blurred, with sign-in overlay */}
        <div className="relative mb-10">
          <div className="filter blur-[3px] opacity-60 pointer-events-none">
            <IdCard
              user={{ user_metadata: { full_name: 'Your Name Here' } }}
              profile={{ full_name: 'Your Name Here', university: 'Your University', major: 'Your Programme', graduation_year: '2026', linkedin_url: '', resume_url: '', github_url: '', portfolio_url: '' }}
              shortId="KS-PREVIEW0"
              isEmailVerified={false}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 75%)' }}>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white/50" />
            </div>
            <p className="text-sm font-semibold text-white">Sign in to generate your ID</p>
            <p className="text-xs text-slate-500 text-center max-w-[240px]">
              Your member card is uniquely tied to your account.
            </p>
          </div>
        </div>

        {/* Sign in options */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-black hover:bg-white/90 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <LogIn className="w-4 h-4" />
            Sign in with Email
          </button>
          <p className="text-center text-[10px] text-slate-600 pt-1">
            We'll send a magic link — no password needed.
          </p>
        </div>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Member Identity Card</h1>
        <p className="text-slate-400 text-sm">Your official KaizenStat digital ID card.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center" style={{ height: 303 }}>
          <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Flip container */}
          <div style={{ perspective: 1200, width: 480 }}>
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: 'preserve-3d', position: 'relative', width: 480, aspectRatio: '1.586' }}
            >
              {/* FRONT */}
              <div ref={cardRef} style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
                <IdCard user={user} profile={profile} shortId={shortId} isEmailVerified={isEmailVerified} />
              </div>
              {/* BACK */}
              <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}>
                <CardBack profile={profile} shortId={shortId} />
              </div>
            </motion.div>
          </div>

          {/* Flip hint */}
          <p className="text-[10px] text-slate-600 mt-3 tracking-widest uppercase font-mono">
            {isFlipped ? '← Front — Member ID' : 'Back — Connect links →'}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95">
              <Download className="w-3.5 h-3.5" /> Download Card
            </button>
            <button onClick={() => setIsFlipped(f => !f)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white/25 transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> {isFlipped ? 'Show Front' : 'Show Back'}
            </button>
          </div>

          {/* Email verification banner */}
          {!isEmailVerified && (
            <div className="w-full max-w-md mt-6 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.05)' }}>
              <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-amber-300 mb-1">Verify your email to unlock QR code</p>
                    <p className="text-xs text-amber-400/70 leading-relaxed">
                      Your card is ready — once you verify <span className="font-mono text-amber-300">{user.email}</span>, your unique QR code will activate for identity verification.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {resendSent ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Verification email sent — check your inbox.
                    </div>
                  ) : (
                    <button
                      onClick={handleResendVerification}
                      disabled={resendLoading}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all disabled:opacity-60"
                    >
                      {resendLoading ? (
                        <div className="w-3.5 h-3.5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                      ) : (
                        <Mail className="w-3.5 h-3.5" />
                      )}
                      Resend verification email
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {isEmailVerified && (
            <p className="text-[10px] text-slate-600 mt-4">
              QR code links to{' '}
              <span className="text-slate-500 font-mono">{window.location.origin}/verify/{shortId}</span>
            </p>
          )}

          {/* Activation hint */}
          <div className="mt-4 px-4 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] max-w-md text-center">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              To activate your card, fill in the{' '}
              <span className="text-red-400 font-semibold">required fields</span>{' '}
              (Name <span className="text-red-400">*</span>, University <span className="text-red-400">*</span>, Major <span className="text-red-400">*</span>)
              and verify your email in the{' '}
              <a href="/student" className="text-slate-300 hover:text-white underline">Member Info</a> tab.
              Add LinkedIn, Resume, GitHub & Portfolio to unlock the{' '}
              <button onClick={() => setIsFlipped(true)} className="text-slate-300 hover:text-white underline">back of the card</button>.
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}
