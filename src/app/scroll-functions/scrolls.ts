const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const navigation = document.querySelector(".nav-glass");
    const offset = (navigation?.getBoundingClientRect().height ?? 0) + 20;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mantener el foco en contenido visible al cerrar el menú móvil.
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });

    window.scrollTo({
        top: Math.max(0, section.getBoundingClientRect().top + window.scrollY - offset),
        behavior: reducedMotion ? "auto" : "smooth",
    });
};

export const scrollHome = () => scrollToSection("home");
export const scrollExperience = () => scrollToSection("experience");
export const scrollProjects = () => scrollToSection("projects");
export const scrollRepos = () => scrollToSection("repos");
export const scrollStack = () => scrollToSection("stack");

