import Image from "next/image";
import React from "react";

export const ComingSoon = () => {
  return (
    <div className="py-12 bg-[#152D27] text-white">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center justify-start">
          <div>
            <h2 className="font-semibold text-3xl lg:text-4xl">
              The Ecosystem is Loading.
            </h2>
            <p className="text-base mt-1.5 text-gray-300">
              Nigeria’s first multi-dimensional lifestyle ecosystem designed to
              curate, facilitate, and celebrate the pinnacle of modern African
              living. From elite access to bespoke service, Ekovibe bridges the
              gap between desire and reality.
            </p>
          </div>
        </div>
        <div>
          <Image
            src={"/assets/coming-soon-img.png"}
            alt="Coming soon"
            width={1000}
            height={1000}
            className="size-full object-cover opacity-95
  [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
  [-webkit-mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
"
          />
        </div>
      </div>
    </div>
  );
};
