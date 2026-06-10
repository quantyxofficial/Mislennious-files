import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../../lib/supabase';
import { Logo } from '../../components/ui/Logo';

// ── Shared card primitives (copied from VirtualIdCard) ──────────

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
        bit === '1' ? <rect key={i} x={i * barWidth} y={0} width={barWidth} height={height} fill="rgba(255,255,255,0.75)" /> : null
      )}
    </svg>
  );
}

function Chip() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <rect x="0.5" y="0.5" width="43" height="33" rx="6" fill="url(#chipgrad2)" stroke="rgba(255,220,120,0.25)" />
      <line x1="15" y1="0" x2="15" y2="34" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="29" y1="0" x2="29" y2="34" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0"  y1="11" x2="44" y2="11" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0"  y1="23" x2="44" y2="23" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <rect x="17" y="8" width="10" height="18" rx="2.5" fill="rgba(0,0,0,0.22)" stroke="rgba(255,220,120,0.18)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="chipgrad2" x1="0" y1="0" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c8982a" />
          <stop offset="30%"  stopColor="#f5d170" />
          <stop offset="60%"  stopColor="#c07a20" />
          <stop offset="100%" stopColor="#e8b84b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MemberCard({ idNumber, name, university, major }: {
  idNumber: string;
  name: string;
  university: string;
  major: string;
}) {
  const verifyUrl = `${window.location.origin}/verify/${idNumber}`;

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
      {/* Top-right radial light */}
      <div className="absolute pointer-events-none"
        style={{ top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)' }}
      />
      {/* Top shine */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 70%, transparent)' }} />

      <div className="absolute inset-0 z-10 flex flex-col" style={{ padding: '5% 7% 4% 7%' }}>

        {/* HEADER */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Logo className="w-6 h-6 text-white" />
            <div>
              <div className="text-[12px] font-black tracking-[0.16em] text-white leading-none">
                KAIZEN<span className="font-extralight opacity-35">STAT</span>
              </div>
              <div className="text-[9px] tracking-[0.22em] uppercase font-mono mt-[2px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Member Identity Card</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="w-[5px] h-[5px] rounded-full bg-white flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }} />
            <span className="text-[9px] font-bold tracking-[0.15em] text-white uppercase">Active</span>
          </div>
        </div>

        {/* NAME */}
        <div className="flex-shrink-0" style={{ marginTop: '5%' }}>
          <div className="text-[9px] tracking-[0.22em] uppercase font-mono mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Member Name</div>
          <div className="font-bold text-white leading-none" style={{ fontSize: 20, letterSpacing: '0.05em', textShadow: '0 2px 20px rgba(255,255,255,0.12)' }}>
            {name.toUpperCase()}
          </div>
        </div>

        {/* INSTITUTION + PROGRAMME */}
        <div className="flex gap-6 flex-shrink-0" style={{ marginTop: '4%' }}>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Institution</div>
            <div className="text-[11px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>{university}</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Programme</div>
            <div className="text-[11px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>{major}</div>
          </div>
        </div>

        {/* CHIP + QR */}
        <div className="flex items-end justify-between flex-shrink-0" style={{ marginTop: '4%' }}>
          <div className="flex flex-col gap-2">
            <Chip />
            <div>
              <div className="text-[9px] tracking-[0.2em] uppercase font-mono mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Member ID</div>
              <div className="text-[13px] font-bold font-mono tracking-[0.08em] text-white">{idNumber}</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="p-1.5 rounded-lg" style={{ background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
              <QRCodeSVG value={verifyUrl} size={54} bgColor="#ffffff" fgColor="#0a0a0a" level="M" />
            </div>
            <div className="text-[9px] font-mono tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>Verified ✓</div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="flex-shrink-0 mt-auto" style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: '3%' }} />

        {/* FOOTER */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="text-[9px] font-mono tracking-[0.1em] italic" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Continuous improvement for ML pipelines.
          </div>
          <Barcode value={idNumber} />
        </div>

      </div>

      {/* Bottom shine */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />
    </div>
  );
}

// ── Main verification page ───────────────────────────────────────

export function MemberIdVerify() {
  const { shortId } = useParams();
  const [card, setCard] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { verifyMemberId(); }, [shortId]);

  const verifyMemberId = async () => {
    if (!shortId) { setError('Invalid member ID'); setLoading(false); return; }
    setLoading(true);
    try {
      const { data: cardData, error: cardError } = await supabase
        .from('student_id_cards')
        .select('*')
        .eq('id_number', shortId)
        .single();

      if (cardError || !cardData) {
        setError(`Member ID "${shortId}" not found.`);
        setLoading(false);
        return;
      }
      setCard(cardData);

      if (cardData.user_id) {
        const { data: profileData } = await supabase
          .from('student_profiles')
          .select('full_name, university, major')
          .eq('user_id', cardData.user_id)
          .single();
        if (profileData) setProfile(profileData);
      }
    } catch (err) {
      setError('An error occurred while verifying the member ID.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0a0a] to-[#0d0d1a] flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-8 w-full">

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-slate-300">Verifying member ID...</p>
          </div>
        ) : error ? (
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-slate-400 mb-4">{error}</p>
            <p className="text-sm text-slate-500">Contact support at founders@kaizenstat.com</p>
          </div>
        ) : card ? (
          <>
            {/* Verified badge */}
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300 tracking-wide">KaizenStat Member Verified</span>
            </div>

            {/* The actual card */}
            <div style={{ maxWidth: 480, width: '100%' }}>
              <MemberCard
                idNumber={card.id_number}
                name={profile?.full_name || 'Member'}
                university={profile?.university || '—'}
                major={profile?.major || '—'}
              />
            </div>

            {/* Simple message */}
            <p className="text-slate-500 text-sm text-center max-w-sm">
              This person is a verified member of the KaizenStat community.
            </p>

            <p className="text-xs text-slate-600">
              Scanned on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </>
        ) : null}

        <a href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline mt-2">
          Back to KaizenStat
        </a>
      </motion.div>
    </div>
  );
}
