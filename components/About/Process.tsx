"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const contents = [
  {
    title: "Our process",
    desc: "We believe great brands are built through clarity, collaboration, and consistency. Every project begins with understanding your goals, and every step that follows is designed to bring your brand to life seamlessly, strategically, and with purpose.",
    image: null,
  },
  {
    title: "01. Discovery ",
    desc: "We start by learning about your business, your audience, and your ambitions. This stage is about understanding your world - what drives you, what challenges you face, and what you want your brand to become. The clearer the picture, the stronger the foundation.",
    image:
      "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/team-meeting-renewable-energy-project-close-up.jpg?updatedAt=1760076854211",
  },
  {
    title: "02. Moodboards",
    desc: "Here’s where vision meets structure. We gather insights, explore visual references, and develop moodboards to define the creative tone. Every idea is discussed, refined, and aligned with your goals before moving forward.",
    image:
      "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/business-people-brainstorming-using-notebook.jpg?updatedAt=1760076779991",
  },
  {
    title: "03. Brand identity",
    desc: "We shape your brand from the ground up - defining its essence, voice, and visual language. From logo and color palette to typography and key messaging, we build a cohesive identity that captures who you are and connects with the people you serve",
    image:
      "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/Blank%20Identity%20-%20Quim%20Marin.jpeg?updatedAt=1760088045039",
  },
  {
    title: "04. Wireframes",
    desc: "Once the identity is in place, we focus on functionality. We map out your digital experience through detailed wireframes and content structure, ensuring every element serves a purpose. Our process is transparent and collaborative, with your feedback driving every decision.",
    image:
      "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/clipart-cute-cartoon-background-abstract-illustration-design-pattern-vector.jpg?updatedAt=1760076775618",
  },
  {
    title: "05. Web Design",
    desc: "Your website becomes the living expression of your brand. We design interfaces that not only look exceptional but feel intuitive and engaging. Every page is crafted to tell your story, elevate your presence, and make your brand unforgettable.",
    image:
      "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/Akwa.png?updatedAt=1760077097519",
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !scrollContainer || !progressBar) return;

    // Set initial states
    gsap.set(scrollContainer, { x: 0 });
    gsap.set(progressBar, { scaleX: 0 });

    // Wait for images and layout to be ready
    const initAnimation = () => {
      const calculateScroll = () => {
        const totalWidth = scrollContainer.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, totalWidth - viewportWidth);
      };

      const scrollDistance = calculateScroll();

      // Create the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 0.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "process-scroll",
          markers: false, // Set to true for debugging
          onRefresh: (self) => {
            // Recalculate scroll distance on refresh
            const newDistance = calculateScroll();
            self.vars.end = `+=${newDistance}`;
          },
        },
      });

      // Horizontal scroll
      tl.to(
        scrollContainer,
        {
          x: () => -calculateScroll(),
          ease: "none",
        },
        0
      );

      // Progress bar
      tl.to(
        progressBar,
        {
          scaleX: 1,
          ease: "none",
        },
        0
      );

      return tl.scrollTrigger;
    };

    // Initialize after a delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      setIsReady(true);
      const st = initAnimation();

      // Refresh ScrollTrigger after initialization
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      // Store for cleanup
      containerRef.current!.dataset.scrollTrigger = "initialized";
    }, 200);

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Only refresh this specific ScrollTrigger
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.vars.id === "process-scroll") {
            trigger.refresh();
          }
        });
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);

      // Kill only this component's ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "process-scroll") {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="bg-black relative  ">
      {/* Horizontal Scroll Container */}
      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="hidden md:block pointer-events-none absolute top-0 left-0 lg:w-32 w-15 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-50" />
        <div className="hidden md:block pointer-events-none absolute top-0 right-0 lg:w-32 w-15 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-50" />

        {/* Progress Bar */}
        <div className="absolute top-15 left-0 w-full h-2 bg-[#2E2E2E] z-40">
          <div
            ref={progressBarRef}
            className="h-full bg-[#535353] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div
          ref={scrollContainerRef}
          className="flex items-start"
          style={{ width: "fit-content" }}
        >
          {contents.map((content, index) => (
            <div
              key={index}
              className="process-section flex-shrink-0 md:h-screen flex items-start mt-40 justify-center px-8 md:px-16
             w-[96vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[60vw]"
            >
              <div className="max-w-xl w-full h-full">
                {index === 0 ? (
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-[#E5E5E5]">
                      {content.title}
                    </h2>
                    <p className="text-lg md:text-xl text-[#737373] leading-tight">
                      {content.desc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-6xl font-medium text-[#E5E5E5]">
                        {content.title}
                      </h3>
                      <p className="text-base md:text-xl text-[#737373] leading-tight">
                        {content.desc}
                      </p>
                    </div>
                    {content.image && (
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={content.image}
                          alt={content.title}
                          width={1000}
                          height={1000}
                          className="w-full h-64 md:h-100  lg:h-100 xl:h-100 object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
