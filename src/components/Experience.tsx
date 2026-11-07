"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiBookOpen, FiBriefcase, FiCode, FiLayers } from "react-icons/fi";
import { useAppSelector } from "@/redux/hook";
import * as dataEs from "@/app/lib/languages/es.json";
import * as dataEn from "@/app/lib/languages/en.json";
import ExperienceScene from "./ExperienceScene";
import "@/app/styles/experience.css";

const milestoneIcons = {
  learning: FiBookOpen,
  work: FiBriefcase,
  code: FiCode,
  design: FiLayers,
};

export default function Experience() {
  const language = useAppSelector((state) => state.langReducer.mode);
  const theme = useAppSelector((state) => state.themeReducer.mode);
  const reducedMotion = useReducedMotion();
  const { experience } = language === "es" ? dataEs : dataEn;

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <ExperienceScene theme={theme} />

      <div className="experience-container">
        <header className="experience-heading">
          <div>
            <p className="experience-eyebrow">
              <span aria-hidden="true" />
              {experience.eyebrow}
            </p>
            <h2 id="experience-title">{experience.title}</h2>
            <p className="experience-intro">{experience.intro}</p>
          </div>
          <div className="experience-count">
            <span>{String(experience.entries.length).padStart(2, "0")}</span>
            <span>{experience.milestonesLabel}</span>
          </div>
        </header>

        <ol className="experience-timeline">
          {experience.entries.map((entry, index) => {
            const Icon = milestoneIcons[entry.kind as keyof typeof milestoneIcons] ?? FiBriefcase;

            return (
              <motion.li
                key={entry.id}
                className="experience-item"
                initial={{ y: reducedMotion ? 0 : 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
              >
                <div className="experience-period">
                  <span className="experience-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{entry.period}</span>
                </div>

                <div className="experience-track" aria-hidden="true">
                  <span className="experience-node"><Icon /></span>
                </div>

                <article className="experience-card" aria-labelledby={`experience-${entry.id}`}>
                  <p className="experience-organization">{entry.organization}</p>
                  <h3 id={`experience-${entry.id}`}>{entry.role}</h3>
                  {entry.description && <p className="experience-description">{entry.description}</p>}
                  {entry.highlights.length > 0 && (
                    <ul className="experience-highlights">
                      {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  )}
                  <ul className="experience-technologies" aria-label={experience.technologiesLabel}>
                    {entry.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
