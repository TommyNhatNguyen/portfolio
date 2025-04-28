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
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    [heroTitle, heroImage, heroDescription],
    {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "top top",
        markers: true,
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
});
