import { action } from "@storybook/addon-actions"
import { ButtonGroup } from "./ButtonGroup"
import { Button } from "../button/Button"

export default {
  title: "Lens/ButtonGroup",
  component: ButtonGroup,
}

export const WithPrimaryButton = () => (
  <ButtonGroup>
    <Button variant="primary" onPress={action("onPress")}>
      Save
    </Button>
  </ButtonGroup>
)

export const WithPrimaryAndSecondaryButtons = () => (
  <ButtonGroup>
    <Button variant="primary" onPress={action("onPress")}>
      Save
    </Button>
    <Button variant="link" onPress={action("onPress")}>
      Cancel
    </Button>
  </ButtonGroup>
)

export const WithPrimarySecondaryAndTertiaryButtons = () => (
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
)
