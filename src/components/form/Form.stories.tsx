import { storiesOf } from "@storybook/react";
import { Form } from "./Form";
import { TextField } from "../text-field/TextField";
import { Select } from "../select/Select";
import { ComboBox, ComboBoxItem } from "../combo-box/ComboBox";

const repositories: ComboBoxItem[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
];

storiesOf("Lens/Form", module).add("Default", () => (
  <Form>
    <TextField label="First Name" />
    <TextField label="Environment" placeholder="production" />
    <TextField label="Handle" prefix="cloud.prisma.io/spacex/" />
    <Select.Container label="Project">
      <Select.Option>Connect to an existing Prisma project</Select.Option>
      <Select.Option>Create a new Prisma project</Select.Option>
    </Select.Container>
    <ComboBox.Container label="Repository" items={repositories}>
      {item => <ComboBox.Option key={item.key}>{item.title}</ComboBox.Option>}
    </ComboBox.Container>
  </Form>
));
