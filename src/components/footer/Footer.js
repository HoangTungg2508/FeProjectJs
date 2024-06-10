import React from "react";
import BackToTopButton from "./BackToTopButton";

function Footer() {
  return (
    <>
      <BackToTopButton />
      <div className="flex flex-col p-3 items-center gap-5">
        <h1 className="text-4xl uppercase">KUN SHOP</h1>
        <p className="text-center">
          © Copyright KUN. All rights reserved | Design by Dev{" "}
        </p>
      </div>
    </>
  );
}

export default Footer;
