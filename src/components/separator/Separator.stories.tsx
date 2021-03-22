import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Separator } from "./Separator"
import { Button } from "../button/Button"

storiesOf("Lens/Separator", module)
  .add("Default", () => (
    <div className="flex flex-col justify-center">
      <Button variant="quiet" onPress={action("onPress")}>
        Top
      </Button>
      <Separator />
      <Button variant="quiet" onPress={action("onPress")}>
        Bottom
      </Button>
    </div>
  ))
  .add("Vertical", () => (
    <>
      <Button variant="quiet" onPress={action("onPress")}>
        Left
      </Button>
      <Separator orientation="vertical" />
      <Button variant="quiet" onPress={action("onPress")}>
        Right
      </Button>
    </>
  ))
