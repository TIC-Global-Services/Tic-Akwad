"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
  images?: HTMLImageElement[];
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  images = [],
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // Always visible initially
  const [logoScale, setLogoScale] = useState(0.8);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Show splash immediately, even with no images
    setIsVisible(true);

    if (images.length === 0) {
      // Minimum splash duration for better UX (e.g., 1.5 seconds)
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }

    const totalFrames = images.length;
    let loadedCount = 0;
    let animationFrameId: number;

    const updateProgress = () => {
      loadedCount++;
      console.log(`Image loaded: ${loadedCount}/${totalFrames}`);

      const progressPercent = Math.round((loadedCount / totalFrames) * 100);
      setProgress(progressPercent);

      if (loadedCount === totalFrames) {
        console.log("All images loaded!");
        // Add slight delay before hiding for smooth transition
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 300);
      }
    };

    const animateProgress = () => {
      const scaleProgression = Math.sin((progress / 100) * Math.PI * 0.5);
      setLogoScale(0.8 + scaleProgression * 0.15);
      setGlitchActive(Math.random() > 0.7);
      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    const handledImages = new WeakSet<HTMLImageElement>();

    images.forEach((img, index) => {
      if (handledImages.has(img)) {
        console.log(`Image ${index} already tracked`);
        return;
      }

      handledImages.add(img);
      console.log(`Tracking image ${index}: ${img.src}`);

      if (img.complete) {
        console.log(`Image ${index} already loaded (cached)`);
        updateProgress();
      } else {
        const handleLoad = () => {
          console.log(`Image ${index} loaded successfully`);
          updateProgress();
        };

        const handleError = () => {
          console.log(`Image ${index} failed to load`);
          updateProgress();
        };

        img.addEventListener("load", handleLoad, { once: true });
        img.addEventListener("error", handleError, { once: true });
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, onComplete]);

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glitch {
          0% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(0, 2px); }
          50% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); transform: translate(-2px, -2px); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translate(0, 0); }
        }
        @keyframes barGlow {
          0% { filter: drop-shadow(0 0 8px rgba(217, 119, 6, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.8)); }
          100% { filter: drop-shadow(0 0 8px rgba(217, 119, 6, 0.4)); }
        }
        @keyframes fadeInText {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 px-20 flex flex-col items-start justify-between py-20 w-full transition-all duration-100 overflow-hidden ${
          isVisible ? "bg-[#000000]" : "pointer-events-none"
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          background: "radial-gradient(ellipse at center, rgba(10, 10, 10, 0.8)  10%, #000000 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(20, 20, 20, 0.3) 2px, rgba(20, 20, 20, 0.3) 4px)",
            animation: `${progress > 0 ? "gradientShift 6s ease infinite" : "none"}`,
            pointerEvents: "none",
          }}
        />

        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-2 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-2 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(217, 119, 6, 0.05) 0%, transparent 70%)",
            animation: "pulse 5s ease-in-out infinite 1s",
          }}
        />

        <div
          className="flex relative z-10"
          style={{
            animation: "logoFloat 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              transform: `scale(${logoScale})`,
              transition: "transform 0.1s ease-out",
              filter: glitchActive
                ? "drop-shadow(3px 0 0 rgba(0, 0, 0, 0.8)) drop-shadow(-3px 0 0 rgba(0, 0, 0, 0.8))"
                : "drop-shadow(0 0 20px rgba(217, 119, 6, 0.3))",
            }}
          >
            <Image
            unoptimized
            width={1000}
            height={1000}
              src="https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/Frame%205.png?updatedAt=1759756217013"
              alt="TI"
              className="w-96 h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col w-full items-end gap-8 relative z-10">
          <div
            className="text-end"
            style={{
              animation: "fadeInText 0.3s ease-out",
            }}
          >
            <div
              className="text-white font-bold text-sm md:text-5xl tracking-wider"
              style={{
                textShadow: `0 0 20px rgba(217, 119, 6, 0.6), 0 0 40px rgba(217, 119, 6, 0.3)`,
                letterSpacing: "0.1em",
              }}
            >
              {progress}%
            </div>
          </div>

          <div className="w-full space-y-3">
            <div
              className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden shadow-lg"
              style={{
                boxShadow:
                  "0 0 30px rgba(217, 119, 6, 0.3), inset 0 0 15px rgba(217, 119, 6, 0.1)",
              }}
            >
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: `${progress}%`,
                  boxShadow: `0 0 15px rgba(217, 119, 6, 0.6), 0 0 30px rgba(217, 119, 6, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3)`,
                  animation: "barGlow 2s ease-in-out infinite",
                  transition: "width 0.05s linear",
                  background: `linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.8) 100%)`,
                }}
              />
            </div>

            <div
              className="w-full h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.3), transparent)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};