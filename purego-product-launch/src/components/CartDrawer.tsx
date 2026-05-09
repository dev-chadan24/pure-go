import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useCartStore, selectTotalItems, selectTotalPrice } from '@/store/useCartStore';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 hover:bg-gold/10 hover:text-gold transition-colors duration-300"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-4 h-4" />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-[18px] h-[18px] text-[9px] font-bold bg-gold text-background rounded-full"
            >
              {totalItems}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-lg border-l border-gold/10 bg-background/95 backdrop-blur-2xl">
        <SheetHeader className="pb-4 border-b border-gold/10">
          <SheetTitle className="font-display text-2xl font-medium tracking-tight">
            Your Cart
            <span className="ml-2 font-sans text-sm font-light text-muted-foreground">({totalItems} items)</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-5 text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gold/8 border border-gold/12 flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-display text-xl font-medium tracking-tight">Your cart is empty</p>
              <p className="text-muted-foreground font-light text-sm mt-1">Begin your pure hydration journey.</p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 mt-2">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="flex items-center gap-4 py-4 border-b border-border/30 last:border-0"
                    >
                    {/* Image */}
                    <div className="w-20 h-20 overflow-hidden rounded-xl bg-secondary/50 border border-gold/8 flex items-center justify-center p-1.5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-snug truncate">{item.name}</h4>
                      <p className="text-sm font-display font-medium mt-1 gold-text">{formatINR(item.price)}</p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2.5">
                        <button
                          className="w-7 h-7 rounded-full border border-border/60 hover:border-gold/40 hover:text-gold flex items-center justify-center transition-all duration-300"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-5 text-center font-medium">{item.quantity}</span>
                        <button
                          className="w-7 h-7 rounded-full border border-border/60 hover:border-gold/40 hover:text-gold flex items-center justify-center transition-all duration-300"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      className="w-8 h-8 rounded-full text-muted-foreground/40 hover:text-destructive hover:bg-destructive/8 flex items-center justify-center transition-all duration-300"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
            </ScrollArea>

            <SheetFooter className="border-t border-gold/10 pt-6 flex flex-col gap-5 sm:flex-col">
              {/* Total */}
              <div className="flex items-end justify-between w-full">
                <div>
                  <p className="text-xs text-muted-foreground font-light uppercase tracking-widest">Total</p>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 0.95, color: "hsl(var(--foreground))" }}
                    animate={{ scale: 1, color: "hsl(var(--gold))" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="font-display text-3xl font-medium mt-0.5 block"
                  >
                    {formatINR(totalPrice)}
                  </motion.span>
                </div>
                <p className="text-xs text-muted-foreground/50 font-light">Free shipping</p>
              </div>

              {/* CTA */}
              <button
                className="luxury-button w-full py-4 text-[11px] tracking-[0.2em] uppercase"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
