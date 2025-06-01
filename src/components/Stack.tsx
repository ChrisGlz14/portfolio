import React from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaWordpress,
  FaGithub,
  FaGit,
  FaSass,
  FaFigma,
  FaJs,
  FaNodeJs,
  FaJava,} from "react-icons/fa";
import {TbBrandCSharp } from "react-icons/tb";
import { TbBrandNextjs } from "react-icons/tb";
import { SiTailwindcss, SiTypescript, SiMysql, SiExpress, SiMicrosoftsqlserver } from "react-icons/si";
import { useAppSelector } from "@/redux/hook";
import { motion } from "framer-motion";

const Stack = () => {
  const theme = useAppSelector((state) => state.themeReducer.mode);

  return (
    <>
      <h2
        data-section="stack"
        id="stack"
        className={`text-3xl text-center mt-32 mb-24 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        STACK
      </h2>
      <motion.div 
      className="grid grid-cols-3 md:grid-cols-7 gap-4 md:justify-items-center md:items-center flex-wrap w-[250px] sm:w-[1500px] mx-auto pb-20"
      >


        <motion.div whileHover={{ scale: 1.2 }}>
          <FaHtml5 className="text-7xl text-orange-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaCss3Alt className="text-7xl text-blue-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaJs className="text-7xl text-yellow-500" /> 
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaReact className="text-7xl text-cyan-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaGithub className="text-7xl text-purple-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <TbBrandNextjs className="text-7xl text-gray-900" />
        </motion.div>


        <motion.div whileHover={{ scale: 1.2 }}>
          <SiTailwindcss className="text-7xl text-sky-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaWordpress className="text-7xl text-blue-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaJava className="text-7xl text-red-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2}}>
          <img className="w-20 h-20" src='\img\tecnologies-logo\microsoft-sql-server-1.svg' alt="" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <SiMicrosoftsqlserver className="text-7xl text-purple-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <TbBrandCSharp className="text-7xl text-blue-500"/>
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <SiTypescript className="text-7xl text-blue-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <SiMysql className="text-7xl text-blue-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <FaNodeJs className="text-7xl text-green-500" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.2 }}>
          <SiExpress className="text-7xl text-gray-500" />
        </motion.div>

      </motion.div>
    </>
  );
};

export default Stack;
