import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeOceanCanvasProps {
  themeMode?: 'dark' | 'abyss' | 'light';
}

export const ThreeOceanCanvas: React.FC<ThreeOceanCanvasProps> = ({ themeMode = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion and mobile performance constraints
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 50;

    // Background fog color based on theme
    const fogColor =
      themeMode === 'abyss'
        ? new THREE.Color(0x01040a)
        : themeMode === 'light'
        ? new THREE.Color(0x0a223d)
        : new THREE.Color(0x030d1e);

    scene.fog = new THREE.FogExp2(fogColor, isMobile ? 0.02 : 0.015);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable antialiasing on mobile for instant 60fps
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(fogColor, 0.95);
    container.appendChild(renderer.domElement);

    // 1. Bioluminescent Marine Plankton / Floating Particles (Optimized count for mobile & PC)
    const particleCount = prefersReducedMotion ? 60 : isMobile ? 120 : 320;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // cyan
      new THREE.Color(0x0ea5e9), // sky blue
      new THREE.Color(0x2dd4bf), // turquoise
      new THREE.Color(0x818cf8)  // indigo
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      scales[i] = Math.random() * 2.0 + 0.8;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
      grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.2)');
      grad.addColorStop(1, 'rgba(3, 105, 161, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 1.4 : 1.8,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Sunlight God-Rays / Caustic Light Beams (Only on desktop for max mobile battery savings)
    const rayGroup = new THREE.Group();
    if (!isMobile) {
      const rayCount = 5;
      for (let i = 0; i < rayCount; i++) {
        const rayGeo = new THREE.CylinderGeometry(0.5, 14 + i * 2, 90, 12, 1, true);
        const rayMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.03 + (i % 3) * 0.012,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const ray = new THREE.Mesh(rayGeo, rayMat);
        ray.position.set((i - rayCount / 2) * 22, 28, -20 - i * 5);
        ray.rotation.z = (Math.PI / 180) * (-15 + i * 4);
        ray.rotation.x = (Math.PI / 180) * 12;
        rayGroup.add(ray);
      }
      scene.add(rayGroup);
    }

    // 3. Subtle distant creature silhouettes
    const mantaShape = new THREE.Shape();
    mantaShape.moveTo(0, 0);
    mantaShape.bezierCurveTo(4, 2, 8, 3, 12, 1);
    mantaShape.bezierCurveTo(8, -1, 3, -2, 0, -5);
    mantaShape.bezierCurveTo(-3, -2, -8, -1, -12, 1);
    mantaShape.bezierCurveTo(-8, 3, -4, 2, 0, 0);

    const mantaGeo = new THREE.ShapeGeometry(mantaShape);
    const mantaMat = new THREE.MeshBasicMaterial({
      color: 0x072445,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });

    const creature1 = new THREE.Mesh(mantaGeo, mantaMat);
    creature1.position.set(-45, 10, -35);
    creature1.rotation.x = Math.PI * 0.35;
    creature1.scale.set(0.6, 0.6, 0.6);
    scene.add(creature1);

    // Mouse & Touch Interaction
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 6;
      mouseRef.current.targetY = normY * 5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouseRef.current.targetX = normX * 4;
        mouseRef.current.targetY = normY * 3;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Window resize handler with debounce
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Visibility change handler (pause when tab hidden to save CPU/battery)
    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip frame processing if tab is hidden
      if (!isTabActive) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      camera.position.x = mouseRef.current.x;
      camera.position.y = mouseRef.current.y;
      camera.lookAt(0, 0, 0);

      // Animate floating particles
      if (!prefersReducedMotion) {
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          array[i * 3 + 1] += 0.035 + (i % 3) * 0.012;
          array[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.015;

          if (array[i * 3 + 1] > 60) {
            array[i * 3 + 1] = -60;
          }
        }
        posAttr.needsUpdate = true;

        if (!isMobile) {
          rayGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.04;
        }

        creature1.position.x += 0.04;
        creature1.position.y += Math.sin(elapsedTime * 0.7) * 0.015;
        if (creature1.position.x > 65) creature1.position.x = -65;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      mantaGeo.dispose();
      mantaMat.dispose();
      renderer.dispose();
    };
  }, [themeMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
