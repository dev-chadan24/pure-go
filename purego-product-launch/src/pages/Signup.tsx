import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import bottle1l from '@/assets/purego-1l-black.png';
import logoImg from '@/assets/logo.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      mockLogin(email);
      toast.success('Account created — welcome to PURE GO');
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-background">
      {/* ── Left panel: cinematic visual ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-foreground dark:bg-[hsl(240_5%_7%)] overflow-hidden"
      >
        <div className="noise-overlay opacity-[0.04]" />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, hsl(var(--gold)/0.4) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 flex flex-col items-center gap-10">
          <img
            src={bottle1l}
            alt="PURE GO Bottle"
            className="w-56 object-contain animate-float drop-shadow-2xl"
          />
          <div className="text-center space-y-3">
            <p className="font-display text-3xl font-medium text-background dark:text-foreground tracking-tight italic">
              Your journey to<br />pure hydration.
            </p>
            <p className="editorial-label text-background/50 dark:text-foreground/40 text-[9px]">
              Gravity-filtered · Carbon-pure · BPA-Free
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <img src={logoImg} alt="PURE GO" className="h-7 object-contain invert opacity-40" />
        </div>
      </motion.div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-sm space-y-10"
        >
          <div className="space-y-6">
            <Link to="/" className="flex items-center lg:hidden">
              <img src={logoImg} alt="PURE GO" className="h-8 dark:invert opacity-80" />
            </Link>
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight">Create account</h1>
              <p className="text-muted-foreground font-light text-sm mt-2">Join the PURE GO experience</p>
            </div>
            <div className="gold-line w-10" />
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="editorial-label text-[10px]">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="editorial-label text-[10px]">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/30 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="editorial-label text-[10px]">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-secondary/30 border-border/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/30 transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="luxury-button w-full py-4 mt-2 text-[11px] tracking-[0.2em] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground font-light">
            Already have an account?{' '}
            <Link to="/login" className="text-gold font-medium hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
