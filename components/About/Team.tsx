import { Collabration, LogoKey, OurTeam } from "@/assets/About";
import React from "react";
import Image from "next/image";

const Content = [
  {
    img: Collabration,
    title: "Collaboration is key",
    desc: "TIC was built on the belief that successful branding comes from a collaborative process. We work closely with our clients, ensuring they feel confident and supported at every stage of building their brand.",
  },
  {
    img: LogoKey,
    title: "Not just a logo",
    desc: "A logotype is undeniably important and plays a key role in our work, but many companies mistakenly view their logo, colors, and fonts as the entirety of their brand. While this can be true in some instances, its often just a small part of what the audience experiences. In fact, a well-designed landing page can communicate much more than a logo alone.",
  },
];

const Team = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-black text-7xl font-medium mb-5">Our Team</h1>
      <Image
        src={OurTeam}
        alt="Team"
        width={1000}
        height={1000}
        className="w-full h-full rounded-2xl "
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 py-10">
        {Content.map((item, index) => (
          <div
            key={index}
            className="bg-white flex flex-col items-center md:items-start text-center md:text-left rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
              <p className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
