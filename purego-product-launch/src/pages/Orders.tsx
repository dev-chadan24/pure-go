import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatINR } from '@/lib/utils';
import { motion } from 'framer-motion';

const Orders = () => {
  // Mock data for past orders
  const mockOrders = [
    {
      id: 'ORD-98765',
      date: 'October 12, 2025',
      total: 2497,
      status: 'Delivered',
      items: [{ name: 'PURE-GO 1 Litre', quantity: 2 }, { name: 'Charcoal Filter Pack', quantity: 1 }]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl font-semibold tracking-tight mb-10">Your Orders</h1>
          
          {mockOrders.length === 0 ? (
            <div className="text-center py-28 glass-panel">
              <Package className="w-14 h-14 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-xl font-medium tracking-tight mb-2">No orders yet</h2>
              <p className="text-muted-foreground font-light mb-8 text-sm">Looks like you haven't made any purchases yet.</p>
              <Button asChild className="rounded-xl px-8">
                <Link to="/">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="glass-panel p-8">
                  <div className="flex flex-wrap items-center justify-between border-b border-border/40 pb-6 mb-6 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground/60 font-light mb-1">Order ID</p>
                      <p className="font-medium text-sm">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/60 font-light mb-1">Date</p>
                      <p className="font-medium text-sm">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground/60 font-light mb-1">Total</p>
                      <p className="font-medium text-sm">{formatINR(order.total)}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/8 text-foreground/70">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-muted-foreground/40" />
                          <span className="font-medium text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground font-light">×{item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
