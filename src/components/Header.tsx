"use client";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import Image from "next/image";
import "../app/styles/header.css";
import { toggleMode } from "@/redux/features/themeSlice";
import { setEn, setEs } from "@/redux/features/langSlice";
import { toggleMenu } from "@/redux/features/menuBurgerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { scrollHome, scrollProjects, scrollRepos, scrollStack } from "../app/scroll-functions/scrolls";
import * as dataEn from "../app/lib/languages/en.json";
import * as dataEs from "../app/lib/languages/es.json";

export const Header = () => {
  const theme = useAppSelector((state) => state.themeReducer.mode);
  const language = useAppSelector((state) => state.langReducer.mode);
  const btnState = useAppSelector((state) => state.themeReducer.btnState);
  const menu = useAppSelector((state) => state.menuBurgerReducer.mode);
  const dispatch = useAppDispatch();
  const data = language === "es" ? dataEs : dataEn;

  return (
    <>
      <nav
        className={`nav-glass ${theme} flex items-center pb-0 justify-between flex-wrap pr-4 ${menu ? 'pb-14 lg:pb-0 min-h-screen' : 'menu-abierto'}`}
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
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto text-center ${
            menu === "hidden" ? "hidden" : ""
          }`}
        >
          <div className="text-base lg:flex-grow">
            <ul className="lg:flex gap-10 justify-center align-middle">
              <li className="mt-5 lg:mt-0">
                <a href="#" className="links" id="nav-home" data-section="nav" data-value="home" onClick={() => scrollHome()}>
                  Home
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#" className="links" id="nav-projects" data-section="nav" data-value="projects" onClick={() => scrollProjects()}>
                  {data?.nav.projects}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#" className="links" id="nav-repos" data-section="repositories" data-value="repositories" onClick={() => scrollRepos()}>
                  {data?.nav["repositories"]}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a href="#" className="links" id="nav-stack" data-section="nav" data-value="stack" onClick={() => scrollStack()}>
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
