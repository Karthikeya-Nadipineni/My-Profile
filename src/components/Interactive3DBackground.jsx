import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Interactive3DBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Deep Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020603, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // Renderer — antialias off for background (invisible difference, big perf gain)
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Cap at 1.5 — anything higher is imperceptible for background geometry
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.powerPreference = 'high-performance';
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL not supported for background canvas:", err);
      return;
    }

    const backgroundAssetsGroup = new THREE.Group();
    scene.add(backgroundAssetsGroup);

    // Helpers to create glowing text/tech label sprite planes
    const createTechSprite = (text, subtitle = '') => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      // Rounded cyber box
      ctx.fillStyle = 'rgba(2, 14, 6, 0.85)';
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.5)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 224, 24);
      ctx.fill();
      ctx.stroke();

      // Top corner decoration
      ctx.fillStyle = '#00ff66';
      ctx.fillRect(32, 32, 12, 12);

      // Main Text
      ctx.font = 'bold 54px monospace';
      ctx.fillStyle = '#00ff66';
      ctx.shadowColor = '#00ff66';
      ctx.shadowBlur = 18;
      ctx.fillText(text, 58, 95);

      // Subtitle
      if (subtitle) {
        ctx.font = '30px monospace';
        ctx.fillStyle = '#86efac';
        ctx.shadowBlur = 6;
        ctx.fillText(subtitle, 36, 160);
      }

      // Tech ID tag
      ctx.font = '22px monospace';
      ctx.fillStyle = '#39ff14';
      ctx.fillText('[ONLINE // SYNCED]', 36, 205);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true, 
        opacity: 0.55,
        blending: THREE.AdditiveBlending 
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(4.8, 2.4, 1);
      return sprite;
    };

    // 1. DOCKER CONTAINER POD (3D Wireframe Container Rack)
    const createDockerPod = () => {
      const group = new THREE.Group();
      
      const boxGeo = new THREE.BoxGeometry(3.6, 2.2, 2.2);
      const wireGeo = new THREE.WireframeGeometry(boxGeo);
      const lineMat = new THREE.LineBasicMaterial({ 
        color: 0x00ff66, 
        transparent: true, 
        opacity: 0.45 
      });
      const boxLine = new THREE.LineSegments(wireGeo, lineMat);
      group.add(boxLine);

      // Inner server module
      const innerGeo = new THREE.BoxGeometry(3.2, 1.8, 1.8);
      const innerMat = new THREE.MeshBasicMaterial({ 
        color: 0x032810, 
        transparent: true, 
        opacity: 0.35 
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      const label = createTechSprite('DOCKER', 'Container Engine');
      label.position.set(0, 2.2, 0);
      group.add(label);

      return group;
    };

    // 2. KUBERNETES ORCHESTRATION CLUSTER (Geometric Heptagonal Mesh)
    const createK8sCluster = () => {
      const group = new THREE.Group();

      const geo = new THREE.CylinderGeometry(2.2, 2.2, 0.4, 7);
      const wire = new THREE.WireframeGeometry(geo);
      const mat = new THREE.LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.45 });
      const helm = new THREE.LineSegments(wire, mat);
      group.add(helm);

      const ringGeo = new THREE.RingGeometry(2.6, 2.65, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      const label = createTechSprite('K8S', 'Cluster Orchestrator');
      label.position.set(0, 2.4, 0);
      group.add(label);

      return group;
    };

    // 3. PYTHON AUTOMATION & SCRAPING ENGINE (Dual Intertwined Helix)
    const createPythonEngine = () => {
      const group = new THREE.Group();

      // Double Torus / Infinity Shape
      const torGeo1 = new THREE.TorusGeometry(1.6, 0.08, 16, 48);
      const torMat1 = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.45 });
      const torus1 = new THREE.Mesh(torGeo1, torMat1);
      torus1.position.x = -1.1;
      group.add(torus1);

      const torGeo2 = new THREE.TorusGeometry(1.6, 0.08, 16, 48);
      const torMat2 = new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.45 });
      const torus2 = new THREE.Mesh(torGeo2, torMat2);
      torus2.position.x = 1.1;
      group.add(torus2);

      const label = createTechSprite('PYTHON', 'Scraping & Automation');
      label.position.set(0, 2.2, 0);
      group.add(label);

      return group;
    };

    // 4. CI/CD AUTOMATION PIPELINE (Jenkins & Deployment Nodes)
    const createPipelineNode = () => {
      const group = new THREE.Group();

      const curve = new THREE.CylinderGeometry(0.15, 0.15, 4.5, 12);
      const pipeMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.35 });
      const pipe = new THREE.Mesh(curve, pipeMat);
      pipe.rotation.z = Math.PI / 2;
      group.add(pipe);

      // Pulse nodes on pipeline
      for (let i = -1.8; i <= 1.8; i += 1.2) {
        const sphereGeo = new THREE.OctahedronGeometry(0.4);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true, transparent: true, opacity: 0.5 });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.x = i;
        group.add(sphere);
      }

      const label = createTechSprite('CI / CD', 'Jenkins & Chef Infra');
      label.position.set(0, 2.0, 0);
      group.add(label);

      return group;
    };

    // Position tech skill assets deep in background (away from foreground text)
    const dockerPod = createDockerPod();
    dockerPod.position.set(-16, 8, -14);
    backgroundAssetsGroup.add(dockerPod);

    const k8sCluster = createK8sCluster();
    k8sCluster.position.set(16, -9, -15);
    backgroundAssetsGroup.add(k8sCluster);

    const pythonEngine = createPythonEngine();
    pythonEngine.position.set(-15, -10, -16);
    backgroundAssetsGroup.add(pythonEngine);

    const pipelineNode = createPipelineNode();
    pipelineNode.position.set(15, 9, -14);
    backgroundAssetsGroup.add(pipelineNode);

    // Subtle Interconnected Cyber Network Lines linking the tools
    const lineMat = new THREE.LineDashedMaterial({
      color: 0x00ff66,
      dashSize: 0.6,
      gapSize: 0.4,
      transparent: true,
      opacity: 0.18,
    });

    const netPoints = [
      new THREE.Vector3(-16, 8, -14),
      new THREE.Vector3(15, 9, -14),
      new THREE.Vector3(16, -9, -15),
      new THREE.Vector3(-15, -10, -16),
      new THREE.Vector3(-16, 8, -14),
    ];
    const netGeo = new THREE.BufferGeometry().setFromPoints(netPoints);
    const netLines = new THREE.Line(netGeo, lineMat);
    netLines.computeLineDistances();
    backgroundAssetsGroup.add(netLines);

    // Deep Matrix Data Particles
    // Reduced from 3000 → 1500 particles for better perf
    const particleCount = 1500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00ff66);
    const c2 = new THREE.Color(0x39ff14);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 65;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 55;
      particlePositions[idx + 2] = -12 + (Math.random() - 0.5) * 20; // Deep in background

      const mixedColor = c1.clone().lerp(c2, Math.random());
      particleColors[idx] = mixedColor.r;
      particleColors[idx + 1] = mixedColor.g;
      particleColors[idx + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const greenLight1 = new THREE.PointLight(0x00ff66, 4, 80);
    greenLight1.position.set(-15, 12, 10);
    scene.add(greenLight1);

    const greenLight2 = new THREE.PointLight(0x39ff14, 4, 80);
    greenLight2.position.set(15, -12, 10);
    scene.add(greenLight2);

    // Mouse Tracking & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Page visibility — pause rendering when tab is hidden
    let isVisible = true;
    const handleVisibility = () => { isVisible = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation Loop — throttled to ~50fps with delta check
    let lastTime = 0;
    let animId;
    const clock = new THREE.Clock();

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      // Skip if frame came too fast (throttle to ~50fps)
      if (now - lastTime < 18) return;
      lastTime = now;

      const t = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      // Gentle floating animation of the technical skill assets
      dockerPod.rotation.y = t * 0.2;
      dockerPod.position.y = 8 + Math.sin(t * 1.2) * 0.4;

      k8sCluster.rotation.z = t * 0.25;
      k8sCluster.position.y = -9 + Math.cos(t * 1.4) * 0.4;

      pythonEngine.rotation.y = t * 0.3;
      pythonEngine.rotation.x = Math.sin(t * 0.8) * 0.2;
      pythonEngine.position.y = -10 + Math.sin(t * 1.5) * 0.4;

      pipelineNode.rotation.y = t * 0.15;
      pipelineNode.position.y = 9 + Math.cos(t * 1.1) * 0.4;

      // Subtle parallax camera motion
      backgroundAssetsGroup.rotation.y = targetX * 0.15;
      backgroundAssetsGroup.rotation.x = -targetY * 0.12;

      particles.rotation.y = t * 0.01;

      const scrollOffset = scrollY * 0.006;
      camera.position.y = -scrollOffset * 1.2;

      if (renderer) renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
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
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
