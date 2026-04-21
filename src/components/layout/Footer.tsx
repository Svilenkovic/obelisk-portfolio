"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-light border-t border-white/5 pt-20 pb-10 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1">
            <h3 className="font-heading font-bold text-2xl tracking-[0.2em] mb-6 uppercase">Nacionale</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-sm">
              Premium srpski brend posvećen kvalitetu i tradiciji. Autentičan dizajn i vrhunska izrada za one koji cene prave vrednosti.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-heading text-sm text-text-primary font-bold tracking-widest mb-6 uppercase">Linkovi</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/collections" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Kolekcije
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Korpa
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
             <h4 className="font-heading text-sm text-text-primary font-bold tracking-widest mb-6 uppercase">Newsletter</h4>
             <p className="text-text-secondary text-sm mb-4">Prijavite se za ekskluzivne ponude i rani pristup kolekcijama.</p>
             <form className="relative group" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Vaša email adresa" 
                 className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors peer"
               />
               <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary peer-focus:text-primary transition-colors font-heading text-xs uppercase tracking-widest font-bold">
                 Prijavi se
               </button>
             </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-xs text-text-secondary tracking-wider font-heading uppercase">
               © {new Date().getFullYear()} NACIONALE. SVA PRAVA ZADRŽANA.
            </p>
            <p className="text-[10px] text-text-secondary/80 tracking-wider font-heading uppercase mt-2">
              Template by{" "}
              <Link
                href="https://svilenkovic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                svilenkovic.com
              </Link>
            </p>
          </div>
          <button 
            onClick={scrollToTop}
            className="text-xs font-heading font-medium uppercase tracking-widest text-text-secondary hover:text-primary transition-colors"
          >
            Povratak na vrh ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
