import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import bottle1lBlack from '@/assets/purego-1l-black.png';
import { formatINR } from '@/lib/utils';

const Pricing = () => {
  const { addItem } = useCartStore((s) => ({ addItem: s.addItem }));

  const handleOrder = () => {
    addItem({ id: 'purego-1l', name: 'PURE GO 1 Litre', price: 999, image: bottle1lBlack });
    toast.success('PURE GO 1 Litre added to cart');
  };

  return (
    <section id="pricing" className="py-28 md:py-36 section-gradient">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">Pricing</p>
          <div className="brand-divider" />
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-6">
            One price. No compromise.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto text-center space-y-10"
        >
          <div className="font-display text-6xl md:text-7xl font-medium tracking-tight">
            {formatINR(999)}
          </div>

          <div className="space-y-4 text-left max-w-xs mx-auto">
            {['Bottle + first filter included', '3-layer visible filtration', 'BPA-free materials', 'Free shipping across India'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground font-light">
                <Check size={14} className="text-foreground/40 shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <button 
            onClick={handleOrder}
            className="glow-button px-12 py-4 rounded-full font-medium text-primary-foreground text-sm tracking-[0.15em] uppercase"
          >
            Add to Cart
          </button>

          <p className="text-xs text-muted-foreground/50 font-light">
            Replacement filters — {formatINR(399)} each. No subscriptions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
