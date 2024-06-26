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
        className={`flex items-center justify-between flex-wrap p-2 ${
          theme === "light"
            ? "bg-orange-600 text-black"
            : "bg-gray-800 text-white" 
        } ${menu === "" ? "pb-14 lg:pb-0" : ""}`}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div className="logo">
            <Image src="/img/logoCGc.svg" alt="Logo" width={100} height={100} />
          </div>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => dispatch(toggleMenu())}
            id="boton"
            className={`flex items-center px-3 py-2 border rounded ${
              theme === "light"
                ? "bg-orange-600 text-black border-black"
                : "bg-gray-800 text-white hover:border-white "
            }`}
          >
            <svg
              className="fill-current h-3 w-3"
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
          } `}
        >
          <div className="text-base lg:flex-grow">
            <ul className="lg:flex gap-10 justify-center  align-middle">
              <li className="mt-5 lg:mt-0">
                <a
                  href="#"
                  className={`links  ${
                    theme === "light"
                      ? "text-white hover:text-black transition 300"
                      : "text-white hover:text-yellow-300"
                  }`}
                  id="nav-home"
                  data-section="nav"
                  data-value="home"
                  onClick={() => scrollHome()}
                >
                  Home
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a
                  href="#"
                  className={`links  ${
                    theme === "light"
                      ? "text-white hover:text-black transition 300"
                      : "text-white hover:text-yellow-300"
                  }`}
                  id="nav-projects"
                  data-section="nav"
                  data-value="projects"
                  onClick={() => scrollProjects()}
                >
                  {data?.nav.projects}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a
                  href="#"
                  className={`links  ${
                    theme === "light"
                      ? "text-white hover:text-black transition 300"
                      : "text-white hover:text-yellow-300"
                  }`}
                  id="nav-repos"
                  data-section="repositories"
                  data-value="repositories"
                  onClick={() => scrollRepos()}
                >
                  {data?.nav["repositories"]}
                </a>
              </li>
              <li className="mt-5 lg:mt-0">
                <a
                  href="#"
                  className={`links  ${
                    theme === "light"
                      ? "text-white hover:text-black transition 300"
                      : "text-white hover:text-yellow-300"
                  }`}
                  id="nav-stack"
                  data-section="nav"
                  data-value="stack"
                  onClick={() => scrollStack()}
                >
                  {data?.nav.stack}
                </a>
              </li>
              <li className="flex justify-center mt-5 lg:mt-0 items-center">
              <button
  className={`switch ${btnState === "dark" ? "light" : "dark"} w-12 h-6 rounded-full border-none relative cursor-pointer outline-none`}
  id="switch"
  onClick={() => {
    dispatch(toggleMode());
  }}
>
  <span className="absolute left-[2px] top-1/2 transform -translate-y-1/2">
    <i>
      <IoIosSunny className="text-white text-xl leading-6 block bg-transparent shadow-sm transition 300 ease-in rounded-full" />
    </i>
  </span>

  <span className="absolute right-[2px] top-1/2 transform -translate-y-1/2">
    <i>
      <FaMoon className="text-white text-lg leading-6 block bg-transparent shadow-sm transition 300 ease-in rounded-full" />
    </i>
  </span>
</button>

              </li>
              <li className="switch-lang flex gap-2 justify-center mt-5 lg:mt-0">
                <Image
                  className="links cursor-pointer"
                  id="flags"
                  alt="imagen"
                  src="/img/spanicon.svg"
                  data-language="es"
                  width={25}
                  height={25}
                  onClick={() => {
                    dispatch(setEs());
                  }}
                />

                <Image
                  className="links cursor-pointer"
                  id="flags"
                  alt="img es"
                  src="/img/usaicon.svg"
                  data-language="en"
                  width={25}
                  height={25}
                  onClick={() => {
                    dispatch(setEn());
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
