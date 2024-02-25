import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hook";
import * as dataEn from "../app/lib/languages/en.json"; //Forma de importar todos los datos del archivo JSON con ts
import * as dataEs from "../app/lib/languages/es.json";
import CardsProjects from "./CardsProjects";

interface ProjectData {
  [key: string]: string;
}

export const BestProjects = () => {
  const language = useAppSelector((state) => state.langReducer.mode);
  const data: {
    projects: ProjectData;
  } = language === "es" ? dataEs : dataEn;




  const numberOfProjects = 3;
  

  const projects = Array.from(
    { length: numberOfProjects },
    (_, index) => index + 1
  ).map((index) => {
    const project = {
      title: data.projects[`project-title${index}`] || "",
      description: data.projects[`project-description${index}`] || "",
      tecnologies: data.projects[`tecnologies${index}`] || "",
      github: data.projects[`github${index}`] || "",
      link: data.projects[`link${index}`] || "",
      img: data.projects[`img-path${index}`] || "",
      tecnologiesIcon: data.projects[`tecnologiesIcon${index}`] || "",
      url: data.projects[`url${index}`] || "",
    };
    return project;
  });

  return (
    <>
      {projects.map((project, index) => {
        return (
          <CardsProjects 
            key={index}
            title={project.title}
            description={project.description}
            tecnologies={project.tecnologies}
            github={project.github}
            link={project.link}
            img={project.img}
            tecnologiesIcon={project.tecnologiesIcon.split(",")}  
            url={project.url}
          />
        );
      })}
    </>
  );
};

// const title = typeof data.projects['project-title1'] === 'string' ? data.projects['project-title1'] : '';
// const title3 = typeof data.projects['project-title3'] === 'string' ? data.projects['project-title3'] : '';
// const description = typeof data.projects['project-description1'] === 'string' ? data.projects['project-description1'] : '';
// const tecnologies = typeof data.projects['tecnologies1'] === 'string' ? data.projects['tecnologies1'] : '';
