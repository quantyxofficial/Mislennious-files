import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Target position for the ring to lerp toward
    let tx = -100, ty = -100;
    let rx = -100, ry = -100;
    let raf: number;
    let hovering = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      rx = lerp(rx, tx, 0.14);
      ry = lerp(ry, ty, 0.14);
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(${hovering ? 1.5 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering = !!(el.closest('button, a, [data-hover], input'));
      dot.style.opacity = hovering ? '0' : '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_rgba(34,211,238,1)]"
        style={{ transform: 'translate(-100px,-100px)', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/40 rounded-full pointer-events-none z-[99] mix-blend-screen"
        style={{ transform: 'translate(-100px,-100px)', willChange: 'transform', transition: 'scale 0.15s ease' }}
      />
    </>
  );
}
