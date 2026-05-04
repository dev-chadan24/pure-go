import { motion } from 'framer-motion';
import techImg from '@/assets/purego-tech.png';

const layers = [
  { name: 'Pre-filter Mesh', desc: 'Captures large particles and sediment before they reach the core.' },
  { name: 'Activated Charcoal Core', desc: 'Removes chlorine, odors, and organic contaminants for pure taste.' },
  { name: 'Safety Mesh', desc: 'Final barrier ensuring no charcoal particles enter your water.' },
];

const Technology = () => {
  return (
    <section id="technology" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="text-center mb-20 space-y-5">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Three Layers. <span className="glow-text">Zero Compromise.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Advanced filtration technology you can see working.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <img
              src={techImg}
              alt="PUREGO filtration technology layers"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full max-w-md"
            />
          </motion.div>

          <div className="space-y-6">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="feature-card cursor-default"
              >
                <div className="flex items-start gap-5">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-muted-foreground">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2 tracking-tight">{layer.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{layer.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Technology;
