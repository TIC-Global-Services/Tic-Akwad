import React from "react";
import Image from "next/image";

const Join = () => {
  return (
    <div className="pb-20">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 py-10  min-h-[83vh]">
        {/* Left Section: Instagram */}
        <div className="bg-[#4B4845] flex flex-col justify-between p-8 md:p-12 rounded-2xl min-h-[350px]">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl tracking-tighter font-medium text-white max-w-lg">
              <span>Check out our latest work on </span>
              <span className="inline-flex items-center gap-2 mt-1">
                Instagram
                <Image
                  src="https://ik.imagekit.io/99y1fc9mh/TIC_Akwad/62b057942d3c235cc9ecbdad_instagram-notice.svg?updatedAt=1760094735396"
                  alt="Instagram Icon"
                  width={24}
                  height={24}
                  className="w-6 sm:w-8 md:w-10 h-auto"
                />
              </span>
            </h1>
          </div>

          <button className="border border-white bg-transparent text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black cursor-pointer transition self-start md:text-[20px]">
            TIC.Global
          </button>
        </div>

        {/* Right Section: Join our team */}
        <div className="bg-white flex flex-col justify-between p-8 md:p-12 rounded-2xl shadow-md min-h-[350px]">
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl tracking-tighter font-semibold text-black">
              Join our team
            </h1>
            <p className="text-[#7F7F7F] text-2xl sm:text-3xl md:text-4xl font-medium max-w-md tracking-tighter mt-2">
              We love connecting with like-minded creatives. Send us your work
              and a quick hello — let’s see what we can build together.
            </p>
          </div>

          <button className="border border-[#4B4845] bg-transparent text-black font-semibold px-4 py-3 rounded-full hover:bg-black hover:text-white transition self-start cursor-pointer md:text-[20px]">
            admin@theinternetcompany.com
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
