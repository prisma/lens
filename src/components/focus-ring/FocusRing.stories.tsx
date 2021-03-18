import { storiesOf } from "@storybook/react";
import { FocusRing } from "./FocusRing";

storiesOf("Lens/FocusRing", module).add("Default", () => (
  <FocusRing within>
    <div tabIndex={1} className="rounded-md text-gray-900 dark:text-gray-100">
      Press Tab to focus me
    </div>
  </FocusRing>
));
