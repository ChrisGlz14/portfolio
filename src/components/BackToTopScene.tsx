"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UpButtonInteraction {
  hovered: boolean;
  x: number;
  y: number;
  launchTime: number;
}

interface BackToTopSceneProps {
  active: boolean;
  theme: "light" | "dark";
  interaction: RefObject<UpButtonInteraction>;
}

/** A decorative gyroscope; the parent button owns scrolling and accessibility. */
export default function BackToTopScene({ active, theme, interaction }: BackToTopSceneProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(active);
  const syncActivityRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  activeRef.current = active;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destroyed = false;
    let loading = false;
    let initialized = false;
    let failed = false;
    let setRunning = (_running: boolean) => {};
    let disposeScene = () => {};
    setReady(false);

    const canAnimate = () => activeRef.current && !document.hidden && !motionPreference.matches;

    const initialize = async () => {
      if (destroyed || loading || initialized || failed || !canAnimate()) return;
      loading = true;
      const cleanup: Array<() => void> = [];

      try {
        const THREE = await import("three");
        if (destroyed || !canAnimate()) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        cleanup.push(() => {
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = theme === "dark" ? 1.35 : 1.15;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
        camera.position.z = 8;
        const gyroscope = new THREE.Group();
        scene.add(gyroscope);

        scene.add(new THREE.HemisphereLight(0xffefd8, 0x3b1266, 2.7));
        const keyLight = new THREE.DirectionalLight(0xffe6be, 5);
        keyLight.position.set(-3, 4, 5);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0xb599ff, 4.5);
        rimLight.position.set(3, -1, 3);
        scene.add(rimLight);

        const materials: InstanceType<typeof THREE.Material>[] = [];
        const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
        cleanup.push(
          () => materials.forEach((material) => material.dispose()),
          () => geometries.forEach((geometry) => geometry.dispose()),
        );

        const coreGeometry = new THREE.IcosahedronGeometry(0.78, 0);
        const coreMaterial = new THREE.MeshStandardMaterial({
          color: theme === "dark" ? 0x4e207c : 0x532483,
          emissive: 0x5821a8,
          emissiveIntensity: 0.35,
          metalness: 0.55,
          roughness: 0.28,
          flatShading: true,
        });
        geometries.push(coreGeometry);
        materials.push(coreMaterial);
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.rotation.set(0.3, 0.2, 0.15);
        gyroscope.add(core);

        // Extrusion and bevels let the upward arrow catch the warm and purple lights.
        const arrowShape = new THREE.Shape();
        arrowShape.moveTo(0, 0.78);
        arrowShape.lineTo(0.59, 0.15);
        arrowShape.lineTo(0.24, 0.15);
        arrowShape.lineTo(0.24, -0.65);
        arrowShape.lineTo(-0.24, -0.65);
        arrowShape.lineTo(-0.24, 0.15);
        arrowShape.lineTo(-0.59, 0.15);
        arrowShape.closePath();
        const arrowGeometry = new THREE.ExtrudeGeometry(arrowShape, {
          depth: 0.18,
          bevelEnabled: true,
          bevelSegments: 3,
          steps: 1,
          bevelSize: 0.065,
          bevelThickness: 0.055,
          curveSegments: 8,
        });
        arrowGeometry.center();
        const arrowMaterial = new THREE.MeshStandardMaterial({
          color: 0xffe5ac,
          emissive: 0xff8c26,
          emissiveIntensity: 0.28,
          metalness: 0.32,
          roughness: 0.22,
        });
        geometries.push(arrowGeometry);
        materials.push(arrowMaterial);
        const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
        arrow.position.z = 1.15;
        arrow.rotation.y = -0.12;
        gyroscope.add(arrow);

        const ringColors = [0xfb923c, 0xa855f7, 0xffcf70];
        const rings = ringColors.map((color, index) => {
          const pivot = new THREE.Group();
          const geometry = new THREE.TorusGeometry(1.24 + index * 0.19, index === 1 ? 0.045 : 0.035, 8, 80);
          const material = new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: index === 1 ? 0.75 : 0.5,
            metalness: 0.6,
            roughness: 0.24,
          });
          geometries.push(geometry);
          materials.push(material);
          pivot.add(new THREE.Mesh(geometry, material));
          gyroscope.add(pivot);
          return pivot;
        });

        const satelliteGeometry = new THREE.SphereGeometry(0.085, 12, 8);
        geometries.push(satelliteGeometry);
        rings.forEach((ring, index) => {
          const material = new THREE.MeshStandardMaterial({
            color: 0xfff4d8,
            emissive: ringColors[index],
            emissiveIntensity: 1.5,
            metalness: 0.2,
            roughness: 0.2,
          });
          materials.push(material);
          const satellite = new THREE.Mesh(satelliteGeometry, material);
          const angle = index * 2.1;
          const radius = 1.24 + index * 0.19;
          satellite.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
          ring.add(satellite);
        });

        // A tiny procedural texture gives the core a soft halo without post-processing.
        const glowCanvas = document.createElement("canvas");
        glowCanvas.width = glowCanvas.height = 64;
        const context = glowCanvas.getContext("2d");
        let glow: InstanceType<typeof THREE.Sprite> | undefined;
        if (context) {
          const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
          gradient.addColorStop(0, "rgba(255,255,255,0.7)");
          gradient.addColorStop(0.35, "rgba(255,255,255,0.35)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          context.fillStyle = gradient;
          context.fillRect(0, 0, 64, 64);
          const glowTexture = new THREE.CanvasTexture(glowCanvas);
          cleanup.push(() => glowTexture.dispose());
          const glowMaterial = new THREE.SpriteMaterial({
            map: glowTexture,
            color: theme === "dark" ? 0xa855f7 : 0x7c3aed,
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
          });
          materials.push(glowMaterial);
          glow = new THREE.Sprite(glowMaterial);
          glow.position.z = -1.1;
          glow.scale.setScalar(3.7);
          gyroscope.add(glow);
        }

        const shockGeometry = new THREE.TorusGeometry(1.15, 0.025, 6, 80);
        const shockMaterial = new THREE.MeshBasicMaterial({
          color: 0xfb923c,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        geometries.push(shockGeometry);
        materials.push(shockMaterial);
        const shockwave = new THREE.Mesh(shockGeometry, shockMaterial);
        shockwave.position.z = 0.8;
        gyroscope.add(shockwave);

        let frame = 0;
        let running = false;
        let previousTime = 0;
        let elapsed = 0;
        let orbit = 0;
        let hover = 0;

        const render = (now: number, delta = 0) => {
          const input = interaction.current;
          const smoothing = 1 - Math.exp(-delta * 9);
          hover += ((input?.hovered ? 1 : 0) - hover) * smoothing;
          elapsed += delta;
          orbit += delta * (0.4 + hover * 1.25);
          const age = input?.launchTime ? (now - input.launchTime) / 1000 : 10;
          const launching = age >= 0 && age < 0.65;
          const launch = launching ? age / 0.65 : 0;
          const burst = launching ? Math.sin(launch * Math.PI) : 0;

          gyroscope.rotation.y += ((input?.x ?? 0) * 0.23 - gyroscope.rotation.y) * smoothing;
          gyroscope.rotation.x += (-(input?.y ?? 0) * 0.18 - gyroscope.rotation.x) * smoothing;
          gyroscope.position.y = Math.sin(elapsed * 1.6) * 0.055;
          gyroscope.scale.setScalar(1 + hover * 0.06 + burst * 0.035);
          core.rotation.y = elapsed * 0.27;
          core.rotation.x = 0.3 + elapsed * 0.16;
          coreMaterial.emissiveIntensity = 0.35 + hover * 0.3 + burst * 0.4;
          arrow.position.y = burst * 0.5 + Math.sin(elapsed * 2.1) * 0.035;
          arrow.rotation.y = -0.12 + Math.sin(elapsed * 0.7) * 0.08;
          arrowMaterial.emissiveIntensity = 0.28 + hover * 0.25 + burst * 0.55;

          rings[0].rotation.set(0.95 + Math.sin(orbit) * 0.18, orbit * 0.5, orbit);
          rings[1].rotation.set(-0.72, 0.65 + Math.cos(orbit * 0.7) * 0.25, -orbit * 0.8);
          rings[2].rotation.set(0.35 + Math.sin(orbit * 0.6) * 0.3, -0.6, orbit * 0.5);
          rings.forEach((ring, index) => ring.scale.setScalar(1 + hover * (0.02 + index * 0.025) + burst * 0.1));
          if (glow) glow.scale.setScalar(3.7 + hover * 0.35 + burst * 0.45);
          shockwave.visible = launching;
          shockwave.scale.setScalar(1 + launch * 0.9);
          shockMaterial.opacity = launching ? (1 - launch) * 0.85 : 0;
          renderer.render(scene, camera);
        };

        const animate = (now: number) => {
          if (!running) return;
          frame = requestAnimationFrame(animate);
          if (previousTime && now - previousTime < 1000 / 30) return;
          const delta = previousTime ? Math.min((now - previousTime) / 1000, 0.1) : 1 / 30;
          previousTime = now;
          render(now, delta);
        };
        setRunning = (nextRunning) => {
          if (running === nextRunning) return;
          running = nextRunning;
          previousTime = 0;
          if (running) frame = requestAnimationFrame(animate);
          else cancelAnimationFrame(frame);
        };
        cleanup.push(() => {
          running = false;
          cancelAnimationFrame(frame);
          scene.clear();
        });

        const resize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          if (canAnimate()) render(performance.now());
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        cleanup.push(() => resizeObserver.disconnect());

        const onContextLost = () => {
          failed = true;
          disposeScene();
        };
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        cleanup.push(() => renderer.domElement.removeEventListener("webglcontextlost", onContextLost));

        disposeScene = () => {
          cleanup.splice(0).reverse().forEach((dispose) => dispose());
          initialized = false;
          setRunning = () => {};
          if (!destroyed) setReady(false);
        };
        initialized = true;
        resize();
        setReady(true);
        setRunning(canAnimate());
      } catch {
        failed = true;
        cleanup.splice(0).reverse().forEach((dispose) => dispose());
        initialized = false;
        setRunning = () => {};
        if (!destroyed) setReady(false);
      } finally {
        loading = false;
      }
    };

    const syncActivity = () => {
      if (motionPreference.matches) disposeScene();
      else if (!initialized) void initialize();
      setRunning(canAnimate());
    };
    syncActivityRef.current = syncActivity;
    document.addEventListener("visibilitychange", syncActivity);
    motionPreference.addEventListener("change", syncActivity);
    syncActivity();

    return () => {
      destroyed = true;
      syncActivityRef.current = () => {};
      document.removeEventListener("visibilitychange", syncActivity);
      motionPreference.removeEventListener("change", syncActivity);
      disposeScene();
    };
  }, [theme, interaction]);

  useEffect(() => {
    syncActivityRef.current();
  }, [active]);

  return <span ref={containerRef} className="up-orb-scene" data-ready={ready} aria-hidden="true" />;
}
