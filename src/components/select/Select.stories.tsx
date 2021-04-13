import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Select, SelectOption } from "./Select"
import { Link } from "../link/Link"

type ProviderId =
  | "planetscale"
  | "heroku"
  | "aws"
  | "elephantsql"
  | "heroku-free"

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
]

const dynamicDataFreeProviders: SelectOption<ProviderId>[] = [
  {
    key: "elephantsql",
    title: "ElephantSQL",
  },
  {
    key: "heroku-free",
    title: "Heroku Free",
  },
]
const dynamicDataPaidProviders: SelectOption<ProviderId>[] = [
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
]

storiesOf("Lens/Select", module)
  .add("Default (with static data)", () => (
    <Select.Container
      label="Database Provider"
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">Amazon Web Services</Select.Option>
    </Select.Container>
  ))
  .add("Default (with dynamic data)", () => (
    <Select.Container
      label="Database Provider"
      options={dynamicData}
      onSelectionChange={action("onSelectionChange")}
    >
      {(option) => (
        <Select.Option key={option.key}>{option.title}</Select.Option>
      )}
    </Select.Container>
  ))
  .add("With sections (with static data)", () => (
    <Select.Container
      label="Database Provider"
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Section title="Free">
        <Select.Option key="elephantsql">ElephantSQL</Select.Option>
        <Select.Option key="heroku">Heroku Free</Select.Option>
      </Select.Section>
      <Select.Section title="Paid">
        <Select.Option key="planetscale">PlanetScale</Select.Option>
        <Select.Option key="heroku">Heroku</Select.Option>
        <Select.Option key="aws">Amazon Web Services</Select.Option>
      </Select.Section>
    </Select.Container>
  ))
  .add("With sections (with dynamic data)", () => (
    <Select.Container
      label="Database Provider"
      options={dynamicData}
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Section items={dynamicDataFreeProviders} title="Free">
        {(option) => (
          <Select.Option key={option.key}>{option.title}</Select.Option>
        )}
      </Select.Section>
      <Select.Section items={dynamicDataPaidProviders} title="Paid">
        {(option) => (
          <Select.Option key={option.key}>{option.title}</Select.Option>
        )}
      </Select.Section>
    </Select.Container>
  ))
  .add("With Footer (with static data)", () => (
    <Select.Container
      label="Database Provider"
      onSelectionChange={action("onSelectionChange")}
    >
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">Amazon Web Services</Select.Option>
      <Select.Footer onPress={action("onSelectFooterPress")}>
        Can't find a supported provider?{" "}
        <Link href="" openInNewTab>
          Request one
        </Link>
      </Select.Footer>
    </Select.Container>
  ))
  .add("With Footer (with dynamic data)", () => (
    <Select.Container
      label="Database Provider"
      options={dynamicData}
      onSelectionChange={action("onSelectionChange")}
    >
      {(option) => (
        <Select.Option key={option.key}>{option.title}</Select.Option>
      )}
      <Select.Footer onPress={action("onSelectFooterPress")}>
        Can't find a supported provider?{" "}
        <Link href="" openInNewTab>
          Request one
        </Link>
      </Select.Footer>
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
      <Select.Option key="aws">Amazon Web Services</Select.Option>
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
      <Select.Option key="aws">Amazon Web Services</Select.Option>
    </Select.Container>
  ))
  .add("Disabled", () => (
    <Select.Container label="Database Provider" isDisabled>
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">Amazon Web Services</Select.Option>
    </Select.Container>
  ))
