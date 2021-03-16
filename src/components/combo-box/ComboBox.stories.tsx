import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ComboBox, ComboBoxItem } from "./ComboBox";

const dynamicData: ComboBoxItem[] = [
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

storiesOf("Lens/ComboBox", module)
  .add("Default (with static data)", () => (
    <ComboBox.Container
      label="Repository"
      onSelectionChange={action("onSelectionChange")}
    >
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Container>
  ))
  .add("Default (with dynamic data)", () => (
    <ComboBox.Container
      label="Repository"
      items={dynamicData}
      onSelectionChange={action("onSelectionChange")}
    >
      {item => <ComboBox.Option key={item.key}>{item.title}</ComboBox.Option>}
    </ComboBox.Container>
  ))
  .add("With placeholder", () => (
    <ComboBox.Container
      label="Repository"
      placeholder="Select a repository"
      onSelectionChange={action("onSelectionChange")}
    >
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Container>
  ))
  .add("With a pre-selected option", () => (
    <ComboBox.Container
      label="Repository"
      defaultSelectedKey="cloud"
      onSelectionChange={action("onSelectionChange")}
    >
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Container>
  ))
  .add("Disabled", () => (
    <ComboBox.Container label="Repository" isDisabled>
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Container>
  ));
