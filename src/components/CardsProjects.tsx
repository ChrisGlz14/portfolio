import React from "react";
import { RiRocket2Line } from "react-icons/ri";
import { VscGithub } from "react-icons/vsc";
import { FaHtml5, FaCss3Alt, FaBootstrap, FaWordpress, FaLink, FaSass, FaFigma, FaJs, FaReact } from "react-icons/fa";
import { TbBrandCSharp, TbBrandNextjs } from "react-icons/tb";
import { SiMicrosoftsqlserver, SiAdobexd, SiTypescript, SiMysql, SiTailwindcss } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import Image from "next/image";
import { motion } from "framer-motion";
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

  return (
    <div className="card-glass proyectos-container flex flex-col lg:flex-row mx-auto w-[350px] lg:w-[1033px] h-auto justify-center mt-10 sm:mt-14">

      {/* Imagen del proyecto */}
      <div className="container-img flex justify-center items-center">
        <div className="hover-img group relative justify-center items-center">
          <motion.div
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.05 }}
            className="transition-all ease-in-out duration-200 flex justify-center items-center"
          >
            <a href={url} target="_blank" className="items-center flex justify-center box-border">
              <Image
                className="img-proyectos border-2 border-red-600 object-cover mb-3 lg:mb-0 h-[200px] w-[500px] rounded-lg"
                src={img}
                alt={title}
                width={500}
                height={200}
              />
            </a>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href={url} target="_blank">
                <FaLink className="text-7xl text-cyan-50 brightness-150 cursor-pointer" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenido de la card */}
      <div className="card-container flex-grow-0 w-[300px] lg:w-3/4 lg:ml-12">

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
          className="card-description description-card min-w-72 lg:min-w-80 mb-9 tracking-wide"
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
          <div className="card-tech-icons footer-icons justify-center flex gap-2">
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
