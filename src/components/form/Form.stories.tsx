import { storiesOf } from "@storybook/react";
import { Form } from "./Form";
import { TextField } from "../text-field/TextField";
import { Select } from "../select/Select";
import { ComboBox, ComboBoxOption } from "../combo-box/ComboBox";

type RepositoryId =
  | "prisma"
  | "studio"
  | "cloud"
  | "engines"
  | "examples"
  | "docs";

const repositories: ComboBoxOption<RepositoryId>[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
  {
    key: "studio",
    title: "prisma/studio",
  },
  {
    key: "cloud",
    title: "prisma/cloud",
  },
  {
    key: "engines",
    title: "prisma/engines",
  },
  {
    key: "examples",
    title: "prisma/examples",
  },
  {
    key: "docs",
    title: "prisma/docs",
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
    <ComboBox.Container label="Repository" options={repositories}>
      {item => <ComboBox.Option key={item.key}>{item.title}</ComboBox.Option>}
    </ComboBox.Container>
  </Form>
));
