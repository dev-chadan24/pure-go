import { motion } from 'framer-motion';

const Story = () => {
  return (
    <section className="py-28 md:py-36 section-gradient">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">Our Story</p>
          <div className="brand-divider" />
          
          <h2 className="font-display text-3xl md:text-5xl font-medium leading-snug tracking-tight max-w-3xl mx-auto">
            One million plastic bottles are purchased every&nbsp;minute.
            <br className="hidden md:block" />
            We decided that was enough.
          </h2>
          
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            PURE GO was born from a simple belief: clean water shouldn't cost the planet. 
            Our transparent filtration technology lets you see purity happening — no electricity, 
            no waste, just water the way it should be.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
