import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <main className="flex-1 flex items-center justify-center p-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.3, stiffness: 150, damping: 15 }}
            className="w-20 h-20 bg-secondary/40 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-8 h-8 text-foreground/80" />
          </motion.div>

          <div className="space-y-4 mb-8">
            <h1 className="font-display text-4xl font-medium tracking-tight">Order Confirmed</h1>
            <p className="text-muted-foreground font-light leading-relaxed text-sm">
              Thank you for choosing PURE GO. Your journey to pure hydration begins now.
            </p>
          </div>

          <div className="bg-secondary/10 border border-border/40 rounded-2xl p-6 space-y-4 mb-10 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-light">Order Number</span>
              <span className="font-medium text-foreground">{state.orderId}</span>
            </div>
            <div className="tech-line w-full" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-light">Amount Paid</span>
              <span className="font-medium text-foreground">{formatINR(state.amount || 0)}</span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <Button asChild className="glow-button w-full h-12 rounded-full tracking-[0.1em] text-sm uppercase">
              <Link to="/orders">View Orders</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 rounded-full tracking-[0.1em] text-sm uppercase border-border/50 hover:bg-secondary/20">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
