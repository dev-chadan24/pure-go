import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '@/assets/logo.png';

const Footer = () => (
  <footer className="pt-24 pb-12 border-t border-gold/10 relative overflow-hidden">
    {/* Ambient glow top */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-3xl opacity-15 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, hsl(var(--gold)/0.3) 0%, transparent 65%)' }}
    />

    <div className="container max-w-7xl mx-auto px-6 relative z-10">
      {/* ── Main Grid ── */}
      <div className="grid md:grid-cols-12 gap-16 mb-20">

        {/* ── Brand Column ── */}
        <div className="md:col-span-5 space-y-6">
          <img
            src={logoImg}
            alt="PURE GO"
            className="h-9 w-auto object-contain dark:invert opacity-90 hover:opacity-100 transition-opacity duration-400"
          />
          <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xs">
            Clean water. Clear trust.<br />
            Premium hydration, crafted in India.
          </p>

          {/* Social */}
          <div className="flex gap-3 pt-2">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Twitter,   label: 'Twitter' },
              { Icon: Linkedin,  label: 'LinkedIn' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="group w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/50 hover:text-gold hover:border-gold/40 transition-all duration-400"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Made in India */}
          <p className="text-[10px] text-muted-foreground/40 tracking-widest uppercase font-light">
            🇮🇳 &nbsp;Proudly Made in India
          </p>
        </div>

        {/* ── Navigate ── */}
        <div className="md:col-span-3 md:col-start-7 space-y-5">
          <h4 className="editorial-label">Navigate</h4>
          <div className="gold-line w-6" />
          <nav className="flex flex-col gap-3 mt-2">
            {['Collection', 'Story', 'Pricing', 'Features'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-400 font-light hover:translate-x-1 inline-block transition-transform"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Contact ── */}
        <div className="md:col-span-3 space-y-5">
          <h4 className="editorial-label">Contact</h4>
          <div className="gold-line w-6" />
          <div className="flex flex-col gap-3 mt-2">
            <a
              href="mailto:hello@purego.in"
              className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-400 font-light"
            >
              hello@purego.in
            </a>
            <a
              href="tel:+918328863317"
              className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-400 font-light"
            >
              +91 83288 63317
            </a>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="gold-line w-full opacity-30 mb-10" />

      {/* ── Bottom row ── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-muted-foreground/40 font-light">
        <p>© 2026 PURE GO. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors duration-400">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors duration-400">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;