import React from "react";
import { RiRocket2Line } from "react-icons/ri";
import { VscGithub } from "react-icons/vsc";
import { FaHtml5, FaCss3Alt, FaBootstrap, FaWordpress, FaLink, FaSass, FaFigma, FaJs, FaReact } from "react-icons/fa";
import { TbBrandCSharp, TbBrandNextjs } from "react-icons/tb";
import { SiMicrosoftsqlserver, SiAdobexd, SiTypescript, SiMysql, SiTailwindcss } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import Image from "next/image";
import "../app/styles/best-projects.css";

interface CardsProjectsProps {
  title: string;
  description: string;
  tecnologies: string;
  github: string;
  link: string;
  img: string;
  tecnologiesIcon: string[];
  url: string;
}

const CardsProjects: React.FC<CardsProjectsProps> = ({
  title,
  description,
  tecnologies,
  github,
  link,
  img,
  tecnologiesIcon,
  url,
}) => {
  const iconComponents: { [key: string]: React.JSX.Element } = {
    FaHtml5: <FaHtml5 />,
    FaCss3Alt: <FaCss3Alt />,
    IoLogoJavascript: <IoLogoJavascript />,
    FaBootstrap: <FaBootstrap />,
    SiAdobexd: <SiAdobexd />,
    FaReact: <FaReact />,
    FaWordpress: <FaWordpress />,
    FaSass: <FaSass />,
    FaFigma: <FaFigma />,
    FaJs: <FaJs />,
    SiTypescript: <SiTypescript />,
    SiMysql: <SiMysql />,
    SiTailwindcss: <SiTailwindcss />,
    TbBrandNextjs: <TbBrandNextjs />,
    TbBrandCSharp: <TbBrandCSharp />,
    SiMicrosoftsqlserver: <SiMicrosoftsqlserver />,
  };

  const projectImage = (
    <>
      <Image
        className="img-proyectos"
        src={img}
        alt={title}
        width={500}
        height={200}
        sizes="(min-width: 1024px) 380px, 320px"
      />
      {url && <span className="project-image-link-icon" aria-hidden="true"><FaLink /></span>}
    </>
  );

  return (
    <div className="card-glass proyectos-container flex flex-col lg:flex-row mx-auto w-[350px] max-w-[calc(100%-2rem)] lg:w-[1033px] h-auto justify-center mt-10 sm:mt-14">

      {/* Imagen del proyecto */}
      <div className="project-image-container">
        <div className="project-image-stage">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="project-image-surface">
              {projectImage}
            </a>
          ) : (
            <div className="project-image-surface">{projectImage}</div>
          )}
        </div>
      </div>

      {/* Contenido de la card */}
      <div className="card-container min-w-0 w-full lg:flex-1 lg:ml-12">

        {/* Header: título + iconos de acción */}
        <div className="header-container flex items-center justify-between mb-5">
          <h3
            data-section="projects"
            data-value="project-title2"
            className="card-title-text"
          >
            {title}
          </h3>
          <div className="card-action-icons flex gap-2">
            <a href={github} target="_blank">
              <VscGithub className="text-3xl duration-200 hover:text-red-500" />
            </a>
            <a href={link} target="_blank">
              <RiRocket2Line className="text-3xl duration-200 hover:text-blue-500" />
            </a>
          </div>
        </div>

        {/* Descripción */}
        <p
          className="card-description description-card mb-9 tracking-wide"
          data-section="projects"
          data-value="project-description2"
        >
          {description}
        </p>

        {/* Footer: tecnologías */}
        <div className="footer-card flex flex-col lg:flex-row text-center items-center mt-12 justify-between">
          <h3
            data-section="projects"
            data-value="tecnologies2"
            className="card-tech-label"
          >
            {tecnologies}
          </h3>
          <div className="card-tech-icons footer-icons justify-center flex flex-wrap gap-2">
            {tecnologiesIcon.map((iconName, index) => {
              const IconComponent = iconComponents[iconName];
              return (
                <i className="text-3xl" key={index}>
                  {IconComponent}
                </i>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardsProjects;
