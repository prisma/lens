import { action } from "@storybook/addon-actions"
import { Button } from "./Button"

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
