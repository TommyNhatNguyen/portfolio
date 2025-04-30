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
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
  });
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
  const aboutContentTitle = aboutSection.querySelector(
    ".scabout__content-title"
  );
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

  const run = document.querySelector(".running");
  const aboutContentTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: aboutContent,
      start: "-=500 +=50%",
      end: "bottom bottom",
      scrub: 1,
    },
  });
  aboutContentTimeline.set(run, {
    opacity: 1,
  });
  aboutContentTimeline
    .to(run, {
      motionPath: {
        path: "#scabout-curve-path",
        autoRotate: true,
        start: 0.03,
        align: "#scabout-curve-path",
        alignOrigin: [0.5, 0.5],
        offsetX: 30,
        offsetY: -30,
      },
      transformOrigin: "50% 50%",
      ease: "circ.out",
    })
    .to(run, {
      motionPath: {
        path: "#scabout-curve-line",
        autoRotate: true,
        align: "#scabout-curve-line",
        alignOrigin: [0.5, 0.5],
        offsetX: 30,
        offsetY: -30,
        end: 0.99,
      },
      transformOrigin: "50% 50%",
      ease: "circ.out",
    });

  const aboutItemList = aboutContent.querySelectorAll(".about-item");
  const aboutItemImages = Array.from(
    aboutItemList[0].querySelectorAll(".about-item__middle img")
  );
  const aboutItemTexts = Array.from(
    aboutItemList[0].querySelectorAll(".about-item__bottom .content")
  );
  gsap.set([aboutItemImages.slice(1), aboutItemTexts.slice(1)], {
    y: `100%`,
  });
  let animating = false;
  let currentIndex = -1;
  const aboutItemObserver = Observer.create({
    tolerance: 10,
    target: window,
    onDown: (self) => {
      if (!animating && currentIndex < aboutItemImages.length - 2) {
        ++currentIndex;
        gsap.to([aboutItemImages[currentIndex], aboutItemTexts[currentIndex]], {
          y: `-100%`,
          duration: 0.8,
          onStart: () => {
            animating = true;
          },
          onComplete: () => {
            animating = false;
            if (currentIndex == aboutItemImages.length - 2) {
              setTimeout(() => self.disable(), 0.8);
            }
          },
          ease: "power2.inOut",
        });
        gsap.to(
          [aboutItemImages[currentIndex + 1], aboutItemTexts[currentIndex + 1]],
          {
            y: 0,
            duration: 0.8,
            ease: "power2.inOut",
          }
        );
      }
    },
    preventDefault: true,
  });
  aboutItemObserver.disable();
  gsap.to(aboutItemList, {
    scrollTrigger: {
      trigger: aboutItemList,
      start: "-=100 +=50%",
      end: "+=1",
      scrub: 1,
      markers: true,
      pin: true,
    },
    onStart: () => {
      if (currentIndex < aboutItemImages.length - 2) {
        aboutItemObserver.enable();
      }
    },
    onComplete: () => {
      if (currentIndex < aboutItemImages.length - 2) {
        aboutItemObserver.enable();
      }
    },
  });
});
