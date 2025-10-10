"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArchiveData } from "../Data/ArchiveData";
import Link from "next/link";
import Image from "next/image";

interface ParallaxCardProps {
  data: {
    name: string;
    media: string;
    link: string;
    work: string;
    year: string;
    type: string;
    web?: string;
  };
  index: number;
}

const ParallaxCard = ({ data, index }: ParallaxCardProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

const isVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(data.media);


  return (
    <motion.div ref={ref} style={{ opacity }} className="w-full">
      <Link
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative flex flex-col-reverse lg:flex-row bg-white rounded-2xl  overflow-hidden transition-all  duration-300 ease-out group h-[500px] md:h-[500px] lg:h-[400px] xl:h-[300px]">
          {/* Left Section - Fixed height */}
          <div className="flex flex-col justify-between  p-3 md:p-4 lg:p-6 w-full lg:w-1/2 h-1/2 lg:h-full">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-5xl font-medium text-gray-900 tracking-tighter ">
                {data.name}
              </h2>
              <p className="text-[#B7B7B7] text-sm lg:text-5xl  mt-1 tracking-tighter font-medium ">
                {data.work}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 lg:mt-0">
              <span className="bg-[#F5F5F5] text-black text-xs sm:text-lg px-3 sm:px-4 py-1 rounded-full tracking-tighter">
                {data.year}
              </span>
              <span className="bg-[#F5F5F5] text-black text-xs sm:text-lg px-3 sm:px-4 py-1 rounded-full">
                {data.type}
              </span>
              {data.web && (
                <span className="bg-[#F5F5F5] text-black text-xs sm:text-lg px-3 sm:px-4 py-1 rounded-full">
                  {data.web}
                </span>
              )}
            </div>
          </div>

          {/* Right Section - Fixed container with parallax content */}
          {/* Right Section - Fixed container with parallax content */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-3 md:p-4 lg:p-6">
            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-100">
              <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[130%] -top-[15%]"
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {isVideo ? (
                    <video
                      key={data.media}
                      src={data.media} 
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      className="object-cover  w-full h-full rounded-2xl"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  ) : (
                    <Image
                      src={data.media}
                      alt={data.name}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full rounded-2xl"
                      loading="lazy"
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ArchiveCards = () => {
  return (
    <div className="flex flex-col xl:px-[38px] lg:px-[25px] md:px-5 gap-5   bg-[#F5F5F5] min-h-screen">
      <h1 className="text-7xl mt-[35vh] mb-30 text-black font-medium tracking-tighter ">
        Archive<br />
        <span className="text-[#9F9F9F] tracking-tighter">Some goodies <br /> from our past</span>
      </h1>
      {ArchiveData.map((data, index) => (
        <ParallaxCard key={index} data={data} index={index} />
      ))}
    </div>
  );
};

export default ArchiveCards;
