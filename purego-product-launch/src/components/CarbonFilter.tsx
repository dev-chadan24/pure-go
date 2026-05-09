import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Droplet, ShieldCheck, Sparkles, Waves } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Water Intake',
    desc: 'Unfiltered water enters the system, initiating the natural gravity-led purification process.',
    icon: Waves,
  },
  {
    id: '02',
    title: 'Carbon Filtration',
    desc: 'Advanced activated charcoal core traps heavy metals, chlorine, and organic compounds.',
    icon: ShieldCheck,
  },
  {
    id: '03',
    title: 'Impurity Removal',
    desc: 'Micro-pores ensure absolute clarity, filtering out microplastics and sediment.',
    icon: Droplet,
  },
  {
    id: '04',
    title: 'Pure Hydration',
    desc: 'Mineral-rich, crystal clear water emerges, ready for peak performance.',
    icon: Sparkles,
  },
];

const Particle = ({ delay, duration, xOffset }: { delay: number, duration: number, xOffset: string }) => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 400, opacity: [0, 1, 1, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'linear',
    }}
    className="absolute w-1.5 h-1.5 rounded-full bg-gold/80"
    style={{ left: xOffset, filter: 'blur(1px)' }}
  />
);

const CarbonFilter = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="carbon-filter"
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-background"
    >
      {/* ── Immersive Cinematic Lighting ── */}
      <motion.div
        style={{ opacity: glowOpacity, y: yParallax }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
        initial={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.15) 0%, transparent 60%)' }}
      />
      <div className="noise-overlay opacity-[0.03]" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="editorial-label text-gold"
          >
            Filtration Technology
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="gold-line w-12 mx-auto"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95]"
          >
            Carbon core.<br />
            <span className="italic cinematic-text">Absolute purity.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Left Process Steps ── */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            {steps.slice(0, 2).map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="gold-glass rounded-3xl p-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-display text-3xl font-medium text-foreground/20">{step.id}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Center Immersive Visual ── */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center relative h-[500px]">
            {/* Animated particles simulating filtration */}
            <div className="absolute inset-x-0 top-10 bottom-10 flex justify-center overflow-hidden z-20">
              <Particle delay={0} duration={3} xOffset="45%" />
              <Particle delay={1.2} duration={3.5} xOffset="50%" />
              <Particle delay={0.5} duration={2.8} xOffset="55%" />
              <Particle delay={2} duration={4} xOffset="48%" />
            </div>

            {/* Glowing vertical connector */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent"
            />

            {/* Core Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-32 h-64 rounded-full border border-gold/30 bg-background/50 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
                {/* Inner glowing carbon core */}
                <div className="w-24 h-48 rounded-full bg-foreground dark:bg-card border border-gold/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent opacity-50" />
                  <div className="absolute inset-0 noise-overlay opacity-20" />
                  <span className="font-display text-gold/30 text-xs tracking-[0.3em] uppercase rotate-90">Carbon</span>
                </div>
              </div>
              
              {/* Outer rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-gold/10 animate-ring-expand" style={{ animationDuration: '4s', animationIterationCount: 'infinite' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/5 animate-ring-expand" style={{ animationDuration: '4s', animationIterationCount: 'infinite', animationDelay: '2s' }} />
            </motion.div>
          </div>

          {/* ── Right Process Steps ── */}
          <div className="lg:col-span-4 space-y-8 order-3">
            {steps.slice(2, 4).map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.2 + 0.4 }}
                className="gold-glass rounded-3xl p-8 relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center gap-4 mb-4 flex-row-reverse justify-end lg:flex-row lg:justify-start">
                  <span className="font-display text-3xl font-medium text-foreground/20">{step.id}</span>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2 text-right lg:text-left">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed text-right lg:text-left">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarbonFilter;
