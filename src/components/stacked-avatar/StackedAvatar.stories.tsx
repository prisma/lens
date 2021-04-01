import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { StackedAvatar, AvatarProps } from "./StackedAvatar"

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

storiesOf("Lens/StackedAvatar", module).add("Default", () => (
  <StackedAvatar avatars={avatars} />
))
