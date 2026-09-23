"use client";

import { products } from "@/data/products";
import type { CartItem, Product } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DetailedCartItem = CartItem & { product: Product };

type CartContextType = {
  items: DetailedCartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (productId: string, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "bathae-cart-v1";

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawItems, setRawItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRawItems(JSON.parse(saved) as CartItem[]);
      } catch {
        setRawItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rawItems));
  }, [rawItems]);

  const items = useMemo<DetailedCartItem[]>(() => {
    return rawItems
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is DetailedCartItem => Boolean(item));
  }, [rawItems]);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.product.price, 0), [items]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return { success: false, message: "Product not found." };
    if (product.stock < 1) return { success: false, message: "Product is out of stock." };

    let message = "Added to cart.";
    setRawItems((prev) => {
      const existing = prev.find((p) => p.productId === productId);
      const existingQty = existing?.quantity ?? 0;
      const nextQty = Math.min(existingQty + quantity, product.stock);
      if (nextQty === existingQty) {
        message = `Only ${product.stock} left in stock.`;
        return prev;
      }
      if (existing) {
        return prev.map((p) => (p.productId === productId ? { ...p, quantity: nextQty } : p));
      }
      return [...prev, { productId, quantity: Math.min(quantity, product.stock) }];
    });

    return { success: true, message };
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setRawItems((prev) => {
      if (quantity <= 0) return prev.filter((p) => p.productId !== productId);
      return prev.map((p) =>
        p.productId === productId ? { ...p, quantity: Math.min(quantity, product.stock) } : p,
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setRawItems((prev) => prev.filter((p) => p.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setRawItems([]), []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
