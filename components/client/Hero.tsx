"use client";
import React from 'react'
import Container from '../Reusbale/Container';

const Hero = () => {
  return (
    
<div className='flex h-[100dvh] bg-black items-center justify-center text-center'>
    <Container>
      <div>
        <h1 className='text-4xl sm:text-5xl md:text-[60px] lg:text-[80px] leading-snug sm:leading-tight md:leading-[80px] lg:leading-[92px] max-w-5xl text-white font-medium tracking-tighter mx-auto'>
          Welcome, We Onboard <br />
          <span className='text-[#1773FF]'>2</span> Projects a Month
        </h1>

        <p className='text-white text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed'>
          To give each brand the attention it deserves, we limit our workload to just two projects a month. This ensures high-quality output, focused creativity, and a seamless experience for our clients.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-xs sm:text-sm md:text-base font-light tracking-wider">
        <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
          {/* Animated Dot */}
          <div className="flex items-center justify-center">
            <div className="dot-animation bg-white" />
          </div>

          {/* Static Text */}
          <span className="font-semibold text-white/50 whitespace-nowrap leading-none">
            Scroll down to connect with us
          </span>
        </div>
      </div>

      <style jsx>{`
        .dot-animation {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulseCircle 1.5s infinite ease-in-out;
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .dot-animation { width: 8px; height: 8px; }
        }

        @media (min-width: 768px) {
          .dot-animation { width: 10px; height: 10px; }
        }

        @media (min-width: 1024px) {
          .dot-animation { width: 12px; height: 12px; }
        }

        @keyframes pulseCircle {
          0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
          50%  { opacity: 1;   transform: scale(1.2) translateX(2px); }
          100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
        }

        @media (min-width: 640px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(3px); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
          }
        }

        @media (min-width: 768px) {
          @keyframes pulseCircle {
            0%   { opacity: 0.3; transform: scale(0.8) translateX(0); }
            50%  { opacity: 1;   transform: scale(1.2) translateX(4px); }
            100% { opacity: 0.3; transform: scale(0.8) translateX(0); }
          }
        }
      `}</style>
      </Container>
    </div>
 
    
  )
}

export default Hero
