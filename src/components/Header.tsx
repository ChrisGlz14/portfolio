'use client'
import Image from "next/image";
import { MoonSvg, SunSvg } from "../../public/svg/svg";
import { setDarkMode, setLightMode } from "@/redux/features/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hook";


export const Header = () => {
  const theme = useAppSelector(state => state.themeReducer.mode)
  const dispatch = useAppDispatch()

  return (
    <>
      <header className={`active flex items-center justify-center h-24 bg-orange-500 ${theme}`}>
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
                className="links text-white hover:text-black transition 300"
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
                className="links text-white hover:text-black transition 300"
                id="nav-projects"
                data-section="nav"
                data-value="projects"
              >
                Proyectos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="links text-white hover:text-black transition 300"
                id="nav-about-me"
                data-section="nav"
                data-value="about-me"
              >
                Sobre Mi
              </a>
            </li>
            <li>
              <a
                href="#"
                className="links text-white hover:text-black transition 300"
                id="nav-stack"
                data-section="nav"
                data-value="stack"
              >
                Mi Stack Tecnologico
              </a>
            </li>
            <li>
              <button
                className="switch bg-blue-200 w-12 h-6 rounded-full border-none relative cursor-pointer flex items-center outline-none "
                id="switch"
                onClick={()=> {dispatch(setDarkMode())}}
              >
                <span className="text-black text-base w-6 h-6 leading-6 block bg-white absolute right-0 shadow-sm transition 300 ease-in rounded-full">
                  {SunSvg}
                </span>

                <span className="text-black text-base w-6 h-6 leading-6 block bg-white absolute right-0 shadow-sm transition 300 ease-in rounded-full">
                  {MoonSvg}
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
              />

              <Image
                className="links cursor-pointer"
                id="flags"
                alt="img es"
                src="/img/usaicon.svg"
                data-language="en"
                width={25}
                height={25}
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
