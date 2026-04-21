"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  elementType?: any;
  delay?: number;
}

export default function TextReveal({
  text,
  className = '',
  elementType: Element = 'h2',
  delay = 0,
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const chars = textRef.current.querySelectorAll('.char');
      
      gsap.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.05,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: textRef }
  );

  const words = text.split(' ');

  return (
    <Element ref={textRef} className={className} style={{ perspective: '400px' }}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIdx) => (
            <span key={`${wordIdx}-${charIdx}`} className="char inline-block origin-bottom">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Element>
  );
}
