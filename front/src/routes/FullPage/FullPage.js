import React from "react";
import { FullPage, Slide } from 'react-full-page';
import './FullPage.scss'
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

function fullPage() {
  return (
    <FullPage controls controlsProps={{className: 'slide-navigation'}}>
      <Slide>
        <SectionOne />
      </Slide>
      <Slide>
        <SectionTwo />
      </Slide>
      <Slide>
        <SectionThree />
      </Slide>
    </FullPage>
    // <>
    //   <SectionOne />
    //   <SectionTwo />
    //   <SectionThree />
    // </>
  );
}

export default fullPage;
