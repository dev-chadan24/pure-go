import { motion } from 'framer-motion';
import { Droplets, Filter, GlassWater, RefreshCw } from 'lucide-react';

const steps = [
  { icon: Droplets, number: '01', label: 'Refill', desc: 'Fill with any water source' },
  { icon: Filter,   number: '02', label: 'Filter', desc: 'Water passes through 3 layers' },
  { icon: GlassWater, number: '03', label: 'Drink',  desc: 'Enjoy clean, pure water' },
  { icon: RefreshCw,  number: '04', label: 'Replace', desc: 'Swap filter every 2 months' },
];

const HowItWorks = () => {
  return (
    <section className="py-32 md:py-44 section-gradient overflow-hidden relative">
      <div className="noise-overlay opacity-[0.015]" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 space-y-5"
        >
          <p className="editorial-label">Process</p>
          <div className="brand-divider" />
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-8 leading-[0.95]">
            Four steps to<br />
            <span className="italic cinematic-text">pure water.</span>
          </h2>
        </motion.div>

        {/* ── Steps ── */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-px origin-left hidden md:block"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold)/0.3) 20%, hsl(var(--gold)/0.3) 80%, transparent)' }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group text-center flex flex-col items-center gap-6"
              >
                {/* Step icon with gold ring */}
                <div className="relative">
                  <div className="w-[72px] h-[72px] rounded-full gold-glass flex items-center justify-center transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_32px_hsl(var(--gold)/0.15)]">
                    <step.icon size={26} className="text-gold" strokeWidth={1.4} />
                  </div>
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/20 group-hover:scale-125 transition-all duration-700" />
                </div>

                {/* Number + label */}
                <div className="space-y-1.5">
                  <span className="editorial-label text-[9px] text-gold/60">{step.number}</span>
                  <h3 className="font-medium text-base tracking-tight">{step.label}</h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
