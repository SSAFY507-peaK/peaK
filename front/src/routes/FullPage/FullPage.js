import React from "react";
import { FullPage, Slide } from "react-full-page";
import "./FullPage.scss";

import { SectionOne, SectionTwo, SectionThree, SectionFour } from "./SectionPages";

function fullPage() {
  return (
    <FullPage controls controlsProps={{ className: "slide-navigation" }}>
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
    </FullPage>
  );
}

export default fullPage;
