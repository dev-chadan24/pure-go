import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, selectTotalPrice } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Lock, Truck, ShieldCheck, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';
import logoImg from '@/assets/logo.png';

const Checkout = () => {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore(selectTotalPrice);
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  
  // Coupon logic
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'PURE10') {
      setDiscount(totalPrice * 0.1);
    } else {
      setDiscount(0);
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
        amount: finalTotal * 100, // Amount in paise
        currency: 'INR',
        name: 'PURE GO',
        description: 'Premium Purchase',
        image: logoImg,
        handler: function (response: any) {
          clearCart();
          navigate('/success', { 
            state: { 
              orderId: response.razorpay_payment_id || `ORD-${Math.floor(Math.random() * 1000000)}`,
              amount: finalTotal 
            } 
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#0B0B0C'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            navigate('/failure');
          }
        }
      };

      const Razorpay = (window as any).Razorpay;
      
      if (!Razorpay) {
        toast.error('Payment gateway is still loading. Please try again in a moment.');
        return;
      }

      const rzp = new Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        navigate('/failure');
      });

      rzp.open();
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight">Your cart is empty.</h2>
          <p className="text-muted-foreground font-light text-sm max-w-sm">
            Begin your journey towards pure hydration.
          </p>
          <Button onClick={() => navigate('/')} className="rounded-full px-10 h-12 mt-4 tracking-wider text-sm uppercase">
            Explore Collection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container max-w-6xl mx-auto px-6 py-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* Checkout Form (Left side) */}
          <div className="md:col-span-7 space-y-10">
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight mb-2">Checkout</h1>
              <p className="text-muted-foreground font-light text-sm">Secure your order below.</p>
            </div>

            <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <Input 
                    placeholder="Full Name" 
                    required 
                    className="h-12 rounded-xl bg-secondary/30" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      className="h-12 rounded-xl bg-secondary/30" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                      className="h-12 rounded-xl bg-secondary/30" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border/40">
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground mb-4">Shipping Address</h2>
                <div className="space-y-3">
                  <Input 
                    placeholder="Complete Address" 
                    required 
                    className="h-12 rounded-xl bg-secondary/30" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="City" required className="h-12 rounded-xl bg-secondary/30" />
                    <Input placeholder="PIN Code" required className="h-12 rounded-xl bg-secondary/30" />
                  </div>
                </div>
              </div>

              {/* Note: Credit Card fields removed because Razorpay handles payment */}
              <div className="pt-6 space-y-4">
                 <div className="flex items-center gap-3 text-sm text-muted-foreground font-light bg-secondary/20 p-4 rounded-xl">
                    <Lock size={16} className="text-foreground/70" />
                    Payment is secured and encrypted by Razorpay.
                 </div>
              </div>
            </form>
          </div>

          {/* Order Summary (Right side) */}
          <div className="md:col-span-5">
            <div className="bg-secondary/10 p-8 rounded-2xl border border-border/30 sticky top-28 space-y-8">
              
              <div className="space-y-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-background border border-border/40 shrink-0 p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground font-light mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">{formatINR(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="tech-line w-full" />

              {/* Coupon */}
              <div className="flex gap-2">
                <Input 
                  placeholder="Discount code (try PURE10)" 
                  className="h-11 rounded-lg bg-background"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-11 rounded-lg"
                  onClick={applyCoupon}
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-3 pt-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Subtotal</span>
                  <span>{formatINR(totalPrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-light">Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Shipping</span>
                  <span className="text-foreground/70">Free</span>
                </div>
                
                <div className="tech-line w-full !my-5" />
                
                <div className="flex justify-between items-end">
                  <span className="font-medium">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground font-light mr-2">INR</span>
                    <span className="font-display text-2xl font-medium tracking-tight">
                      {formatINR(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                className="glow-button w-full h-14 font-medium text-sm tracking-[0.1em] uppercase mt-4 transition-all duration-300" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatINR(finalTotal)}`}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/40 mt-6">
                <div className="flex flex-col items-center justify-center text-center gap-2.5">
                  <Truck size={18} className="text-foreground/60" />
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">Free Delivery<br/><span className="text-foreground/60">3-5 Days</span></p>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2.5">
                  <ShieldCheck size={18} className="text-foreground/60" />
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">Secure Payment<br/><span className="text-foreground/60">1,000+ Users</span></p>
                </div>
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
