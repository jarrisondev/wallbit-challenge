import { useState, useEffect } from 'react';
import { CartItem, CartStats } from '../types';

const STORAGE_KEY = 'programmers_cart';

interface StoredCart {
  items: CartItem[];
  createdAt: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [createdAt, setCreatedAt] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const { items, createdAt } = JSON.parse(stored) as StoredCart;
      setCartItems(items);
      setCreatedAt(createdAt);
    } else {
      const newCreatedAt = new Date().toISOString();
      setCreatedAt(newCreatedAt);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [], createdAt: newCreatedAt }));
    }
  }, []);

  useEffect(() => {
    if (createdAt) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: cartItems, createdAt }));
    }
  }, [cartItems, createdAt]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (itemId: number, amount: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + amount);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const getStats = (): CartStats => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalCost, createdAt };
  };

  return { cartItems, addToCart, updateQuantity, getStats };
}