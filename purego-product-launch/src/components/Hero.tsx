import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import bottle1l from '@/assets/purego-1l-black.png';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-gradient" />

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-16"
      >
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] tracking-tight text-balance max-w-4xl"
        >
          Not just a bottle.
          <br />
          <em className="font-display italic">A statement.</em>
        </motion.h1>

        {/* Product Image — the hero */}
        <motion.div 
          style={{ y }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16"
        >
          <img
            src={bottle1l}
            alt="PURE GO 1 Litre"
            width={768}
            height={1024}
            className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <a 
            href="#products" 
            className="glow-button px-12 py-4 rounded-full font-medium text-primary-foreground text-sm tracking-[0.15em] uppercase"
          >
            Explore
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
