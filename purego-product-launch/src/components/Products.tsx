import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

const products = [
  {
    id: 1,
    name: "PURE GO Bottle",
    subtitle: "750ml · Everyday Edition",
    price: 399,
    size: "750ml",
    description: "Minimal, premium hydration for everyday use.",
    badge: null,
  },
  {
    id: 2,
    name: "PURE GO Bottle",
    subtitle: "1 Litre · Signature Edition",
    price: 499,
    size: "1l",
    description: "More capacity. The same premium experience.",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Carbon Filter",
    subtitle: "Replacement Cartridge",
    price: 399,
    image: "/assets/filter.png",
    description: "Advanced carbon filtration for pure, clean hydration.",
    badge: null,
  }
];

const colorMap: Record<string, { bg: string; label: string }> = {
  black:  { bg: 'bg-zinc-900',   label: 'Obsidian' },
  blue:   { bg: 'bg-blue-600',   label: 'Ocean' },
  silver: { bg: 'bg-slate-300',  label: 'Silver' },
};

const colors = ["black", "blue", "silver"];

const getImage = (size: string, color: string) =>
  `/assets/purego-${size.toLowerCase()}-${color}.png`;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 40, damping: 20, mass: 1 } },
};

const Products = () => {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({
    1: "black",
    2: "black",
  });
  const [hovered, setHovered] = useState<number | null>(null);

  const handleAddToCart = (product: (typeof products)[number]) => {
    const isBottle = product.size !== undefined;
    const color = selectedColors[product.id];
    const itemToAdd = {
      id: `${product.id}-${isBottle ? color : 'default'}`,
      name: isBottle ? `${product.name} (${product.size}) — ${colorMap[color]?.label ?? color}` : product.name,
      price: product.price,
      image: isBottle ? getImage(product.size, color) : product.image,
      color: isBottle ? color : undefined,
      description: product.description,
    };
    addItem(itemToAdd);
    toast.success(`${product.name} added to cart`, { description: isBottle ? colorMap[color]?.label : undefined });
  };

  return (
    <section id="products" className="py-32 md:py-44 bg-background relative overflow-hidden">
      {/* Ambient glow top */}
      <div
        className="ambient-glow w-[700px] h-[400px] -top-20 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.06) 0%, transparent 60%)' }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-5 mb-24"
        >
          <p className="editorial-label">The Collection</p>
          <div className="brand-divider" />
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] mt-6">
            Pure hydration.<br />
            <span className="italic cinematic-text">Tailored to you.</span>
          </h2>
        </motion.div>

        {/* ── Product Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product) => {
            const isBottle = product.size !== undefined;
            const activeColor = selectedColors[product.id];
            const imgSrc = isBottle
              ? getImage(product.size!, activeColor)
              : product.image;

            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                className="product-card p-8 flex flex-col items-center text-center group"
              >
                {/* ── Badge ── */}
                {product.badge && (
                  <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-medium tracking-[0.2em] uppercase bg-gold/15 text-gold border border-gold/20">
                    <Star size={9} fill="currentColor" />
                    {product.badge}
                  </div>
                )}

                {/* ── Product Image ── */}
                <div className="relative h-64 flex items-center justify-center w-full mb-8">
                  {/* Shadow glow beneath image */}
                  <motion.div
                    animate={{ opacity: hovered === product.id ? 0.6 : 0.2 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full blur-xl"
                    style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.5) 0%, transparent 70%)' }}
                  />
                  <motion.img
                    key={imgSrc}
                    src={imgSrc}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    loading="lazy"
                    className="h-full object-contain transition-transform duration-700 group-hover:scale-[1.08] group-hover:-translate-y-2 drop-shadow-xl"
                  />
                </div>

                {/* ── Info ── */}
                <div className="space-y-4 flex-1 flex flex-col justify-between w-full">
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl font-medium tracking-tight">{product.name}</h3>
                    <p className="editorial-label text-[9px]">{product.subtitle}</p>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed mt-2">
                      {product.description}
                    </p>
                  </div>

                  {/* ── Color Swatches ── */}
                  {isBottle && (
                    <div className="flex items-center justify-center gap-3 my-2">
                      {colors.map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: color }))}
                          title={colorMap[color]?.label}
                          className={`color-swatch ${colorMap[color]?.bg} ${activeColor === color ? 'active' : ''}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* ── Price + CTA ── */}
                  {product.id === 3 ? (
                    <div className="pt-5 border-t border-border/40 mt-2">
                      <div className="relative w-full py-3 text-[10px] tracking-[0.2em] uppercase font-medium text-gold/80 bg-gold/5 border border-gold/10 rounded-lg overflow-hidden flex items-center justify-center cursor-default isolate transition-colors duration-500 group-hover:bg-gold/10 group-hover:border-gold/20 group-hover:text-gold">
                        <motion.div 
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent -skew-x-12 z-0"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 0.5 }}
                        />
                        <span className="relative z-10">Available Soon</span>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-5 flex items-center justify-between border-t border-border/40 mt-2">
                      <div className="text-left">
                        <span className="font-display text-2xl font-medium gold-text">
                          {formatINR(product.price!)}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAddToCart(product)}
                        className="luxury-button px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase flex items-center gap-2"
                      >
                        <ShoppingCart size={12} />
                        Add to Cart
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
