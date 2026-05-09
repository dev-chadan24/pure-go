import { motion } from 'framer-motion';
import techImg from '@/assets/purego-tech.png';

const layers = [
  {
    number: '01',
    name: 'Pre-filter Mesh',
    desc: 'Captures large particles and sediment before they reach the core.',
  },
  {
    number: '02',
    name: 'Activated Charcoal Core',
    desc: 'Removes chlorine, odors, and organic contaminants for pure, clean taste.',
  },
  {
    number: '03',
    name: 'Safety Mesh',
    desc: 'Final barrier ensuring zero charcoal particles enter your water.',
  },
];

const Technology = () => {
  return (
    <section id="technology" className="py-32 md:py-44 relative overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        className="ambient-glow w-[600px] h-[600px] top-1/2 -translate-y-1/2 -left-32 opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.08) 0%, transparent 65%)' }}
      />
      <div className="noise-overlay opacity-[0.02]" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 space-y-5"
        >
          <p className="editorial-label">Filtration Technology</p>
          <div className="brand-divider" />
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-8 leading-[0.95]">
            Three layers.{' '}
            <span className="italic cinematic-text">Zero compromise.</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
            Advanced filtration technology you can see working with every sip.
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Tech Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center relative"
          >
            {/* Glow behind image */}
            <div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.3) 0%, transparent 65%)' }}
            />
            <img
              src={techImg}
              alt="PURE GO three-layer filtration technology"
              loading="lazy"
              className="w-full max-w-sm relative z-10 drop-shadow-2xl"
            />
          </motion.div>

          {/* ── Layer Cards ── */}
          <div className="space-y-5">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="feature-card group cursor-default"
              >
                <div className="flex items-start gap-6">
                  {/* Number indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center transition-all duration-500 group-hover:bg-gold/20 group-hover:border-gold/40">
                      <span className="font-display text-sm font-medium text-gold">{layer.number}</span>
                    </div>
                    {i < layers.length - 1 && (
                      <div className="w-px flex-1 min-h-[2rem] bg-gold/12" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-medium text-base tracking-tight mb-2">{layer.name}</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
