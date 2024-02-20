import { useAppSelector } from "@/redux/hook";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import Image from "next/image";
import * as dataEn from '../app/lib/languages/en.json' //Forma de importar todos los datos del archivo JSON con ts
import * as dataEs from '../app/lib/languages/es.json'


const Presentation = () => {
  const theme = useAppSelector(state => state.themeReducer.mode)
  const language = useAppSelector(state => state.langReducer.mode)
  const data = language === "es" ? dataEs : dataEn; //Creo una constante data, igualo language a dataEs en caso de ser identico a "es" y de lo contrario la igualo a dataEn

  
  return (
    <>
      <section className="portfolio-container flex justify-start content-center sm:h-[815px]" id="home">
        <article className="flex-container flex flex-col m-auto items-center md:flex-row">
          <section className="content-container flex flex-col pb-8 md:pb-0 mx-9 justify-center items-center md:items-start">
            <header className="container-presentation text-center">
              <span data-section="profile" data-value="presentation-name" className="flex text-xl font-semibold text-start mt-2 text-[#a63929]" >
              {data?.profile['presentation-name']}
              </span>
            </header>
            <section className={`portfolio-name text-5xl font-semibold ${theme === 'light' ? "text-black" : "text-white" }`} >
              <h1 className="text-center sm:text-start">Christian Gonzalez</h1>
            </section>
            <section className={`text-center md:text-start presentation-paragraph flex ${theme === 'light' ? "text-black" : "text-white"}`}>
              <p data-section="profile" data-value="presentation" className="mt-8">
                {data?.profile.presentation}
              </p>
            </section>
            <section className="container-btn flex flex-row mt-14">
              <a
                className="p-4 rounded-md border-none bg-[#a63929] text-white text-base mr-2 cursor-pointer no-underline hover:bg-orange-700 transition ease-in"
                href="./img/CV-Christian-Gonzalez-Desarrollador-Web.pdf"
                download
                data-section="profile"
                data-value="cvBtn"
              >
                {data?.profile.cvBtn}
              </a>
              <a
                className={`p-4 rounded-md bg-transparent ${theme === "light"  ? "text-black" : "text-white"} text-base mr-2 cursor-pointer border border-orange-600 hover:bg-orange-700 transition ease-in hover:border-orange-800 hover:text-white`}
                id="btn-mail"
                href="mailto:christianglz9914@gmail.com"
                data-section="profile"
                data-value="contactBtn"
              >
                {data?.profile.contactBtn}
              </a>
            </section>
          </section>
          <aside className="portfolio-img">
            <Image
              className="rounded-full border-4 border-orange-600"
              src="/img/christian.jpg"
              alt="Chris"
              priority={true}
              width={200}
              height={200}
            />
            <div className="contact flex justify-center gap-3 m-4">
              <a href="https://www.linkedin.com/in/chrisglz14" target="_blank">
                <i>
                  <FaLinkedin className="text-5xl text-[#0e76a8] duration-200 hover:text-red-500" />
                </i>
              </a>
              <a href="https://github.com/ChrisGlz14" target="_blank">
                <i>
                  <FaGithubSquare className="text-5xl text-[#0e76a8] duration-200 hover:text-red-500" />
                </i>
              </a>
            </div>
          </aside>
        </article>
      </section>
    </>
  );
};

export default Presentation;
