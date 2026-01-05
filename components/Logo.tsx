import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={"/assets/logo-9.png"}
        alt="Ekovibes logo"
        width={1000}
        height={1000}
        className="object-cover h-auto w-40"
      />
    </Link>
  );
};
