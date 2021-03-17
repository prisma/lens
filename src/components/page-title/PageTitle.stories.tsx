import { storiesOf } from "@storybook/react";
import { PageTitle } from "./PageTitle";

storiesOf("Lens/PageTitle", module).add("Default", () => (
  <PageTitle
    icon="folder-plus"
    title="New Project"
    subtitle="Create a new project or connect to an existing one on Github"
  />
));
