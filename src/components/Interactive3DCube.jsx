import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Interactive3DCube({ accent = '#38bdf8' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Inner Glowing Cube
    const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accent),
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
      wireframeLinewidth: 1.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Core sphere
    const sphereGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.8,
    });
    const core = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(core);

    // Outer Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(1.4, 0.03, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring1);
    scene.add(ring2);

    const light = new THREE.PointLight(0xffffff, 3, 20);
    light.position.set(4, 4, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      cube.rotation.x = t * 0.4;
      cube.rotation.y = t * 0.6;

      ring1.rotation.x = t * 0.5;
      ring1.rotation.y = t * 0.3;

      ring2.rotation.y = -t * 0.4;
      ring2.rotation.z = t * 0.5;

      const pulse = 1 + Math.sin(t * 3) * 0.1;
      core.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accent]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: '220px' }} />;
}
