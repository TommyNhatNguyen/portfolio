// @ts-expect-error import error
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/all";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure window is loaded before running the script
// window.scrollTo({
//   top: 0,
//   behavior: "smooth",
// });
const DEFAULT_WINDOW_WIDTH = 1440;
window.addEventListener("load", () => {
  // const scroll = new LocomotiveScroll({
  //   el: document.querySelector("[data-scroll-container]"),
  // });
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Observer);
  gsap.registerPlugin(MotionPathPlugin);
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
    // preventDefault: true,
  });
  const heroSectionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 1,
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
    const img = item.querySelector(".project__titlegroup-image img");
    const imgContainer = item.querySelector(".project__titlegroup-image");
    const text = item.querySelector(
      ".project__titlegroup .project__titlegroup-title"
    );
    workListItemTimeline.to(
      img,
      {
        y: Number(item.dataset.speed) * 300,
      },
      "<"
    );
    workListItemTimeline.to(
      text,
      {
        y: Number(item.dataset.speed) * -500,
      },
      "<"
    );
    workListItemTimeline.to(
      imgContainer,
      {
        y: Number(item.dataset.speed) * -500,
      },
      "<"
    );
    workListItemTimeline.to(
      item,
      {
        y: Number(item.dataset.speed) * -500,
      },
      "<"
    );
  });
  /**
     ----------------------------------------------------
     SECTION ABOUT
     ----------------------------------------------------
    */
  const aboutSection = document.querySelector("#scabout");
  const aboutTitleFocus = aboutSection.querySelector(".scabout__title-focus");
  const aboutTitleContent = aboutSection.querySelector(
    ".scabout__title-content"
  );
  const aboutContent = aboutSection.querySelector(".scabout__content");
  const aboutItemList = aboutContent.querySelectorAll(".about-item");

  const aboutContentLine = aboutSection.querySelector(".scabout__content-line");
  const aboutContentLinePath = aboutContentLine.querySelector("path");
  const ship = aboutSection.querySelector(".running");
  gsap.set(ship, {
    xPercent: -50,
    yPercent: -165,
    transformOrigin: "50% 50%",
  });
  gsap.to(ship, {
    scrollTrigger: {
      trigger: aboutContent,
      start: "top center",
      end: "+=16756 center",
      scrub: 0.5,
    },
    motionPath: {
      path: aboutContentLinePath,
      align: aboutContentLinePath,
      autoRotate: true,
      offsetX: ship.clientHeight / 2,
      offsetY: ship.clientHeight / 2,
    },
  });

  gsap.set([aboutTitleFocus, aboutTitleContent], {
    opacity: 0,
    translateY: 50,
  });
  gsap.to([aboutTitleFocus, aboutTitleContent], {
    scrollTrigger: {
      trigger: aboutSection,
      start: `top bottom`,
      end: `top bottom`,
    },
    opacity: 1,
    translateY: 0,
    stagger: 0.3,
    duration: 1,
    ease: "power2.inOut",
  });

  aboutItemList.forEach((item, index) => {
    const images = Array.from(
      item.querySelectorAll(".about-item__middle img")
    ).slice(1);
    const contents = Array.from(
      item.querySelectorAll(".about-item__bottom .content")
    );
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "center center",
        end: `+=${images[0].clientHeight * 3}`,
        scrub: 1,
        pin: true,
      },
    });
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "center center",
        end: `+=${images[0].clientHeight * 3}`,
        scrub: 1,
      },
    });
    images.forEach((_, index) =>
      timeline
        .to(images[images.length - index - 1], {
          yPercent: -100,
        })
        .to(
          contents[index],
          {
            yPercent: -100 * (index + 1),
          },
          "<"
        )
        .to(
          contents[index + 1],
          {
            yPercent: -100,
          },
          "<"
        )
    );
  });
});
