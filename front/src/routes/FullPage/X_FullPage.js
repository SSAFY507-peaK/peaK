import React from "react";
import { FullPage as Full, Slide } from "react-full-page";

import NavBar from "../../components/LayoutPage/NavBar";
import { SectionOne, SectionTwo, SectionThree, SectionFour } from "./SectionPages";

import "./X_FullPage.scss";

function X_FullPage() {
  return (
    <>
      <NavBar />
      <Full controls controlsProps={{ className: "slide-navigation" }}>
        <Slide>
          <SectionOne backgroundColor="var(--white800-color)" />
        </Slide>
        <Slide>
          <SectionTwo backgroundColor="#fff1f9" />
        </Slide>
        <Slide>
          <SectionThree backgroundColor="#f0fff2" />
        </Slide>
        <Slide>
          <SectionFour backgroundColor="#cff4ff" />
        </Slide>
      </Full>
    </>
  );
}

export default X_FullPage;
