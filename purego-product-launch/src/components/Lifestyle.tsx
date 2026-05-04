import { motion } from 'framer-motion';
import { Dumbbell, Backpack, GraduationCap } from 'lucide-react';

const lifestyles = [
  { icon: Dumbbell, title: 'At the Gym', tagline: 'Pure hydration, mid-rep.' },
  { icon: Backpack, title: 'On the Trail', tagline: 'Filter any water source, anywhere.' },
  { icon: GraduationCap, title: 'At Campus', tagline: 'Clean water between classes.' },
];

const Lifestyle = () => {
  return (
    <section className="py-28 md:py-36">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20 space-y-4"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">Lifestyle</p>
          <div className="brand-divider" />
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-6">
            Wherever you go.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {lifestyles.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-5"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center">
                <item.icon size={24} className="text-foreground/50" />
              </div>
              <h3 className="font-display text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-light">{item.tagline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
