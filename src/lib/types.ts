import products from '@/assets/data.json';

export type Sneakers = (typeof products)[0];

export type CartItem = {
  id: number;
  size: number;
};
