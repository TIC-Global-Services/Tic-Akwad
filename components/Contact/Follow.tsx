import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Follow = () => {
  return (
    <div className="md:pt-20 pt-10">
      <div
        className="relative md:h-[700px] h-[500px] w-full bg-[#E9E5DF] flex flex-col justify-between p-6 md:p-12 rounded-xl overflow-hidden"
      >
        {/* Top Title */}
        <div>
          <p className="mt-2 text-2xl sm:text-3xl md:text-5xl font-medium tracking-tighter text-black max-w-full md:max-w-xl leading-snug">
            Follow us on <br />
            <span className="text-[#595959] text-lg sm:text-xl md:text-3xl leading-snug">
              Instagram <br /> Linkedin
            </span>
          </p>
        </div>

        {/* Bottom Left Buttons */}
        <div className="flex flex-wrap gap-4 md:gap-5 z-10">
          <Link
            href="https://www.instagram.com/the.internetcompany/"
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-transparent text-black border border-black transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 text-sm sm:text-base md:text-[24px]"
          >
            Instagram
          </Link>
          <Link
            href="https://www.linkedin.com/company/tic-global-services/"
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-transparent text-black border border-black transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 text-sm sm:text-base md:text-[24px]"
          >
            Linkedin
          </Link>
        </div>

        {/* Bottom Right Image */}
        <Image
          src="https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/akward.png?updatedAt=1760076775861"
          alt="Follow Background"
          width={1000}
          height={1000}
          className="absolute md:bottom-0 md:right-0 bottom-40 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] object-cover pointer-events-none select-none"
        />
      </div>
    </div>
  );
};

export default Follow;
