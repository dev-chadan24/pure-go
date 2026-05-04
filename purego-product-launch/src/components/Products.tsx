import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

const products = [
  {
    id: 1,
    name: "PURE GO Bottle (750ml)",
    price: 699,
    size: "750ml",
    description: "Minimal, premium hydration for everyday use."
  },
  {
    id: 2,
    name: "PURE GO Bottle (1 Litre)",
    price: 999,
    size: "1l",
    description: "More capacity. Same premium experience."
  },
  {
    id: 3,
    name: "Carbon Filter Cartridge",
    price: 399,
    image: "/assets/filter.png",
    description: "Advanced carbon filtration for pure, clean hydration."
  }
];

const colors = ["black", "blue", "silver"];

const getImage = (size: string, color: string) => {
  return `/assets/purego-${size.toLowerCase()}-${color}.png`;
};

const Products = () => {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({
    1: "black",
    2: "black"
  });

  const handleAddToCart = (product: any) => {
    const isBottle = product.size !== undefined;
    const itemToAdd = {
      id: `${product.id}-${isBottle ? selectedColors[product.id] : 'default'}`,
      name: isBottle ? `${product.name} - ${selectedColors[product.id]}` : product.name,
      price: product.price,
      image: isBottle ? getImage(product.size, selectedColors[product.id]) : product.image,
      color: isBottle ? selectedColors[product.id] : undefined,
      description: product.description
    };
    addItem(itemToAdd);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section id="products" className="py-28 md:py-36 bg-[#0B0B0C] text-white">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 mb-24"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-primary font-medium">The Collection</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mt-6">
            Pure hydration.<br />Tailored to you.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#0F0F10] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="relative mb-10 h-64 flex items-center justify-center w-full">
                <img
                  src={product.size ? getImage(product.size, selectedColors[product.id]) : product.image}
                  alt={product.name}
                  className="h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-between w-full">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-medium tracking-tight">{product.name}</h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{product.description}</p>
                </div>

                {product.size && (
                  <div className="flex gap-3 justify-center my-4">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setSelectedColors(prev => ({
                            ...prev,
                            [product.id]: color
                          }))
                        }
                        className={`w-6 h-6 rounded-full border border-white/10 transition-all duration-300
                          ${color === "black" ? "bg-black" : ""}
                          ${color === "blue" ? "bg-blue-600" : ""}
                          ${color === "silver" ? "bg-gray-400" : ""}
                          ${selectedColors[product.id] === color ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0F0F10]" : "hover:scale-110"}
                        `}
                      />
                    ))}
                  </div>
                )}

                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                  <span className="text-xl font-display font-medium text-foreground">{formatINR(product.price)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="glow-button px-5 py-2.5 font-medium text-[10px] tracking-[0.1em] uppercase flex items-center gap-2"
                  >
                    <ShoppingCart size={13} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
