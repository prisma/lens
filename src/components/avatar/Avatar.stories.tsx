import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Avatar } from "./Avatar"

storiesOf("Lens/Avatar", module)
  .add("Default", () => (
    <Avatar label="Lens user" onPress={action("onPress")} />
  ))
  .add("With custom URL", () => <Avatar url="/avatar1.png" label="Lens user" />)
  .add("Sizes", () => (
    <div className="flex items-center space-x-4">
      <Avatar url="/avatar2.png" label="Lens user" size="xs" />
      <Avatar url="/avatar2.png" label="Lens user" size="sm" />
      <Avatar url="/avatar2.png" label="Lens user" size="md" />
      <Avatar url="/avatar2.png" label="Lens user" size="lg" />
      <Avatar url="/avatar2.png" label="Lens user" size="xl" />
    </div>
  ))
  .add("With Name & Email", () => (
    <Avatar
      url="/avatar3.png"
      label="Lens user"
      name="Lens User"
      email="lens@prisma.io"
    />
  ))
