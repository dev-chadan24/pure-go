import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      mockLogin(email);
      toast.success('Account created');
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 hero-gradient" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm glass-panel p-10 relative z-10 space-y-8"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="flex items-center justify-center">
            <img src="/src/assets/logo.png" alt="PURE GO" className="h-10 dark:invert" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mt-6">Create an account</h1>
          <p className="text-sm text-muted-foreground font-light">Join the PURE GO experience</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-light text-muted-foreground">Full Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-light text-muted-foreground">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-light text-muted-foreground">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="h-11 rounded-xl"
            />
          </div>
          <Button type="submit" className="w-full h-11 rounded-xl tracking-wider text-sm" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground font-light">
          Already have an account?{' '}
          <Link to="/login" className="text-foreground font-medium hover:underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
