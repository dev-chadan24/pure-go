import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

import bottle750Black from '@/assets/purego-750ml-black.png';
import bottle750Blue from '@/assets/purego-750ml-blue.png';
import bottle750Silver from '@/assets/purego-750ml-silver.png';

import bottle1lBlack from '@/assets/purego-1l-black.png';
import bottle1lBlue from '@/assets/purego-1l-blue.png';
import bottle1lSilver from '@/assets/purego-1l-silver.png';

type ColorOption = { name: string; hex: string; img: string };

const colors750: ColorOption[] = [
  { name: 'Black', hex: '#1a1a2e', img: bottle750Black },
  { name: 'Blue', hex: '#1e40af', img: bottle750Blue },
  { name: 'Silver', hex: '#94a3b8', img: bottle750Silver },
];

const colors1l: ColorOption[] = [
  { name: 'Black', hex: '#1a1a2e', img: bottle1lBlack },
  { name: 'Blue', hex: '#1e40af', img: bottle1lBlue },
  { name: 'Silver', hex: '#94a3b8', img: bottle1lSilver },
];

const ProductShowcase = ({
  id, title, subtitle, price, colors,
}: {
  id: string; title: string; subtitle: string; price: number; colors: ColorOption[];
}) => {
  const [selected, setSelected] = useState(0);
  const { addItem } = useCartStore();

  const handleAdd = () => {
    addItem({ id, name: title, price, image: colors[selected].img });
    toast.success(`${title} added to cart`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      {/* Image — dominant */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
      >
        <img
          src={colors[selected].img}
          alt={`${title} — ${colors[selected].name}`}
          loading="lazy"
          className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain transition-all duration-700"
        />
      </motion.div>

      {/* Text — minimal */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 text-center md:text-left"
      >
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight">{title}</h3>
          <p className="text-muted-foreground font-light mt-3 max-w-sm">{subtitle}</p>
        </div>

        {/* Color swatches */}
        <div className="flex gap-3 justify-center md:justify-start">
          {colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              aria-label={`Select ${c.name}`}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-500 ${i === selected ? 'border-foreground scale-110' : 'border-border hover:border-foreground/30'}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="flex items-center gap-8 justify-center md:justify-start">
          <span className="text-2xl font-display font-medium">{formatINR(price)}</span>
          <button 
            onClick={handleAdd}
            className="glow-button px-8 py-3.5 rounded-full font-medium text-primary-foreground text-sm tracking-[0.1em] uppercase flex items-center gap-2.5"
          >
            <ShoppingCart size={15} />
            Buy Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Products = () => {
  return (
    <section id="products" className="py-28 md:py-36">
      <div className="container max-w-7xl mx-auto px-6 space-y-32">
        {/* Section intro */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-4"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">The Collection</p>
          <div className="brand-divider" />
        </motion.div>

        {/* Product 1 */}
        <ProductShowcase
          id="purego-750"
          title="PURE GO 750ml"
          subtitle="Compact. Elegant. Designed for everyday carry."
          price={699}
          colors={colors750}
        />

        {/* Product 2 — reversed layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 text-center md:text-left md:order-1"
          >
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight">PURE GO 1 Litre</h3>
              <p className="text-muted-foreground font-light mt-3 max-w-sm">Our signature. For those who refuse to compromise.</p>
            </div>
            <ColorAndBuy id="purego-1l" title="PURE GO 1 Litre" price={999} colors={colors1l} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center md:order-2"
          >
            <ColorImage colors={colors1l} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sub-components to keep the reversed layout clean
const ColorAndBuy = ({ id, title, price, colors }: { id: string; title: string; price: number; colors: ColorOption[] }) => {
  const [selected, setSelected] = useState(0);
  const { addItem } = useCartStore();
  
  const handleAdd = () => {
    addItem({ id, name: title, price, image: colors[selected].img });
    toast.success(`${title} added to cart`);
  };

  return (
    <>
      <div className="flex gap-3 justify-center md:justify-start">
        {colors.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setSelected(i)}
            aria-label={`Select ${c.name}`}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-500 ${i === selected ? 'border-foreground scale-110' : 'border-border hover:border-foreground/30'}`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
      <div className="flex items-center gap-8 justify-center md:justify-start">
        <span className="text-2xl font-display font-medium">{formatINR(price)}</span>
        <button 
          onClick={handleAdd}
          className="glow-button px-8 py-3.5 rounded-full font-medium text-primary-foreground text-sm tracking-[0.1em] uppercase flex items-center gap-2.5"
        >
          <ShoppingCart size={15} />
          Buy Now
        </button>
      </div>
    </>
  );
};

const ColorImage = ({ colors }: { colors: ColorOption[] }) => {
  const [selected] = useState(0);
  return (
    <img
      src={colors[selected].img}
      alt="PURE GO product"
      loading="lazy"
      className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain"
    />
  );
};

export default Products;
