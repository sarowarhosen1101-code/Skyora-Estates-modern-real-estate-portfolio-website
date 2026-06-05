/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Maximize2, Orbit, RotateCcw, Compass, CheckCircle2 } from 'lucide-react';

export default function ThreeDShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<'blueprint' | 'thermal' | 'solid'>('blueprint');
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.003);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState({ rx: '0.00°', ry: '0.00°', zoom: '1.00x' });
  const [diagnosticMsg, setDiagnosticMsg] = useState('Engine initialization complete');

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = containerRef.current.clientHeight || 500;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090a0f, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 4, 8);
    camera.lookAt(0, 0.5, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xd4af37, 2.5); // Warm gold light
    dirLight1.position.set(5, 10, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 2); // Cyan accent light
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xf59e0b, 1.5, 10); // Center core light
    pointLight.position.set(0, 1, 0);
    scene.add(pointLight);

    // GEOMETRIES FOR ARCHITECTURAL HOUSE MODEL
    const blueprintGroup = new THREE.Group();
    scene.add(blueprintGroup);

    // 1. Concrete Slabs (Gold / Teal translucent luxury slabs)
    const slabGeo1 = new THREE.BoxGeometry(3, 0.15, 3);
    const slabGeo2 = new THREE.BoxGeometry(2.5, 0.12, 2.5);
    const slabGeo3 = new THREE.BoxGeometry(2, 0.1, 2);

    const getSlabMaterial = (mode: string, color: number) => {
      if (mode === 'blueprint') {
        return new THREE.MeshPhongMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.2,
          transparent: true,
          opacity: 0.35,
          wireframe: false,
          shininess: 90,
        });
      } else if (mode === 'thermal') {
        return new THREE.MeshBasicMaterial({
          color: 0xff3300,
          transparent: true,
          opacity: 0.4,
          wireframe: true,
        });
      } else {
        return new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.1,
          metalness: 0.9,
          transparent: true,
          opacity: 0.9,
        });
      }
    };

    const slabMesh1 = new THREE.Mesh(slabGeo1, getSlabMaterial(activeMode, 0x1e293b));
    slabMesh1.position.y = 0;
    blueprintGroup.add(slabMesh1);

    const slabMesh2 = new THREE.Mesh(slabGeo2, getSlabMaterial(activeMode, 0x1e293b));
    slabMesh2.position.y = 1.1;
    blueprintGroup.add(slabMesh2);

    const slabMesh3 = new THREE.Mesh(slabGeo3, getSlabMaterial(activeMode, 0xd4af37));
    slabMesh3.position.y = 2.0;
    blueprintGroup.add(slabMesh3);

    // 2. Wireframe / Blueprint Skeleton (Cyan/Gold outlining vectors)
    const addWireframeBox = (widthArr: [number, number, number], posArr: [number, number, number], color: number) => {
      const geo = new THREE.BoxGeometry(...widthArr);
      const wireframe = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 1.5,
        transparent: true,
        opacity: activeMode === 'thermal' ? 0.8 : 0.6,
      });
      const lines = new THREE.LineSegments(wireframe, lineMat);
      lines.position.set(...posArr);
      blueprintGroup.add(lines);
      return lines;
    };

    // Ground outline
    const baseWire = addWireframeBox([3, 0.15, 3], [0, 0, 0], 0x06b6d4);
    // Upper level outline
    const upperWire = addWireframeBox([2.5, 0.12, 2.5], [0, 1.1, 0], 0xf59e0b);
    // Roof outline
    const roofWire = addWireframeBox([2, 0.1, 2], [0, 2, 0], 0x06b6d4);

    // 3. Columns & Support Struts
    const colGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8);
    const colMat = new THREE.MeshPhongMaterial({
      color: activeMode === 'blueprint' ? 0x06b6d4 : activeMode === 'thermal' ? 0xffea00 : 0xd4af37,
      emissive: activeMode === 'blueprint' ? 0x06b6d4 : 0x000000,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.7,
    });

    const colPositions: [number, number][] = [
      [-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3],
      [-1.0, -1.0], [1.0, -1.0], [-1.0, 1.0], [1.0, 1.0]
    ];

    colPositions.forEach(([x, z], i) => {
      const col = new THREE.Mesh(colGeo, colMat);
      if (i < 4) {
        col.position.set(x, 0.55, z);
        blueprintGroup.add(col);
      } else {
        const colUpper = new THREE.Mesh(colGeo, colMat);
        colUpper.scale.y = 0.8;
        colUpper.position.set(x * 0.9, 1.5, z * 0.9);
        blueprintGroup.add(colUpper);
      }
    });

    // 4. Glass Architectural Pavilions (Modern overlapping glass planes)
    let glassMat = new THREE.MeshPhysicalMaterial({
      color: activeMode === 'thermal' ? 0x0000ff : 0x06b6d4,
      transparent: true,
      opacity: activeMode === 'blueprint' ? 0.15 : activeMode === 'thermal' ? 0.3 : 0.4,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      thickness: 1.5,
      side: THREE.DoubleSide,
    });

    const pavilionGeo1 = new THREE.BoxGeometry(1.4, 0.9, 1.8);
    const pavilionMesh1 = new THREE.Mesh(pavilionGeo1, glassMat);
    pavilionMesh1.position.set(0.4, 0.55, -0.2);
    blueprintGroup.add(pavilionMesh1);

    const pavilionGeo2 = new THREE.BoxGeometry(1.6, 0.7, 1.2);
    const pavilionMesh2 = new THREE.Mesh(pavilionGeo2, glassMat);
    pavilionMesh2.position.set(-0.5, 1.5, 0.3);
    blueprintGroup.add(pavilionMesh2);

    // 5. Ambient Coordinate Grid Map (Floating HUD vectors)
    const gridHelper = new THREE.GridHelper(12, 24, 0x06b6d4, 0x1f2937);
    gridHelper.position.y = -0.5;
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    scene.add(gridHelper);

    // 6. Ambient Smart Dust particles
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xd4af37);
    const colorTeal = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = Math.random() * 4 - 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;

      // Mix particle colors between gold and cyan
      const mixedColor = new THREE.Color().lerpColors(colorGold, colorTeal, Math.random());
      particleColors[i] = mixedColor.r;
      particleColors[i + 1] = mixedColor.g;
      particleColors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // MOUSE PARALLAX & TACTILE DRAG SYSTEM
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let currentRotation = { y: 0, x: 0 };

    const handleMouseDown = () => {
      isDragging = true;
      setDiagnosticMsg('User manual rotation initiated');
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        currentRotation.y += deltaX * 0.005;
        currentRotation.x += deltaY * 0.005;

        blueprintGroup.rotation.y = currentRotation.y;
        blueprintGroup.rotation.x = THREE.MathUtils.clamp(currentRotation.x, -Math.PI / 6, Math.PI / 4);
      } else {
        // Soft hover tracking parallax (subtle camera float)
        const normX = (mouseX / width) * 2 - 1;
        const normY = -(mouseY / height) * 2 + 1;
        camera.position.x = 5 + normX * 0.5;
        camera.position.y = 4 + normY * 0.4;
        camera.lookAt(0, 0.5, 0);
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // ANIMATE LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Static rotate if user not dragging
      if (!isDragging && isRotating) {
        blueprintGroup.rotation.y += rotationSpeed;
        // Natural floating breathing movement
        blueprintGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08 + 0.1;
      }

      // Animating the particles (soft drift)
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.0005;
        if (positions[i + 1] > 3.5) positions[i + 1] = -0.5;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Telemetry telemetry indicators
      setTelemetry({
        rx: `${(blueprintGroup.rotation.x * (180 / Math.PI)).toFixed(1)}°`,
        ry: `${(blueprintGroup.rotation.y * (180 / Math.PI) % 360).toFixed(1)}°`,
        zoom: `${(1 / camera.position.distanceTo(blueprintGroup.position) * 10).toFixed(2)}x`
      });

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: w, height: h } = entries[0].contentRect;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(containerRef.current);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, [activeMode, isRotating, rotationSpeed]);

  const handleScanAnimation = () => {
    setDiagnosticMsg('Performing thermal sensor sweep...');
    setActiveMode('thermal');
    setTimeout(() => {
      setActiveMode('blueprint');
      setDiagnosticMsg('Thermal sweep complete. Blueprint restabilized.');
    }, 3800);
  };

  const handleExplodeVisualization = () => {
    setDiagnosticMsg('Initiating structural explode animation...');
    setRotationSpeed(0.015);
    setTimeout(() => {
      setRotationSpeed(0.003);
      setDiagnosticMsg('Exploded structural inspection complete.');
    }, 4000);
  };

  return (
    <div className="relative w-full h-full bg-slate-950/40 rounded-3xl border border-slate-800/60 backdrop-blur-md overflow-hidden flex flex-col justify-between p-6">
      {/* Decorative Blueprint Corner Tabs */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/60 rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/60 rounded-br-xl"></div>

      {/* Top Telemetry Header Layer */}
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-cyan-400 font-semibold block mb-0.5">
            [ SEC_A_RENDER_ENGINE_v4.20 ]
          </span>
          <h3 className="font-sans font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            Core Architecture HUD
          </h3>
          <p className="font-mono text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {diagnosticMsg}
          </p>
        </div>

        {/* HUD Rendering Presets */}
        <div className="flex gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-800/60">
          {(['blueprint', 'thermal', 'solid'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActiveMode(mode);
                setDiagnosticMsg(`Rendering viewport updated to: ${mode.toUpperCase()}`);
              }}
              className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-all duration-300 capitalize ${
                activeMode === mode
                  ? 'bg-gradient-to-r from-cyan-500/20 to-amber-500/25 border border-cyan-500/50 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Active Interactive Rendering Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />
      </div>

      {/* Floating Spatial HUD Readouts */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800/40 backdrop-blur-lg font-mono text-[10px] text-slate-300 z-10">
        <div>
          <span className="text-slate-500 block">ROT_X:</span>
          <span className="text-cyan-400 font-bold">{telemetry.rx}</span>
        </div>
        <div>
          <span className="text-slate-500 block">ROT_Y:</span>
          <span className="text-cyan-400 font-bold">{telemetry.ry}</span>
        </div>
        <div>
          <span className="text-slate-500 block">CAM_Z:</span>
          <span className="text-amber-500 font-bold">{telemetry.zoom}</span>
        </div>
        <div className="border-t border-slate-800/60 pt-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[9px] text-emerald-400">FPS: 60.00</span>
        </div>
      </div>

      {/* Bottom Architectural HUD Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center sm:items-stretch md:items-center gap-3 mt-auto pt-4 border-t border-slate-900/50 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsRotating(!isRotating);
              setDiagnosticMsg(isRotating ? 'Orbital motor suspended' : 'Orbital motor engaged');
            }}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            title={isRotating ? 'Suspended Automatic Spin' : 'Resume Automatic Spin'}
          >
            {isRotating ? <RotateCcw className="w-4 h-4" /> : <Orbit className="w-4 h-4 animate-spin-slow" />}
          </button>

          <button
            onClick={handleScanAnimation}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-800/50 hover:bg-cyan-950/50 hover:border-cyan-500 text-cyan-400 text-xs font-mono tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            Sensor Scan
          </button>

          <button
            onClick={handleExplodeVisualization}
            className="px-3 py-1.5 rounded-lg bg-amber-950/30 border border-amber-800/50 hover:bg-amber-950/50 hover:border-gold text-amber-400 text-xs font-mono tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Deconstruct
          </button>
        </div>

        <span className="text-[10px] font-mono text-slate-500 tracking-wider">
          TACTILE DRAG TO SWIVEL ORIENTATION
        </span>
      </div>
    </div>
  );
}
