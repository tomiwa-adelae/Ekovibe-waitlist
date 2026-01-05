import React from "react";
import { Header } from "./Header";
import { Button } from "./ui/button";

export const Showcase = () => {
  return (
    <div className="min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src={"/assets/showcase-video.mp4"} type="video/mp4" />
      </video>
      <div className="container grid text-white">
        <div className="z-50">
          <Header />
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                Nigeria's First
              </h1>
              <h3 className="text-gray-300 text-lg md:text-xl lg:text-2xl font-medium mt-4">
                Multi-dimensional Lifestyle Ecosystem
              </h3>
              <Button variant={"gradient"} className="mt-4">
                Join our waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};
