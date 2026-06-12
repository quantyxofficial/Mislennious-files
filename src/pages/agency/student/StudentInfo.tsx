import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, MapPin, BookOpen, Calendar, AlertCircle, Github,
  Link as LinkIcon, Check, Mail, CheckCircle2, Linkedin,
  FileText, ExternalLink as ExtIcon, Camera, Loader2, X, Upload,
} from 'lucide-react';
import { useAgencyAuth } from '../../../context/AgencyAuthContext';
import { supabase } from '../../../lib/supabase';

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

// ── SVG Avatar components ──────────────────────────────────────────────────

function AvatarMale1() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#m1bg)"/>
      <defs>
        <linearGradient id="m1bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f2744"/><stop offset="1" stopColor="#1a3a6e"/>
        </linearGradient>
      </defs>
      {/* Body / shirt */}
      <path d="M18 74 Q18 58 40 56 Q62 58 62 74Z" fill="#2563eb"/>
      <path d="M32 56 L40 62 L48 56" fill="#1d4ed8"/>
      {/* Neck */}
      <rect x="35" y="48" width="10" height="10" rx="2" fill="#f5c5a3"/>
      {/* Head */}
      <ellipse cx="40" cy="36" rx="14" ry="15" fill="#f5c5a3"/>
      {/* Hair */}
      <path d="M26 32 Q26 18 40 18 Q54 18 54 32 Q54 24 40 22 Q26 22 26 32Z" fill="#3d2b1f"/>
      <path d="M26 30 Q24 36 26 38" stroke="#3d2b1f" strokeWidth="3" strokeLinecap="round"/>
      <path d="M54 30 Q56 36 54 38" stroke="#3d2b1f" strokeWidth="3" strokeLinecap="round"/>
      {/* Eyes */}
      <ellipse cx="34" cy="35" rx="2.5" ry="2.8" fill="#1a1a1a"/>
      <ellipse cx="46" cy="35" rx="2.5" ry="2.8" fill="#1a1a1a"/>
      <circle cx="35" cy="34" r="0.8" fill="white"/>
      <circle cx="47" cy="34" r="0.8" fill="white"/>
      {/* Eyebrows */}
      <path d="M31 31 Q34 29.5 37 31" stroke="#3d2b1f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 31 Q46 29.5 49 31" stroke="#3d2b1f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Nose */}
      <path d="M39 37 Q40 40 41 37" stroke="#d4956a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Smile */}
      <path d="M35 43 Q40 47 45 43" stroke="#c47a52" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarMale2() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#m2bg)"/>
      <defs>
        <linearGradient id="m2bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a0533"/><stop offset="1" stopColor="#2d0a52"/>
        </linearGradient>
      </defs>
      <path d="M16 74 Q16 57 40 55 Q64 57 64 74Z" fill="#7c3aed"/>
      <path d="M33 55 L40 61 L47 55" fill="#6d28d9"/>
      <rect x="35" y="47" width="10" height="10" rx="2" fill="#deb887"/>
      <ellipse cx="40" cy="35" rx="14" ry="15" fill="#deb887"/>
      {/* Curly hair */}
      <path d="M26 28 Q28 17 40 17 Q52 17 54 28" fill="#1a0a00"/>
      <ellipse cx="27" cy="30" rx="4" ry="5" fill="#1a0a00"/>
      <ellipse cx="53" cy="30" rx="4" ry="5" fill="#1a0a00"/>
      <ellipse cx="33" cy="22" rx="5" ry="4" fill="#1a0a00"/>
      <ellipse cx="47" cy="22" rx="5" ry="4" fill="#1a0a00"/>
      <ellipse cx="40" cy="20" rx="5" ry="4" fill="#1a0a00"/>
      {/* Eyes */}
      <ellipse cx="34" cy="34" rx="2.5" ry="2.8" fill="#1a1a1a"/>
      <ellipse cx="46" cy="34" rx="2.5" ry="2.8" fill="#1a1a1a"/>
      <circle cx="35" cy="33" r="0.8" fill="white"/>
      <circle cx="47" cy="33" r="0.8" fill="white"/>
      <path d="M31 30 Q34 28.5 37 30" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 30 Q46 28.5 49 30" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 36 Q40 39 41 36" stroke="#b87333" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M35 43 Q40 47 45 43" stroke="#a0522d" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Beard */}
      <path d="M30 43 Q30 50 40 50 Q50 50 50 43" fill="#1a0a00" opacity="0.4"/>
    </svg>
  );
}

function AvatarMale3() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#m3bg)"/>
      <defs>
        <linearGradient id="m3bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#052e16"/><stop offset="1" stopColor="#14532d"/>
        </linearGradient>
      </defs>
      <path d="M17 74 Q17 57 40 55 Q63 57 63 74Z" fill="#16a34a"/>
      <path d="M34 55 L40 60 L46 55" fill="#15803d"/>
      <rect x="35" y="47" width="10" height="10" rx="2" fill="#fbbf24"/>
      <ellipse cx="40" cy="35" rx="13" ry="15" fill="#fbbf24"/>
      {/* Short neat hair */}
      <path d="M27 28 Q27 18 40 18 Q53 18 53 28 Q50 20 40 20 Q30 20 27 28Z" fill="#1c1917"/>
      <path d="M27 28 Q26 32 27 36" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M53 28 Q54 32 53 36" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Glasses */}
      <rect x="28" y="31" width="10" height="8" rx="3" stroke="#6b7280" strokeWidth="1.5" fill="rgba(99,102,241,0.1)"/>
      <rect x="42" y="31" width="10" height="8" rx="3" stroke="#6b7280" strokeWidth="1.5" fill="rgba(99,102,241,0.1)"/>
      <line x1="38" y1="35" x2="42" y2="35" stroke="#6b7280" strokeWidth="1.5"/>
      <line x1="25" y1="33" x2="28" y2="33" stroke="#6b7280" strokeWidth="1.5"/>
      <line x1="52" y1="33" x2="55" y2="33" stroke="#6b7280" strokeWidth="1.5"/>
      <ellipse cx="33" cy="35" rx="2" ry="2.2" fill="#1a1a1a"/>
      <ellipse cx="47" cy="35" rx="2" ry="2.2" fill="#1a1a1a"/>
      <path d="M31 29 Q33 27.5 36 29" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M44 29 Q47 27.5 50 29" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 39 Q40 41 41 39" stroke="#d97706" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M35 44 Q40 48 45 44" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarFemale1() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#f1bg)"/>
      <defs>
        <linearGradient id="f1bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4a0d67"/><stop offset="1" stopColor="#831843"/>
        </linearGradient>
      </defs>
      <path d="M15 74 Q15 56 40 54 Q65 56 65 74Z" fill="#db2777"/>
      <path d="M32 54 L40 59 L48 54" fill="#be185d"/>
      <rect x="35" y="46" width="10" height="10" rx="2" fill="#f5c5a3"/>
      <ellipse cx="40" cy="34" rx="14" ry="15" fill="#f5c5a3"/>
      {/* Long flowing hair */}
      <path d="M26 28 Q24 18 40 17 Q56 18 54 28" fill="#6b21a8"/>
      <path d="M24 28 Q20 40 22 55 Q26 52 28 46 Q30 42 28 36" fill="#6b21a8"/>
      <path d="M56 28 Q60 40 58 55 Q54 52 52 46 Q50 42 52 36" fill="#6b21a8"/>
      <path d="M24 28 Q22 32 24 38" stroke="#6b21a8" strokeWidth="3" fill="none"/>
      <path d="M56 28 Q58 32 56 38" stroke="#6b21a8" strokeWidth="3" fill="none"/>
      {/* Eyes */}
      <ellipse cx="34" cy="33" rx="2.8" ry="3" fill="#1a1a1a"/>
      <ellipse cx="46" cy="33" rx="2.8" ry="3" fill="#1a1a1a"/>
      <circle cx="35.2" cy="32" r="0.9" fill="white"/>
      <circle cx="47.2" cy="32" r="0.9" fill="white"/>
      {/* Lashes */}
      <path d="M31 30 L30 28" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M33 29.5 L33 27.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M35 30 L35.5 28" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M43 30 L42.5 28" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M45 29.5 L45 27.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
      <path d="M47 30 L47.5 28" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round"/>
      {/* Eyebrows */}
      <path d="M31 28.5 Q34 27 37 28.5" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 28.5 Q46 27 49 28.5" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 35 Q40 37.5 41 35" stroke="#d4956a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Lips */}
      <path d="M35 42 Q37 40.5 40 41 Q43 40.5 45 42" stroke="#e11d48" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M35 42 Q40 45.5 45 42" stroke="#e11d48" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarFemale2() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#f2bg)"/>
      <defs>
        <linearGradient id="f2bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#134e4a"/><stop offset="1" stopColor="#0f766e"/>
        </linearGradient>
      </defs>
      <path d="M15 74 Q15 56 40 54 Q65 56 65 74Z" fill="#0d9488"/>
      <path d="M32 54 L40 59 L48 54" fill="#0f766e"/>
      <rect x="35" y="46" width="10" height="10" rx="2" fill="#deb887"/>
      <ellipse cx="40" cy="34" rx="14" ry="15" fill="#deb887"/>
      {/* Bob haircut */}
      <path d="M26 30 Q26 17 40 17 Q54 17 54 30" fill="#1c1917"/>
      <path d="M26 30 Q24 38 26 48 Q30 46 30 40" fill="#1c1917"/>
      <path d="M54 30 Q56 38 54 48 Q50 46 50 40" fill="#1c1917"/>
      <path d="M26 30 Q25 34 26 40" stroke="#1c1917" strokeWidth="2" fill="none"/>
      <path d="M54 30 Q55 34 54 40" stroke="#1c1917" strokeWidth="2" fill="none"/>
      {/* Hair band */}
      <path d="M26 30 Q40 26 54 30" stroke="#0d9488" strokeWidth="2.5" fill="none"/>
      <circle cx="40" cy="27" r="3" fill="#0d9488"/>
      <ellipse cx="34" cy="33" rx="2.8" ry="3" fill="#1a1a1a"/>
      <ellipse cx="46" cy="33" rx="2.8" ry="3" fill="#1a1a1a"/>
      <circle cx="35.2" cy="32" r="0.9" fill="white"/>
      <circle cx="47.2" cy="32" r="0.9" fill="white"/>
      <path d="M31 29 Q34 27.5 37 29" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 29 Q46 27.5 49 29" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 36 Q40 38.5 41 36" stroke="#b87333" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M35 43 Q37 41.5 40 42 Q43 41.5 45 43" stroke="#c2185b" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M35 43 Q40 46.5 45 43" stroke="#c2185b" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function AvatarFemale3() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#f3bg)"/>
      <defs>
        <linearGradient id="f3bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#431407"/><stop offset="1" stopColor="#7c2d12"/>
        </linearGradient>
      </defs>
      <path d="M15 74 Q15 56 40 54 Q65 56 65 74Z" fill="#ea580c"/>
      <path d="M32 54 L40 59 L48 54" fill="#c2410c"/>
      <rect x="35" y="46" width="10" height="10" rx="2" fill="#f5c5a3"/>
      <ellipse cx="40" cy="34" rx="14" ry="15" fill="#f5c5a3"/>
      {/* Wavy ponytail */}
      <path d="M26 30 Q26 18 40 17 Q54 18 54 30" fill="#92400e"/>
      <path d="M50 22 Q60 24 62 32 Q64 40 58 46" stroke="#92400e" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M54 28 Q56 34 54 36" stroke="#92400e" strokeWidth="3" fill="none"/>
      <path d="M26 30 Q24 35 26 38" stroke="#92400e" strokeWidth="3" fill="none"/>
      {/* Scrunchie */}
      <ellipse cx="57" cy="34" rx="4" ry="3" fill="#ea580c" opacity="0.8"/>
      <ellipse cx="34" cy="33" rx="2.8" ry="3" fill="#1a1a1a"/>
      <ellipse cx="46" cy="33" rx="2.8" ry="3" fill="#1a1a1a"/>
      <circle cx="35.2" cy="32" r="0.9" fill="white"/>
      <circle cx="47.2" cy="32" r="0.9" fill="white"/>
      <path d="M31 29.5 Q34 28 37 29.5" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 29.5 Q46 28 49 29.5" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 36 Q40 38.5 41 36" stroke="#d4956a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M35 43 Q37 41.5 40 42 Q43 41.5 45 43" stroke="#be123c" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M35 43 Q40 46.5 45 43" stroke="#be123c" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Freckles */}
      <circle cx="33" cy="40" r="0.8" fill="#d4956a" opacity="0.6"/>
      <circle cx="35" cy="42" r="0.8" fill="#d4956a" opacity="0.6"/>
      <circle cx="45" cy="40" r="0.8" fill="#d4956a" opacity="0.6"/>
      <circle cx="47" cy="42" r="0.8" fill="#d4956a" opacity="0.6"/>
    </svg>
  );
}

function AvatarTech1() {
  // Coder with headphones + hoodie
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#t1bg)"/>
      <defs>
        <linearGradient id="t1bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f172a"/><stop offset="1" stopColor="#1e293b"/>
        </linearGradient>
      </defs>
      {/* Hoodie */}
      <path d="M14 74 Q14 55 40 53 Q66 55 66 74Z" fill="#334155"/>
      <path d="M32 53 Q36 56 40 53 Q44 56 48 53 Q44 60 40 58 Q36 60 32 53Z" fill="#1e293b"/>
      {/* Hood up */}
      <path d="M24 38 Q22 25 40 23 Q58 25 56 38 Q58 30 40 28 Q22 30 24 38Z" fill="#334155"/>
      <rect x="35" y="47" width="10" height="8" rx="2" fill="#f5c5a3"/>
      <ellipse cx="40" cy="35" rx="13" ry="14" fill="#f5c5a3"/>
      {/* Headphones */}
      <path d="M27 33 Q27 20 40 20 Q53 20 53 33" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="24" y="32" width="6" height="10" rx="3" fill="#06b6d4"/>
      <rect x="50" y="32" width="6" height="10" rx="3" fill="#06b6d4"/>
      {/* Eyes — glowing */}
      <ellipse cx="34" cy="35" rx="2.5" ry="2.8" fill="#06b6d4"/>
      <ellipse cx="46" cy="35" rx="2.5" ry="2.8" fill="#06b6d4"/>
      <circle cx="34.8" cy="34.2" r="0.9" fill="white"/>
      <circle cx="46.8" cy="34.2" r="0.9" fill="white"/>
      <path d="M31 31 Q34 29.5 37 31" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 31 Q46 29.5 49 31" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 38 Q40 40 41 38" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M36 43 Q40 46.5 44 43" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Code brackets on hoodie */}
      <text x="36" y="70" fill="#06b6d4" fontSize="8" fontFamily="monospace" opacity="0.7">&lt;/&gt;</text>
    </svg>
  );
}

function AvatarTech2() {
  // AI researcher with lab coat
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#t2bg)"/>
      <defs>
        <linearGradient id="t2bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e1b4b"/><stop offset="1" stopColor="#312e81"/>
        </linearGradient>
      </defs>
      {/* Lab coat */}
      <path d="M14 74 Q14 55 40 53 Q66 55 66 74Z" fill="#e2e8f0"/>
      <path d="M32 53 L36 65 L40 53" fill="#cbd5e1"/>
      <path d="M48 53 L44 65 L40 53" fill="#cbd5e1"/>
      {/* Collar */}
      <path d="M32 53 Q36 57 40 53 Q44 57 48 53" stroke="#94a3b8" strokeWidth="1" fill="none"/>
      <rect x="35" y="47" width="10" height="8" rx="2" fill="#fde68a"/>
      <ellipse cx="40" cy="35" rx="13" ry="14" fill="#fde68a"/>
      {/* Hair */}
      <path d="M27 28 Q27 18 40 18 Q53 18 53 28 Q50 20 40 20 Q30 20 27 28Z" fill="#1c1917"/>
      <path d="M27 28 Q25 33 27 37" stroke="#1c1917" strokeWidth="3" fill="none"/>
      <path d="M53 28 Q55 33 53 37" stroke="#1c1917" strokeWidth="3" fill="none"/>
      {/* VR/AR glasses */}
      <rect x="27" y="30" width="26" height="9" rx="4" fill="#312e81" opacity="0.9"/>
      <rect x="29" y="31.5" width="10" height="6" rx="2" fill="#818cf8" opacity="0.5"/>
      <rect x="41" y="31.5" width="10" height="6" rx="2" fill="#818cf8" opacity="0.5"/>
      <ellipse cx="34" cy="34.5" rx="2" ry="2.2" fill="#a5b4fc"/>
      <ellipse cx="46" cy="34.5" rx="2" ry="2.2" fill="#a5b4fc"/>
      <path d="M39 39 Q40 41 41 39" stroke="#d97706" strokeWidth="1.2" fill="none"/>
      <path d="M36 44 Q40 47.5 44 44" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Pocket */}
      <rect x="22" y="62" width="8" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1" fill="none"/>
      <line x1="25" y1="62" x2="25" y2="70" stroke="#94a3b8" strokeWidth="0.8"/>
    </svg>
  );
}

function AvatarTech3() {
  // Hacker / cyberpunk
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#t3bg)"/>
      <defs>
        <linearGradient id="t3bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#052e16"/><stop offset="1" stopColor="#0a0a0a"/>
        </linearGradient>
      </defs>
      {/* Dark jacket */}
      <path d="M14 74 Q14 55 40 53 Q66 55 66 74Z" fill="#111827"/>
      <path d="M30 53 L36 62 L40 53" fill="#1f2937"/>
      <path d="M50 53 L44 62 L40 53" fill="#1f2937"/>
      <rect x="35" y="47" width="10" height="8" rx="2" fill="#d4a574"/>
      <ellipse cx="40" cy="35" rx="13" ry="14" fill="#d4a574"/>
      {/* Messy hair */}
      <path d="M27 29 Q27 18 40 17 Q53 18 53 29" fill="#22c55e" opacity="0.9"/>
      <path d="M27 29 Q24 24 26 30" stroke="#22c55e" strokeWidth="4" fill="none" opacity="0.9"/>
      <path d="M53 29 Q56 24 54 30" stroke="#22c55e" strokeWidth="4" fill="none" opacity="0.9"/>
      <path d="M34 18 Q36 14 38 18" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.9"/>
      <path d="M40 17 Q42 13 44 17" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.9"/>
      {/* Glowing eyes */}
      <ellipse cx="34" cy="34" rx="3" ry="3.2" fill="#22c55e"/>
      <ellipse cx="46" cy="34" rx="3" ry="3.2" fill="#22c55e"/>
      <ellipse cx="34" cy="34" rx="1.5" ry="1.7" fill="#dcfce7"/>
      <ellipse cx="46" cy="34" rx="1.5" ry="1.7" fill="#dcfce7"/>
      {/* Glow */}
      <ellipse cx="34" cy="34" rx="4" ry="4" fill="#22c55e" opacity="0.2"/>
      <ellipse cx="46" cy="34" rx="4" ry="4" fill="#22c55e" opacity="0.2"/>
      <path d="M31 29.5 Q34 28 37 29.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M43 29.5 Q46 28 49 29.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M39 38 Q40 40 41 38" stroke="#86efac" strokeWidth="1.2" fill="none"/>
      <path d="M36 43 Q40 46 44 43" stroke="#86efac" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Circuit lines on jacket */}
      <path d="M20 62 L24 62 L24 66 L28 66" stroke="#22c55e" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="24" cy="62" r="1" fill="#22c55e" opacity="0.5"/>
      <path d="M52 62 L56 62 L56 66 L60 66" stroke="#22c55e" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="56" cy="62" r="1" fill="#22c55e" opacity="0.5"/>
    </svg>
  );
}

function AvatarRobot() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#r1bg)"/>
      <defs>
        <linearGradient id="r1bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c1445"/><stop offset="1" stopColor="#1a237e"/>
        </linearGradient>
      </defs>
      {/* Body */}
      <rect x="20" y="54" width="40" height="22" rx="4" fill="#1e3a5f"/>
      <rect x="24" y="58" width="32" height="14" rx="2" fill="#0f2744"/>
      {/* Chest light */}
      <circle cx="40" cy="65" r="4" fill="#06b6d4" opacity="0.8"/>
      <circle cx="40" cy="65" r="2" fill="#cffafe"/>
      {/* Neck */}
      <rect x="36" y="48" width="8" height="8" rx="2" fill="#334155"/>
      {/* Robot head */}
      <rect x="24" y="20" width="32" height="30" rx="6" fill="#1e3a5f"/>
      <rect x="26" y="22" width="28" height="26" rx="4" fill="#0f2744"/>
      {/* Antenna */}
      <line x1="40" y1="20" x2="40" y2="13" stroke="#06b6d4" strokeWidth="2"/>
      <circle cx="40" cy="11" r="3" fill="#06b6d4"/>
      <circle cx="40" cy="11" r="1.5" fill="#cffafe"/>
      {/* Eyes — LED panels */}
      <rect x="29" y="28" width="9" height="7" rx="2" fill="#06b6d4" opacity="0.9"/>
      <rect x="42" y="28" width="9" height="7" rx="2" fill="#06b6d4" opacity="0.9"/>
      <rect x="30.5" y="29.5" width="6" height="4" rx="1" fill="#cffafe"/>
      <rect x="43.5" y="29.5" width="6" height="4" rx="1" fill="#cffafe"/>
      {/* Scan line */}
      <line x1="29" y1="32" x2="38" y2="32" stroke="#06b6d4" strokeWidth="1" opacity="0.5"/>
      <line x1="42" y1="32" x2="51" y2="32" stroke="#06b6d4" strokeWidth="1" opacity="0.5"/>
      {/* Mouth — LED grid */}
      <rect x="30" y="39" width="20" height="5" rx="2" fill="#1e3a5f"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={31.5 + i*3.5} y={40} width="2.5" height="3" rx="0.5" fill="#06b6d4" opacity={i === 2 ? 1 : 0.4}/>
      ))}
      {/* Ear bolts */}
      <circle cx="24" cy="32" r="2.5" fill="#334155"/>
      <circle cx="56" cy="32" r="2.5" fill="#334155"/>
    </svg>
  );
}

function AvatarNinja() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="80" fill="url(#n1bg)"/>
      <defs>
        <linearGradient id="n1bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a0533"/><stop offset="1" stopColor="#0f0f0f"/>
        </linearGradient>
      </defs>
      {/* Dark outfit */}
      <path d="M15 74 Q15 54 40 52 Q65 54 65 74Z" fill="#0f0f0f"/>
      <path d="M30 52 L40 46 L50 52" fill="#1a1a1a"/>
      {/* Mask / scarf up to nose */}
      <ellipse cx="40" cy="38" rx="15" ry="16" fill="#1a0a2e"/>
      {/* Face strip */}
      <rect x="25" y="30" width="30" height="14" rx="3" fill="#2d1b4e"/>
      {/* Eyes only visible */}
      <ellipse cx="34" cy="36" rx="3.5" ry="3" fill="#a855f7"/>
      <ellipse cx="46" cy="36" rx="3.5" ry="3" fill="#a855f7"/>
      <ellipse cx="34" cy="36" rx="2" ry="1.8" fill="#1a0533"/>
      <ellipse cx="46" cy="36" rx="2" ry="1.8" fill="#1a0533"/>
      <circle cx="34.8" cy="35.2" r="0.8" fill="white"/>
      <circle cx="46.8" cy="35.2" r="0.8" fill="white"/>
      {/* Glow */}
      <ellipse cx="34" cy="36" rx="5" ry="4" fill="#a855f7" opacity="0.15"/>
      <ellipse cx="46" cy="36" rx="5" ry="4" fill="#a855f7" opacity="0.15"/>
      {/* Hood */}
      <path d="M25 30 Q25 18 40 17 Q55 18 55 30" fill="#0f0f0f"/>
      <path d="M25 30 Q22 34 25 38" stroke="#0f0f0f" strokeWidth="4" fill="none"/>
      <path d="M55 30 Q58 34 55 38" stroke="#0f0f0f" strokeWidth="4" fill="none"/>
      {/* Shuriken on chest */}
      <g transform="translate(35,62) rotate(45)">
        <rect x="-2" y="-7" width="4" height="14" rx="1" fill="#a855f7" opacity="0.7"/>
        <rect x="-7" y="-2" width="14" height="4" rx="1" fill="#a855f7" opacity="0.7"/>
      </g>
    </svg>
  );
}

const AVATAR_COMPONENTS: { id: string; label: string; component: React.FC }[] = [
  { id: 'male1',   label: 'Dev M',     component: AvatarMale1 },
  { id: 'male2',   label: 'Dev M',     component: AvatarMale2 },
  { id: 'male3',   label: 'Nerd',      component: AvatarMale3 },
  { id: 'female1', label: 'Dev F',     component: AvatarFemale1 },
  { id: 'female2', label: 'Dev F',     component: AvatarFemale2 },
  { id: 'female3', label: 'Dev F',     component: AvatarFemale3 },
  { id: 'tech1',   label: 'Hacker',    component: AvatarTech1 },
  { id: 'tech2',   label: 'Researcher',component: AvatarTech2 },
  { id: 'tech3',   label: 'Cyber',     component: AvatarTech3 },
  { id: 'robot',   label: 'Robot',     component: AvatarRobot },
  { id: 'ninja',   label: 'Ninja',     component: AvatarNinja },
];

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
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [cropSrc, setCropSrc]         = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent]   = useState(false);
  const [magicEmail, setMagicEmail]   = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isGoogleUser = user?.app_metadata?.provider === 'google'
    || !!(user?.user_metadata?.avatar_url as string | undefined)?.includes('googleusercontent');
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
      const base: StudentProfile = data ? {
        full_name: data.full_name || user?.user_metadata?.full_name || '',
        university: data.university || '', major: data.major || '',
        graduation_year: data.graduation_year || '', bio: data.bio || '',
        github_url: data.github_url || '', portfolio_url: data.portfolio_url || '',
        linkedin_url: data.linkedin_url || '', resume_url: data.resume_url || '',
        avatar_url: data.avatar_url || '',
      } : { ...empty, full_name: user?.user_metadata?.full_name || '' };
      setSaved(base); setDraft(base);
    } catch {
      const fb = { ...empty, full_name: user?.user_metadata?.full_name || '' };
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
      setSaved(newDraft);
    }
    setAvatarModal(false);
  };

  // Process image: resize to 100x100, crop center, convert to WebP, quality 60%
  const processImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext('2d');
          if (!ctx) { reject(new Error('Canvas context failed')); return; }

          // Calculate center crop
          const size = Math.min(img.width, img.height);
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;

          // Draw cropped & resized image
          ctx.drawImage(img, sx, sy, size, size, 0, 0, 100, 100);

          // Convert to WebP with quality 60%
          canvas.toBlob(blob => {
            if (!blob) { reject(new Error('Canvas conversion failed')); return; }
            resolve(blob);
          }, 'image/webp', 0.6);
        };
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      if (file.size > 50 * 1024 * 1024) { setError('Image must be under 50 MB.'); return; }
      // Process image immediately
      const processedBlob = await processImage(file);
      // Create preview as data URL
      const preview = URL.createObjectURL(processedBlob);
      setCropSrc(preview);
    } catch (err) {
      setError(`Image processing failed: ${(err as Error).message}`);
    }
    e.target.value = '';
  };

  const handleUploadConfirm = async () => {
    if (!cropSrc || !user?.id) return;
    setAvatarUploading(true);
    setError(null);
    try {
      // Fetch the processed blob from the preview URL
      const res = await fetch(cropSrc);
      const blob = await res.blob();

      // Upload as WebP
      const path = `avatars/${user.id}.webp`;
      const { error: upErr } = await supabase.storage.from('student-avatars').upload(path, blob, {
        upsert: true,
        contentType: 'image/webp',
      });
      if (upErr) { setError(`Upload failed: ${upErr.message}`); return; }

      const { data: urlData } = supabase.storage.from('student-avatars').getPublicUrl(path);
      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      const newDraft = { ...draft, avatar_url: avatarUrl };
      setDraft(newDraft);
      await supabase.from('student_profiles').upsert({ user_id: user.id, ...newDraft }, { onConflict: 'user_id' });
      setSaved(newDraft);
      setCropSrc(null);
      setAvatarModal(false);
    } finally { setAvatarUploading(false); }
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
                {avatarUploading
                  ? <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
                  : <AvatarDisplay avatarUrl={draft.avatar_url} initials={initials} />
                }
              </div>
              <div className="absolute inset-0 rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <Camera className="w-4 h-4 text-white" />
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

      {/* ── Avatar Modal ── */}
      <AnimatePresence>
        {avatarModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={() => { setAvatarModal(false); setCropSrc(null); }}>

            <motion.div initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-white/[0.08] flex flex-col"
              style={{ background: 'rgba(9,9,11,0.98)', maxHeight: '85vh' }}>

              {/* Header — fixed */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
                <h3 className="text-sm font-semibold text-white">
                  {cropSrc ? 'Preview Photo' : 'Choose Avatar'}
                </h3>
                <button onClick={() => { setAvatarModal(false); setCropSrc(null); }}
                  className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto overscroll-contain flex-1 p-5 space-y-5">

                {cropSrc ? (
                  /* Crop preview */
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 text-center">Preview — will be cropped to square</p>
                    <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border border-white/10">
                      <img src={cropSrc} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCropSrc(null)}
                        className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-xs text-slate-400 hover:text-white transition-colors">
                        Back
                      </button>
                      <button onClick={handleUploadConfirm} disabled={avatarUploading}
                        className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {avatarUploading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</> : <><Check className="w-3.5 h-3.5" /> Use this photo</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Upload section */}
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Custom Photo</p>
                      {isGoogleUser ? (
                        <button onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] text-sm text-slate-400 hover:border-cyan-500/40 hover:text-white transition-all">
                          <Upload className="w-4 h-4" /> Upload your photo
                        </button>
                      ) : (
                        <div className="w-full flex items-center gap-3 py-3 px-4 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                          <Camera className="w-4 h-4 text-slate-600 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-slate-500">Custom photo requires Google sign-in.</p>
                          </div>
                        </div>
                      )}
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChosen} />
                    </div>

                    {/* Avatar grid */}
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">Avatars</p>
                      <div className="grid grid-cols-4 gap-2">
                        {AVATAR_COMPONENTS.map(av => {
                          const isSelected = draft.avatar_url === `builtin:${av.id}`;
                          return (
                            <button key={av.id} onClick={() => handleBuiltInAvatar(av.id)}
                              className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                                isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-105' : 'border-white/[0.06] hover:border-white/20 hover:scale-105'
                              }`}>
                              <av.component />
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
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
