import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Button } from "./Button"

storiesOf("Lens/Button", module)
  .add("Primary variant", () => (
    <div className="flex space-x-4">
      <Button onPress={action("onPress")}>Primary</Button>
      <Button isDisabled>Disabled</Button>
    </div>
  ))
  .add("Secondary variant", () => (
    <div className="flex space-x-4">
      <Button onPress={action("onPress")} variant="secondary">
        Secondary
      </Button>
      <Button variant="secondary" isDisabled>
        Disabled
      </Button>
    </div>
  ))
  .add("Quiet variant", () => (
    <div className="flex space-x-4">
      <Button onPress={action("onPress")} variant="quiet">
        Button
      </Button>
      <Button variant="quiet" isDisabled>
        Disabled
      </Button>
    </div>
  ))
  .add("Link variant", () => (
    <div className="flex space-x-4">
      <Button onPress={action("onPress")} variant="link">
        Button
      </Button>
      <Button variant="link" isDisabled>
        Disabled
      </Button>
    </div>
  ))
