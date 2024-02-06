'use client'
import Image from "next/image";
import './header.css'
import { MoonSvg, SunSvg } from "../../public/svg/svg";
import { toggleMode } from "@/redux/features/themeSlice";
import { setEn, setEs } from "@/redux/features/langSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import * as dataEn from '../app/lib/languages/en.json'
import * as dataEs from '../app/lib/languages/es.json'


export const Header = () => {
  const theme = useAppSelector(state => state.themeReducer.mode)
  const language = useAppSelector(state => state.langReducer.mode)
  const btnState = useAppSelector(state => state.themeReducer.btnState)
  const dispatch = useAppDispatch()
  const data = language === "es" ? dataEs : dataEn;
  return (
    <>
      <header className={`active flex items-center justify-center h-24 ${theme === "light" ? "bg-orange-600 text-black" : "bg-gray-800 text-white"}`}>
        <button className="btnMobile" id="btnMobile"></button>

        <nav className="navbar flex m-3" id="nav">
          <ul className="flex items-center list-none gap-5">
            <li className="logo">
              <Image
                src="/img/logoCGc.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </li>
            <li>
              <a
                href="#"
                className={`links  ${theme === "light" ? "text-white hover:text-black transition 300" : "text-white hover:text-yellow-300" }`}
                id="nav-home"
                data-section="nav"
                data-value="home"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`links  ${theme === "light" ? "text-white hover:text-black transition 300" : "text-white hover:text-yellow-300" }`}
                id="nav-projects"
                data-section="nav"
                data-value="projects"
              >
                {data?.nav.projects}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`links  ${theme === "light" ? "text-white hover:text-black transition 300" : "text-white hover:text-yellow-300" }`}
                id="nav-about-me"
                data-section="nav"
                data-value="about-me"
              >
                {data?.nav["about-me"]}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`links  ${theme === "light" ? "text-white hover:text-black transition 300" : "text-white hover:text-yellow-300" }`}
                id="nav-stack"
                data-section="nav"
                data-value="stack"
              >
                {data?.nav.stack}
              </a>
            </li>
            <li>
              <button
                className={`switch ${btnState === "dark" ? "light" : "dark"} w-12 h-6 rounded-full border-none relative cursor-pointer flex items-center outline-none `}
                id="switch"
                onClick={()=> {dispatch(toggleMode())}}
              >
                <span className="">
                  <i className="text-black text-base w-6 h-6 leading-6 block bg-transparent absolute left-0 top-0 shadow-sm transition 300 ease-in rounded-full">{SunSvg}</i>
                </span>

                <span className="">
                  <i className="text-black text-base w-6 h-6 leading-6 block bg-transparent absolute right-0 top-0 shadow-sm transition 300 ease-in rounded-full">{MoonSvg}</i> 
                </span>
              </button>
            </li>
            <li className="switch-lang flex gap-2">
              <Image
                className="links cursor-pointer"
                id="flags"
                alt="imagen"
                src="/img/spanicon.svg"
                data-language="es"
                width={25}
                height={25}
                onClick={()=>{dispatch(setEs())}}
              />

              <Image
                className="links cursor-pointer"
                id="flags"
                alt="img es"
                src="/img/usaicon.svg"
                data-language="en"
                width={25}
                height={25}
                onClick={()=>{dispatch(setEn())}}
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
