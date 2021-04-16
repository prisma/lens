import { action } from "@storybook/addon-actions"
import { Separator } from "./Separator"
import { Button } from "../button/Button"

export const Default = (props) => (
  <div className="flex h-10 w-10">
    <div>Leading</div>
    <Separator {...props} />
    <div>Trailing</div>
  </div>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      control: {
        type: "inline-radio",
        options: ["horizontal", "vertical"],
      },
      defaultValue: "horizontal",
    },
  },
}

export const Horizontal = () => (
  <div className="flex flex-col justify-center">
    <Button variant="quiet" onPress={action("onPress")}>
      Top
    </Button>
    <Separator />
    <Button variant="quiet" onPress={action("onPress")}>
      Bottom
    </Button>
  </div>
)

export const Vertical = () => (
  <>
    <Button variant="quiet" onPress={action("onPress")}>
      Left
    </Button>
    <Separator orientation="vertical" />
    <Button variant="quiet" onPress={action("onPress")}>
      Right
    </Button>
  </>
)
