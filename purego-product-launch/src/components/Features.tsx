import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Eye, Leaf } from 'lucide-react';

const features = [
  {
    icon: Zap,
    number: '01',
    title: 'No Electricity',
    desc: 'Gravity-powered filtration that works anywhere — no power source required.',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'BPA-Free',
    desc: 'Crafted from premium food-grade materials safe for you and the planet.',
  },
  {
    icon: Eye,
    number: '03',
    title: 'Visible Filtration',
    desc: 'Watch the filtration in action — clarity you can see with every sip.',
  },
  {
    icon: Leaf,
    number: '04',
    title: 'Eco-Friendly',
    desc: 'Eliminate single-use plastic entirely. One bottle, a lifetime of impact.',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Features = () => {
  return (
    <section id="features" className="py-32 md:py-44 section-gradient relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="noise-overlay opacity-[0.02]" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="editorial-label mb-5">Why PURE GO</p>
          <div className="gold-line w-12 mb-0" />
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-8 max-w-lg leading-[0.95]">
            Built for the<br />
            <span className="italic cinematic-text">uncompromising.</span>
          </h2>
        </motion.div>

        {/* ── Feature Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="group relative gold-glass p-8 rounded-2xl cursor-default overflow-hidden"
            >
              {/* Large ghost number */}
              <span className="absolute top-4 right-5 font-display text-7xl font-medium text-foreground/[0.04] select-none leading-none">
                {f.number}
              </span>

              {/* Icon */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-gold/20 group-hover:border-gold/30">
                <f.icon size={20} className="text-gold" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="relative z-10">
                <h3 className="font-medium text-base tracking-tight mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{f.desc}</p>
              </div>

              {/* Hover gold line accent */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-gold/60 to-transparent transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
