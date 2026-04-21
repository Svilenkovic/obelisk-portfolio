"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';

function OrderContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const phone = searchParams.get('phone');

  return (
    <div className="min-h-screen pt-40 pb-24 flex flex-col items-center justify-center text-center px-6">
       <ScrollReveal animation="scale">
           <div className="w-24 h-24 rounded-full border border-primary mx-auto mb-10 flex items-center justify-center bg-primary/5 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
           </div>
       </ScrollReveal>

       <ScrollReveal animation="fade-up" delay={0.2}>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wider text-text-primary mb-6">
              Porudžbina uspešna
           </h1>
           <p className="text-text-secondary text-lg max-w-lg mx-auto mb-6">
               Hvala vam na poverenju. Vaša porudžbina <strong className="text-primary font-heading tracking-widest">#{id || 'N/A'}</strong> je kreirana i biće poslata u najkraćem roku.
           </p>
           <div className="glass p-6 max-w-md mx-auto rounded-xl mb-12 border border-white/5">
               <p className="text-text-secondary text-sm leading-relaxed">
                   Očekujte poziv na broj <strong className="text-white">{phone ? decodeURIComponent(phone) : ''}</strong> za potvrdu isporuke. Plaćanje se vrši kuriru pouzećem u gotovini.
               </p>
           </div>

           <Button href="/collections" variant="primary" className="text-sm px-10">
               Nastavi Kupovinu
           </Button>
       </ScrollReveal>
    </div>
  );
}

export default function OrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <OrderContent />
        </Suspense>
    )
}
