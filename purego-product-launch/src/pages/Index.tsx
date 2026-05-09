import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Features from '@/components/Features';
import Story from '@/components/Story';
import CarbonFilter from '@/components/CarbonFilter';
import Technology from '@/components/Technology';
import HowItWorks from '@/components/HowItWorks';
import Lifestyle from '@/components/Lifestyle';
import Impact from '@/components/Impact';
import Pricing from '@/components/Pricing';
import Offers from '@/components/Offers';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';

const Index = () => (
  <div className="min-h-screen">
    <SEO />
    <Navbar />
    <Hero />
    <Products />
    <Features />
    <Story />
    <CarbonFilter />
    <Technology />
    <HowItWorks />
    <Lifestyle />
    <Impact />
    <Pricing />
    <Offers />
    <Footer />
  </div>
);

export default Index;
