import { Product } from '@/store/useCartStore';

// Mock product data based on a premium tech/lifestyle product
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'PURE-GO Core',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    description: 'The standard edition of the revolutionary PURE-GO experience.'
  },
  {
    id: 'p2',
    name: 'PURE-GO Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=600',
    description: 'Advanced features with extended battery life and premium finish.'
  },
  {
    id: 'p3',
    name: 'PURE-GO Elite',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1572569433114-16a3c9e3e7f2?auto=format&fit=crop&q=80&w=600',
    description: 'The ultimate package. Includes exclusive accessories and priority support.'
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay for realistic UX (loading skeletons)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 1200);
  });
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS.find((p) => p.id === id));
    }, 800);
  });
};
