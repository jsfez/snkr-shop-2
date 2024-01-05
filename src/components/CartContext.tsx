'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type CartItem = {
  id: number;
  size: number;
};

type CartState = {
  items: CartItem[];
  filled: boolean;
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
};

const initialCartState: CartState = {
  filled: false,
  itemCount: 0,
  items: [],
  addItem: () => {},
  removeItem: () => {},
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
          filled: true,
        }));
      },

      removeItem: (id: number) => {
        setState((prevState) => {
          const newItems = prevState.items.filter((item) => item.id !== id);
          return {
            ...prevState,
            items: newItems,
            itemCount: prevState.itemCount - 1,
            filled: newItems.length > 0,
          };
        });
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
