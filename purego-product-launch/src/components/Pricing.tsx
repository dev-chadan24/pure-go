import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import bottle1lBlack from '@/assets/purego-1l-black.png';
import { formatINR } from '@/lib/utils';

const perks = [
  'Premium PURE GO Bottle (1L)',
  'Advanced Carbon Filter included',
  'Sustainably sourced materials',
  'Lifetime brand warranty',
  'Free priority shipping',
];

const Pricing = () => {
  const addItem = useCartStore((s) => s.addItem);

  const handleOrder = () => {
    addItem({ id: 'purego-bottle', name: 'PURE GO Bottle', price: 999, image: bottle1lBlack });
    toast.success('PURE GO Bottle added to cart');
  };

  return (
    <section id="pricing" className="py-32 md:py-44 section-gradient relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="ambient-glow w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.07) 0%, transparent 60%)' }}
      />

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 space-y-5"
        >
          <p className="editorial-label">Investment</p>
          <div className="brand-divider" />
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight mt-8 leading-[0.95]">
            Pure hydration.<br />
            <span className="italic cinematic-text">Zero compromise.</span>
          </h2>
        </motion.div>

        {/* ── Pricing Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto"
        >
          <div className="gold-glass rounded-[2rem] p-12 text-center space-y-10 relative overflow-hidden">
            {/* Best value badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-medium tracking-[0.2em] uppercase bg-gold/12 text-gold border border-gold/20">
              <Sparkles size={9} />
              Most Popular
            </div>

            {/* Price */}
            <div>
              <div className="font-display text-[clamp(4rem,10vw,6rem)] font-medium tracking-tight gold-text leading-none mb-2">
                {formatINR(999)}
              </div>
              <p className="editorial-label text-[10px] text-muted-foreground">One-time purchase</p>
            </div>

            {/* Gold divider */}
            <div className="gold-line w-full opacity-40" />

            {/* Perks */}
            <div className="space-y-4 text-left">
              {perks.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground font-light">
                  <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-gold" strokeWidth={2.5} />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleOrder}
              className="luxury-button w-full py-5 font-medium text-[11px] tracking-[0.25em] uppercase"
            >
              Add to Cart
            </button>

            {/* Footnote */}
            <p className="text-[10px] text-muted-foreground/50 font-light uppercase tracking-widest">
              Replacement filters available for {formatINR(399)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
