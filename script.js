/*
  Reveal leve e seguro:
  - Conteúdo permanece visível caso o JavaScript não carregue.
  - A classe global só é ativada após validar os recursos necessários.
  - Respeita preferência de movimento reduzido.
*/

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Sem elementos, não há nada para animar.
  if (!revealElements.length) {
    return;
  }

  // Usuário pediu menos movimento: mantém tudo visível.
  if (prefersReducedMotion.matches) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  // Navegador sem suporte: mantém tudo visível.
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  // Ativa o estado inicial da animação somente com JavaScript funcional.
  document.documentElement.classList.add("js-reveal-ready");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
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
