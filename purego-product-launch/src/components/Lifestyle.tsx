import { motion } from 'framer-motion';
import { Dumbbell, Backpack, GraduationCap } from 'lucide-react';

const lifestyles = [
  {
    icon: Dumbbell,
    title: 'At the Gym',
    tagline: 'Pure hydration, mid-rep.',
    desc: 'Engineered for peak performance. Filter as you push your limits.',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    icon: Backpack,
    title: 'On the Trail',
    tagline: 'Filter any water source, anywhere.',
    desc: 'From mountain streams to campsite taps — PURE GO goes where you go.',
    span: 'md:col-span-1',
  },
  {
    icon: GraduationCap,
    title: 'At Campus',
    tagline: 'Clean water between classes.',
    desc: 'A smarter alternative to single-use plastic on campus, every day.',
    span: 'md:col-span-1',
  },
];

const Lifestyle = () => {
  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 space-y-5"
        >
          <p className="editorial-label">Lifestyle</p>
          <div className="gold-line w-10" />
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-6 leading-[0.95]">
            Wherever you go.<br />
            <span className="italic cinematic-text">PURE GO follows.</span>
          </h2>
        </motion.div>

        {/* ── Editorial bento grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lifestyles.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className={`group gold-glass rounded-3xl p-10 flex flex-col justify-between min-h-[260px] cursor-default relative overflow-hidden ${item.span}`}
            >
              {/* Large ghost icon bg */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-700">
                <item.icon size={140} strokeWidth={0.8} />
              </div>

              {/* Top: small icon */}
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center transition-all duration-500 group-hover:bg-gold/20 group-hover:border-gold/30">
                <item.icon size={22} className="text-gold" strokeWidth={1.4} />
              </div>

              {/* Bottom: text */}
              <div className="space-y-2 relative z-10">
                <h3 className="font-display text-2xl font-medium tracking-tight">{item.title}</h3>
                <p className="text-gold text-xs font-medium tracking-wide italic">{item.tagline}</p>
                <p className="text-muted-foreground text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                  {item.desc}
                </p>
              </div>

              {/* Hover gold border reveal */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-gradient-to-r from-gold/70 via-gold/40 to-transparent transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
