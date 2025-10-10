import Link from "next/link";
import React from "react";

import Image from "next/image";
import { ClienteleData } from "../Data/ClienteleData";

interface InfoItem {
  label: string;
  href?: string;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items }) => {
  return (
    <div className="flex flex-col ">
      <h2 className="text-black text-lg">{title}</h2>
      <div className="flex flex-col text-lg">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href || "#"}
            target={item.href ? "_blank" : "_self"}
            className="text-gray-500 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Clientele = () => {
  const location: InfoItem[] = [
    {label:"We’re a multidisciplinary team driven by curiosity and creativity. Our work blends strategy, design, and technology to craft bold brand identities, immersive websites, and digital experiences that connect with people and move businesses forward."}
  ];

  const contact: InfoItem[] = [
    {label:' We don’t just design - we build meaning. Every project begins with understanding your story and purpose, turning ideas into visuals and experiences that make your brand stand out, stay consistent, and speak with confidence.'}
  ];

  const socials: InfoItem[] = [
{label:"Great design doesn’t end on a slide deck. It lives where people interact with it: online, on-screen, or in the real world. That’s why we create with intent, ensuring every detail feels natural, functional, and true to the brand."}
  ];

  return (
    <div className="flex flex-col gap-5  bg-[#F5F5F5] ">
      <h1 className="text-7xl font-medium text-black tracking-tighter mt-70">
        This is how <br />
        we work
      </h1>
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 max-w-7xl">
        <InfoCard title="Our Approach" items={location} />
        <InfoCard title="Our Focus" items={socials} />
        <InfoCard title="Our Belief" items={contact} />
      </div>

      <div className="bg-black rounded-2xl mt-40 p-10 ">
        <h1 className="text-7xl tracking-tighter font-medium">Clientele</h1>
        <p className="text-[#7B7B7B] mt-10 max-w-3xl">
          We're proud to collaborate with a diverse range of clients from bold
          startups to established brands each bringing unique ideas to the
          table. Their trust fuels our creativity, and together, we turn visions
          into results.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-10 py-10">
          {ClienteleData.map((item, index) => (
            <div
              key={index}
              className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-35 lg:h-35"
            >
              <Image
                src={item.img}
                alt="Logo"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clientele;
