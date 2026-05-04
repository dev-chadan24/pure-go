import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Failure = () => {
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
            className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <AlertCircle className="w-8 h-8 text-destructive/80" />
          </motion.div>

          <div className="space-y-4 mb-8">
            <h1 className="font-display text-4xl font-medium tracking-tight">Payment Unsuccessful</h1>
            <p className="text-muted-foreground font-light leading-relaxed text-sm">
              We couldn't process your payment. Don't worry, no charges were made to your account.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <Button asChild className="glow-button w-full h-12 rounded-full tracking-[0.1em] text-sm uppercase">
              <Link to="/checkout">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 rounded-full tracking-[0.1em] text-sm uppercase border-border/50 hover:bg-secondary/20">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Failure;
