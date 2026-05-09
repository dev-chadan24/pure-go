import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, selectTotalPrice } from '@/store/useCartStore';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Lock, Truck, ShieldCheck, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';
import logoImg from '@/assets/logo.png';
import { toast } from 'sonner';

const Checkout = () => {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore(selectTotalPrice);
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '' });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'PURE10') {
      setDiscount(totalPrice * 0.1);
      setCouponApplied(true);
      toast.success('10% discount applied!');
    } else {
      setDiscount(0);
      setCouponApplied(false);
      toast.error('Invalid coupon code');
    }
  };

  const finalTotal = totalPrice - discount;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const options = {
        key: 'rzp_test_YOUR_KEY_HERE',
        amount: finalTotal * 100,
        currency: 'INR',
        name: 'PURE GO',
        description: 'Premium Hydration Purchase',
        image: logoImg,
        handler: function (response: any) {
          clearCart();
          navigate('/success', {
            state: {
              orderId: response.razorpay_payment_id || `ORD-${Math.floor(Math.random() * 1000000)}`,
              amount: finalTotal,
            },
          });
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: '#C9963A' },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            navigate('/failure');
          },
        },
      };

      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) {
        toast.error('Payment gateway is loading. Please try again.');
        setIsProcessing(false);
        return;
      }
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', () => navigate('/failure'));
      rzp.open();
    }, 800);
  };

  const inputClass =
    'h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/30 transition-all duration-300 text-sm';

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
          <div className="w-20 h-20 rounded-full bg-gold/8 border border-gold/15 flex items-center justify-center">
            <ShieldCheck size={28} className="text-gold/60" />
          </div>
          <h2 className="font-display text-4xl font-medium tracking-tight">Your cart is empty.</h2>
          <p className="text-muted-foreground font-light text-sm max-w-xs">
            Begin your journey towards pure hydration.
          </p>
          <button
            onClick={() => navigate('/')}
            className="luxury-button px-10 py-4 mt-4 text-[11px] tracking-[0.2em] uppercase"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container max-w-6xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* ── Left: Form ── */}
          <div className="md:col-span-7 space-y-10">
            <div>
              <h1 className="font-display text-5xl font-medium tracking-tight mb-2">Checkout</h1>
              <div className="gold-line w-12 mt-4" />
              <p className="text-muted-foreground font-light text-sm mt-4">
                Secure your order below. Payments encrypted by Razorpay.
              </p>
            </div>

            <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">
              {/* Contact */}
              <div className="space-y-4">
                <h2 className="editorial-label">Contact Information</h2>
                <div className="gold-line w-8" />
                <div className="space-y-3 mt-4">
                  <Input
                    placeholder="Full Name"
                    required
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      required
                      className={inputClass}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className={inputClass}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-4 pt-6 border-t border-border/30">
                <h2 className="editorial-label">Shipping Address</h2>
                <div className="gold-line w-8" />
                <div className="space-y-3 mt-4">
                  <Input
                    placeholder="Complete Address"
                    required
                    className={inputClass}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="City"
                      required
                      className={inputClass}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    <Input
                      placeholder="PIN Code"
                      required
                      className={inputClass}
                      value={formData.pin}
                      onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Security notice */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-light bg-gold/5 border border-gold/12 p-4 rounded-xl">
                <Lock size={15} className="text-gold/70 flex-shrink-0" />
                Your payment is secured and encrypted by Razorpay.
              </div>
            </form>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="md:col-span-5">
            <div className="gold-glass rounded-3xl p-8 sticky top-28 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight mb-1">Order Summary</h2>
                <div className="gold-line w-8 mt-3" />
              </div>

              {/* Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary/40 border border-gold/10 flex items-center justify-center p-1.5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-snug truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground font-light mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-display font-medium text-base gold-text flex-shrink-0">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="gold-line w-full opacity-40" />

              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <Input
                    placeholder="Discount code (try PURE10)"
                    className="h-11 rounded-xl bg-background/50 border-border/50 pl-9 text-sm"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={applyCoupon}
                  className={`h-11 px-5 rounded-xl text-[10px] tracking-[0.15em] uppercase font-medium border transition-all duration-300 flex-shrink-0 ${
                    couponApplied
                      ? 'bg-gold/15 border-gold/30 text-gold'
                      : 'border-border/50 hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  {couponApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Subtotal</span>
                  <span>{formatINR(totalPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500 dark:text-green-400">
                    <span className="font-light">Discount</span>
                    <span>−{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className="text-foreground/60">Free</span>
                </div>
                <div className="gold-line w-full opacity-30 !my-4" />
                <div className="flex justify-between items-end">
                  <span className="font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground font-light mr-1.5">INR</span>
                    <span className="font-display text-2xl font-medium gold-text">{formatINR(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="luxury-button w-full py-5 text-[11px] tracking-[0.25em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing…' : `Pay ${formatINR(finalTotal)}`}
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold/10">
                {[
                  { icon: Truck, label: 'Free Delivery', sub: '3–5 Days' },
                  { icon: ShieldCheck, label: 'Secure Payment', sub: 'Encrypted' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gold/8 border border-gold/12 flex items-center justify-center">
                      <Icon size={15} className="text-gold/70" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-widest text-foreground/70">{label}</p>
                      <p className="text-[10px] text-muted-foreground/50 font-light">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
