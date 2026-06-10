import { motion } from 'framer-motion';

export function KaizenReportDemo() {
  return (
    <section className="py-24 relative bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Heading */}
        <div className="text-center mb-14 space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-tight">
            📊 See Exactly What You Get
          </h2>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
            This is a real KaizenStat report. Run the tool on your data, get this output.
          </p>
        </div>

        {/* Embedded Report */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ maxWidth: '100%', width: '100%' }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: '#111',
              border: '1px solid #2a2a2a',
              boxShadow: '0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px #1a1a1a',
            }}
          >
            <iframe
              src="/report.html"
              title="KaizenStat Report"
              width="100%"
              height={2400}
              frameBorder="0"
              style={{
                border: 'none',
                background: '#0f0f1a',
                display: 'block',
                borderRadius: '12px',
              }}
              scrolling="yes"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
