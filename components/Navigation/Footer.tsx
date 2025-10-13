"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import Container from "../Reusbale/Container";

const socialLinks = [
  {
    link: "https://www.instagram.com/the.internetcompany/",
    logo: <FaInstagram />,
  },
  // {
  //   link: "https://www.linkedin.com/company/tic-global-services/",
  //   logo: <IoLogoLinkedin />,
  // },
];

const content = [
  {
    img: "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/WhatsApp%20Image%202025-10-09%20at%202.54.14%20PM.jpeg?updatedAt=1760087992932",
    name: "Let’s create something impactful together.",
    link: "/contact",
    button: "Contact us",
  },
  {
    img: "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/WhatsApp%20Image%202025-10-09%20at%202.54.13%20PM.jpeg?updatedAt=1760087910460",
    name: "See what’s new in our world",
    link: "https://www.instagram.com/the.internetcompany/",
    button: "Go to Insta",
  },
];

const Footer = () => {
  const [scrollY, setScrollY] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
        );
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="min-h-screen w-full bg-black text-white overflow-hidden"
    >
      <Container>
        <div className="mx-auto  py-8 xl:py-15 lg:py-10 h-full flex flex-col justify-center">
          {/* Main Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 md:mb-16 flex-1 pt-12 sm:pt-16 md:pt-20">
            {content.map((item, index) => {
              const parallaxOffset = scrollY * 15;

              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:shadow-2xl min-h-[400px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[620px]"
                >
                  {/* Image Section with Parallax */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        transform: `translateY(${parallaxOffset}%) scale(1.1)`,
                        transition: "transform 0.1s ease-out",
                        top: "-10%",
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 md:p-8">
                    {/* Title at Top */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl max-w-full sm:max-w-[400px] md:max-w-[470px] leading-tight sm:leading-[40px] md:leading-[50px] tracking-[-0.07em] font-medium text-white">
                        {item.name}
                      </h3>
                    </div>

                    {/* Button at Bottom */}
                    <div className="flex justify-start">
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-transparent border border-white text-white font-normal rounded-full transition-all duration-300 hover:bg-white hover:text-black tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px]"
                      >
                        {item.button}
                        <RiArrowRightLine className="text-lg sm:text-xl md:text-2xl" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8 pb-4 sm:pb-6 md:pb-0">
            {/* Social Links */}
            <div className="flex items-center gap-2 order-1 md:order-1">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <span className="text-xl sm:text-2xl text-white/30">
                    {item.logo}
                  </span>
                </a>
              ))}
            </div>

            <div className="text-center text-xs sm:text-sm md:text-base order-2 flex-1 text-white/30 px-4">
              <span className="block sm:inline">
                © Copyright TIC GLOBAL SERVICES
              </span>
              <span className="hidden sm:inline"> / </span>
              <a
                href="mailto:admin@theinternetcompany.one"
                className="hover:text-white/40 block sm:inline mt-1 sm:mt-0"
              >
                admin@theinternetcompany.one
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
