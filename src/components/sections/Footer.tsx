import { Logo } from "../ui/Logo";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Github, Linkedin, Instagram, Mail, MapPin, MessageSquare } from "lucide-react";

const NAV_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "Blog", to: "/blog" },
      { label: "Practice", to: "/practice" },
      { label: "Get Certified", to: "/get-certified" },
      { label: "Verify Certificate", to: "/verify" },
      { label: "Kaizen AI", to: "/kaizen-ai" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Meet the Team", to: "/founder-connect" },
      { label: "Careers", to: "/careers" },
      { label: "KSoC", to: "/kaizenstat-summer-of-computation" },
      { label: "Events", to: "/events" },
    ],
  },
  {
    heading: "Members",
    links: [
      { label: "Dashboard", to: "/student" },
      { label: "Competitions", to: "/student/competitions" },
      { label: "ID Card", to: "/student/id-card" },
      { label: "Announcements", to: "/student/announcements" },
    ],
  },
];

const SOCIAL = [
  { href: "https://github.com/kaizenstat-python", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/company/kaizenstat/about/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/kaizenstat_official/", icon: Instagram, label: "Instagram" },
];

const FOUNDERS = [
  { name: "Masuddar Rahaman", role: "Founder & Framework Architect", href: "https://www.linkedin.com/in/masuddar-rahaman/" },
  { name: "Kriti Sharma", role: "AI Research & Management Lead", href: "https://www.linkedin.com/in/kriti-sharma-795116377/" },
  { name: "Abhishikta Dutta", role: "ML Engineer & Researcher", href: "https://www.linkedin.com/in/abhishikta-dutta1" },
];

// Shared viewport config — animate once when 25% in view
const viewport = { once: true, amount: 0.25 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

// Container that staggers its children
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

// Each item rises and fades in
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Wordmark letters
const WORD = [
  { ch: "K", dim: false }, { ch: "A", dim: false }, { ch: "I", dim: false },
  { ch: "Z", dim: false }, { ch: "E", dim: false }, { ch: "N", dim: false },
  { ch: "S", dim: true }, { ch: "T", dim: true }, { ch: "A", dim: true }, { ch: "T", dim: true },
];

export function Footer() {
  return (
    <footer className="relative w-full z-20 overflow-hidden bg-black border-t border-white/[0.06]" id="footer">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* ── Main grid ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 pt-20 pb-16"
        >

          {/* Brand */}
          <motion.div variants={item} className="lg:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 w-fit mb-6 group">
              <motion.span whileHover={{ rotate: 12 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                <Logo className="w-8 h-8 text-white" />
              </motion.span>
              <span className="text-lg font-semibold tracking-tight text-white">
                KaizenStat
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
              An open-source Python ML framework that makes machine learning easy to build, debug, and understand.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              <a href="mailto:founders@kaizenstat.com" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-slate-500" />
                founders@kaizenstat.com
              </a>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 text-slate-500" />
                Park Street, Kolkata, WB 700016
              </div>
            </div>

            {/* WhatsApp */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs tracking-wide hover:bg-emerald-400 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Join the Community
            </motion.a>
          </motion.div>

          {/* Nav columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            {NAV_COLUMNS.map((col) => (
              <motion.nav variants={item} key={col.heading} aria-label={col.heading}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-5">{col.heading}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="group inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
                        <span className="w-0 group-hover:w-3 h-px bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300 ease-out" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>

          {/* Founders */}
          <motion.div variants={item} className="lg:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-5">Founders</h3>
            <ul className="space-y-4">
              {FOUNDERS.map((f) => (
                <li key={f.name}>
                  <a href={f.href} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className="block text-sm text-slate-300 group-hover:text-white transition-colors">{f.name}</span>
                    <span className="block text-xs text-slate-600">{f.role}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Wordmark ── */}
        <div className="relative border-t border-white/[0.06] pt-10 select-none">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
            className="font-bold leading-[0.85] tracking-tight text-center flex justify-center"
            style={{ fontSize: "clamp(3.5rem, 14vw, 12rem)" }}
            aria-label="KaizenStat"
          >
            {WORD.map((l, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -40 },
                  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease } },
                }}
                className={l.dim ? "text-white/15 font-light inline-block" : "text-white inline-block"}
                style={{ transformOrigin: "bottom" }}
                aria-hidden="true"
              >
                {l.ch}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-5 py-6"
        >
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} KaizenStat. Apache 2.0 licensed.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms</Link>
            <Link to="/ethics" className="text-xs text-slate-500 hover:text-white transition-colors">Ethics</Link>
            <Link to="/admin/dashboard" className="text-xs text-slate-500 hover:text-white transition-colors">Admin</Link>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Icon className="w-[18px] h-[18px]" />
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
