import { action } from "@storybook/addon-actions"
import { Select } from "./Select"
import { Link } from "../link/Link"

export const Default = (props) => (
  <Select.Container {...props}>
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku</Select.Option>
    <Select.Option key="aws">Amazon Web Services</Select.Option>
  </Select.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Select",
  component: Select,
  argTypes: {
    label: {
      defaultValue: "Database Provider",
    },
  },
}

export const WithStaticData = () => (
  <Select.Container
    label="Database Provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku</Select.Option>
    <Select.Option key="aws">Amazon Web Services</Select.Option>
  </Select.Container>
)

export const WithSectionsAndStaticData = () => (
  <Select.Container
    label="Database Provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Section title="Free">
      <Select.Option key="railway">Railway</Select.Option>
      <Select.Option key="heroku">Heroku Free</Select.Option>
    </Select.Section>
    <Select.Section title="Paid">
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku</Select.Option>
      <Select.Option key="aws">Amazon Web Services</Select.Option>
    </Select.Section>
  </Select.Container>
)

export const WithFooterAndStaticData = () => (
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
)

export const WithPlaceholder = () => (
  <Select.Container
    label="Database Provider"
    placeholder="Select a provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku</Select.Option>
    <Select.Option key="aws">Amazon Web Services</Select.Option>
  </Select.Container>
)

export const WithPreSelectedOption = () => (
  <Select.Container
    label="Database Provider"
    defaultSelectedKey="heroku"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku</Select.Option>
    <Select.Option key="aws">Amazon Web Services</Select.Option>
  </Select.Container>
)

export const Disabled = () => (
  <Select.Container label="Database Provider" isDisabled>
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku</Select.Option>
    <Select.Option key="aws">Amazon Web Services</Select.Option>
  </Select.Container>
)
