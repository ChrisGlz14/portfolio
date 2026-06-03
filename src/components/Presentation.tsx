"use client";
import { useAppSelector } from "@/redux/hook";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import '../app/styles/btn.css';
import Image from "next/image";
import * as dataEn from '../app/lib/languages/en.json';
import * as dataEs from '../app/lib/languages/es.json';
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14 } },
};

const Presentation = () => {
  const language = useAppSelector(state => state.langReducer.mode);
  const data = language === "es" ? dataEs : dataEn;

  return (
    <section className="portfolio-container flex justify-start content-center sm:h-[815px]" id="home">
      <article className="flex-container flex flex-col m-auto items-center md:flex-row w-full justify-center gap-10 md:gap-16 px-6">

        {/* ── Texto ── */}
        <motion.section
          className="content-container flex flex-col pb-8 md:pb-0 justify-center items-center md:items-start"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="pres-greeting"
            data-section="profile"
            data-value="presentation-name"
          >
            {data?.profile['presentation-name']}
          </motion.span>

          <motion.h1 variants={fadeUp} className="pres-name">
            Christian Gonzalez
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="pres-bio text-themed"
            data-section="profile"
            data-value="presentation"
          >
            {data?.profile.presentation}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-row mt-10 gap-4 flex-wrap justify-center md:justify-start"
          >
            <a
              href="./img/CV_Gonzalez,Christian Desarrollador.pdf"
              download
              id="btn-cv"
              data-section="profile"
              data-value="cvBtn"
              className="btn-primary"
            >
              {data?.profile.cvBtn}
            </a>
            <a
              href="mailto:christianglz9914@gmail.com"
              id="btn-mail"
              data-section="profile"
              data-value="contactBtn"
              className="btn-outline"
            >
              {data?.profile.contactBtn}
            </a>
          </motion.div>
        </motion.section>

        {/* ── Imagen ── */}
        <motion.div
          className="portfolio-img flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <div className="img-ring">
              <Image
                className="img-profile"
                src="/img/christian.jpg"
                alt="Chris"
                priority
                width={206}
                height={206}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center gap-5 mt-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a href="https://www.linkedin.com/in/chrisglz14" target="_blank" className="social-icon">
              <FaLinkedin className="text-4xl text-[#0e76a8]" />
            </a>
            <a href="https://github.com/ChrisGlz14" target="_blank" className="social-icon">
              <FaGithubSquare className="text-4xl text-themed" />
            </a>
          </motion.div>
        </motion.div>

      </article>
    </section>
  );
};

export default Presentation;
