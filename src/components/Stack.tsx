import React from 'react'
import { FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaWordpress, FaGithub,FaGit,FaSass,FaFigma,FaJs} from "react-icons/fa"; 
import { TbBrandNextjs } from "react-icons/tb";


const Stack = () => {
  return (
    <>
    <h2 data-section="profile" className='text-3xl text-center mt-32 mb-24'>STACK</h2> 
    <div className='grid grid-cols-4 gap-4 justify-items-center items-center flex-wrap w-[700px] mx-auto'>
      <FaHtml5 className="text-7xl text-orange-500" />
      <FaCss3Alt className="text-7xl text-blue-500" />
      <FaJs className="text-7xl text-yellow-500" />
      <FaReact className="text-7xl text-cyan-500" />
      <TbBrandNextjs className="text-7xl text-gray-900" />
      <FaBootstrap className="text-7xl text-purple-500" />
      <FaWordpress className="text-7xl text-blue-500" />
      <FaGithub className="text-7xl text-purple-500" />
      <FaGit className="text-7xl text-black" />
      <FaSass className="text-7xl text-pink-500" />
      <FaFigma className="text-7xl text-pink-500" />
    </div>
    </>
  )
}

export default Stack
