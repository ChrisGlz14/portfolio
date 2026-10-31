"use client";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import Image from "next/image";
import "../app/styles/header.css";
import { toggleMode } from "@/redux/features/themeSlice";
import { setEn, setEs } from "@/redux/features/langSlice";
import { toggleMenu } from "@/redux/features/menuBurgerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { scrollHome, scrollExperience, scrollProjects, scrollRepos, scrollStack } from "../app/scroll-functions/scrolls";
import type { MouseEvent } from "react";
import * as dataEn from "../app/lib/languages/en.json";
import * as dataEs from "../app/lib/languages/es.json";

export const Header = () => {
  const theme = useAppSelector((state) => state.themeReducer.mode);
  const language = useAppSelector((state) => state.langReducer.mode);
  const btnState = useAppSelector((state) => state.themeReducer.btnState);
  const menu = useAppSelector((state) => state.menuBurgerReducer.mode);
  const dispatch = useAppDispatch();
  const data = language === "es" ? dataEs : dataEn;
  const menuOpen = menu !== "hidden";

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, scroll: () => void) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (menuOpen) dispatch(toggleMenu());
    // Medir la sección después de que el menú móvil se haya cerrado.
    requestAnimationFrame(scroll);
  };

  return (
    <>
      <nav
        className={`nav-glass ${theme} flex items-center justify-between flex-wrap pr-4 ${menuOpen ? "pb-6 lg:pb-0" : "pb-0"}`}
      >
        <div className="flex items-center flex-shrink-0 mr-6">
          <div className="logo">
            <Image src="/img/logoCGc.svg" alt="Logo" width={100} height={100} />
          </div>
        </div>

        <div className="block lg:hidden">
          <button
            onClick={() => dispatch(toggleMenu())}
            id="boton"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu"
            aria-label={language === "es" ? "Menú de navegación" : "Navigation menu"}
            className="burger-btn flex items-center px-3 py-2 border rounded"
          >
            <svg
              className="fill-current h-3 w-3 text-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          id="menu"
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto text-center ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-base lg:text-sm xl:text-base lg:flex-grow">
            <ul className="lg:flex gap-5 xl:gap-10 justify-center items-center">
              <li className="mt-5 lg:mt-0">
                <a href="#home" className="links" id="nav-home" data-section="nav" data-value="home" onClick={(event) => navigateTo(event, scrollHome)}>
                  {data.nav.home}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#experience" className="links" id="nav-experience" data-section="nav" data-value="experience" onClick={(event) => navigateTo(event, scrollExperience)}>
                  {data.nav.experience}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#projects" className="links" id="nav-projects" data-section="nav" data-value="projects" onClick={(event) => navigateTo(event, scrollProjects)}>
                  {data?.nav.projects}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#repos" className="links" id="nav-repos" data-section="repositories" data-value="repositories" onClick={(event) => navigateTo(event, scrollRepos)}>
                  {data?.nav["repositories"]}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#stack" className="links" id="nav-stack" data-section="nav" data-value="stack" onClick={(event) => navigateTo(event, scrollStack)}>
                  {data?.nav.stack}
                </a>
              </li>

              <li className="flex justify-center mt-5 lg:mt-0 items-center">
                <div
                  className="theme-toggle w-12 h-6 relative flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-300"
                  onClick={() => dispatch(toggleMode())}
                >
                  <div className={`w-7 h-6 absolute left-0 top-0 bg-white rounded-full transition-transform duration-300 ${btnState === "dark" ? "translate-x-5" : "translate-x-0"}`} />
                  <span className="absolute left-[4px] pointer-events-none">
                    <IoIosSunny className={`${btnState === "dark" ? "text-gray-400" : "text-yellow-500"} text-sm`} />
                  </span>
                  <span className="absolute right-[4px] pointer-events-none">
                    <FaMoon className={`${btnState === "dark" ? "text-indigo-500" : "text-gray-400"} text-xs`} />
                  </span>
                </div>
              </li>

              <li className="switch-lang flex gap-2 justify-center mt-5 lg:mt-0 items-center">
                <Image
                  className="flag-btn cursor-pointer"
                  id="flags"
                  alt="Español"
                  src="/img/spanicon.svg"
                  data-language="es"
                  width={25}
                  height={25}
                  onClick={() => dispatch(setEs())}
                />
                <Image
                  className="flag-btn cursor-pointer"
                  id="flags"
                  alt="English"
                  src="/img/usaicon.svg"
                  data-language="en"
                  width={25}
                  height={25}
                  onClick={() => dispatch(setEn())}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
