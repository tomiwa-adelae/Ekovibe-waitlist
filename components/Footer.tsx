import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-primary py-6">
      <div className="container text-sm text-center text-white">
        &copy; {new Date().getFullYear()} Ekovibe. All rights reserved.
      </div>
    </footer>
  );
};
