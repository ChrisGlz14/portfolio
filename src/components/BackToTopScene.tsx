"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UpButtonInteraction {
  hovered: boolean;
  x: number;
  y: number;
  invalidate?: () => void;
}

interface BackToTopSceneProps {
  active: boolean;
  theme: "light" | "dark";
  interaction: RefObject<UpButtonInteraction>;
}

/** One beveled arrow, rendered only while its interaction is settling. */
export default function BackToTopScene({ active, theme, interaction }: BackToTopSceneProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(active);
  const syncActivityRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  activeRef.current = active;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const input = interaction.current;
    let destroyed = false;
    let loading = false;
    let initialized = false;
    let failed = false;
    let frame = 0;
    let requestRender = () => {};
    let disposeScene = () => {};
    setReady(false);
    const canRender = () => !destroyed && activeRef.current && !document.hidden && !preference.matches;

    const initialize = async () => {
      if (loading || initialized || failed || !canRender()) return;
      loading = true;
      const cleanups: Array<() => void> = [];
      try {
        const THREE = await import("three");
        if (!canRender()) return;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        cleanups.push(() => { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1.35, 1.35, 1.35, -1.35, 0.1, 20);
        camera.position.z = 5;
        scene.add(new THREE.HemisphereLight(0xfff5e6, 0x593486, 2));
        const light = new THREE.DirectionalLight(0xffead4, 3);
        light.position.set(-3, 4, 5);
        scene.add(light);

        const shape = new THREE.Shape();
        shape.moveTo(0, 0.7);
        shape.lineTo(0.52, 0.15);
        shape.lineTo(0.18, 0.15);
        shape.lineTo(0.18, -0.65);
        shape.lineTo(-0.18, -0.65);
        shape.lineTo(-0.18, 0.15);
        shape.lineTo(-0.52, 0.15);
        shape.closePath();
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.16, bevelEnabled: true, bevelSegments: 3,
          bevelSize: 0.035, bevelThickness: 0.035, steps: 1,
        });
        cleanups.push(() => geometry.dispose());
        geometry.center();
        const face = new THREE.MeshStandardMaterial({
          color: theme === "dark" ? 0xffbb78 : 0xc95519,
          roughness: 0.4, metalness: 0.2,
        });
        cleanups.push(() => face.dispose());
        const edge = new THREE.MeshStandardMaterial({ color: 0x8955cd, roughness: 0.35, metalness: 0.3 });
        cleanups.push(() => edge.dispose());
        const arrow = new THREE.Mesh(geometry, [face, edge]);
        arrow.rotation.set(-0.12, -0.24, 0);
        scene.add(arrow);
        cleanups.push(() => scene.clear());

        let previousTime = 0;
        const render = (now: number) => {
          frame = 0;
          if (!canRender()) return;
          const delta = previousTime ? Math.min((now - previousTime) / 1000, 0.05) : 1 / 60;
          previousTime = now;
          const blend = 1 - Math.exp(-delta * 15);
          const hovered = input?.hovered ?? false;
          const targetX = -0.12 - (hovered ? (input?.y ?? 0) * 0.12 : 0);
          const targetY = -0.24 + (hovered ? (input?.x ?? 0) * 0.18 : 0);
          const targetLift = hovered ? 0.07 : 0;
          arrow.rotation.x += (targetX - arrow.rotation.x) * blend;
          arrow.rotation.y += (targetY - arrow.rotation.y) * blend;
          arrow.position.y += (targetLift - arrow.position.y) * blend;
          renderer.render(scene, camera);
          const remaining = Math.abs(targetX - arrow.rotation.x) + Math.abs(targetY - arrow.rotation.y) + Math.abs(targetLift - arrow.position.y);
          if (remaining > 0.0005) frame = requestAnimationFrame(render);
        };
        requestRender = () => {
          if (!canRender() || frame) return;
          previousTime = 0;
          frame = requestAnimationFrame(render);
        };
        cleanups.push(() => { cancelAnimationFrame(frame); frame = 0; requestRender = () => {}; });

        const resize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.left = -1.35 * width / height;
          camera.right = 1.35 * width / height;
          camera.updateProjectionMatrix();
          requestRender();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        cleanups.push(() => observer.disconnect());
        const onContextLost = () => { failed = true; disposeScene(); };
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        cleanups.push(() => renderer.domElement.removeEventListener("webglcontextlost", onContextLost));

        disposeScene = () => {
          cleanups.splice(0).reverse().forEach((cleanup) => cleanup());
          initialized = false;
          if (!destroyed) setReady(false);
        };
        initialized = true;
        resize();
        if (canRender()) renderer.render(scene, camera);
        setReady(true);
      } catch {
        failed = true;
        cleanups.splice(0).reverse().forEach((cleanup) => cleanup());
        initialized = false;
        if (!destroyed) setReady(false);
      } finally {
        loading = false;
      }
    };

    const syncActivity = () => {
      if (preference.matches) disposeScene();
      if (!canRender()) { cancelAnimationFrame(frame); frame = 0; return; }
      if (!initialized) void initialize();
      else requestRender();
    };
    const invalidate = () => requestRender();
    if (input) input.invalidate = invalidate;
    syncActivityRef.current = syncActivity;
    preference.addEventListener("change", syncActivity);
    document.addEventListener("visibilitychange", syncActivity);
    syncActivity();

    return () => {
      destroyed = true;
      syncActivityRef.current = () => {};
      if (input?.invalidate === invalidate) delete input.invalidate;
      preference.removeEventListener("change", syncActivity);
      document.removeEventListener("visibilitychange", syncActivity);
      disposeScene();
    };
  }, [theme, interaction]);

  useEffect(() => { syncActivityRef.current(); }, [active]);

  return <span ref={containerRef} className="up-orb-scene" data-ready={ready} aria-hidden="true" />;
}
