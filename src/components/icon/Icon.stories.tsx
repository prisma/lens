import { storiesOf } from "@storybook/react";
import { Icon } from "./Icon";

storiesOf("Lens/Icon", module)
  .add("Default", () => (
    <>
      <Icon name="database" />
    </>
  ))
  .add("Sizes", () => (
    <div className="flex items-center space-x-4">
      <Icon name="database" size="xs" />
      <Icon name="database" size="sm" />
      <Icon name="database" size="md" />
      <Icon name="database" size="lg" />
      <Icon name="database" size="xl" />
    </div>
  ));
