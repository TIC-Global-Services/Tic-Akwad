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
  const [loadProgress, setLoadProgress] = useState(0);
  const isAnimatingRef = useRef(false);
  const lastRenderTimeRef = useRef(0);

  const totalFrames = 250;
  const currentFrame = (index: number) =>
    `/Mosque/optimized_${(index + 1).toString().padStart(4, '0')}.webp`;

  const images = useRef<HTMLImageElement[]>([]);
  const imgSeq = useRef({ frame: 0 });
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Optimized render with throttling
  const render = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const frame = Math.round(currentFrameRef.current);
    const img = images.current[frame];
    
    if (!img || !img.complete || !img.naturalWidth) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, imgWidth * scale, imgHeight * scale);
  };

  // Ultra-smooth frame interpolation with adaptive easing
  const animate = (timestamp: number) => {
    // Throttle rendering to ~60fps max
    const elapsed = timestamp - lastRenderTimeRef.current;
    
    if (elapsed < 16) { // ~60fps
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastRenderTimeRef.current = timestamp;

    const diff = targetFrameRef.current - currentFrameRef.current;
    
    if (Math.abs(diff) > 0.05) {
      // Adaptive smoothing - faster when far, slower when close
      const smoothFactor = Math.abs(diff) > 5 ? 0.2 : 0.12;
      currentFrameRef.current += diff * smoothFactor;
      render();
      isAnimatingRef.current = true;
    } else {
      currentFrameRef.current = targetFrameRef.current;
      if (isAnimatingRef.current) {
        render();
        isAnimatingRef.current = false;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  // Aggressive preloading with priority queue and caching
  useEffect(() => {
    let loadedCount = 0;
    const priorityFrames = [0, 1, 2, 3, 4, 5, 10, 15, 20, 30, 50, 75, 100, 150, 200, 249];
    const loadedFrames = new Set<number>();

    // Load first frame with highest priority
    const firstImg = new Image();
    firstImg.crossOrigin = "anonymous";
    firstImg.src = currentFrame(0);
    images.current[0] = firstImg;
    
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      loadedFrames.add(0);
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      if (contextRef.current) render();
    };

    // Load priority frames first
    const loadPriorityFrames = () => {
      priorityFrames.slice(1).forEach((frameIndex, idx) => {
        setTimeout(() => {
          if (frameIndex < totalFrames && !loadedFrames.has(frameIndex)) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = currentFrame(frameIndex);
            images.current[frameIndex] = img;
            
            img.onload = () => {
              loadedFrames.add(frameIndex);
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            };
            img.onerror = () => {
              loadedFrames.add(frameIndex);
              loadedCount++;
            };
          }
        }, idx * 20);
      });
    };

    setTimeout(loadPriorityFrames, 50);

    // Load remaining frames in optimized batches
    const loadRemainingFrames = () => {
      const batchSize = 10;
      let currentIndex = 1;

      const loadBatch = () => {
        const promises: Promise<void>[] = [];
        
        for (let i = 0; i < batchSize && currentIndex < totalFrames; i++) {
          if (!loadedFrames.has(currentIndex) && !priorityFrames.includes(currentIndex)) {
            const frameIndex = currentIndex;
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = currentFrame(frameIndex);
            images.current[frameIndex] = img;

            const promise = new Promise<void>((resolve) => {
              img.onload = () => {
                loadedFrames.add(frameIndex);
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                resolve();
              };
              img.onerror = () => {
                loadedFrames.add(frameIndex);
                loadedCount++;
                resolve();
              };
            });
            promises.push(promise);
          }
          currentIndex++;
        }

        if (promises.length > 0) {
          Promise.all(promises).then(() => {
            if (currentIndex < totalFrames) {
              setTimeout(loadBatch, 30);
            }
          });
        } else if (currentIndex < totalFrames) {
          setTimeout(loadBatch, 30);
        }
      };

      loadBatch();
    };

    setTimeout(loadRemainingFrames, 200);

    return () => {
      images.current.forEach(img => {
        if (img) {
          img.src = '';
        }
      });
      images.current = [];
    };
  }, []);

  useEffect(() => {
    if (!firstFrameLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });
    
    if (!context) return;
    
    // Optimize context settings
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    contextRef.current = context;

    // Set canvas size based on device pixel ratio for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 1920;
    canvas.height = 1080;

    render();

    // Start optimized RAF loop
    lastRenderTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    // Set initial states for text
    gsap.set([firstTextRef.current, secondTextRef.current], {
      opacity: 0,
      visibility: "hidden",
      force3D: true,
      z: 0.01
    });

    // Optimized text timeline
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "+=10",
        end: "+=3000",
        scrub: 1,
        fastScrollEnd: true
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

    // Optimized canvas animation
    gsap.to(imgSeq.current, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3500",
        scrub: 0.3,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        preventOverlaps: true
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
      gsap.killTweensOf("*");
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
          style={{ 
            opacity: firstFrameLoaded ? 1 : 0, 
            transition: 'opacity 0.3s ease-in',
            willChange: 'contents',
            transform: 'translateZ(0)'
          }}
        />

       

        {/* First Text */}
        <div
          ref={firstTextRef}
          className="absolute z-20 text-center text-white xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
          style={{ 
            opacity: 0, 
            visibility: "hidden",
            willChange: 'opacity, visibility'
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
            willChange: 'opacity, visibility'
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
          will-change: transform, opacity;
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
          0%   { opacity: 0.3; transform: scale(0.8) translateX(0) translateZ(0); }
          50%  { opacity: 1;   transform: scale(1.2) translateX(2px) translateZ(0); }
          100% { opacity: 0.3; transform: scale(0.8) translateX(0) translateZ(0); }
        }

        @media (min-width: 640px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0) translateZ(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(3px) translateZ(0); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0) translateZ(0); }
          }
        }

        @media (min-width: 768px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0) translateZ(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(4px) translateZ(0); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0) translateZ(0); }
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;