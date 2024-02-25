import React from 'react'
import { FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaWordpress, FaGithub,FaGit,FaSass,FaFigma,FaJs} from "react-icons/fa"; 
import { TbBrandNextjs } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";
import { useAppSelector } from '@/redux/hook';



const Stack = () => {
  
  const theme = useAppSelector(state => state.themeReducer.mode)
  
  return (
    <>
    <h2 data-section="stack" id='stack' className={`text-3xl text-center mt-32 mb-24 ${theme === "light" ? "text-black" : "text-white"}`}>STACK</h2> 
    <div className='grid grid-cols-3 md:grid-cols-3 gap-1 md:justify-items-center md:items-center flex-wrap w-[250px]  sm:w-[700px] mx-auto pb-20'>
      <FaHtml5 className="text-7xl text-orange-500" />
      <FaCss3Alt className="text-7xl text-blue-500" />
      <FaJs className="text-7xl text-yellow-500" />
      <FaReact className="text-7xl text-cyan-500" />
      <FaGithub className="text-7xl text-purple-500" />
      <TbBrandNextjs className="text-7xl text-gray-900" />
      <SiTailwindcss className="text-7xl text-sky-500" />
      <FaGit className="text-7xl text-black" />
      <FaWordpress className="text-7xl text-blue-500" />
      <FaSass className="text-7xl text-pink-500" />
      <FaFigma className="text-7xl text-pink-500" />
      <FaBootstrap className="text-7xl text-purple-500" />
    </div>
    </>
  )
  
}

export default Stack
