import React from 'react'
import { useAppSelector } from "@/redux/hook";
import { BestProjects } from './BestProjects';


const Proyectos = () => {
  const theme = useAppSelector(state => state.themeReducer.mode)
  const language = useAppSelector(state => state.langReducer.mode)

  return (
    <>
     <h2 data-section="projects" id='projects' className={`text-3xl mt-28 sm:mt-24 text-center ${theme === "light" ? "text-black" : "text-white"}`}>{ language == "es" ? "PROYECTOS" : "PROJECTS"}</h2>

      <BestProjects />
    
    </>
  )
}

export default Proyectos