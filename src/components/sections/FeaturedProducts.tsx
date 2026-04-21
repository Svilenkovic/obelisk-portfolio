"use client";

import React from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import { useFeaturedProducts } from '@/hooks/useProducts';

export default function FeaturedProducts() {
  const { featuredProducts, isLoading } = useFeaturedProducts();
  
  const skeletons = Array(3).fill(0).map((_, i) => (
      <div key={i} className="aspect-[3/4] bg-surface-light rounded-xl animate-pulse border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-50"></div>
      </div>
  ));

  return (
    <section className="py-32 relative bg-background border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary leading-tight">
              Istaknuti<br/><span className="text-primary italic font-normal normal-case md:ml-4">Komadi</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-side">
             <Button href="/collections" variant="outline" className="text-xs px-6 py-3">
               Pogledaj celu kolekciju
             </Button>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
             skeletons
          ) : featuredProducts.length > 0 ? (
            featuredProducts.slice(0, 3).map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={index * 0.15}>
                <ProductCard product={product} index={index} />
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-32 text-center text-text-secondary border border-white/5 rounded-xl bg-surface-light/50 font-heading uppercase tracking-widest text-sm">
                Trenutno nema istaknutih proizvoda.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
