import CardSkeleton from "@/app/ui/skeletons";
import { useAppSelector } from "@/redux/hook";
import { VscGithub } from "react-icons/vsc";
import React, { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  language: string | null;
}

// sort=pushed trae los repos ordenados por actividad más reciente
const url = "https://api.github.com/users/ChrisGlz14/repos?sort=pushed&per_page=8";

const Repos = () => {
  const language = useAppSelector((state) => state.langReducer.mode);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setTimeout(() => {
            setRepos(data);
            setLoading(false);
          }, 2000);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("error", error);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const title = language === "es" ? "MIS REPOSITORIOS" : "MY REPOSITORIES";
  const goTo  = language === "es" ? "Ver en GitHub" : "View on GitHub";

  if (loading) {
    return (
      <>
        <h1 className="text-3xl text-center mt-44 text-themed" id="repos" data-section="nav-repos">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-5 mt-10">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-44 text-themed" id="repos">
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-5 mt-10">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card w-[20rem] min-h-[13rem] p-5 flex flex-col gap-3">

            <h5 className="repo-card-title text-base font-bold truncate">
              {repo.name}
            </h5>

            <p className="repo-card-desc flex-1">
              {repo.description ?? "—"}
            </p>

            <div className="flex items-center justify-between mt-auto pt-1">
              {repo.language ? (
                <span className="repo-lang-badge">{repo.language}</span>
              ) : (
                <span />
              )}
              <a href={repo.html_url} target="_blank" className="repo-card-btn">
                <VscGithub />
                {goTo}
              </a>
            </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default Repos;
