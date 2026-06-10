import React from 'react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="10" fill="currentColor" />
      
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * (360 / 12) - 90) * (Math.PI / 180);
        const armLength = 28;
        
        const startR = 15;
        const endR = startR + armLength;
        
        const startX = 50 + Math.cos(angle) * startR;
        const startY = 50 + Math.sin(angle) * startR;
        
        const endX = 50 + Math.cos(angle) * endR;
        const endY = 50 + Math.sin(angle) * endR;
        
        // Organic wavy path using two control points (Cubic Bezier)
        const perpRad = angle + Math.PI / 2;
        const cp1Dist = startR + armLength * 0.33;
        const cp2Dist = startR + armLength * 0.66;
        
        // Wavy offsets
        const cp1X = 50 + Math.cos(angle) * cp1Dist + Math.cos(perpRad) * -6;
        const cp1Y = 50 + Math.sin(angle) * cp1Dist + Math.sin(perpRad) * -6;
        
        const cp2X = 50 + Math.cos(angle) * cp2Dist + Math.cos(perpRad) * 6;
        const cp2Y = 50 + Math.sin(angle) * cp2Dist + Math.sin(perpRad) * 6;

        return (
          <g key={i}>
            <path 
              d={`M ${startX} ${startY} C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${endX} ${endY}`} 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              fill="none"
            />
            <circle cx={endX} cy={endY} r="4.5" fill="currentColor" />
          </g>
        )
      })}
    </svg>
  );
}
