import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextField } from "./TextField";

storiesOf("Lens/TextField", module)
  .add("Default", () => (
    <TextField type="text" label="Label" onChange={action("onChange")} />
  ))
  .add("With Placeholder", () => (
    <TextField
      type="text"
      label="Environment"
      placeholder="production"
      onChange={action("onChange")}
    />
  ))
  .add("With Prefix", () => (
    <TextField
      type="text"
      label="Handle"
      prefix="cloud.prisma.io/spacex/"
      defaultValue="falcon-9"
      onChange={action("onChange")}
    />
  ));
