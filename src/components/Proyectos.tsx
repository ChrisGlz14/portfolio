import React from 'react'
import { useAppSelector } from "@/redux/hook";
import * as dataEn from '../app/lib/languages/en.json' //Forma de importar todos los datos del archivo JSON con ts
import * as dataEs from '../app/lib/languages/es.json'
import { BestProjects } from './BestProjects';


const Proyectos = () => {
  const theme = useAppSelector(state => state.themeReducer.mode)
  const language = useAppSelector(state => state.langReducer.mode)
  const data = language === "es" ? dataEs : dataEn;

  return (
    <>
     <h2 data-section="profile" className={`text-3xl text-center ${theme === "light" ? "text-black" : "text-white"}`}>{ language == "es" ? "PROYECTOS" : "PROJECTS"}</h2>

      <BestProjects />
    
    </>
  )
}

export default Proyectos