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
// Lightbox de zoom para imagens dos cases
// Sem dependências externas. Funciona em desktop e mobile.

(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-hidden', 'true');

  const img = document.createElement('img');
  img.alt = '';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Fechar imagem ampliada');
  closeBtn.innerHTML = '&times;';

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.case__figure img').forEach((figureImg) => {
    figureImg.addEventListener('click', () => {
      openLightbox(figureImg.src, figureImg.alt);
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === img) {
      closeLightbox();
    }
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeLightbox();
    }
  });
})();
