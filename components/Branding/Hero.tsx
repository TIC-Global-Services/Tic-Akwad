import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen px-4 text-center">
      <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-tight md:leading-[110px] max-w-3xl">
        One home <br />
        for <span className="text-[#808080]">your design</span>
      </h1>

      <p className="text-[#a0a0a0] text-base sm:text-lg md:text-xl mt-4 max-w-md">
        Let us create stunning designs for your brand.
      </p>

      <Link
        href="/contact"
        className="mt-6 px-6 py-3 sm:px-8 sm:py-2 rounded-full bg-transparent text-white border border-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
      >
       Contact us
      </Link>
    </div>
  )
}

export default Hero
