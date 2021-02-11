import React from 'react'
import BaseStyle from '../src/components/BaseStyle'
import {createGlobalStyle} from 'styled-components'
import theme from '../src/theme'
// Global decorator to apply the styles to all stories

//HACK - remove when we have proper normalize in BaseStyle
const TempooraryGlobalStyle = createGlobalStyle`
 html{
  font-family: ${theme.fonts.text}
 }
`

export const decorators = [
  Story => (
    <>
      <TempooraryGlobalStyle/>
      <BaseStyle />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
}