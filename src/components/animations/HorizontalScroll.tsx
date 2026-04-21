"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex will-change-transform">
        {children}
      </div>
    </div>
  );
}
