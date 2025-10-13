import React from "react";
import Container from "../Reusbale/Container";
import Link from "next/link";

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
            className="text-gray-500 hover:text-[#B8B8B8] transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Touch: React.FC = () => {
  const location: InfoItem[] = [
    { label: "Abu Dhabi", href: "https://www.google.com/maps/place/Abu+Dhabi" },
    { label: "UAE", href: "https://www.google.com/maps/place/UAE" },
  ];

  const contact: InfoItem[] = [
    { label: "Pragya Muthuraman", href: "mailto:theinternetcompany01@gmail.com" },
    { label: "Sajid Manzur", href: "mailto:ticbyakwad@gmail.com" },
  ];

  const socials: InfoItem[] = [
    // { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com/ticbyakwad?igsh=dXB1ejczMjluNG1y" },
  ];

  return (
    <div className="">
      <Container className="flex flex-col gap-12 justify-end items-start md:h-[80dvh] h-[100dvh] md:py-20">
        <h1 className="md:text-7xl text-5xl font-medium text-black tracking-tighter">
          Let's get in <br /> touch
        </h1>

        <div className="flex flex-col md:flex-row gap-10 md:gap-30">
          <InfoCard title="Located" items={location} />
          <InfoCard title="Contact" items={contact} />
          <InfoCard title="Follow us" items={socials} />
        </div>
      </Container>
    </div>
  );
};

export default Touch;
