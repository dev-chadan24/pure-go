import { motion } from 'framer-motion';
import { Droplets, Filter, GlassWater, RefreshCw } from 'lucide-react';

const steps = [
  { icon: Droplets, label: 'Refill', desc: 'Fill with any water source' },
  { icon: Filter, label: 'Filter', desc: 'Water passes through 3 layers' },
  { icon: GlassWater, label: 'Drink', desc: 'Enjoy clean, pure water' },
  { icon: RefreshCw, label: 'Replace', desc: 'Swap filter every 2 months' },
];

const HowItWorks = () => {
  return (
    <section className="py-28 section-gradient overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-20 space-y-5">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">How It Works</h2>
          <p className="text-lg text-muted-foreground font-light">Four simple steps to pure water.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div 
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-5"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl glass-panel flex items-center justify-center">
                <step.icon size={24} className="text-foreground/70" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-muted-foreground/60 font-mono">0{i + 1}</span>
                <div className="tech-line w-6" />
              </div>
              <h3 className="text-base font-medium tracking-tight">{step.label}</h3>
              <p className="text-muted-foreground text-sm font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
