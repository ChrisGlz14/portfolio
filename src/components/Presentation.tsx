import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import * as dataEn from '../app/lib/languages/en.json' //Forma de importar todos los datos del archivo JSON con ts
import * as dataEs from '../app/lib/languages/es.json'


const Presentation = () => {
  const theme = useAppSelector(state => state.themeReducer.mode)
  const language = useAppSelector(state => state.langReducer.mode)
  const data = language === "es" ? dataEs : dataEn; //Creo una constante data, igualo language a dataEs en caso de ser identico a "es" y de lo contrario la igualo a dataEn

  
  return (
    <>
      <section className="portfolio-container flex justify-start content-center h-[815px]" id="home">
        <article className="flex-container flex m-auto items-center">
          <section className="content-container flex flex-col mx-9">
            <header className="container-presentation text-center">
              <span data-section="profile" data-value="presentation-name" className="flex text-xl font-semibold text-start mt-2 text-[#a63929]" >
              {data?.profile['presentation-name']}
              </span>
            </header>
            <section className={`portfolio-name text-5xl font-semibold ${theme === 'light' ? "text-black" : "text-white" }`} >
              <h1>Christian Gonzalez</h1>
            </section>
            <section className={`presentation-paragraph text-center flex ${theme === 'light' ? "text-black" : "text-white"}`}>
              <p data-section="profile" data-value="presentation">
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
              width={200}
              height={200}
            />
            <div className="contact">
              <a href="https://www.linkedin.com/in/chrisglz14" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/ChrisGlz14" target="_blank">
                <i className="fa-brands fa-square-github"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=3425933218"
                target="_blank"
              >
                <i className="fa-brands fa-square-whatsapp"></i>
              </a>
            </div>
          </aside>
        </article>
      </section>
    </>
  );
};

export default Presentation;
