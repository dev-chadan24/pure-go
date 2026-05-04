import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Lifestyle from '@/components/Lifestyle';
import Story from '@/components/Story';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Impact from '@/components/Impact';
import Offers from '@/components/Offers';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const Index = () => (
  <div className="min-h-screen">
    <SEO />
    <Navbar />
    <Hero />
    <Products />
    <Lifestyle />
    <Story />
    <Features />
    <Pricing />
    <Impact />
    <Offers />
    <Footer />
  </div>
);

export default Index;
