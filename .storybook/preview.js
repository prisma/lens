import React from 'react'
import BaseStyle from '../src/components/BaseStyle'
// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
      <BaseStyle />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}