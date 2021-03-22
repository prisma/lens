import React from "react"
import { Story, Meta } from "@storybook/react"
import { LensProvider } from "../provider/LensWebProvider"
import { WebsiteHeader } from "./WebsiteHeader"

export default {
  title: "Website/Header",
  component: WebsiteHeader,
} as Meta

const Template: Story = (args) => (
  // Explicitly wrap in LensProvider to make sure the correct styles are loaded. This is temporary.
  <LensProvider>
    <WebsiteHeader {...args} />
  </LensProvider>
)

export const Default = Template.bind({})
