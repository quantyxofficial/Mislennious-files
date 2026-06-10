import React from 'react';
import { ArrowRight, Users, Zap, Globe, Star } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: Globe, label: 'Global Network', sub: '138+ institutions worldwide' },
  { icon: Zap, label: 'Real Projects', sub: 'Production datasets & models' },
  { icon: Users, label: 'Expert Mentors', sub: 'IIT/NIT alumni guidance' },
  { icon: Star, label: 'Premium Swag', sub: 'Top contributors get shipped merch' },
];

export const Careers: React.FC = () => {
  const [state, handleSubmit] = useForm("mgoovkrz");

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── HERO ── */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <span className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass">
              Join Our Team
            </span>

            <h1 className="font-serif text-5xl md:text-6xl text-lux-text leading-[1.05]">
              Build With Us.<br />
              <span className="italic font-light text-lux-muted">Grow Together.</span>
            </h1>

            <p className="text-sm text-lux-muted leading-relaxed max-w-lg">
              We're a student-led foundation building the future of open data science. Join as a contributor,
              blogger, mentor, or campus partner — every role ships real impact.
            </p>

            {/* Benefit chips */}
            <div className="grid grid-cols-2 gap-3">
              {benefits.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-lux-glass border border-lux-glassBorder">
                  <Icon size={14} className="text-lux-muted mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-lux-text">{label}</p>
                    <p className="text-[10px] text-lux-muted mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Apply form */}
          <div className="lg:col-span-5">
            <div className="glass-bento rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="font-serif text-xl text-lux-text mb-1">Quick Apply</h3>
                <p className="text-xs text-lux-muted">Send your details and we'll be in touch within 48 hours.</p>
              </div>

              {state.succeeded ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-emerald-400 text-lg">✓</span>
                  </div>
                  <h4 className="font-serif text-lg text-lux-text">Application Received!</h4>
                  <p className="text-xs text-lux-muted leading-relaxed">
                    Thanks for applying. We'll review your details and reach out soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-lux-muted">Full Name</label>
                    <input
                      id="name" name="name" type="text" required placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-xs text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-lux-muted">Email Address</label>
                    <input
                      id="email" name="email" type="email" required placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-xs text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-white/20 transition-colors"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[10px] text-red-400 px-1" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="role" className="text-[10px] uppercase tracking-widest font-bold text-lux-muted">Role of Interest</label>
                    <select
                      id="role" name="role"
                      className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-xs text-lux-text focus:outline-none focus:border-white/20 transition-colors"
                    >
                      <option value="blogger">Tech / Data Science Blogger</option>
                      <option value="contributor">Open Source Contributor (KSoC)</option>
                      <option value="campus">Campus Partner / Ambassador</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-lux-muted">About You</label>
                    <textarea
                      id="message" name="message" required rows={4}
                      placeholder="Tell us about yourself, your skills, and any relevant links..."
                      className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-glassBorder text-xs text-lux-text placeholder-lux-muted/40 focus:outline-none focus:border-white/20 transition-colors resize-none"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[10px] text-red-400 px-1" />
                  </div>
                  <button
                    type="submit" disabled={state.submitting}
                    className="w-full py-4 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase rounded-full hover:bg-lux-text/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {state.submitting ? (
                      <span className="w-4 h-4 border-2 border-lux-cream/30 border-t-lux-cream rounded-full animate-spin" />
                    ) : (
                      <>Submit Application <ArrowRight size={12} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── JOIN AS MEMBER ── */}
        <section className="glass-bento rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass">
              Community
            </span>
            <h2 className="font-serif text-4xl text-lux-text leading-tight">
              Join as a <span className="italic font-light text-lux-muted">Member</span>
            </h2>
            <p className="text-sm text-lux-muted leading-relaxed">
              Not looking for a role? Become a KaizenStat community member — get access to events,
              study resources, competitions, and real-time opportunity alerts.
            </p>
            <ul className="space-y-2 text-xs text-lux-muted">
              {['Access to all study materials & notebooks', 'Early access to hackathons & events', 'KSoC contributor community', 'Virtual Student ID Card', 'Certificate of Membership'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Link
              to="/student"
              className="group flex items-center justify-between w-full p-5 rounded-2xl bg-lux-glass border border-lux-glassBorder hover:border-white/20 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-lux-text">Student Portal</p>
                <p className="text-[10px] text-lux-muted mt-0.5">Sign in to your member dashboard</p>
              </div>
              <ArrowRight size={14} className="text-lux-muted group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contribute"
              className="group flex items-center justify-between w-full p-5 rounded-2xl bg-lux-glass border border-lux-glassBorder hover:border-white/20 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-lux-text">KSoC Program</p>
                <p className="text-[10px] text-lux-muted mt-0.5">Contribute to open source ML projects</p>
              </div>
              <ArrowRight size={14} className="text-lux-muted group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/+91XXXXXXXXXX"
              target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-between w-full p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/30 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-emerald-400">WhatsApp Community</p>
                <p className="text-[10px] text-lux-muted mt-0.5">Real-time alerts & discussions</p>
              </div>
              <ArrowRight size={14} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
