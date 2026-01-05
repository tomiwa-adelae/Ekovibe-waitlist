import React from "react";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container">
        <Logo />
      </div>
    </header>
  );
};
