import { action } from "@storybook/addon-actions"
import { Button, ButtonProps } from "./Button"

const noIcon = null
const databaseIcon = "database"
const iconOptions = { noIcon, databaseIcon }

const iconArgType = {
  options: Object.keys(iconOptions),
  mapping: iconOptions,
  control: {
    type: "select",
    labels: {
      noIcon: "No Icon",
      databaseIcon: "Database Icon",
    },
  },
}

export const Default = (props: ButtonProps) => (
  <Button {...props}>Save Changes</Button>
)
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
    iconSize: {
      control: {
        type: "inline-radio",
      },
      defaultValue: "sm",
    },
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

export const Negative = () => (
  <div className="flex space-x-4">
    <Button variant="negative" onPress={action("onPress")}>
      Negative
    </Button>
    <Button variant="negative" isDisabled>
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

export const WithLeadingIcon = () => (
  <div className="flex space-x-4">
    <Button
      variant="primary"
      leadingIcon="database"
      onPress={action("onPress")}
    >
      Primary
    </Button>
    <Button variant="primary" leadingIcon="database" isDisabled>
      Disabled
    </Button>
  </div>
)

export const WithTrailingIcon = () => (
  <div className="flex space-x-4">
    <Button
      variant="primary"
      trailingIcon="database"
      onPress={action("onPress")}
    >
      Primary
    </Button>
    <Button variant="primary" trailingIcon="database" isDisabled>
      Disabled
    </Button>
  </div>
)
