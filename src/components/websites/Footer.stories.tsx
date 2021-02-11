import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Footer from "./footer";

const dummyNL: React.FC = () => <></>;

export default {
  title: "Website/Footer",
  component: Footer,
} as Meta;

const Template: Story<{ newsletterComponent: any }> = (args) => (
  <Footer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  newsletterComponent: dummyNL,
};
