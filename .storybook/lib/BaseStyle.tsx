import { createGlobalStyle } from "styled-components";
import fontFace from "./font-face";

// TODO: add normalize
const BaseStyle = createGlobalStyle`
  ${fontFace}
`;

export default BaseStyle;
