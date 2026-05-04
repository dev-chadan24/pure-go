import { motion } from 'framer-motion';

const Story = () => {
  return (
    <section
      id="story"
      className="py-28 md:py-40 section-gradient flex items-center justify-center overflow-hidden"
    >
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-14 max-w-3xl mx-auto"
        >
          {/* Heading */}
          <div className="space-y-5">
            <p className="text-xs tracking-[0.45em] uppercase text-primary font-semibold">
              Our Philosophy
            </p>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-foreground">
              Pure water. <span className="text-primary">Clear mind.</span>
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            
            <p className="text-foreground font-normal text-xl md:text-2xl">
              We believe hydration should be simple,<br />
              honest, and effortless.
            </p>

            <p>
              No noise. No overpromises.<br />
              Just clean water, wherever life takes you.
            </p>

            <p className="pt-6 text-primary font-medium text-lg tracking-wide">
              Because when something is essential,<br />
              it should feel natural.
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;