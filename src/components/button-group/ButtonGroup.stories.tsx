import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { ButtonGroup } from "./ButtonGroup"
import { Button } from "../button/Button"

storiesOf("Lens/ButtonGroup", module)
  .add("With primary button", () => (
    <ButtonGroup>
      <Button variant="primary" onPress={action("onPress")}>
        Save
      </Button>
    </ButtonGroup>
  ))
  .add("With primary & secondary buttons", () => (
    <ButtonGroup>
      <Button variant="primary" onPress={action("onPress")}>
        Save
      </Button>
      <Button variant="link" onPress={action("onPress")}>
        Cancel
      </Button>
    </ButtonGroup>
  ))
  .add("With primary, secondary & tertiary buttons", () => (
    <ButtonGroup>
      <Button variant="primary" onPress={action("onPress")}>
        Save
      </Button>
      <Button variant="link" onPress={action("onPress")}>
        Cancel
      </Button>
      <Button variant="link" onPress={action("onPress")}>
        Remove from project
      </Button>
    </ButtonGroup>
  ))
