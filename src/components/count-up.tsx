"use client";

import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  end: string | number;
  duration?: number;
}

export function CountUp({ end, duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const numericEnd =
    typeof end === "string" ? parseFloat(end.replace(/[^\d.]/g, "")) : end;
  const suffix = typeof end === "string" ? end.replace(/[0-9.]/g, "") : "";

  useEffect(() => {
    if (!elementRef.current || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const stepTime = 30;
    const increment = numericEnd / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, numericEnd, duration]);

  return (
    <span ref={elementRef} className="animate-count">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
