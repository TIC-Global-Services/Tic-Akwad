import { Collabration, LogoKey, OurTeam } from "@/assets/About";
import React from "react";
import Image from "next/image";

const Content = [
  {
    img: Collabration,
    title: "Built on Collaboration",
    desc: "At TIC, we believe the best ideas come from shared vision and open dialogue. Every project is a partnership- we listen, adapt, and build alongside our clients to create work that feels true to their brand. Transparency and teamwork are at the core of how we operate, ensuring every outcome is something we’re proud to share.",
  },
  {
    img: LogoKey,
    title: "Beyond the Mark ",
    desc: "A brand is more than its logo; it’s an experience, a feeling, a story that unfolds across every touchpoint. While we value strong visual marks, we focus on building complete identities that resonate through design, tone, and digital presence. Because lasting brands don’t just look good, they connect.",
  },
];

const Collaboration = () => {
  return (
    <div className="flex flex-col lg:pt-70 pt-30">
      <h1 className="text-black md:text-7xl text-5xl font-medium mb-5">Our Team</h1>
      {/* <Image
        src={OurTeam}
        alt="Team"
        width={1000}
        height={1000}
        className="w-full h-full rounded-2xl "
      /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-5 pt-10 pb-6">
        {Content.map((item, index) => (
          <div
            key={index}
            className="bg-white pb-5 flex flex-col items-center md:items-start text-center md:text-left rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* === Image === */}
            <div className="w-full h-[300px] md:h-[400px] relative">
              <Image
                src={item.img}
                alt={item.title || "Content Image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* === Text Section === */}
            <div className="p-6 md:p-8 space-y-3 md:space-y-4">
              <h1 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                {item.title}
              </h1>
              <p className="text-[#A6A6A6] text-base sm:text-lg md:text-xl leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
   <div className="relative bg-white w-full flex flex-col lg:flex-row items-start justify-between py-12 px-6 md:px-12 rounded-2xl shadow-md overflow-hidden">
  {/* Left Text Section */}
  <div className="w-full lg:w-2/5 flex flex-col justify-start items-start text-left z-10">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-black leading-tight tracking-tight">
      Design with Purpose
    </h1>
    <div className="text-[#A6A6A6] space-y-4 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg">
      <p>
        We believe great design belongs in the hands of users, not just on presentation slides. That’s why we start with the end experience — the product, the interface, the interaction — and work backward to build systems and guidelines that support it. Every project we create is designed to perform, engage, and endure in the real world.
      </p>
    </div>
  </div>

  {/* Right Image Section */}
  <div className="w-full lg:w-3/5 mt-8 lg:mt-0 flex justify-center lg:justify-end">
    <Image
      src="https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/akward%201.png?updatedAt=1760166234219"
      alt="MockUp"
      width={1000}
      height={1000}
      className="w-full max-w-[600px] h-auto object-contain"
    />
  </div>
</div>

    </div>
  );
};

export default Collaboration;
