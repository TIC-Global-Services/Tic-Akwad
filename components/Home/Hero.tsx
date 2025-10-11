"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstTextRef = useRef<HTMLDivElement | null>(null);
  const secondTextRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const totalFrames = 250;
  const currentFrame = (index: number) =>
    `/Mosque/optimized_${(index + 1).toString().padStart(4, '0')}.webp`;

  const images = useRef<HTMLImageElement[]>([]);
  const imgSeq = useRef({ frame: 0 });

  // Optimized render function with RAF
  const render = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const frame = Math.round(currentFrameRef.current);
    const img = images.current[frame];
    
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (imgWidth === 0 || imgHeight === 0) return;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = canvasWidth / 2 - (imgWidth / 2) * scale;
    const y = canvasHeight / 2 - (imgHeight / 2) * scale;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      x,
      y,
      imgWidth * scale,
      imgHeight * scale
    );
  };

  // Smooth frame interpolation
  const animate = () => {
    const diff = targetFrameRef.current - currentFrameRef.current;
    
    if (Math.abs(diff) > 0.1) {
      currentFrameRef.current += diff * 0.15; // Smooth interpolation
      render();
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  // Preload images - prioritize first frame
  useEffect(() => {
    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = currentFrame(0);
    images.current[0] = firstImg;
    
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      // Render first frame immediately
      if (contextRef.current) {
        render();
      }
    };

    // Then load remaining frames in batches
    const batchSize = 15;
    
    const loadBatch = (startIndex: number) => {
      if (startIndex === 0) startIndex = 1; // Skip first frame as it's already loading
      
      const endIndex = Math.min(startIndex + batchSize, totalFrames);
      const promises: Promise<void>[] = [];

      for (let i = startIndex; i < endIndex; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.current[i] = img;

        const promise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            resolve();
          };
        });

        promises.push(promise);
      }

      Promise.all(promises).then(() => {
        if (endIndex < totalFrames) {
          loadBatch(endIndex);
        }
      });
    };

    // Start loading other frames after a small delay to prioritize first frame
    setTimeout(() => loadBatch(1), 100);

    return () => {
      images.current = [];
    };
  }, []);

  useEffect(() => {
    if (!firstFrameLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true
    });
    
    if (!context) return;
    contextRef.current = context;

    canvas.width = 1920;
    canvas.height = 1080;

    // Initial render
    render();

    // Start RAF loop
    rafRef.current = requestAnimationFrame(animate);

    // Set initial states for text
    gsap.set([firstTextRef.current, secondTextRef.current], {
      opacity: 0,
      visibility: "hidden",
    });

    // Text timeline
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

    // Canvas animation - updates target frame
    gsap.to(imgSeq.current, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3500",
        scrub: 0.5,
        pin: true,
      },
      onUpdate: () => {
        targetFrameRef.current = imgSeq.current.frame;
      },
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [firstFrameLoaded]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden bg-white"
    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-screen object-cover z-10"
          style={{ opacity: firstFrameLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in' }}
        />

        {/* First Text */}
        <div
          ref={firstTextRef}
          className="absolute z-20 text-center text-white xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div>Our branding speaks loud</div>
        </div>

        {/* Second Text */}
        <div
          ref={secondTextRef}
          className="absolute z-20 text-start xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ opacity: 0, visibility: "hidden" }}
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
          .dot-animation { width: 8px; height: 8px; }
        }

        @media (min-width: 768px) {
          .dot-animation { width: 10px; height: 10px; }
        }

        @media (min-width: 1024px) {
          .dot-animation { width: 12px; height: 12px; }
        }

        @keyframes pulseCircle {
          0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
          50%  { opacity: 1;   transform: scale(1.2) translateX(2px); }
          100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
        }

        @media (min-width: 640px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(3px); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
          }
        }

        @media (min-width: 768px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(4px); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;