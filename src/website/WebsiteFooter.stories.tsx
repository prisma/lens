import React from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react"

import { WebsiteFooter } from "./WebsiteFooter"

const dummyNL: React.FC = () => <></>

export default {
  title: "Website/Footer",
  component: WebsiteFooter,
} as Meta

const Template: Story<{ newsletterComponent: any }> = (args) => (
  <WebsiteFooter {...args} />
)

export const Default = Template.bind({})
Default.args = {
  newsletterComponent: dummyNL,
}
