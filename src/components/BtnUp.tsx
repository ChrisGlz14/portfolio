"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useAppSelector } from "@/redux/hook";
import BackToTopScene, { type UpButtonInteraction } from "./BackToTopScene";
import "@/app/styles/back-to-top.css";

const BtnUp = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [launching, setLaunching] = useState(false);
  const progressRef = useRef<SVGCircleElement>(null);
  const launchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interaction = useRef<UpButtonInteraction>({ hovered: false, x: 0, y: 0, launchTime: 0 });
  const theme = useAppSelector((state) => state.themeReducer.mode);
  const language = useAppSelector((state) => state.langReducer.mode);
  const label = language === "es" ? "Volver arriba" : "Back to top";
  const visible = showBtn || launching;

  useEffect(() => {
    let frame: number | null = null;
    let previousVisibility = false;

    const updateScroll = () => {
      frame = null;
      const shouldShow = window.scrollY > 400;
      if (shouldShow !== previousVisibility) {
        previousVisibility = shouldShow;
        setShowBtn(shouldShow);
      }
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      progressRef.current?.setAttribute("stroke-dashoffset", String(100 - progress * 100));
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      if (launchTimer.current !== null) clearTimeout(launchTimer.current);
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (launchTimer.current !== null) clearTimeout(launchTimer.current);
    if (!reducedMotion) {
      interaction.current.launchTime = performance.now();
      setLaunching(true);
      launchTimer.current = setTimeout(() => {
        setLaunching(false);
        launchTimer.current = null;
      }, 850);
    } else {
      setLaunching(false);
    }

    // El foco acompaña al usuario y no queda en el botón cuando se oculta.
    const heading = document.querySelector<HTMLElement>("#home h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className={`up-orb-dock${visible ? " is-visible" : ""}${launching ? " is-launching" : ""}`} aria-hidden={!visible}>
      <button
        type="button"
        className="up-orb-button"
        aria-label={label}
        tabIndex={visible ? 0 : -1}
        disabled={!visible}
        onClick={scrollToTop}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") interaction.current.hovered = true;
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          interaction.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          interaction.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        }}
        onPointerLeave={(event) => {
          interaction.current.hovered = event.currentTarget.matches(":focus-visible");
          interaction.current.x = 0;
          interaction.current.y = 0;
        }}
        onFocus={() => { interaction.current.hovered = true; }}
        onBlur={() => { interaction.current.hovered = false; }}
      >
        <span className="up-orb-tooltip" aria-hidden="true">{label}</span>
        <span className="up-orb-visual" aria-hidden="true">
          <span className="up-orb-aura" />
          <svg className="up-orb-progress" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle className="up-orb-progress-track" cx="50" cy="50" r="46" />
            <circle ref={progressRef} className="up-orb-progress-value" cx="50" cy="50" r="46" pathLength="100" strokeDasharray="100" strokeDashoffset="100" />
          </svg>
          <BackToTopScene active={visible} theme={theme} interaction={interaction} />
          <span className="up-orb-fallback"><FiArrowUp /></span>
        </span>
      </button>
    </div>
  );
};

export default BtnUp;
