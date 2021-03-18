import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Avatar } from "./Avatar";

storiesOf("Lens/Avatar", module)
  .add("Default", () => (
    <Avatar url="/favicon.ico" label="Lens user" onPress={action("onPress")} />
  ))
  .add("Sizes", () => (
    <div className="flex items-center space-x-4">
      <Avatar url="/favicon.ico" label="Lens user" size="xs" />
      <Avatar url="/favicon.ico" label="Lens user" size="sm" />
      <Avatar url="/favicon.ico" label="Lens user" size="md" />
      <Avatar url="/favicon.ico" label="Lens user" size="lg" />
      <Avatar url="/favicon.ico" label="Lens user" size="xl" />
    </div>
  ));
