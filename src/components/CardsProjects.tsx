import React from 'react';
import { RiRocket2Line } from "react-icons/ri";
import { VscGithub } from "react-icons/vsc";
import { FaHtml5, FaCss3Alt, FaBootstrap, FaWordpress  } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiAdobexd } from "react-icons/si";
import Image from 'next/image';
import { useAppSelector } from "@/redux/hook";


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

  const CardsProjects: React.FC<CardsProjectsProps> = ({ title, description, tecnologies, github, link, img, tecnologiesIcon, url }) => { 
    //Definimos el componente CardsProjects como un componente de tipo React.FC (Functional Component) que nos permite renderizar un componente CardsProjects de forma dinámica a traves de las propiedades de CardsProjectsProps.
    const theme = useAppSelector(state => state.themeReducer.mode);
    
    const iconComponents: {[key:string]: React.JSX.Element} = {  //Creo un objeto, tipo mapa, donde defino la key como string y el valor 
                                                                //como React.JSX.Element para poder ser renderizado,                                                   
                                                                //entonces el icono se renderiza con el valor correspondiente
        FaHtml5: <FaHtml5 />,
        FaCss3Alt: <FaCss3Alt />,
        IoLogoJavascript: <IoLogoJavascript />,
        FaBootstrap: <FaBootstrap />,
        SiAdobexd: <SiAdobexd />,
        FaWordpress: <FaWordpress />  
    }
  
  return (
        <>
            <div className="proyectos-container flex flex-col lg:flex-row mx-auto w-[300px] lg:w-[1033px] h-auto justify-center bg-transparent mt-32 ">
                <a href={url}  target="_blank"  className='items-center flex justify-center box-border' >
                    <Image className="img-proyectos border-2 border-red-600 object-cover mb-3 lg:mb-0 h-[200px] w-[500px]" src={img} alt="ancora" width={450} height={202} />
                </a>
                <div className="card-container flex-grow-0 w-[300px] lg:w-3/4 lg:ml-12">
                    <div className="header-container flex items-center justify-between mb-5 ">
                        <h3 data-section ="projects" data-value ="project-title2" className={`${theme === "light" ? "text-black" : "text-white"}`}>{title}</h3>
                        <div className={`icons flex justify-end gap-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                            <a href={github} target="_blank">
                                <i> <VscGithub className='text-3xl duration-200 hover:text-red-500'/> </i>
                            </a>
                            <a
                                href={link} target="_blank"
                            >
                                <i><RiRocket2Line className='text-3xl duration-200 hover:text-blue-500'/></i>
                            </a>
                        </div>
                    </div>
                    <p className={`description-card min-w-72 lg:min-w-80 mb-9 tracking-wide ${theme === "light" ? "text-black" : "text-white"}`} data-section ="projects" data-value ="project-description2">
                        {description}
                    </p>
                    <div className="footer-card flex flex-col lg:flex-row text-center items-center mt-12 justify-between">
                        <h3 data-section ="projects" data-value ="tecnologies2" className={`${theme === "light" ? "text-black" : "text-white"}`}>{tecnologies}</h3>
                        <div className={`footer-icons justify-center flex gap-2 ${theme === "light" ? "text-black" : "text-white"}`}>
                        {tecnologiesIcon.map((iconName, index) => {  //Recorremos el arreglo tecnologiesIcon. INDEX ES LA POSICION Y ICONNAME ES EL VALOR.
                        const IconComponent = iconComponents[iconName]; 
                        return <i className='text-3xl' key={index}>{IconComponent}</i>; 
                      })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsProjects;
