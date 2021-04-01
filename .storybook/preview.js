import React from "react"
import { themes } from "@storybook/theming"
import { LensProvider } from "../src/provider/LensProvider"

export const decorators = [
  (Story) => (
    <LensProvider>
      <div className="flex justify-center" style={{ minWidth: 580 }}>
        <Story />
      </div>
    </LensProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  darkMode: {
    darkClass: "dark",
    light: { ...themes.light, appContentBg: "#F7FAFC" /* lightPageBg */ },
    dark: { ...themes.dark, appContentBg: "#18181B" /* darkPageBg */ },
    stylePreview: true,
  },
}
