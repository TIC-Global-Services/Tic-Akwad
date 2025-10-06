"use client";
import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

const ImageChange = () => {
  const contents = [
    {
      name: "Doctor Ceuticalz",
      textColor: "#767676",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Flagship.png?updatedAt=1759224413937",
    },
    {
      name: "Two point Zero",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(3).png?updatedAt=1759224411293",
    },
    {
      name: "Pearky Paws",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(4).png?updatedAt=1759224411156",
    },
    {
      name: "Innovative Interiors",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(1).png?updatedAt=1759224896455",
    },
    {
      name: "Haus of Chaos",
      textColor: "#000000",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(2).png?updatedAt=1759224895832",
    },
    {
      name: "Saba Groups",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(3).png?updatedAt=1759225070152",
    },
    {
      name: "Red Panda",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(4).png?updatedAt=1759225280578",
    },
    {
      name: "Ascend Web3 Banking",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(5).png?updatedAt=1759225297200",
    },
    {
      name: "Hashmint",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(6).png?updatedAt=1759225697405",
    },
    {
      name: "Pocket Heart",
      textColor: "#ffffff",
      image:
        "https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/Container%20(7).png?updatedAt=1759225696981",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contents.length);
    }, 400);

    return () => clearInterval(interval);
  }, [contents.length]);

  // Track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Play/pause audio based on visibility and mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isVisible && !isMuted && hasInteracted) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked:", err);
        setShowPlayButton(true);
      });
    } else {
      audio.pause();
      if (!isVisible) {
        audio.currentTime = 0;
      }
    }
  }, [isVisible, isMuted, hasInteracted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteracted) {
      setHasInteracted(true);
      setShowPlayButton(false);
    }

    setIsMuted((prev) => {
      const newMuted = !prev;
      if (!newMuted && isVisible) {
        audio.play().catch((err) => {
          console.log("Play failed:", err);
        });
      }
      return newMuted;
    });
  };

  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);
    setShowPlayButton(false);
    
    if (isVisible && !isMuted) {
      audio.play().catch((err) => {
        console.log("Play failed:", err);
      });
    }
  };

  const current = contents[currentIndex];

  return (
    <div ref={containerRef} className="w-full md:h-screen h-[500px] p-4 bg-white">
      <div className="w-full h-full relative overflow-hidden">
        <img
          src={current.image}
          alt={current.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-5 left-5">
          <h1 className="text-sm font-bold opacity-50" style={{ color: current.textColor }}>
            {current.name}
          </h1>
        </div>

        <div className="absolute top-5 right-5 cursor-pointer">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="transition-transform hover:scale-110 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX size={24} style={{ color: current.textColor }} />
            ) : (
              <Volume2 size={24} style={{ color: current.textColor }} />
            )}
          </button>
        </div>

        {showPlayButton && isVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all hover:scale-110"
              aria-label="Play audio"
            >
              <Play size={48} className="text-black" fill="black" />
            </button>
          </div>
        )}

        <audio ref={audioRef} src="/song.mp3" loop playsInline />
      </div>
    </div>
  );
};

export default ImageChange;