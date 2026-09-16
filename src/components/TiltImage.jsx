import React, { useRef, useCallback } from 'react';

export default function TiltImage() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize to -1 to 1
      const nx = (x / rect.width) * 2 - 1;
      const ny = (y / rect.height) * 2 - 1;

      // Subtle tilt — max 8 degrees
      const rotateY = nx * 8;
      const rotateX = -ny * 6;

      // Subtle highlight shift
      const highlightX = 50 + nx * 15;
      const highlightY = 50 + ny * 15;

      img.style.transform = `perspective(600px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
      img.style.backgroundImage = `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(0,255,102,0.06) 0%, transparent 60%)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    img.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    img.style.backgroundImage = 'none';
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.25rem',
        cursor: 'default',
      }}
    >
      <div
        ref={imgRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          aspectRatio: '1',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
          boxShadow: '0 4px 30px rgba(0,255,102,0.08), 0 0 0 1px rgba(0,255,102,0.1)',
        }}
      >
        <img
          src="/profile.jpg"
          alt="Karthikeya Nadipineni"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '0.75rem',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />
        {/* Subtle green scanline overlay for hacker aesthetic */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.75rem',
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,102,0.015) 2px, rgba(0,255,102,0.015) 4px)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom vignette fade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.75rem',
            background: 'linear-gradient(to top, rgba(10,12,15,0.4) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
