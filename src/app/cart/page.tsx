"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const router = useRouter();
  const { items, getTotal, removeItem, updateQuantity, clearCart } = useCart();
  const total = getTotal();

  const [formData, setFormData] = useState({
      ime: '',
      telefon: '',
      adresa: '',
      grad: '',
      postanskiBroj: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCheckout = async (e: React.FormEvent) => {
      e.preventDefault();
      if(items.length === 0) return;
      setIsSubmitting(true);
      setErrorMsg('');

      try {
          const res = await fetch('https://nacionale.svilenkovic.rs/api/orders.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  customer_name: formData.ime,
                  customer_phone: formData.telefon,
                  customer_address: formData.adresa,
                  customer_city: formData.grad,
                  customer_zip: formData.postanskiBroj,
                  total_amount: total,
                  items: items.map(item => ({
                      product_id: item.product.id,
                      quantity: item.quantity,
                      size: item.size,
                      color: item.color,
                      price: item.product.discount_price ?? item.product.price
                  }))
              })
          });

          // Fallback parsing just in case
          const text = await res.text();
          let data;
          try { data = JSON.parse(text); } catch { data = { success: res.ok }; }
          
          if(data.success || res.ok) {
              clearCart();
              const id = data.order_id || Math.floor(Math.random() * 100000);
              router.push(`/order/?id=${id}&phone=${encodeURIComponent(formData.telefon)}`);
          } else {
              setErrorMsg(data.error || 'Došlo je do greške prilikom kreiranja porudžbine.');
              setIsSubmitting(false);
          }
      } catch (err) {
          setErrorMsg('Greška u komunikaciji sa serverom.');
          setIsSubmitting(false);
      }
  };

  if (items.length === 0) {
      return (
          <div className="min-h-screen pt-40 flex flex-col items-center text-center px-6 pb-20">
              <ScrollReveal animation="fade-up">
                  <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-wider mb-6">Vaša korpa je prazna</h1>
                  <p className="text-text-secondary mb-10 max-w-md mx-auto">Vreme je da obogatite svoju kolekciju vrhunskim Nacionale komadima.</p>
                  <Button href="/collections" variant="primary" className="text-sm">Povratak u prodavnicu</Button>
              </ScrollReveal>
          </div>
      );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up" className="mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary">
             Vaša Korpa
          </h1>
        </ScrollReveal>

        <div className="flex flex-col xl:flex-row gap-12 xl:gap-20">
           <div className="w-full xl:w-3/5">
              <ScrollReveal animation="fade-up" delay={0.1}>
                 <div className="hidden border-b border-white/10 pb-4 mb-6 md:grid grid-cols-12 gap-4 text-xs font-heading tracking-widest uppercase text-text-secondary font-bold">
                    <div className="col-span-6">Proizvod</div>
                    <div className="col-span-2 text-center">Cena</div>
                    <div className="col-span-2 text-center">Količina</div>
                    <div className="col-span-2 text-right">Ukupno</div>
                 </div>

                 <div className="flex flex-col gap-6">
                    {items.map((item) => {
                       const price = item.product.discount_price ?? item.product.price;
                       const itemTotal = price * item.quantity;
                       return (
                           <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-white/5 pb-6">
                               <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                                   <div className="w-20 h-24 bg-surface-light rounded-md flex-shrink-0 flex items-center justify-center relative overflow-hidden group">
                                       <span className="font-heading text-[8px] text-text-secondary opacity-50 absolute rotate-[-45deg] scale-150 whitespace-nowrap">{item.product.name}</span>
                                       <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
                                   </div>
                                   <div>
                                       <h3 className="font-heading text-lg text-text-primary uppercase tracking-wide mb-1 hover:text-primary transition-colors">
                                            <a href={`/products/?slug=${item.product.slug}`}>{item.product.name}</a>
                                       </h3>
                                       <div className="text-text-secondary text-xs flex flex-wrap gap-4 uppercase tracking-widest font-heading mt-2">
                                           <span>Vel: {item.size}</span>
                                           <div className="flex items-center gap-2">
                                              Boja: <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{backgroundColor: item.color}}></span>
                                           </div>
                                       </div>
                                       <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-xs text-primary underline underline-offset-4 mt-3 hover:text-primary-hover transition-colors md:hidden uppercase tracking-widest font-heading">Ukloni</button>
                                   </div>
                               </div>
                               
                               <div className="col-span-1 md:col-span-2 md:text-center text-text-secondary">
                                   <span className="md:hidden text-xs uppercase tracking-widest mr-2 font-heading">Cena:</span>
                                   {price.toLocaleString('sr-RS')} RSD
                               </div>

                               <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-3">
                                   <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors">-</button>
                                   <span className="w-6 text-center text-sm font-heading">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors">+</button>
                               </div>

                               <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                                   <span className="font-heading text-primary font-medium">{itemTotal.toLocaleString('sr-RS')} RSD</span>
                                   <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="hidden md:block w-8 h-8 group ml-4" title="Ukloni">
                                       <svg className="w-5 h-5 text-text-secondary group-hover:text-red-500 transition-colors mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                       </svg>
                                   </button>
                               </div>
                           </div>
                       );
                    })}
                 </div>
              </ScrollReveal>
           </div>

           <div className="w-full xl:w-2/5">
              <ScrollReveal animation="fade-up" delay={0.2}>
                  <div className="glass p-6 md:p-8 rounded-2xl sticky top-32">
                      <h2 className="font-heading text-xl uppercase tracking-widest text-text-primary mb-6 font-bold">Poručivanje (Pouzećem)</h2>
                      
                      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                          <span className="text-text-secondary uppercase tracking-widest text-xs font-bold font-heading">Ukupno za plaćanje</span>
                          <span className="font-heading text-3xl text-primary font-medium">{total.toLocaleString('sr-RS')} RSD</span>
                      </div>

                      <form onSubmit={handleCheckout} className="space-y-5">
                          <div>
                              <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Ime i Prezime *</label>
                              <input required name="ime" value={formData.ime} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                          </div>
                          <div>
                              <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Telefon *</label>
                              <input required type="tel" name="telefon" value={formData.telefon} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                          </div>
                          <div>
                              <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Ulica i Broj *</label>
                              <input required name="adresa" value={formData.adresa} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Grad *</label>
                                  <input required name="grad" value={formData.grad} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                              </div>
                              <div>
                                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Poštanski Broj *</label>
                                  <input required name="postanskiBroj" value={formData.postanskiBroj} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                              </div>
                          </div>

                          {errorMsg && <div className="text-red-500 px-4 py-3 bg-red-500/10 rounded-lg text-sm border border-red-500/20">{errorMsg}</div>}

                          <Button type="submit" variant="primary" className="w-full mt-4 text-sm" disabled={isSubmitting}>
                              {isSubmitting ? 'OBRADA...' : 'POTVRDI PORUDŽBINU'}
                          </Button>
                      </form>
                  </div>
              </ScrollReveal>
           </div>
        </div>
      </div>
    </div>
  );
}
