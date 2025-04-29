import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Make sure window is loaded before running the script
// window.scrollTo({
//   top: 0,
//   behavior: "smooth",
// });
const DEFAULT_WINDOW_WIDTH = 1440;
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
  const aboutContentTitle = aboutSection.querySelector(
    ".scabout__content-title"
  );
  const aboutContentTitleText = aboutContentTitle.querySelector(".text");
  const aboutContentTitleCaption = aboutContentTitle.querySelector(".caption");
  const aboutSectionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: workSection,
      start: `${workSection.clientHeight - 1000} top`,
      end: `${workSection.clientHeight} top`,
      scrub: 1,
    },
  });

  const aboutDotElementList = aboutSection.querySelectorAll(
    ".scabout__content-list .about-item .dot"
  );
  const aboutFirstDotElement = aboutDotElementList[0];
  const aboutLastDotElement =
    aboutDotElementList[aboutDotElementList.length - 1];
  console.log(
    "🚀 ~ window.addEventListener ~ aboutLastDotElement:",
    aboutLastDotElement
  );
  const aboutSvgLine = aboutSection.querySelector(".about-connect__line");
  const aboutSvgLinePath = aboutSvgLine.querySelector("path");
  const startXSvgLine =
    aboutContent.clientWidth -
    aboutFirstDotElement.parentElement.getBoundingClientRect().width +
    10;
  const endXSvgLine = startXSvgLine;
  const aboutSvgLinePathWidth = aboutContent.clientWidth;
  const aboutSvgLinePathHeight =
    aboutLastDotElement.getBoundingClientRect().bottom -
    aboutFirstDotElement.getBoundingClientRect().top +
    80;
  aboutSvgLinePath.setAttribute(
    "d",
    `M${startXSvgLine} 100 ${endXSvgLine} ${aboutSvgLinePathHeight}`
  );
  aboutSvgLine.setAttribute("width", `${aboutSvgLinePathWidth}`);
  aboutSvgLine.setAttribute("height", `${aboutSvgLinePathHeight}`);
  aboutSvgLine.setAttribute(
    "viewBox",
    `0 0 ${aboutSvgLinePathWidth} ${aboutSvgLinePathHeight}`
  );

  const aboutSvgContainer = aboutSection.querySelector(".scabout__content-svg");
  const aboutSvgPathElement = aboutSvgContainer.querySelector("path");
  const verticalDistanceBetweenTitleAndDot =
    aboutFirstDotElement.getBoundingClientRect().top -
    aboutContentTitle.getBoundingClientRect().top;
  const svgHeight =
    aboutFirstDotElement.getBoundingClientRect().bottom -
    aboutContentTitle.getBoundingClientRect().top;
  const svgWidth = aboutContent.clientWidth;
  aboutSvgContainer.setAttribute("height", `${svgHeight}px`);
  aboutSvgContainer.setAttribute("width", `${svgWidth}px`);
  aboutSvgContainer.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  const startX =
    aboutContentTitle.getBoundingClientRect().right -
    aboutContentTitle.getBoundingClientRect().left -
    15;
  const endX =
    aboutContent.clientWidth -
    aboutFirstDotElement.parentElement.getBoundingClientRect().width;
  const endY = verticalDistanceBetweenTitleAndDot - 64;
  aboutSvgPathElement.setAttribute(
    "d",
    `M${startX} 3 C897.25 -16.0003, 872.875 356.6667, ${endX} ${endY}`
  );
  window.addEventListener("resize", () => {
    const startXSvgLine =
      aboutContent.clientWidth -
      aboutFirstDotElement.parentElement.getBoundingClientRect().width +
      10;
    const endXSvgLine = startXSvgLine;
    const aboutSvgLinePathWidth = aboutContent.clientWidth;
    const aboutSvgLinePathHeight =
      aboutLastDotElement.getBoundingClientRect().bottom -
      aboutFirstDotElement.getBoundingClientRect().top +
      80;
    aboutSvgLinePath.setAttribute(
      "d",
      `M${startXSvgLine} 100 ${endXSvgLine} ${aboutSvgLinePathHeight}`
    );
    aboutSvgLine.setAttribute("width", `${aboutSvgLinePathWidth}`);
    aboutSvgLine.setAttribute("height", `${aboutSvgLinePathHeight}`);
    aboutSvgLine.setAttribute(
      "viewBox",
      `0 0 ${aboutSvgLinePathWidth} ${aboutSvgLinePathHeight}`
    );

    const verticalDistanceBetweenTitleAndDot =
      aboutFirstDotElement.getBoundingClientRect().top -
      aboutContentTitle.getBoundingClientRect().top;
    const svgHeight =
      aboutFirstDotElement.getBoundingClientRect().bottom -
      aboutContentTitle.getBoundingClientRect().top;
    const svgWidth = aboutContent.clientWidth;
    aboutSvgContainer.setAttribute("height", `${svgHeight}px`);
    aboutSvgContainer.setAttribute("width", `${svgWidth}px`);
    aboutSvgContainer.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    const startX =
      aboutContentTitle.getBoundingClientRect().right -
      aboutContentTitle.getBoundingClientRect().left -
      15;
    const endX =
      aboutContent.clientWidth -
      aboutFirstDotElement.parentElement.getBoundingClientRect().width;
    const endY = verticalDistanceBetweenTitleAndDot - 68;
    aboutSvgPathElement.setAttribute(
      "d",
      `M${startX} 3 C897.25 -16.0003, 872.875 356.6667, ${endX} ${endY}`
    );
  });

  aboutSectionTimeline.to(aboutSection, {
    willChange: "transform",
    y: -500,
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
});
