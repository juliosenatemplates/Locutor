```javascript
/* =========================================================
   JJREC STUDIO
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const backToTop = document.getElementById("backToTop");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", (event) => {

            // Impede o clique de ser interpretado como clique fora
            event.stopPropagation();

            menuToggle.classList.toggle("active");
            nav.classList.toggle("open");

            const isOpen = nav.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       FECHAR MENU AO CLICAR EM UM LINK
       ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (!nav || !menuToggle) return;

            nav.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       HEADER — ESCONDER AO DESCER
       ===================================================== */

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;

            const currentScroll = window.scrollY;


            // No topo: header sempre aparece
            if (currentScroll <= 50) {

                header.classList.remove("hidden");

                lastScroll = currentScroll;

                return;

            }


            // Descendo: esconde
            if (currentScroll > lastScroll) {

                header.classList.add("hidden");

            }

            // Subindo: mostra
            else {

                header.classList.remove("hidden");

            }

            lastScroll = currentScroll;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       NAVEGAÇÃO ATIVA
       ===================================================== */

    function updateActiveLink() {

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
       ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            if (!backToTop) return;


            if (window.scrollY > 600) {

                backToTop.classList.add("show");

            }

            else {

                backToTop.classList.remove("show");

            }

        },
        {
            passive: true
        }
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /* =====================================================
       ROLAGEM SUAVE
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.offsetTop -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       FECHAR MENU AO CLICAR FORA
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (!nav || !menuToggle) return;


            const clickedInsideMenu =
                nav.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);


            if (
                nav.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedButton
            ) {

                nav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NA TELA
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section-header, " +
            ".main-player, " +
            ".work-card, " +
            ".about-image-area, " +
            ".about-content, " +
            ".contact-card, " +
            ".quote-content"
        );


    animatedElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    /* =====================================================
       INTERSECTION OBSERVER
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {

                            return;

                        }


                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            revealObserver.observe(element);

        });

    }

    else {

        // Fallback para navegadores antigos

        animatedElements.forEach(element => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        });

    }


    /* =====================================================
       ANIMAÇÃO DOS CARDS
       ===================================================== */

    const workCards =
        document.querySelectorAll(".work-card");


    workCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    });


    /* =====================================================
       DATA / ANO AUTOMÁTICO
       ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom span"
        );


    if (footerYear) {

        const currentYear =
            new Date().getFullYear();


        footerYear.textContent =
            `© ${currentYear} JJREC STUDIO. Todos os direitos reservados.`;

    }


    /* =====================================================
       PREVENIR LINKS "#"
       ===================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       LOG DE INICIALIZAÇÃO
       ===================================================== */

    console.log(
        "%cJJREC STUDIO",
        "font-size: 24px; font-weight: 900; color: #ffd000;"
    );

    console.log(
        "%cWebsite carregado com sucesso.",
        "font-size: 12px; color: #999;"
    );


    /* =====================================================
       VERIFICAÇÃO DO MENU
       ===================================================== */

    if (!menuToggle) {

        console.warn(
            "JJREC STUDIO: elemento #menuToggle não encontrado."
        );

    }

    if (!nav) {

        console.warn(
            "JJREC STUDIO: elemento #nav não encontrado."
        );

    }

});
```
