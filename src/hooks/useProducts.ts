import useSWR from 'swr';
import { fetcher, getProductsEndpoint, getCollectionsEndpoint, ApiResponse } from '@/lib/api';
import { Product, Collection } from '@/lib/types';
import { mockProducts, mockCollections } from '@/lib/mockData';

export function useProducts(slug?: string) {
  // Use mock products for maximum minimalist elegance, hiding potentially empty API
  let products = mockProducts;
  if (slug) {
      products = products.filter(p => p.slug === slug);
  }

  return {
    products,
    isLoading: false,
    isError: null,
  };
}

export function useProduct(slug: string) {
  let product = mockProducts.find(p => p.slug === slug) || null;

  return {
    product,
    isLoading: false,
    isError: null,
  };
}

export function useCollections(slug?: string) {
  let collections = mockCollections;

  return {
    collections: collections,
    isLoading: false,
    isError: null,
  };
}

export function useFeaturedProducts() {
  const { products } = useProducts();
  
  return {
    featuredProducts: products.filter(p => p.is_featured === 1),
    isLoading: false,
    isError: null
  };
}
