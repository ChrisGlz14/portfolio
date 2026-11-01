"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useAppSelector } from "@/redux/hook";
import BackToTopScene, { type UpButtonInteraction } from "./BackToTopScene";
import "@/app/styles/back-to-top.css";

const BtnUp = () => {
  const [showBtn, setShowBtn] = useState(false);
  const interaction = useRef<UpButtonInteraction>({ hovered: false, x: 0, y: 0 });
  const theme = useAppSelector((state) => state.themeReducer.mode);
  const language = useAppSelector((state) => state.langReducer.mode);
  const label = language === "es" ? "Volver arriba" : "Back to top";

  useEffect(() => {
    let frame: number | null = null;
    let previousVisibility = false;

    const updateScroll = () => {
      frame = null;
      const shouldShow = window.scrollY > 400;
      if (shouldShow !== previousVisibility) {
        previousVisibility = shouldShow;
        setShowBtn(shouldShow);
        if (!shouldShow) {
          interaction.current.hovered = false;
          interaction.current.x = 0;
          interaction.current.y = 0;
        }
      }
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // El foco acompaña al usuario y no queda en el botón cuando se oculta.
    const heading = document.querySelector<HTMLElement>("#home h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className={`up-orb-dock${showBtn ? " is-visible" : ""}`} aria-hidden={!showBtn}>
      <button
        type="button"
        className="up-orb-button"
        aria-label={label}
        tabIndex={showBtn ? 0 : -1}
        disabled={!showBtn}
        onClick={scrollToTop}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            interaction.current.hovered = true;
            interaction.current.invalidate?.();
          }
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          interaction.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          interaction.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
          interaction.current.invalidate?.();
        }}
        onPointerLeave={(event) => {
          interaction.current.hovered = event.currentTarget.matches(":focus-visible");
          interaction.current.x = 0;
          interaction.current.y = 0;
          interaction.current.invalidate?.();
        }}
        onFocus={() => {
          interaction.current.hovered = true;
          interaction.current.invalidate?.();
        }}
        onBlur={() => {
          interaction.current.hovered = false;
          interaction.current.x = 0;
          interaction.current.y = 0;
          interaction.current.invalidate?.();
        }}
      >
        <span className="up-orb-tooltip" aria-hidden="true">{label}</span>
        <span className="up-orb-visual" aria-hidden="true">
          <BackToTopScene active={showBtn} theme={theme} interaction={interaction} />
          <span className="up-orb-fallback"><FiArrowUp /></span>
        </span>
      </button>
    </div>
  );
};

export default BtnUp;
