import React from "react";
import { assets } from "../assets/assets";


const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-radial to-[#1a1919] from-[#f0efee] my-16 rounded-xl overflow-hidden">
      <img
        className="max-w-56"
        src={assets.boy}
        alt="jbl_soundbox_image"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px] text-black">
          Level Up Your Gaming Experience
        </h2>
        <p className="max-w-[343px] font-medium text-black">
          From immersive sound to precise controls—everything you need to win
        </p>
        <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-[red] rounded text-white">
          Explore More
        </button>
      </div>
      <img
        className="hidden md:block max-w-60 mr-24"
        src={assets.girl}
        alt="md_controller_image"
      />
    </div>
  );
};

export default Banner;