import { Instagram, Twitter, Linkedin } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const Footer = () => (
  <footer className="py-20 border-t border-border/20">
    <div className="container max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-16 mb-16">
        
        {/* Brand */}
        <div className="space-y-5 md:col-span-1">
          <img src={logoImg} alt="PURE GO" className="h-8 dark:invert opacity-80 hover:opacity-100 transition-opacity" />
          <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xs">
            Clean water. Clear trust.<br />Made in India.
          </p>
          <div className="flex gap-3 pt-2">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:border-foreground/20 transition-all duration-500">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50">Navigate</h4>
          {['Collection', 'Story', 'Pricing'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-500 font-light">
              {link}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50">Contact</h4>
          <a href="mailto:hello@purego.in" className="block text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-500 font-light">
            hello@purego.in
          </a>
          <a href="tel:+918328863317" className="block text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-500 font-light">
            +91 83288 63317
          </a>
        </div>
      </div>

      <div className="brand-divider !w-full !bg-border/20 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/40 font-light">
        <p>© 2026 PURE GO. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors duration-500">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors duration-500">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;