"use client";

import React, { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'clip-path' | 'scale' | 'slide-side';
  delay?: number;
  duration?: number;
  className?: string;
  triggerOffset?: string;
}

export default function ScrollReveal({
  children,
  animation = 'clip-path',
  delay = 0,
  duration = 1.2,
  className = '',
  triggerOffset = 'top 80%',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const element = containerRef.current.firstElementChild;
      if (!element) return;

      const trigger = {
        trigger: containerRef.current,
        start: triggerOffset,
      };

      if (animation === 'clip-path') {
        gsap.fromTo(
          element,
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: trigger,
            clearProps: 'clipPath'
          }
        );
      } else if (animation === 'fade-up') {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration, delay, ease: 'power2.out', scrollTrigger: trigger }
        );
      } else if (animation === 'scale') {
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)', scrollTrigger: trigger }
        );
      } else if (animation === 'slide-side') {
        gsap.fromTo(
          element,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration, delay, ease: 'power3.out', scrollTrigger: trigger }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      <div className={animation === 'clip-path' ? 'clip-hidden' : ''}>{children}</div>
    </div>
  );
}
