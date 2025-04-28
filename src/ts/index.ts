import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Make sure window is loaded before running the script
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Observer);
  /**
     ----------------------------------------------------
     SECTION HERO
     ----------------------------------------------------
    */
  let heroPortfolioTranslateX = 0;
  const heroSection = document.querySelector("#schero");
  const heroSectionWrapper = heroSection.querySelector(".schero-wrapper");
  const heroTitle = heroSection.querySelector(".schero__top-title");
  const heroDescription = heroSection.querySelector(".schero__top-desc");
  const heroImage = heroSection.querySelector(".schero__profile");
  const heroPortfolio = heroSection.querySelector(".schero__bottom-title");
  const heroPortfolioObserver = Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    onDown: (data) => {
      if (heroPortfolioTranslateX > -110) {
        heroPortfolioTranslateX -= 1;
      }
    },
    onUp: () => {
      if (heroPortfolioTranslateX < 0) {
        heroPortfolioTranslateX += 1;
      }
    },
    onChangeY: (self) => {
      if (heroPortfolioTranslateX <= -110) {
        self.disable();
      }
      gsap.to(heroPortfolio, {
        x: `${heroPortfolioTranslateX}%`,
        willChange: "transform",
      });
    },
    preventDefault: true,
  });
  const heroSectionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      markers: true,
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
  heroSectionTimeline.to(heroSection, {
    willChange: "transform",
    transform: "scale(0.8) translateY(100%)",
    onStart: () => {
      heroSection.classList.add("--with-border-radius");
    },
    onReverseComplete: () => {
      heroSection.classList.remove("--with-border-radius");
      heroPortfolioObserver.enable();
    },
  });
  /**
     ----------------------------------------------------
     SECTION WORK
     ----------------------------------------------------
    */
  const workSection = document.querySelector("#scwork");
  const workSectionWrapper = workSection.querySelector(".scwork-wrapper");
  // const workList = workSection.querySelector(".scwork__list");
  const workListItems =
    workSectionWrapper.querySelectorAll(".scwork__list-item");
  const workListItemTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: workSectionWrapper,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
  workListItems.forEach((item: HTMLElement, index) => {
    workListItemTimeline.to(
      item,
      {
        y: Number(item.dataset.speed) * -500,
      },
      "<"
    );
  });
});
