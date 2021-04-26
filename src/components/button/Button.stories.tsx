import { action } from "@storybook/addon-actions"
import { Button } from "./Button"
import { Icon } from "../icon/Icon"

const noIcon = null
const databaseIcon = <Icon name="database" size="sm" />
const iconOptions = { noIcon, databaseIcon }

const iconArgType = {
  options: Object.keys(iconOptions),
  mapping: iconOptions,
  control: {
    type: "select",
    labels: {
      noIcon: "No Icon (Null)",
      databaseIcon: "Database Icon",
    },
  },
}

export const Default = (props) => <Button {...props}>Save Changes</Button>
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "inline-radio",
      },
      defaultValue: "primary",
    },
    startIcon: iconArgType,
    endIcon: iconArgType,
  },
}

export const Primary = () => (
  <div className="flex space-x-4">
    <Button variant="primary" onPress={action("onPress")}>
      Primary
    </Button>
    <Button variant="primary" isDisabled>
      Disabled
    </Button>
  </div>
)

export const Secondary = () => (
  <div className="flex space-x-4">
    <Button variant="secondary" onPress={action("onPress")}>
      Primary
    </Button>
    <Button variant="secondary" isDisabled>
      Disabled
    </Button>
  </div>
)

export const Link = () => (
  <div className="flex space-x-4">
    <Button variant="link" onPress={action("onPress")}>
      Primary
    </Button>
    <Button variant="link" isDisabled>
      Disabled
    </Button>
  </div>
)

export const Quiet = () => (
  <div className="flex space-x-4">
    <Button variant="quiet" onPress={action("onPress")}>
      Primary
    </Button>
    <Button variant="quiet" isDisabled>
      Disabled
    </Button>
  </div>
)

export const WithStartIcon = () => (
  <div className="flex space-x-4">
    <Button variant="primary" startIcon={<Icon name="database" size="sm" />} onPress={action("onPress")}>
      Primary
    </Button>
    <Button variant="primary" startIcon={<Icon name="database" size="sm" />} isDisabled>
      Disabled
    </Button>
  </div>
)

export const WithEndIcon = () => (
  <div className="flex space-x-4">
    <Button variant="primary" endIcon={<Icon name="database" size="sm" />} onPress={action("onPress")}>
      Primary
    </Button>
    <Button variant="primary" endIcon={<Icon name="database" size="sm" />} isDisabled>
      Disabled
    </Button>
  </div>
)
