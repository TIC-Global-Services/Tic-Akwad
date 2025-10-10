"use client";

import React from "react";
import Image from "next/image";
import { FounderImage } from "@/assets/About";
import { Socials } from "../Data/Socials";
import Link from "next/link";
import Clientele from "./Clientele";

const Founder = () => {
  return (
    <div>
            {/* <Clientele /> */}
              <div className="md:py-20 py-10">
      <h1 className="text-3xl md:text-7xl font-semibold text-gray-900 mb-4">
          Founder
        </h1>
           <section className="flex flex-col md:flex-row items-start justify-start pb-16 md:pb-20 md:gap-0 gap-10">
      {/* === Left Section (Image + Title) === */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        
        <div className="relative w-full max-w-md h-[400px] md:h-[600px]">
          <Image
            src={FounderImage}
            alt="Founder"
            fill
            className="object-cover rounded-2xl shadow-lg"
            priority
          />
        </div>
      </div>

      {/* === Right Section (Content) === */}
      <div className="w-full  flex flex-col justify-center text-center md:text-left space-y-6">
        <p className="text-gray-700 leading-relaxed text-base md:text-2xl">
          Meet <span className="font-semibold text-gray-900">Pragya Muthuraman</span> — the creative force and strategic mind powering TIC Global Services. From crafting stunning digital experiences to redefining what it means to build a brand online; she’s all about turning big ideas into bigger realities.
        </p>
        <p className="text-gray-700 leading-relaxed text-base md:text-2xl">
          With over 50 successful projects under our belt this year, she doesn’t just lead the company — she sets the pace for innovation in 3D websites, breaking the barriers of traditional web development, ensuring every project is as bold and original as the clients we serve. Whether it’s web branding, app design, or exploring new frontiers, Pragya is always looking for the next big challenge.
        </p>
      <div className="flex flex-row items-start justify-start gap-4 md:gap-6">
  {Socials.map((item, index) => (
    <Link key={index} href={item.link} target="_blank" rel="noopener noreferrer">
      <Image
        src={item.img}
        alt="Social logo"
        width={item.width}
        height={item.height}
        className="object-contain transition-transform duration-300 hover:scale-110"
      />
    </Link>
  ))}
</div>


        
      </div>
    </section>
    </div>
    </div>

 
  );
};

export default Founder;
