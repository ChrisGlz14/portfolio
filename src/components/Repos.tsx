import CardSkeleton from "@/app/ui/skeletons";
import langSlice from "@/redux/features/langSlice";
import { useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  create_at: string;
}

const url = "https://api.github.com/users/ChrisGlz14/repos";
const Repos = () => {
  const theme = useAppSelector((state)=> state.themeReducer.mode)
  const language = useAppSelector((state) => state.langReducer.mode);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          // Simular un tiempo de carga de 2 segundos
          setTimeout(() => {
            setRepos(data.slice(-8));
            setLoading(false); // Cuando se completó la carga, establecer loading en false
          }, 2000);
        } else {
          console.log("error");
          setLoading(false); // Si hay un error, también debes establecer loading en false
        }
      } catch (error) {
        console.error("error", error);
        setLoading(false); // Si hay una excepción, también debes establecer loading en false
      }
    };

    fetchdata();
  }, []);

  if (loading) {
    return (
      <>
      <h1 className="text-3xl text-center mt-44" id="repos" data-section="repos">{ language == "es" ? "MIS REPOSITORIOS" : "MY REPOSITORIES"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      </>
    ); // Muestra el esqueleto mientras se está cargando
  }

  return (
    <>
      <h1 className={`text-3xl text-center mt-44 ${theme === "light" ? "text-black" : "text-white"}`}>{ language == "es" ? "MIS REPOSITORIOS" : "MY REPOSITORIES"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="w-[20rem] h-[16rem] mt-10 p-6 flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="xl:text-lg">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {repo.name ? repo.name : repo.create_at}
              </h5>
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {repo.description}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ir a Github
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Repos;
