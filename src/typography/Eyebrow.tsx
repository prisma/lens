import styled from "styled-components";
import { theme } from "../theme";

/**
 *  Eyebrows are to be used above heading elements for additional context
 */
const Eyebrow = styled.p`
  font-weight: bold;
  font-family: ${theme.fonts.display};
  font-size: ${theme.fontSizes[20]};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${theme.space[16]};
  color: ${theme.colors.gray500};
`;

export { Eyebrow };
