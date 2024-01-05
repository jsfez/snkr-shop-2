'use client';

import { CartItem, CartState } from '@/lib/types';
import React, { createContext, useContext, useMemo, useState } from 'react';

const initialCartState: CartState = {
  empty: true,
  itemCount: 0,
  items: [],
  addItem: () => {},
  removeItem: () => {},
  checkout: () => {},
};

const CartContext = createContext<CartState>(initialCartState);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(initialCartState);

  const contextValue = useMemo(() => {
    return {
      ...state,

      addItem: (item: CartItem) => {
        setState((prevState) => ({
          ...prevState,
          items: [...prevState.items, item],
          itemCount: prevState.itemCount + 1,
          empty: false,
        }));
      },

      removeItem: (id: number) => {
        setState((prevState) => {
          const newItems = prevState.items.filter((item) => item.id !== id);
          return {
            ...prevState,
            items: newItems,
            itemCount: prevState.itemCount - 1,
            empty: newItems.length === 0,
          };
        });
      },

      checkout: () => {
        setState((prevState) => ({
          ...prevState,
          items: [],
          itemCount: 0,
          empty: true,
        }));
      },
    };
  }, [state]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
