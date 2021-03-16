import { storiesOf } from "@storybook/react";
import { Button } from "./Button";

storiesOf("Lens/Button", module)
  .add("Primary variant", () => (
    <>
      <Button>Primary</Button>
      <Button isDisabled>Disabled</Button>
    </>
  ))
  .add("Secondary variant", () => (
    <>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" isDisabled>
        Disabled
      </Button>
    </>
  ))
  .add("Quiet variant", () => (
    <>
      <Button variant="quiet">Button</Button>
      <Button variant="quiet" isDisabled>
        Disabled
      </Button>
    </>
  ))
  .add("Link variant", () => (
    <>
      <Button variant="link">Button</Button>
      <Button variant="link" isDisabled>
        Disabled
      </Button>
    </>
  ));
