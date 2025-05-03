// @ts-expect-error import error
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { MotionPathPlugin, ScrollToPlugin } from "gsap/all";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure window is loaded before running the script
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
window.addEventListener("load", () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
  });
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
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

  /**
     ----------------------------------------------------
     SECTION MOTTO
     ----------------------------------------------------
    */
  const mottoSection = document.querySelector("#scmotto");
  const mottoItemsContainer = mottoSection.querySelector(".scmotto__images");
  const mottoItems = mottoItemsContainer.querySelectorAll(
    ".scmotto__images-item"
  );
  mottoItems.forEach((item) => {
    const direction = Math.random() * 2 - 1;
    const aspectRatio = item.clientWidth / item.clientHeight;
    const heightScale = Math.max(Math.random() * 2, 0.2);
    const newHeight = Math.min(item.clientHeight * heightScale, 300);
    const newWidth = newHeight * aspectRatio;
    gsap.set(item, {
      height: newHeight,
      width: newWidth,
      y: direction * 100,
    });
  });
  let loop = horizontalLoop(".scmotto__images-item", {
    speed: 1,
    repeat: -1,
    paddingRight: 25,
  });

  /**
     ----------------------------------------------------
     HEADER
     ----------------------------------------------------
    */
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".header__hamburger");
  const navigations = header.querySelectorAll(".header__nav-content .item a");
  const activeHeader = () => {
    header.classList.add("--active");
    document.body.classList.add("--disable-scroll");
    heroPortfolioObserver.disable();
  };
  const deactiveHeader = () => {
    header.classList.remove("--active");
    document.body.classList.remove("--disable-scroll");
    heroPortfolioObserver.enable();
  };
  hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (header.classList.contains("--active")) {
      deactiveHeader();
    } else {
      activeHeader();
    }
  });
  document.addEventListener("click", () => {
    deactiveHeader();
  });
  navigations.forEach((item) => {
    const href = item.getAttribute("href-data");
    item.parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      gsap.to(window, { duration: 2, scrollTo: href });
      deactiveHeader();
    });
  });
});

type HorizontalLoopConfig = {
  speed?: number;
  repeat?: number;
  paused?: boolean;
  reversed?: boolean;
  paddingRight?: number;
  snap?: boolean | number;
};

function horizontalLoop(
  items: NodeListOf<HTMLElement> | HTMLElement[] | string,
  config: HorizontalLoopConfig = {}
): gsap.core.Timeline {
  const elements: HTMLElement[] = gsap.utils.toArray(items) as HTMLElement[];
  const length = elements.length;
  const startX = elements[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : // @ts-ignore
        gsap.utils.snap(config.snap || 1);
  let totalWidth: number;
  let curX: number;
  let distanceToStart: number;
  let distanceToLoop: number;
  let item: HTMLElement;
  let i: number;

  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: function () {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  gsap.set(elements, {
    xPercent: (i: number, el: HTMLElement) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string
      ));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });
  gsap.set(elements, { x: 0 });

  totalWidth =
    elements[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    elements[length - 1].offsetWidth *
      (gsap.getProperty(elements[length - 1], "scaleX") as number) +
    (config.paddingRight || 0);

  for (i = 0; i < length; i++) {
    item = elements[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart +
      widths[i] * (gsap.getProperty(item, "scaleX") as number);
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars) {
    vars = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  // @ts-ignore
  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  // @ts-ignore
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  // @ts-ignore
  tl.current = () => curIndex;
  // @ts-ignore
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
  // @ts-ignore
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    // @ts-ignore
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
