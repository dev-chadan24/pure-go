import { motion } from 'framer-motion';

const milestones = [
  { year: '2024', label: 'Concept & R&D' },
  { year: '2025', label: 'Product Launch' },
  { year: '2026', label: 'Smart Filter Tracking' },
  { year: '2027', label: 'Global Expansion' },
];

const Roadmap = () => {
  return (
    <section className="py-28 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-20 space-y-5">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">The Road Ahead</h2>
          <p className="text-lg text-muted-foreground font-light">Building the future of hydration.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Line */}
          <div className="absolute top-6 left-0 right-0 tech-line hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-4 relative"
              >
                <div className={`mx-auto w-3 h-3 rounded-full transition-all duration-500 ${i <= 1 ? 'bg-foreground' : 'bg-muted-foreground/25'}`} />
                <h3 className="text-lg font-medium tracking-tight">{m.year}</h3>
                <p className="text-muted-foreground text-sm font-light">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Roadmap;
