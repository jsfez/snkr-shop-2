import products from '@/assets/data.json';
import { clsx, type ClassValue } from 'clsx';
import { createTwc } from 'react-twc';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twx = createTwc({
  compose: twMerge,
  shouldForwardProp: (prop) => prop[0] !== '_',
});

export function fetchProduct(id: string) {
  return products.find((item) => item.id === Number(id));
}
