import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

const Typo = () => {
  const content = [
    {
      name: "Make your palette work smarter.",
      gif: "https://storage.googleapis.com/ew-assets/ew/ew%20client%20portal/assets/color-picker-4.mp4",
    },
    {
      name: "Typography that speaks your brand language.",
      gif: "https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/LNU%20-%20IDENTITY%20SYSTEM%20-%20Akinbinu%20Akintayo.gif?updatedAt=1760089097833",
    },
  ];

  return (
    <div>
      {/* Grid with GIFs and Videos */}
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-[400px] sm:h-[400px] md:h-[550px] bg-[#F7F7F7] rounded-lg overflow-hidden flex items-center justify-center"
            >
              {/* Video or GIF */}
              {item.gif?.endsWith(".mp4") ? (
                <video
                  src={item.gif}
                  className="w-full  h-[400px] sm:h-[400px] md:h-[550px] object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : item.gif ? (
                <Image
                  unoptimized
                  src={item.gif}
                  width={1000}
                  height={1000}
                  alt={item.name || `image-${index}`}
                  className="w-full h-[500px] sm:h-[400px] md:h-[550px] object-contain"
                />
              ) : (
                <span className="text-gray-500 text-xl">No Image</span>
              )}

              {/* Overlay name */}
              {item.name && (
                <div className="absolute inset-0 top-10 md:left-10 flex items-start justify-start  text-black px-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    {item.name}
                  </h2>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background Image Section */}
      <div className="relative pt-20">
        <div
          className="md:h-[700px] h-[500px] w-full bg-center bg-no-repeat bg-cover flex flex-col justify-between p-6 rounded-2xl"
          style={{
            backgroundImage:
              "url('https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/wmremove-transformed_imgupscaler.ai_Enhancer%20Pro_2K.png?updatedAt=1760166027902')",
          }}
        >
          {/* Top Title */}
          <div className="text-white">
            <p className="mt-2 text-2xl md:text-5xl font-semibold tracking-tighter text-gray-200 max-w-xl">
              Reach out today{" "}
              <span className="text-[#bebbbbdc]">
                and let’s create a powerful new identity for your brand.
              </span>
            </p>
          </div>

          {/* Bottom Left Button */}
          <div>
            <Link
              href="/book"
              className="inline-flex items-center mt-6 px-6 py-3 sm:px-8 sm:py-2 rounded-full bg-transparent text-white border border-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 md:text-[24px]"
            >
              Book Now <RiArrowRightLine size={28} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typo;
