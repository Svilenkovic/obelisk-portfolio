"use client";

import React, { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import ProductViewer from '@/components/3d/ProductViewer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';

function ProductContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { product, isLoading } = useProduct(slug || '');
  const addItem = useCart(state => state.addItem);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  const price = product?.discount_price ?? product?.price ?? 0;

  React.useEffect(() => {
      if(product) {
          try {
              const sizes = JSON.parse(product.sizes);
              if(sizes.length > 0) setSelectedSize(sizes[0]);
              const colors = JSON.parse(product.colors);
              if(colors.length > 0) setSelectedColor(colors[0]);
          } catch(e) {}
      }
  }, [product]);

  const handleAddToCart = () => {
      if(!product || !selectedSize || !selectedColor) return;
      setIsAdding(true);
      addItem(product, selectedSize, selectedColor, 1);
      setTimeout(() => setIsAdding(false), 800);
  };

  if (isLoading) {
      return <div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!product) {
      return (
          <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
              <h1 className="font-heading text-4xl mb-4">Proizvod nije pronađen</h1>
              <p className="text-text-secondary mb-8">Traženi proizvod ne postoji ili je uklonjen.</p>
              <Button href="/collections" variant="outline">Nazad na kolekcije</Button>
          </div>
      );
  }

  let sizes: string[] = [];
  let colors: string[] = [];
  try {
      sizes = JSON.parse(product.sizes);
      colors = JSON.parse(product.colors);
  } catch(e) {}

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            
            <div className="w-full lg:w-3/5">
               <ScrollReveal animation="fade-up">
                  <ProductViewer color={selectedColor || "#c9a84c"} />
               </ScrollReveal>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col justify-center">
               <ScrollReveal animation="fade-up" delay={0.1}>
                  {product.is_featured === 1 && (
                      <span className="text-primary font-heading tracking-widest uppercase text-xs font-bold mb-4 block">Istaknuto</span>
                  )}
                  <h1 className="text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary mb-2 leading-tight">
                      {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-8">
                     <span className="font-heading text-2xl text-primary font-medium">{price.toLocaleString('sr-RS')} RSD</span>
                     {product.discount_price && (
                         <span className="text-text-secondary line-through">{product.price.toLocaleString('sr-RS')} RSD</span>
                     )}
                  </div>
               </ScrollReveal>

               <ScrollReveal animation="fade-up" delay={0.2}>
                  <p className="text-text-secondary leading-relaxed mb-10">
                      {product.description}
                  </p>
               </ScrollReveal>

               <ScrollReveal animation="fade-up" delay={0.3}>
                  <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                          <span className="font-heading text-sm uppercase tracking-widest text-text-primary font-bold">Veličina</span>
                          <button className="text-xs text-text-secondary hover:text-primary transition-colors underline underline-offset-4">Vodič za veličine</button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                          {sizes.map(size => (
                              <button 
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-14 h-12 flex items-center justify-center border font-heading text-sm transition-all duration-300 ${selectedSize === size ? 'border-primary text-primary bg-primary/5' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
                              >
                                  {size}
                              </button>
                          ))}
                      </div>
                  </div>
               </ScrollReveal>

               <ScrollReveal animation="fade-up" delay={0.4}>
                  <div className="mb-10">
                      <span className="font-heading text-sm uppercase tracking-widest text-text-primary font-bold mb-4 block">Boja</span>
                      <div className="flex gap-4">
                          {colors.map(color => (
                              <button 
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${selectedColor === color ? 'border-primary outline outline-1 outline-offset-4 outline-primary/50' : 'border-white/10 hover:border-white/50'}`}
                                style={{ backgroundColor: color }}
                                aria-label={`Boja ${color}`}
                              />
                          ))}
                      </div>
                  </div>
               </ScrollReveal>

               <ScrollReveal animation="fade-up" delay={0.5}>
                  <Button 
                    variant="primary" 
                    className="w-full py-5 text-sm"
                    onClick={handleAddToCart}
                    disabled={isAdding || product.stock_status !== 'in_stock'}
                  >
                     {product.stock_status !== 'in_stock' ? 'RASPRODATO' : isAdding ? 'DODATO U KORPU ✓' : 'DODAJ U KORPU'}
                  </Button>
               </ScrollReveal>

               <ScrollReveal animation="fade-up" delay={0.6}>
                  <div className="mt-12 flex flex-col gap-4 pt-8 border-t border-white/10">
                      <div className="flex items-start gap-4 text-sm text-text-secondary">
                          <span className="font-heading text-primary font-bold mt-1 uppercase text-[10px] tracking-widest">Dostava</span>
                          <p>Besplatna dostava za porudžbine preko 8.000 RSD. Isporuka u roku od 1-3 radna dana.</p>
                      </div>
                      <div className="flex items-start gap-4 text-sm text-text-secondary">
                          <span className="font-heading text-primary font-bold mt-1 uppercase text-[10px] tracking-widest">Povrat</span>
                          <p>Mogućnost zamene ili povrata u roku od 14 dana od preuzimanja pošiljke.</p>
                      </div>
                  </div>
               </ScrollReveal>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductContent />
        </Suspense>
    )
}
