

export const scrollHome = () => {
    const homeSection = document.getElementById("home");
    homeSection?.scrollIntoView({ behavior: "smooth" });
}

export const scrollProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
}

export const scrollRepos = () => {
    const reposSection = document.getElementById("repos");
    reposSection?.scrollIntoView({ behavior: "smooth" });
}

export const scrollStack = () => {
    const stackSection = document.getElementById("stack");
    stackSection?.scrollIntoView({ behavior: "smooth" });
}

