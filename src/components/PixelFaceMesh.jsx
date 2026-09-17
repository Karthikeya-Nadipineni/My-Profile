import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function PixelFaceMesh() {
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 7.6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported for PixelFaceMesh:", err);
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = '/profile.jpg?v=' + Date.now();

    let particlesMesh = null;
    let animId = null;
    let clock = new THREE.Clock();

    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    img.onload = () => {
      // Ultra-clean high fidelity 110x110 grid = 12,100 true-color points
      const sampleSize = 110;
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleSize;
      offscreen.height = sampleSize;
      const ctx = offscreen.getContext('2d');
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;

      const positions = [];
      const colors = [];

      const gridSpan = 4.8;

      for (let y = 0; y < sampleSize; y++) {
        for (let x = 0; x < sampleSize; x++) {
          const index = (y * sampleSize + x) * 4;
          const r = imgData[index] / 255;
          const g = imgData[index + 1] / 255;
          const b = imgData[index + 2] / 255;
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

          // Center coordinate mapping
          const posX = (x / sampleSize - 0.5) * gridSpan;
          const posY = -(y / sampleSize - 0.5) * gridSpan;

          // Circular portrait boundary
          const distFromCenter = Math.sqrt(posX * posX + posY * posY);
          if (distFromCenter > 2.35) {
            continue; // Clean circular mask
          }

          // NATURAL subtle curvature across the entire face
          // Spherical dome curve + gentle organic relief for perfect 3D depth
          const domeZ = Math.sqrt(Math.max(0, 6.0 - distFromCenter * distFromCenter * 0.9)) - 2.45;
          const naturalRelief = (1 - brightness) * 0.22;
          const posZ = domeZ + naturalRelief;

          positions.push(posX, posY, posZ);

          // TRUE-TO-LIFE PIXEL COLORING:
          // Natural skin, hair, eyes, and clothing colors with the signature cyber-matrix glow
          const cyberTint = 0.18; // 18% matrix green tint, 82% natural portrait tone
          const finalR = r * (1 - cyberTint) + 0.05 * cyberTint;
          const finalG = g * (1 - cyberTint) + 1.0 * cyberTint;
          const finalB = b * (1 - cyberTint) + 0.4 * cyberTint;

          // Brighten face features slightly for high-tech holographic clarity
          const boost = 1.12;
          colors.push(
            Math.min(1.0, finalR * boost),
            Math.min(1.0, finalG * boost),
            Math.min(1.0, finalB * boost)
          );
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

      // Crisp point cloud material
      const material = new THREE.PointsMaterial({
        size: 0.056,
        vertexColors: true,
        transparent: true,
        opacity: 0.98,
        blending: THREE.NormalBlending,
      });

      particlesMesh = new THREE.Points(geometry, material);
      group.add(particlesMesh);

      // Sleek Cyber Ring border
      const ringGeo = new THREE.RingGeometry(2.35, 2.38, 64);
      const ringMat = new THREE.MeshBasicMaterial({ 
        color: 0x00ff66, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.7 
      });
      const boundaryRing = new THREE.Mesh(ringGeo, ringMat);
      boundaryRing.position.z = 0.02;
      group.add(boundaryRing);
    };

    // Smooth Cursor Movement
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const nx = (x / rect.width) * 2 - 1;
      const ny = -(y / rect.height) * 2 + 1;

      mouseX = nx;
      mouseY = ny;

      targetRotY = nx * 0.4;
      targetRotX = -ny * 0.3;
    };

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => {
      setHovered(false);
      mouseX = 0;
      mouseY = 0;
      targetRotY = 0;
      targetRotX = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth 3D tilt tracking cursor
      group.rotation.y += (targetRotY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.08;

      // Subtle breathing pulse
      if (particlesMesh) {
        const breath = 1.0 + Math.sin(t * 2) * 0.008;
        particlesMesh.scale.set(breath, breath, breath);
      }

      if (renderer) renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '330px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          cursor: 'pointer',
          position: 'relative',
          zIndex: 2
        }} 
      />
    </div>
  );
}
