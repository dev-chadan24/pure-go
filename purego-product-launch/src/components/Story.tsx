import { motion } from 'framer-motion';
import bottle1l from '@/assets/purego-1l-black.png';

const Story = () => {
  return (
    <section
      id="story"
      className="py-32 md:py-48 section-gradient relative overflow-hidden"
    >
      {/* Ambient background */}
      <div
        className="ambient-glow w-[700px] h-[700px] top-1/2 -translate-y-1/2 -right-40 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.07) 0%, transparent 65%)' }}
      />

      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* ── Left: Editorial text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 order-2 lg:order-1"
          >
            <div className="space-y-6">
              <p className="editorial-label">Our Philosophy</p>
              {/* Animated gold rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="origin-left gold-line w-16"
              />
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.93]">
                Pure water.<br />
                <span className="italic cinematic-text">Clear mind.</span>
              </h2>
            </div>

            {/* Staggered paragraphs */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
              className="space-y-6"
            >
              {[
                { text: 'We believe hydration should be simple, honest, and effortless.', highlight: true },
                { text: 'No noise. No overpromises. Just clean water, wherever life takes you.', highlight: false },
                { text: 'Because when something is essential — it should feel natural.', highlight: false },
              ].map(({ text, highlight }, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className={
                    highlight
                      ? 'text-xl md:text-2xl font-medium text-foreground leading-snug'
                      : 'text-base md:text-lg text-muted-foreground font-light leading-relaxed'
                  }
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Gold signature line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="gold-line w-8" />
              <span className="text-gold font-display italic text-lg font-medium tracking-wide">
                PURE GO
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Bottle visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center relative"
          >
            {/* Glow ring behind bottle */}
            <div
              className="absolute w-72 h-72 rounded-full opacity-25 blur-3xl"
              style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.4) 0%, transparent 65%)' }}
            />
            {/* Elegant circle frame */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-gold/12 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-gold/8" />
              <img
                src={bottle1l}
                alt="PURE GO philosophy — pure water, clear mind"
                loading="lazy"
                className="w-2/3 object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;