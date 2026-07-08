/* =========================================================
   Interações do Portfólio Pessoal
   Recursos: navbar dinâmica, animações ao rolar e formulário
   ========================================================= */

// Aguarda o carregamento completo do DOM antes de executar os scripts.
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section, header");
  const revealElements = document.querySelectorAll(".reveal");
  const currentYear = document.getElementById("currentYear");
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  // Atualiza automaticamente o ano no rodapé.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Adiciona sombra e reduz o padding da navbar ao rolar a página.
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll);

  // Anima os elementos quando entram na área visível da tela.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  // Destaca o link ativo de acordo com a seção exibida.
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.45,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Fecha o menu mobile após clicar em um link.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");

      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });

  // Simula o envio do formulário e exibe feedback amigável.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      formFeedback.textContent = "Mensagem preparada com sucesso! Substitua esta ação por uma integração real de envio.";
      contactForm.reset();

      setTimeout(() => {
        formFeedback.textContent = "";
      }, 5500);
    });
  }
});
