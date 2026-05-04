import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Eye, Leaf } from 'lucide-react';

const features = [
  { icon: Zap, title: 'No Electricity', desc: 'Gravity-powered filtration' },
  { icon: ShieldCheck, title: 'BPA-Free', desc: 'Food-grade materials' },
  { icon: Eye, title: 'Visible Filtration', desc: 'See it working' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'Zero single-use plastic' },
];

const Features = () => {
  return (
    <section id="features" className="py-28 md:py-36">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20 space-y-4"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">Why PURE GO</p>
          <div className="brand-divider" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-secondary/50 flex items-center justify-center">
                <f.icon size={22} className="text-foreground/50" />
              </div>
              <h3 className="font-medium text-sm tracking-tight">{f.title}</h3>
              <p className="text-muted-foreground text-xs font-light">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
