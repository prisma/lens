import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Select, SelectOption } from "./Select";

type ProviderId = "planetscale" | "heroku" | "aws";

const dynamicData: SelectOption<ProviderId>[] = [
  {
    key: "planetscale",
    title: "PlanetScale",
  },
  {
    key: "heroku",
    title: "Heroku",
  },
  {
    key: "aws",
    title: "Amazon Web Services",
  },
];

storiesOf("Lens/Select", module)
  .add("Default (with static data)", () => (
    <Select.Container
      label="Database Provider"
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">AWS</Select.Option>
    </Select.Container>
  ))
  .add("Default (with dynamic data)", () => (
    <Select.Container
      label="Database Provider"
      options={dynamicData}
      onSelectionChange={action("onSelectionChange")}
    >
      {option => <Select.Option key={option.key}>{option.title}</Select.Option>}
    </Select.Container>
  ))
  .add("With placeholder", () => (
    <Select.Container
      label="Database Provider"
      placeholder="Select a provider"
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">AWS</Select.Option>
    </Select.Container>
  ))
  .add("With a pre-selected option", () => (
    <Select.Container
      label="Database Provider"
      defaultSelectedKey="heroku"
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">AWS</Select.Option>
    </Select.Container>
  ))
  .add("Disabled", () => (
    <Select.Container label="Database Provider" isDisabled>
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">AWS</Select.Option>
    </Select.Container>
  ));
