(function () {
  "use strict";

  function iniciarReveal() {
    const elementos = document.querySelectorAll(".reveal");
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mantém tudo visível em casos sem suporte ou movimento reduzido.
    if (
      !elementos.length ||
      reduzirMovimento ||
      !("IntersectionObserver" in window)
    ) {
      elementos.forEach((elemento) => {
        elemento.classList.add("is-visible");
      });

      return;
    }

    // Ativa o estado inicial da animação.
    document.documentElement.classList.add("js-reveal-ready");

    const observador = new IntersectionObserver(
      (entradas, observer) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) {
            return;
          }

          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -5% 0px",
        threshold: 0
      }
    );

    elementos.forEach((elemento) => {
      observador.observe(elemento);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarReveal);
  } else {
    iniciarReveal();
  }
})();
