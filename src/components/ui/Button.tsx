"use client";

import React, { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' | 'glass';
  magnetic?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  magnetic = true,
  disabled = false,
  type = "button"
}: ButtonProps) {
  const btnRef = useRef<any>(null);

  useGSAP(
    () => {
      if (!magnetic || !btnRef.current) return;

      const element = btnRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        gsap.to(element, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
          duration: 0.6,
          ease: 'power3.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: btnRef }
  );

  const baseStyles = 'inline-flex items-center justify-center font-heading font-medium tracking-wide uppercase transition-colors duration-300 relative overflow-hidden group px-8 py-4 text-sm';
  
  const variants = {
    primary: 'bg-primary text-background hover:bg-primary-hover',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-background',
    glass: 'glass text-text-primary hover:bg-white/10'
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} ref={btnRef}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={combinedClassName}
      ref={btnRef}
    >
        <span className="relative z-10 block group-hover:scale-105 transition-transform duration-300">{children}</span>
    </button>
  );
}
