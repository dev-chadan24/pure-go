import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import bottle1l from '@/assets/purego-1l-black.png';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  // Magnetic / parallax on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / 25);
    mouseY.set((e.clientY - cy) / 25);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const stagger = {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    },
    item: {
      hidden: { opacity: 0, y: 48, skewY: 1 },
      show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* ── Noise Film Grain ── */}
      <div className="noise-overlay animate-grain" />

      {/* ── Ambient Glow Orbs ── */}
      <div
        className="ambient-glow w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-60"
        style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.08) 0%, transparent 65%)' }}
      />
      <div
        className="ambient-glow w-[300px] h-[300px] top-1/2 -translate-y-1/3 -left-20 opacity-30"
        style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.1) 0%, transparent 70%)' }}
      />
      <div
        className="ambient-glow w-[250px] h-[250px] bottom-24 right-10 opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(var(--silver)/0.12) 0%, transparent 70%)' }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-36 pb-20 w-full max-w-6xl mx-auto"
      >
        {/* ── Editorial label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="block w-8 h-px bg-gold/50" />
          <span className="editorial-label">Premium Hydration — Made in India</span>
          <span className="block w-8 h-px bg-gold/50" />
        </motion.div>

        {/* ── Headline (staggered words) ── */}
        <motion.h1
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="font-display text-[clamp(3.2rem,9vw,8.5rem)] font-medium leading-[0.93] tracking-tight text-balance mb-8"
        >
          <motion.span variants={stagger.item} className="block">
            Not just a bottle.
          </motion.span>
          <motion.span variants={stagger.item} className="block italic">
            <span className="cinematic-text">A statement.</span>
          </motion.span>
        </motion.h1>

        {/* ── Sub caption ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-muted-foreground font-light text-sm md:text-base tracking-widest uppercase mb-16"
          style={{ letterSpacing: '0.2em' }}
        >
          Gravity-filtered &nbsp;·&nbsp; Carbon-pure &nbsp;·&nbsp; BPA-Free
        </motion.p>

        {/* ── Gold Rule ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent mb-0 hidden md:block"
        />

        {/* ── Bottle Image (parallax) ── */}
        <motion.div
          style={{ y, x: springX, rotateX: springY, rotateY: springX }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-4 md:mt-0"
        >
          {/* Glow beneath bottle */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-16 blur-2xl rounded-full opacity-30"
            style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.5) 0%, transparent 70%)' }}
          />
          <img
            src={bottle1l}
            alt="PURE GO 1 Litre Premium Bottle"
            width={768}
            height={1024}
            className="w-52 sm:w-64 md:w-72 lg:w-80 object-contain animate-float-gentle drop-shadow-2xl"
          />
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 mt-16"
        >
          <a
            href="#products"
            className="luxury-button px-10 py-4 text-[11px] tracking-[0.25em] uppercase"
          >
            Explore Collection
          </a>
          <a
            href="#story"
            className="luxury-outline px-10 py-4 text-[11px] tracking-[0.25em] uppercase"
          >
            Our Story
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll Hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="editorial-label text-[9px]">Scroll</span>
        <ChevronDown
          size={16}
          className="text-gold/60 animate-scroll-hint"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
