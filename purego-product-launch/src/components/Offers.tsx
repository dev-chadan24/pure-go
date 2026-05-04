import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Offers = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-28 md:py-36 section-gradient">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">Student Exclusive</p>
          <div className="brand-divider" />
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight">
            10% off for students.
          </h2>
          <p className="text-muted-foreground font-light max-w-md mx-auto">
            Verify your university email to unlock your discount.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-4">
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-secondary/50 border border-border/40 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all duration-500"
                required
              />
              <button type="submit" className="glow-button px-6 py-3.5 rounded-full text-sm font-medium text-primary-foreground tracking-wider flex items-center justify-center gap-2">
                Verify <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            <p className="text-sm font-medium">✓ Discount code sent to {email}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Offers;
