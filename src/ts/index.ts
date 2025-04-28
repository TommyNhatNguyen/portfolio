import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Make sure window is loaded before running the script
window.addEventListener("load", () => {
  /**
     ----------------------------------------------------
     SECTION HERO 
     ----------------------------------------------------
    */
  const heroSection = document.querySelector("#schero");
  const heroTitle = heroSection.querySelector(".schero__top-title");
  const heroDescription = heroSection.querySelector(".schero__top-desc");
  const heroImage = heroSection.querySelector(".schero__profile");
  const heroPortfolio = heroSection.querySelector(".schero__bottom-title");
  const heroSectionTimeline = gsap.timeline({});
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    [heroTitle, heroImage, heroDescription],
    {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "top top",
      },
      opacity: 0,
      translateY: 50,
    },
    {
      opacity: 1,
      translateY: 0,
      stagger: 0.3,
      ease: "power2.inOut",
    }
  );
  heroSectionTimeline
    .to(heroPortfolio, {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: true,
        pin: true,
      },
      x: "-105%",
    })
    .to(heroSection, {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: true,
      },
      willChange: "transform",
      transform: "scale(0.9)",
      onStart: () => {
        heroSection.classList.add("--with-border-radius");
      },
      onReverseComplete: () => {
        heroSection.classList.remove("--with-border-radius");
      },
    });
});
