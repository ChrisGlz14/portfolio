"use client";

import { useEffect, useRef } from "react";

interface ExperienceSceneProps {
  theme: "light" | "dark";
  className?: string;
}

/** Decorative only: the timeline remains fully usable without WebGL. */
export default function ExperienceScene({ theme, className = "" }: ExperienceSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const section = container.parentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destroyed = false;
    let loading = false;
    let ready = false;
    let failed = false;
    let nearby = false;
    let visible = false;
    let disposeScene = () => {};
    let setRunning = (_running: boolean) => {};

    const updateActivity = () => {
      setRunning(visible && !document.hidden && !motionPreference.matches);
    };

    const initialize = async () => {
      if (destroyed || loading || ready || failed || !nearby || motionPreference.matches) return;
      loading = true;
      const cleanup: Array<() => void> = [];

      try {
        // Keep Three.js out of the initial page bundle and off reduced-motion devices.
        const THREE = await import("three");
        if (destroyed || motionPreference.matches) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        cleanup.push(() => {
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        });
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-6, 6, 9, -9, 0.1, 50);
        camera.position.z = 20;
        const network = new THREE.Group();
        scene.add(network);

        const count = 42;
        const seeds = new Float32Array(count * 3);
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = theme === "dark"
          ? ["#fb923c", "#a855f7", "#fde047"]
          : ["#ea580c", "#7c3aed", "#ea580c"];

        // Stable placement avoids a distracting reshuffle when changing themes.
        let seed = 14;
        const random = () => {
          seed = (seed * 16807) % 2147483647;
          return (seed - 1) / 2147483646;
        };
        for (let i = 0; i < count; i++) {
          seeds[i * 3] = random() - 0.5;
          seeds[i * 3 + 1] = random() - 0.5;
          seeds[i * 3 + 2] = (random() - 0.5) * 2;
          new THREE.Color(palette[i % palette.length]).toArray(colors, i * 3);
        }

        const pairs: Array<[number, number]> = [];
        for (let i = 0; i < count; i++) {
          const neighbors = Array.from({ length: count }, (_, j) => j)
            .filter((j) => j !== i)
            .sort((a, b) => {
              const distance = (j: number) => Math.hypot(
                (seeds[i * 3] - seeds[j * 3]) * 12,
                (seeds[i * 3 + 1] - seeds[j * 3 + 1]) * 18,
              );
              return distance(a) - distance(b);
            })
            .slice(0, 2);
          for (const j of neighbors) {
            if (!pairs.some(([a, b]) => a === j && b === i)) pairs.push([i, j]);
          }
        }

        const pointGeometry = new THREE.BufferGeometry();
        const lineGeometry = new THREE.BufferGeometry();
        cleanup.push(() => pointGeometry.dispose(), () => lineGeometry.dispose());
        const pointPositions = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage);
        pointGeometry.setAttribute("position", pointPositions);
        pointGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const linePositions = new THREE.BufferAttribute(new Float32Array(pairs.length * 6), 3)
          .setUsage(THREE.DynamicDrawUsage);
        const lineColors = new Float32Array(pairs.length * 6);
        pairs.forEach(([a, b], i) => {
          lineColors.set(colors.subarray(a * 3, a * 3 + 3), i * 6);
          lineColors.set(colors.subarray(b * 3, b * 3 + 3), i * 6 + 3);
        });
        lineGeometry.setAttribute("position", linePositions);
        lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

        const pointMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          vertexColors: true,
          uniforms: { pointSize: { value: 5 }, opacity: { value: theme === "dark" ? 0.7 : 0.5 } },
          vertexShader: `
            uniform float pointSize;
            varying vec3 pointColor;
            void main() {
              pointColor = color;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = pointSize;
            }
          `,
          fragmentShader: `
            uniform float opacity;
            varying vec3 pointColor;
            void main() {
              float alpha = 1.0 - smoothstep(0.2, 0.5, length(gl_PointCoord - 0.5));
              gl_FragColor = vec4(pointColor, alpha * opacity);
              #include <colorspace_fragment>
            }
          `,
        });
        const lineMaterial = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: theme === "dark" ? 0.2 : 0.13,
          depthWrite: false,
        });
        cleanup.push(() => pointMaterial.dispose(), () => lineMaterial.dispose());
        const points = new THREE.Points(pointGeometry, pointMaterial);
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        // Positions move in place, so a stale bounding sphere must not hide the scene.
        points.frustumCulled = false;
        lines.frustumCulled = false;
        network.add(points, lines);

        let frame = 0;
        let running = false;
        let lastTime = 0;
        let elapsed = 0;
        let worldHeight = 18;
        const pointer = { x: 0, y: 0 };

        const render = () => {
          for (let i = 0; i < count; i++) {
            positions[i * 3] = seeds[i * 3] * 12 + Math.sin(elapsed * 0.24 + i) * 0.14;
            positions[i * 3 + 1] = seeds[i * 3 + 1] * worldHeight + Math.cos(elapsed * 0.2 + i) * 0.12;
            positions[i * 3 + 2] = seeds[i * 3 + 2];
          }
          pairs.forEach(([a, b], i) => {
            linePositions.setXYZ(i * 2, positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]);
            linePositions.setXYZ(i * 2 + 1, positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]);
          });
          pointPositions.needsUpdate = true;
          linePositions.needsUpdate = true;
          network.rotation.y += (pointer.x * 0.09 - network.rotation.y) * 0.04;
          network.rotation.x += (pointer.y * 0.035 - network.rotation.x) * 0.04;
          renderer.render(scene, camera);
        };

        const animate = (time: number) => {
          if (!running) return;
          frame = requestAnimationFrame(animate);
          if (lastTime && time - lastTime < 1000 / 30) return;
          elapsed += lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
          lastTime = time;
          render();
        };
        setRunning = (active) => {
          if (active === running) return;
          running = active;
          lastTime = 0;
          if (active) frame = requestAnimationFrame(animate);
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
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2400000 / (width * height)));
          renderer.setPixelRatio(pixelRatio);
          renderer.setSize(width, height, false);
          pointMaterial.uniforms.pointSize.value = 5 * pixelRatio;
          worldHeight = 12 * height / width;
          camera.top = worldHeight / 2;
          camera.bottom = -worldHeight / 2;
          camera.updateProjectionMatrix();
          render();
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        cleanup.push(() => resizeObserver.disconnect());

        const onPointerMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || !section) return;
          const rect = section.getBoundingClientRect();
          pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
          pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
        };
        const resetPointer = () => { pointer.x = 0; pointer.y = 0; };
        section?.addEventListener("pointermove", onPointerMove, { passive: true });
        section?.addEventListener("pointerleave", resetPointer);
        cleanup.push(() => {
          section?.removeEventListener("pointermove", onPointerMove);
          section?.removeEventListener("pointerleave", resetPointer);
        });

        const onContextLost = () => {
          failed = true;
          disposeScene();
        };
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        cleanup.push(() => renderer.domElement.removeEventListener("webglcontextlost", onContextLost));

        disposeScene = () => {
          cleanup.splice(0).reverse().forEach((dispose) => dispose());
          ready = false;
          setRunning = () => {};
        };
        ready = true;
        resize();
        updateActivity();
      } catch {
        // A blocked GPU, unsupported WebGL, or failed import leaves the CSS background intact.
        failed = true;
        cleanup.splice(0).reverse().forEach((dispose) => dispose());
        ready = false;
        setRunning = () => {};
      } finally {
        loading = false;
      }
    };

    const preloadObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) void initialize();
    }, { rootMargin: "200px" });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateActivity();
    });
    const onMotionChange = () => {
      if (motionPreference.matches) disposeScene();
      else void initialize();
      updateActivity();
    };

    preloadObserver.observe(container);
    visibilityObserver.observe(container);
    document.addEventListener("visibilitychange", updateActivity);
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      destroyed = true;
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", updateActivity);
      motionPreference.removeEventListener("change", onMotionChange);
      disposeScene();
    };
  }, [theme]);

  return <div ref={containerRef} className={`experience-scene ${className}`.trim()} aria-hidden="true" style={{ pointerEvents: "none" }} />;
}
