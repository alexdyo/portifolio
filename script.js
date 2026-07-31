/*
  Reveal leve e acessível:
  - Respeita a preferência de movimento reduzido do usuário.
  - Usa IntersectionObserver, sem eventos pesados de scroll.
  - Remove cada elemento da observação após revelá-lo.
*/

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Mostra todos os elementos sem animação quando o usuário prefere menos movimento.
  if (prefersReducedMotion.matches) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  // Fallback para navegadores sem suporte a IntersectionObserver.
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        // Depois de aparecer, o elemento não precisa mais ser observado.
        currentObserver.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});
