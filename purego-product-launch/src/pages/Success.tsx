import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';

interface LocationState {
  orderId?: string;
  amount?: number;
}

const Success = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full text-center"
        >
          {/* ── Success icon ── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.25, stiffness: 120, damping: 14 }}
            className="relative w-24 h-24 mx-auto mb-10"
          >
            {/* Expanding ring animation */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full border border-gold/30"
            />
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.25, opacity: 0 }}
              transition={{ delay: 0.5, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 rounded-full border border-gold/20"
            />
            <div className="w-full h-full rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-gold" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* ── Heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-3 mb-10"
          >
            <h1 className="font-display text-5xl font-medium tracking-tight">Order Confirmed</h1>
            <p className="text-muted-foreground font-light leading-relaxed text-sm max-w-xs mx-auto">
              Thank you for choosing PURE GO. Your journey to pure hydration begins now.
            </p>
          </motion.div>

          {/* ── Order details ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="gold-glass rounded-2xl p-6 space-y-4 mb-10 text-left"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-light">Order Number</span>
              <span className="font-medium text-foreground font-mono text-xs tracking-wide">{state.orderId}</span>
            </div>
            <div className="gold-line w-full opacity-30" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-light">Amount Paid</span>
              <span className="font-display text-xl font-medium gold-text">{formatINR(state.amount || 0)}</span>
            </div>
            <div className="gold-line w-full opacity-30" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-light">Delivery</span>
              <span className="text-foreground/70 font-light">3–5 business days</span>
            </div>
          </motion.div>

          {/* ── Actions ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            <Link to="/orders" className="luxury-button block w-full py-4 text-[11px] tracking-[0.2em] uppercase text-center">
              View My Orders
            </Link>
            <Link to="/" className="luxury-outline block w-full py-4 text-[11px] tracking-[0.2em] uppercase text-center">
              Continue Shopping
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
