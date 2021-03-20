import React from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react"

import { WebsiteHeader } from "./WebsiteHeader"

export default {
  title: "Website/Header",
  component: WebsiteHeader,
} as Meta

const Template: Story = (args) => <WebsiteHeader {...args} />

export const Default = Template.bind({})
