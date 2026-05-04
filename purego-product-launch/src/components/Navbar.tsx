import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import logoImg from '@/assets/logo.png';

const navLinks = [
  { label: 'Collection', href: '/#products' },
  { label: 'Story', href: '/#story' },
  { label: 'Pricing', href: '/#pricing' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, mockLogout } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${scrolled ? 'backdrop-blur-xl bg-white/70 dark:bg-black/40 shadow-sm border-b border-border/10' : 'bg-transparent py-2'}`}>
      <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
       
{/* Logo */}
<Link 
  to="/" 
  className="flex items-center transition-all duration-300 hover:opacity-80"
>
  <img 
    src={logoImg} 
    alt="PURE GO" 
    className="h-[38px] w-auto object-contain" 
  />
</Link>


        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-500 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          </Button>

          <CartDrawer />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                  <UserIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer w-full text-sm">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={mockLogout} className="cursor-pointer text-destructive text-sm">
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="rounded-full px-5 h-9 text-xs tracking-wider">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <CartDrawer />
          <button className="text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/20 px-6 py-8 space-y-6 absolute w-full">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-border/20">
            {user ? (
              <Button variant="destructive" size="sm" className="w-full h-11" onClick={() => { mockLogout(); setMobileOpen(false); }}>
                <LogOut className="mr-2 h-3.5 w-3.5" /> Log out
              </Button>
            ) : (
              <Button asChild className="w-full h-11 rounded-xl text-sm tracking-wider" onClick={() => setMobileOpen(false)}>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
