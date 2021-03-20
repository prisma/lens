import { storiesOf } from "@storybook/react"
import { TitleGroup } from "./TitleGroup"

storiesOf("Lens/TitleGroup", module).add("Default", () => (
  <TitleGroup
    icon="folder-plus"
    title="New Project"
    subtitle="Create a new project or connect to an existing one on Github"
  />
))
