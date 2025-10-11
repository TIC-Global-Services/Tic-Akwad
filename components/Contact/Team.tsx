"use client";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi2";

const contentTeam = [
  { role: "Admin", name: "Samanvitha", email: "Admin@theinternetcompany.one" },
  { role: "Senior Designer", name: "Gokul", email: "design@theinternetcompany.one" },
  { role: "Dev", name: "Bala", email: "dev@theinternetcompany.one" },
];

const Team = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index:any) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="md:py-20 py-10">
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-7xl text-black font-medium md:mb-8 mb-4 text-start tracking-tighter max-w-[750px]">
        We're always looking for new collaborations.
      </h2>

      <div className="w-full">
        {contentTeam.map((member, index) => (
          <div
            key={index}
            className="border-b border-black"
          >
            {/* Mobile View */}
            <div className="sm:hidden">
              <div
                onClick={() => toggleExpand(index)}
                className="flex items-center justify-between py-6 cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <span className="text-black font-medium text-lg tracking-tighter">
                    {member.role}
                  </span>
                  <span className="text-black font-medium text-lg tracking-tighter">
                    | {member.name}
                  </span>
                </div>
                <HiPlus
                  className={`w-6 h-6 text-black transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-45" : ""
                  }`}
                />
              </div>
              
              {/* Expanded Email Section */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? "max-h-24 pb-6" : "max-h-0"
                }`}
              >
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
                >
                  {member.email}
                </a>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex flex-row items-center justify-between py-10 gap-6 text-left">
              {/* Role */}
              <div className="w-1/3 text-black font-medium text-3xl md:text-4xl xl:text-5xl lg:text-5xl tracking-tighter">
                {member.role}
              </div>

              {/* Name */}
              <div className="w-1/3 text-black font-medium text-3xl md:text-4xl xl:text-5xl lg:text-5xl  tracking-tighter">
                {member.name}
              </div>

              {/* Email Button */}
              <div className="w-1/3 flex justify-end">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-black text-black text-lg xl:text-xl lg:text-xl md:text-md font-medium hover:bg-black hover:text-white transition-all duration-300"
                >
                  {member.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;