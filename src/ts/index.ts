import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Make sure window is loaded before running the script
window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
  /**
     ----------------------------------------------------
     SECTION HERO 
     ----------------------------------------------------
    */
  const heroSection = document.querySelector("#schero");
  const heroSectionWrapper = heroSection.querySelector(".schero-wrapper");
  const heroTitle = heroSection.querySelector(".schero__top-title");
  const heroDescription = heroSection.querySelector(".schero__top-desc");
  const heroImage = heroSection.querySelector(".schero__profile");
  const heroPortfolio = heroSection.querySelector(".schero__bottom-title");
  const heroSectionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      markers: true,
      snap: {
        snapTo: 1,
      },
    },
  });
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
      x: "-110%",
    })
    .to(heroSection, {
      willChange: "transform",
      transform: "scale(0.8) translateY(10%)",
      onStart: () => {
        heroSection.classList.add("--with-border-radius");
      },
      onReverseComplete: () => {
        heroSection.classList.remove("--with-border-radius");
      },
    });
  /**
     ----------------------------------------------------
     SECTION WORK 
     ----------------------------------------------------
    */
  console.log(
    "🚀 ~ window.addEventListener ~ heroSection.clientHeight:",
    heroSection.clientHeight
  );
  const workSection = document.querySelector("#scwork");
  heroSectionTimeline.to(
    workSection,
    {
      willChange: "transform",
      y: `-${heroSection.clientHeight}px`,
    },
    "<"
  );
});
