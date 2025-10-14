import React from "react";
import Image from "next/image";
import { ImageVideo } from "@/assets/Home";
import Container from "../Reusbale/Container";

const Joinus = () => {
  return (
   
  <div className="flex flex-col items-center justiyf-center space-y-5 py-20 bg-black">
     <Container>
      <h1 className="font-medium xl:text-[86px] lg:text-[76px] md:text-[65px] tracking-tighter text-[35px] md:leading-[89px] leading-[42px]  max-w-5xl mx-auto text-center text-white mb-5">
        Designing Brands. Developing Experiences
      </h1>
      <p className="font-medium text-[18px] leading-[20px] tracking-tight max-w-lg mx-auto text-center text-white">
       From powerful identities to seamless digital platforms, we help brands make their mark across every touchpoint.
      </p>

      <Image unoptimized src={ImageVideo} alt="Join us" width={1000} height={1000} className="w-full max-w-5xl mt-10 rounded-xl" />
      </Container>
    </div>
   
  
  );
};

export default Joinus;
