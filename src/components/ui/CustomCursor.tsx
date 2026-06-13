import { useEffect, useRef, useCallback } from 'react';

type CursorState = 'default' | 'link' | 'button' | 'text' | 'grab' | 'zoom' | 'disabled';

interface CursorConfig {
  dotSize:    number;
  ringSize:   number;
  ringBorder: string;
  ringBg:     string;
  ringBlur:   string;
  dotOpacity: number;
  label:      string;
  mixBlend:   string;
}

const STATES: Record<CursorState, CursorConfig> = {
  default: {
    dotSize:    5,
    ringSize:   36,
    ringBorder: '1px solid rgba(255,255,255,0.28)',
    ringBg:     'transparent',
    ringBlur:   'none',
    dotOpacity: 1,
    label:      '',
    mixBlend:   'normal',
  },
  link: {
    dotSize:    0,
    ringSize:   54,
    ringBorder: '1px solid rgba(255,255,255,0.55)',
    ringBg:     'rgba(255,255,255,0.04)',
    ringBlur:   'blur(2px)',
    dotOpacity: 0,
    label:      '',
    mixBlend:   'normal',
  },
  button: {
    dotSize:    0,
    ringSize:   60,
    ringBorder: '1.5px solid rgba(255,255,255,0.7)',
    ringBg:     'rgba(255,255,255,0.06)',
    ringBlur:   'blur(3px)',
    dotOpacity: 0,
    label:      '',
    mixBlend:   'normal',
  },
  text: {
    dotSize:    2,
    ringSize:   3,
    ringBorder: 'none',
    ringBg:     'rgba(255,255,255,0.9)',
    ringBlur:   'none',
    dotOpacity: 0,
    label:      '',
    mixBlend:   'normal',
  },
  grab: {
    dotSize:    0,
    ringSize:   52,
    ringBorder: '1px dashed rgba(255,255,255,0.5)',
    ringBg:     'rgba(255,255,255,0.03)',
    ringBlur:   'blur(2px)',
    dotOpacity: 0,
    label:      'drag',
    mixBlend:   'normal',
  },
  zoom: {
    dotSize:    0,
    ringSize:   58,
    ringBorder: '1px solid rgba(255,255,255,0.5)',
    ringBg:     'rgba(255,255,255,0.05)',
    ringBlur:   'blur(2px)',
    dotOpacity: 0,
    label:      '+',
    mixBlend:   'normal',
  },
  disabled: {
    dotSize:    4,
    ringSize:   32,
    ringBorder: '1px solid rgba(255,255,255,0.12)',
    ringBg:     'transparent',
    ringBlur:   'none',
    dotOpacity: 0.3,
    label:      '',
    mixBlend:   'normal',
  },
};

function detectState(el: HTMLElement | null): CursorState {
  if (!el) return 'default';

  // Walk up to find meaningful interactive ancestor
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    const tag  = node.tagName.toLowerCase();
    const role = node.getAttribute('role') ?? '';
    const dis  = node.hasAttribute('disabled') || node.getAttribute('aria-disabled') === 'true';
    const drag = node.getAttribute('draggable') === 'true' || node.getAttribute('data-cursor') === 'grab';
    const zoom = node.getAttribute('data-cursor') === 'zoom';
    const style = window.getComputedStyle(node);

    if (dis) return 'disabled';
    if (zoom) return 'zoom';
    if (drag) return 'grab';

    if (tag === 'button' || role === 'button' || node.getAttribute('data-cursor') === 'button') return 'button';
    if (tag === 'a' && node.hasAttribute('href')) return 'link';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || node.getAttribute('contenteditable') === 'true') return 'text';

    if (style.cursor === 'grab' || style.cursor === 'grabbing') return 'grab';
    if (style.cursor === 'zoom-in' || style.cursor === 'zoom-out') return 'zoom';
    if (style.cursor === 'not-allowed') return 'disabled';
    if (style.cursor === 'pointer') return 'link';
    if (style.cursor === 'text' || style.cursor === 'vertical-text') return 'text';

    node = node.parentElement;
  }
  return 'default';
}

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  // Mutable state that doesn't need React re-renders
  const pos    = useRef({ tx: -300, ty: -300, rx: -300, ry: -300 });
  const state  = useRef<CursorState>('default');
  const down   = useRef(false);
  const hidden = useRef(false);
  const raf    = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const applyBurst = useCallback(() => {
    const b = burstRef.current;
    if (!b) return;
    b.style.left = `${pos.current.tx}px`;
    b.style.top  = `${pos.current.ty}px`;
    b.style.transform = 'translate(-50%, -50%) scale(0)';
    b.style.opacity = '0.5';
    b.style.transition = 'none';
    // Force reflow
    void b.offsetWidth;
    b.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease';
    b.style.transform = 'translate(-50%, -50%) scale(2.8)';
    b.style.opacity = '0';
  }, []);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const glow  = glowRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !glow || !label) return;

    const loop = () => {
      const { tx, ty } = pos.current;
      const lerpFactor = state.current === 'text' ? 0.25 : 0.09;
      pos.current.rx = lerp(pos.current.rx, tx, lerpFactor);
      pos.current.ry = lerp(pos.current.ry, ty, lerpFactor);
      const { rx, ry } = pos.current;

      const cfg = STATES[state.current];
      const s = down.current ? 0.88 : 1;

      // Dot
      const ds = cfg.dotSize;
      dot.style.width   = `${ds}px`;
      dot.style.height  = `${ds}px`;
      dot.style.opacity = hidden.current ? '0' : String(cfg.dotOpacity * (down.current ? 0.6 : 1));
      dot.style.transform = `translate(${tx - ds / 2}px, ${ty - ds / 2}px)`;
      dot.style.borderRadius = state.current === 'text' ? '1px' : '50%';
      dot.style.height = state.current === 'text' ? '18px' : `${ds}px`;

      // Ring
      const rs = cfg.ringSize;
      ring.style.width        = `${rs}px`;
      ring.style.height       = state.current === 'text' ? '24px' : `${rs}px`;
      ring.style.borderRadius = state.current === 'text' ? '3px' : '50%';
      ring.style.border       = cfg.ringBorder;
      ring.style.background   = cfg.ringBg;
      ring.style.backdropFilter = cfg.ringBlur;
      ring.style.opacity      = hidden.current ? '0' : String(down.current ? 0.75 : 1);
      ring.style.transform    = `translate(${rx - rs / 2}px, ${ry - (state.current === 'text' ? 12 : rs / 2)}px) scale(${s})`;

      // Glow
      const glowOpacity =
        state.current === 'button' ? 0.22 :
        state.current === 'link'   ? 0.14 :
        state.current === 'grab'   ? 0.10 :
        0.06;
      glow.style.transform = `translate(${rx - 50}px, ${ry - 50}px)`;
      glow.style.opacity   = hidden.current ? '0' : String(glowOpacity * (down.current ? 1.4 : 1));

      // Label
      label.textContent = cfg.label;
      label.style.opacity = cfg.label ? '1' : '0';

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      state.current = detectState(e.target as HTMLElement);
    };

    const onDown = (e: MouseEvent) => {
      down.current = true;
      if (e.button === 0) applyBurst();
    };
    const onUp = () => { down.current = false; };

    const onLeave = () => { hidden.current = true; };
    const onEnter = () => { hidden.current = false; };

    window.addEventListener('mousemove',   onMove,  { passive: true });
    window.addEventListener('mouseover',   onOver,  { passive: true });
    window.addEventListener('mousedown',   onDown,  { passive: true });
    window.addEventListener('mouseup',     onUp,    { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mouseover',   onOver);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [applyBurst]);

  const base: React.CSSProperties = {
    position:      'fixed',
    top:           0,
    left:          0,
    pointerEvents: 'none',
    willChange:    'transform',
    zIndex:        2147483647,
  };

  return (
    <>
      {/* Centre dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width:         5,
          height:        5,
          borderRadius:  '50%',
          background:    '#ffffff',
          boxShadow:     '0 0 8px rgba(255,255,255,0.85)',
          transform:     'translate(-300px,-300px)',
          transition:    'width 0.18s ease, height 0.18s ease, border-radius 0.18s ease, opacity 0.18s ease',
        }}
      />

      {/* Trailing ring — lerps behind cursor */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width:         36,
          height:        36,
          borderRadius:  '50%',
          border:        '1px solid rgba(255,255,255,0.28)',
          transform:     'translate(-300px,-300px)',
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          transition:    [
            'width 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            'height 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            'border-radius 0.25s ease',
            'border 0.2s ease',
            'background 0.2s ease',
            'backdrop-filter 0.2s ease',
            'opacity 0.2s ease',
          ].join(', '),
        }}
      >
        <span
          ref={labelRef}
          style={{
            color:        'rgba(255,255,255,0.75)',
            fontSize:     10,
            fontWeight:   700,
            letterSpacing:'0.12em',
            textTransform:'uppercase',
            fontFamily:   'monospace',
            userSelect:   'none',
            transition:   'opacity 0.15s ease',
            opacity:      0,
          }}
        />
      </div>

      {/* Soft radial glow — trails the ring */}
      <div
        ref={glowRef}
        style={{
          ...base,
          width:      100,
          height:     100,
          borderRadius:'50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 68%)',
          transform:  'translate(-300px,-300px)',
          transition: 'opacity 0.35s ease',
          opacity:    0.06,
        }}
      />

      {/* Click-burst ripple */}
      <div
        ref={burstRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         44,
          height:        44,
          borderRadius:  '50%',
          border:        '1px solid rgba(255,255,255,0.45)',
          pointerEvents: 'none',
          zIndex:        2147483646,
          transform:     'translate(-50%,-50%) scale(0)',
          opacity:       0,
        }}
      />
    </>
  );
}
