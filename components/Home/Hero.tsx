"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstTextRef = useRef<HTMLDivElement | null>(null);
  const secondTextRef = useRef<HTMLDivElement | null>(null);
  const lastFrameRef = useRef(-1);
  const lastWidthRef = useRef(0);
  const lastHeightRef = useRef(0);

  const totalFrames = 250;
  const currentFrame = (index: number) =>
    `/Mosque/${(index + 1).toString().padStart(4, "0")}.webp`;

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const imgSeq = useRef({ frame: 0 });

  // Memoized canvas operations
  const canvasOperations = useMemo(() => {
    const setCanvasSize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      lastWidthRef.current = canvasWidth;
      lastHeightRef.current = canvasHeight;

      context.scale(dpr, dpr);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    };

    const drawFrame = (context: CanvasRenderingContext2D, frameIndex: number) => {
      const index = Math.min(Math.max(Math.floor(frameIndex), 0), totalFrames - 1);

      // Skip if same frame
      if (index === lastFrameRef.current) return;
      lastFrameRef.current = index;

      const img = imagesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const canvasWidth = lastWidthRef.current;
      const canvasHeight = lastHeightRef.current;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.save();

      // Cover positioning
      const imgAspectRatio = img.naturalWidth / img.naturalHeight;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspectRatio > canvasAspectRatio) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspectRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspectRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      context.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        Math.round(offsetX),
        Math.round(offsetY),
        Math.round(drawWidth),
        Math.round(drawHeight)
      );

      context.restore();
    };

    return { setCanvasSize, drawFrame };
  }, []);

  // Preload images on mount
  useEffect(() => {
    // Initialize array
    imagesRef.current = new Array(totalFrames).fill(null);

    // Load all images
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current[i] = img;
    }
  }, []);

  // Main animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!context) return;

    contextRef.current = context;

    // Set canvas size
    canvasOperations.setCanvasSize(canvas, context);
    canvasOperations.drawFrame(context, 0);

    // Set initial text states
    gsap.set([firstTextRef.current, secondTextRef.current], {
      opacity: 0,
      visibility: "hidden",
    });

    // Text animation timeline
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "+=10",
        end: "+=3000",
        scrub: 1,
      },
    });

    textTimeline
      .to(firstTextRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.8,
        ease: "power2.out",
      })
      .to(firstTextRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.6,
        ease: "power2.in",
      })
      .to(
        secondTextRef.current,
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        ".text-line-2",
        {
          color: "#000000",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.4"
      );

    // Canvas scroll animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3500",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetFrame = progress * (totalFrames - 1);

        gsap.to(imgSeq.current, {
          frame: targetFrame,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
          onUpdate: () => {
            canvasOperations.drawFrame(context, imgSeq.current.frame);
          },
        });
      },
    });

    // Resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvasOperations.setCanvasSize(canvas, context);
        canvasOperations.drawFrame(context, imgSeq.current.frame);
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [canvasOperations]);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full h-screen relative overflow-hidden"
      >
        <div className="w-full h-screen flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-screen object-cover z-10"
            style={{
              backgroundImage: 'url(/Mosque/0001.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* First Text */}
          <div
            ref={firstTextRef}
            className="absolute z-20 text-center text-white xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
            style={{
              opacity: 0,
              visibility: "hidden",
            }}
          >
            <div>Our branding speaks loud</div>
          </div>

          {/* Second Text */}
          <div
            ref={secondTextRef}
            className="absolute z-20 text-start xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{
              opacity: 0,
              visibility: "hidden",
            }}
          >
            <div className="text-line-2 text-white">Louder than words</div>
          </div>

          {/* Keep Scrolling Text */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-sm md:text-base font-light tracking-wider">
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
              <div className="flex items-center justify-center">
                <div className="dot-animation bg-white/50" />
              </div>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white/50 whitespace-nowrap leading-none">
                Keep scrolling
              </span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .dot-animation {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: pulseCircle 1.5s infinite ease-in-out;
            flex-shrink: 0;
          }

          @media (min-width: 640px) {
            .dot-animation {
              width: 8px;
              height: 8px;
            }
          }

          @media (min-width: 768px) {
            .dot-animation {
              width: 10px;
              height: 10px;
            }
          }

          @media (min-width: 1024px) {
            .dot-animation {
              width: 12px;
              height: 12px;
            }
          }

          @keyframes pulseCircle {
            0% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2) translateX(2px);
            }
            100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
          }

          @media (min-width: 640px) {
            @keyframes pulseCircle {
              50% {
                transform: scale(1.2) translateX(3px);
              }
            }
          }

          @media (min-width: 768px) {
            @keyframes pulseCircle {
              50% {
                transform: scale(1.2) translateX(4px);
              }
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Hero;