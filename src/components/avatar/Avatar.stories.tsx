import { action } from "@storybook/addon-actions"
import { Avatar } from "./Avatar"

export const Default = (props) => <Avatar {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: "inline-radio",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      defaultValue: "lg",
    },
  },
}

export const WithCustomURL = () => (
  <Avatar url="/avatar1.png" label="Lens user" onPress={action("onPress")} />
)

export const Sizes = () => (
  <div className="flex items-center space-x-4">
    <Avatar url="/avatar2.png" label="Lens user" size="xs" />
    <Avatar url="/avatar2.png" label="Lens user" size="sm" />
    <Avatar url="/avatar2.png" label="Lens user" size="md" />
    <Avatar url="/avatar2.png" label="Lens user" size="lg" />
    <Avatar url="/avatar2.png" label="Lens user" size="xl" />
  </div>
)

export const WithNameAndEmail = () => (
  <Avatar
    url="/avatar3.png"
    label="Lens user"
    name="Lens User"
    email="lens@prisma.io"
  />
)
