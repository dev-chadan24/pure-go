import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, selectTotalItems, selectTotalPrice } from './useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useCartStore.getState().clearCart();
  });

  it('should initialize with an empty cart', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(selectTotalItems(state)).toBe(0);
    expect(selectTotalPrice(state)).toBe(0);
  });

  it('should add an item to the cart', () => {
    const product = { id: 'p1', name: 'Test Product', price: 100, image: 'test.jpg' };
    useCartStore.getState().addItem(product);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual({ ...product, quantity: 1 });
    expect(selectTotalItems(state)).toBe(1);
    expect(selectTotalPrice(state)).toBe(100);
  });

  it('should increase quantity when adding the same item', () => {
    const product = { id: 'p1', name: 'Test Product', price: 100, image: 'test.jpg' };
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(selectTotalItems(state)).toBe(2);
    expect(selectTotalPrice(state)).toBe(200);
  });

  it('should update quantity correctly', () => {
    const product = { id: 'p1', name: 'Test Product', price: 100, image: 'test.jpg' };
    useCartStore.getState().addItem(product);
    useCartStore.getState().updateQuantity('p1', 5);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(selectTotalItems(state)).toBe(5);
    expect(selectTotalPrice(state)).toBe(500);
  });

  it('should remove item when quantity is updated to 0', () => {
    const product = { id: 'p1', name: 'Test Product', price: 100, image: 'test.jpg' };
    useCartStore.getState().addItem(product);
    useCartStore.getState().updateQuantity('p1', 0);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(selectTotalItems(state)).toBe(0);
  });

  it('should remove an item from the cart', () => {
    const product = { id: 'p1', name: 'Test Product', price: 100, image: 'test.jpg' };
    useCartStore.getState().addItem(product);
    useCartStore.getState().removeItem('p1');

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(selectTotalItems(state)).toBe(0);
  });
});
