import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 300,  prefix: '',  suffix: '+',  label: 'Plastic bottles saved per year', sub: 'per user, annually' },
  { value: 5000, prefix: '₹', suffix: '+',  label: 'Annual savings',                 sub: 'vs. bottled water' },
  { value: 99,   prefix: '',  suffix: '%',  label: 'Contaminant removal',            sub: 'laboratory tested' },
];

const Counter = ({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
};

const Impact = () => {
  return (
    <section id="impact" className="py-32 md:py-44 relative overflow-hidden">
      {/* ── Full-bleed dark band ── */}
      <div className="absolute inset-0 bg-foreground dark:bg-[hsl(240_5%_8%)]" />
      <div className="noise-overlay opacity-[0.03]" />

      {/* Gold ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.35) 0%, transparent 60%)' }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <p className="editorial-label text-gold/70 mb-5">Impact</p>
          <div className="brand-divider" />
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-8 leading-[0.95] text-background dark:text-foreground">
            Numbers that<br />
            <span className="italic gold-text">speak for themselves.</span>
          </h2>
        </motion.div>

        {/* ── Stats ── */}
        <div className="grid md:grid-cols-3 gap-px bg-gold/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground dark:bg-[hsl(240_5%_8%)] px-12 py-14 text-center group"
            >
              {/* Number */}
              <div className="stat-number text-[clamp(3.5rem,8vw,6rem)] text-background dark:text-foreground mb-4 transition-all duration-500 group-hover:scale-105">
                <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>

              {/* Gold rule */}
              <div className="gold-line w-10 mx-auto mb-5 opacity-60" />

              {/* Label */}
              <p className="text-sm font-medium text-background/80 dark:text-foreground/80 tracking-wide">
                {stat.label}
              </p>
              <p className="editorial-label text-[9px] text-gold/60 mt-2">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
