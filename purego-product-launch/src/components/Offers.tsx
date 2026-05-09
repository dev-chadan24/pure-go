import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Offers = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      {/* ── Full-bleed editorial dark band ── */}
      <div className="absolute inset-0 bg-foreground dark:bg-[hsl(240_5%_7%)]" />
      <div className="noise-overlay opacity-[0.035]" />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.4) 0%, transparent 60%)' }}
      />

      <div className="container max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-10"
        >
          {/* Label */}
          <div>
            <p className="editorial-label text-gold/70 mb-5">Student Exclusive</p>
            <div className="brand-divider" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-background dark:text-foreground">
            10% off for<br />
            <span className="italic gold-text">students.</span>
          </h2>

          <p className="text-background/60 dark:text-muted-foreground font-light max-w-sm mx-auto leading-relaxed">
            Verify your university email to unlock your exclusive discount.
          </p>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-4"
              >
                <input
                  type="email"
                  id="student-email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full bg-background/10 border border-background/20 dark:border-border/30 text-background dark:text-foreground text-sm placeholder:text-background/40 dark:placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-gold/50 backdrop-blur-sm transition-all duration-400"
                  required
                />
                <button
                  type="submit"
                  className="luxury-button px-8 py-4 text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 flex-shrink-0"
                >
                  Verify <ArrowRight size={13} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-3 text-sm font-medium text-background dark:text-foreground"
              >
                <CheckCircle2 size={20} className="text-gold" />
                Discount code sent to{' '}
                <span className="text-gold">{email}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Offers;
