import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

storiesOf("Lens/Button", module)
  .add("Primary variant", () => (
    <>
      <Button onPress={action("onPress")}>Primary</Button>
      <Button isDisabled>Disabled</Button>
    </>
  ))
  .add("Secondary variant", () => (
    <>
      <Button onPress={action("onPress")} variant="secondary">
        Secondary
      </Button>
      <Button variant="secondary" isDisabled>
        Disabled
      </Button>
    </>
  ))
  .add("Quiet variant", () => (
    <>
      <Button onPress={action("onPress")} variant="quiet">
        Button
      </Button>
      <Button variant="quiet" isDisabled>
        Disabled
      </Button>
    </>
  ))
  .add("Link variant", () => (
    <>
      <Button onPress={action("onPress")} variant="link">
        Button
      </Button>
      <Button variant="link" isDisabled>
        Disabled
      </Button>
    </>
  ));
