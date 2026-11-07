# Portfolio de Desarrollo - README

## Introducción
Este repositorio contiene el código fuente y los recursos utilizados para construir mi portfolio de desarrollo.

## Editar la línea temporal

La sección **Experiencia profesional** se alimenta del array `experience.entries` en estos archivos:

- `src/app/lib/languages/es.json`: contenido en español.
- `src/app/lib/languages/en.json`: contenido en inglés.

Las entradas se muestran en el mismo orden del array, sin ordenar automáticamente por fecha.

Cada entrada tiene estos campos:

| Campo | Contenido |
| --- | --- |
| `id` | Identificador único y estable, igual en ambos idiomas. |
| `period` | Fecha o período que querés mostrar. |
| `role` | Puesto, actividad o etapa de formación. |
| `organization` | Empresa, institución o proyecto. |
| `description` | Resumen de tu aporte, aprendizaje o logros. |
| `highlights` | Lista de aportes o responsabilidades; puede quedar vacía. |
| `technologies` | Lista de tecnologías y herramientas. |
| `kind` | Tipo de ícono: `learning`, `code`, `design` o `work`. |

Para agregar un hito, duplicá un objeto completo dentro de `entries`, asignale un `id` nuevo y completá sus datos en ambos idiomas. Podés quitar o reordenar entradas sin cambiar el componente. Los títulos de sección se editan en `experience`; el título profesional de la presentación, en `profile.role`.

La sección conserva los temas claro y oscuro. El fondo decorativo de Three.js está separado en `src/components/ExperienceScene.tsx`: se carga cerca de la sección, pausa fuera de vista y respeta la preferencia de movimiento reducido. El contenido sigue disponible si el navegador no admite WebGL. Los estilos de la línea temporal están en `src/app/styles/experience.css`.

## Botón de volver arriba en 3D

`src/components/BtnUp.tsx` controla la aparición del botón al superar los 400 px y el regreso al inicio. La flecha biselada de Three.js está en `src/components/BackToTopScene.tsx`; su base de esquinas redondeadas y tamaños de 56 px (escritorio) y 48 px (móvil) se ajustan en `src/app/styles/back-to-top.css`.

La flecha tiene volumen y una inclinación leve que responde al cursor, sin aros, partículas ni animación continua. La escena se actualiza durante la interacción y deja de renderizar cuando alcanza su posición; también se pausa con el botón o la pestaña ocultos. Si el usuario prefiere movimiento reducido o WebGL no está disponible, se muestra una flecha estática que mantiene la misma función.

## Agradecimientos
Quiero expresar mi profundo agradecimiento a Miguel Ángel Durán García (Midudev) y Gonzalo Pozzo (Goncy) por su invaluable conocimiento que transmiten día a día. Son responsables de mi aprendizaje y forman parte de mi camino como desarrollador. ¡Muchas gracias, chicos!

## Características
# React.js y TypeScript

## Utilización de componentes en React
Se modularizó la aplicación utilizando componentes en React, lo que facilita el desarrollo y mantenimiento del código al dividir la interfaz de usuario en partes reutilizables y fáciles de entender.

## Integración de TypeScript con React
Se integró TypeScript con React para agregar tipos estáticos a JavaScript, lo que proporciona una mayor seguridad y escalabilidad al código, al tiempo que facilita la detección de errores durante el desarrollo.

## Integración de iconos en la aplicación
Se utilizó React Icons para integrar iconos en la aplicación, mejorando la estética y la usabilidad al proporcionar una amplia variedad de íconos personalizables y de alta calidad.

## Utilización de Tailwind CSS
Se empleó Tailwind CSS para el diseño y estilización de componentes y elementos de la interfaz de usuario, aprovechando su enfoque de utilidad y clases predefinidas para un desarrollo más eficiente y rápido.

# Redux

## Implementación de Redux
Se utilizó Redux para manejar el estado de la aplicación de forma centralizada y predecible, lo que facilita la gestión y actualización de datos en toda la aplicación.

## Uso de proveedores (Providers)
Se envolvió la aplicación con proveedores (Providers) para proporcionar el contexto de Redux a todos los componentes, permitiendo el acceso al estado global de manera sencilla y eficiente.

# Next.js

## Aprovechamiento de Next.js
Se aprovechó Next.js como framework para aplicaciones web, lo que proporciona funcionalidades avanzadas como el renderizado del lado del servidor (SSR) y la generación de sitios estáticos (SSG) para mejorar el rendimiento y la optimización de SEO.

## Implementación de SSR
Se implementó el renderizado del lado del servidor (SSR) para mejorar el rendimiento y la eficiencia de la aplicación al generar el HTML en el servidor antes de enviarlo al cliente, lo que mejora la carga inicial y la indexación en motores de búsqueda.

## Uso de componentes especiales de Next.js
Se utilizaron componentes especiales proporcionados por Next.js, como Image y Link, para mejorar el rendimiento y la accesibilidad de la aplicación al optimizar la carga de imágenes y la navegación entre páginas.

## Utilización de skeletons con Next.js
Se implementaron skeletons con Next.js para mejorar la experiencia del usuario al cargar contenido dinámico, permitiendo mostrar un esqueleto de la interfaz mientras se espera la carga de los datos, lo que mejora la percepción de velocidad y suavidad de la aplicación.

# Otros

## Utilización de la API de GitHub
Se utilizó la API de GitHub para obtener el contenido de los repositorios propios, lo que permitió mostrar información detallada sobre los proyectos alojados en GitHub, como descripciones, estrellas y lenguajes utilizados.

## Utilización de archivos JSON para internacionalización
Se utilizaron archivos JSON creados para almacenar información en dos idiomas (inglés y español), permitiendo la internacionalización de la aplicación y la adaptación del contenido según las preferencias del usuario.

