import React from "react";
import Eyebrow from "./Eyebrow";
import { H2 } from "./heading";

export default {
  title: "Typography/Eyebrow",
  component: Eyebrow,
};

export const Default = () => (
  <>
    <Eyebrow>This is an Eyebrow</Eyebrow>
    <H2 style={{ margin: 0 }}>This is a title</H2>
  </>
);
