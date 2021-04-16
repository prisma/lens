import { action } from "@storybook/addon-actions"
import { AvatarProps } from "../avatar/Avatar"
import { StackedAvatar } from "./StackedAvatar"

const avatars: AvatarProps[] = [
  {
    label: "Lens user 1",
    url: "/avatar1.png",
    name: "Lens user 1",
    email: "user1@prisma.io",
    onPress: action("onPress 1"),
  },
  {
    label: "Lens user 2",
    url: "/avatar2.png",
    name: "Lens user 2",
    email: "user2@prisma.io",
    onPress: action("onPress 2"),
  },
  {
    label: "Lens user 3",
    url: "/avatar3.png",
    name: "Lens user 3",
    email: "user3@prisma.io",
    onPress: action("onPress 3"),
  },
  {
    label: "Lens user 4",
    url: "/avatar4.png",
    name: "Lens user 4",
    email: "user4@prisma.io",
    onPress: action("onPress 4"),
  },
  {
    label: "Lens user 5",
    url: "/avatar10.png",
    name: "Lens user 5",
    email: "user5@prisma.io",
    onPress: action("onPress 5"),
  },
  {
    label: "Lens user 6",
    url: "/avatar6.png",
    name: "Lens user 6",
    email: "user6@prisma.io",
    onPress: action("onPress 6"),
  },
]

export const Default = (props) => (
  <StackedAvatar avatars={avatars.slice(0, 5)} onPress={action("onPress")} />
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/StackedAvatar",
  component: StackedAvatar,
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

export const Sizes = () => (
  <div className="flex flex-col items-center space-y-4">
    <StackedAvatar size="xs" avatars={avatars.slice(0, 5)} />
    <StackedAvatar size="sm" avatars={avatars.slice(0, 5)} />
    <StackedAvatar size="md" avatars={avatars.slice(0, 5)} />
    <StackedAvatar size="lg" avatars={avatars.slice(0, 5)} />
    <StackedAvatar size="xl" avatars={avatars.slice(0, 5)} />
  </div>
)

export const WithTruncation = () => <StackedAvatar avatars={avatars} />
