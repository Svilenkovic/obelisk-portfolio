"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Product } from '@/lib/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const addItem = useCart((state) => state.addItem);
  const price = product.discount_price ?? product.price;

  useGSAP(
    () => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const trigger = card.querySelector('.hover-target');

      const handleMouseEnter = () => {
         gsap.to(trigger, { 
             x: 40, 
             color: '#c9a84c', 
             duration: 0.6, 
             ease: 'power3.out' 
         });
         const line = card.querySelector('.line-indicator');
         if(line) gsap.to(line, { width: '100%', duration: 0.6, ease: 'power3.out' });
      };

      const handleMouseLeave = () => {
         gsap.to(trigger, { 
             x: 0, 
             color: '#f0ece4', 
             duration: 0.6, 
             ease: 'power3.out' 
         });
         const line = card.querySelector('.line-indicator');
         if(line) gsap.to(line, { width: '0%', duration: 0.6, ease: 'power3.out' });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: cardRef }
  );

  return (
    <Link 
      href={`/products/?slug=${product.slug}`}
      ref={cardRef}
      className="block group relative w-full py-8 border-b border-white/5"
    >
      <div className="line-indicator absolute bottom-[-1px] left-0 h-[1px] bg-primary w-0 pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div className="hover-target flex items-baseline gap-6">
             <span className="font-heading text-sm md:text-md text-text-secondary tracking-[0.2em] opacity-50">
                 {String(index + 1).padStart(2, '0')}
             </span>
             <h3 className="font-heading text-3xl md:text-5xl lg:text-7xl font-light uppercase tracking-widest transition-colors mb-2 md:mb-0">
                 {product.name}
             </h3>
          </div>
          
          <div className="flex items-center gap-8 min-w-[200px] justify-between md:justify-end">
             <div className="flex gap-3 hidden sm:flex">
                 {(() => {
                     try {
                         const colors = JSON.parse(product.colors);
                         return colors.map((c: string) => (
                             <span key={c} className="w-4 h-4 rounded-full inline-block border border-white/20" style={{backgroundColor: c}}></span>
                         ));
                     } catch(e) { return null; }
                 })()}
             </div>
             
             <div className="text-right">
                 <span className="font-heading text-lg md:text-2xl text-text-primary tracking-widest block">{price.toLocaleString('sr-RS')} RSD</span>
                 {product.stock_status === 'in_stock' ? (
                     <span className="text-[10px] text-primary uppercase tracking-widest font-heading">Spremno</span>
                 ) : (
                     <span className="text-[10px] text-text-secondary uppercase tracking-widest font-heading">Rezervacija</span>
                 )}
             </div>
          </div>
      </div>
    </Link>
  );
}
