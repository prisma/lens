import React from "react";
import styled from "styled-components";

import { colorPrimitives } from "../../src/theme";

const StyledColor = styled.div<{ bgColor: string; textColor: string }>`
  display: flex;
  padding: 32px;
  font-family: ${props => props.theme.fonts.text};
  background: ${p => p.bgColor};
  color: ${p => p.textColor};
`;

const Colortiles = () => {
  return Object.entries(colorPrimitives).map(([colorKey, color]) => (
    <StyledColor
      bgColor={color}
      textColor={colorForBg(colorKey)}
      key={colorKey}
    >
      <div style={{ flex: 2 }}>
        <strong>{colorKey}</strong>
      </div>
      {color}
    </StyledColor>
  ));
};

const colorForBg = colorName => {
  if (
    Number(colorName.slice(colorName.length - 3)) > 600 ||
    colorName == "black"
  ) {
    return "white";
  }
  return "black";
};

export default Colortiles;
