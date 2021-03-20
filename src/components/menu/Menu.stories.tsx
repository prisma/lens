import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Menu, MenuOption } from "./Menu"
import { Button } from "../button/Button"

type Action =
  | "edit"
  | "invite"
  | "delete"
  | "invite-viewer"
  | "invite-collaborator"
  | "invite-developer"
  | "invite-admin"

const dynamicData: MenuOption<Action>[] = [
  {
    key: "edit",
    title: "Edit",
  },
  {
    key: "invite",
    title: "Invite",
  },
  {
    key: "delete",
    title: "Delete",
  },
]

const dynamicDataWithChildren: MenuOption<Action>[] = [
  {
    key: "edit",
    title: "Edit",
  },
  {
    key: "invite",
    title: "Invite",
    children: [
      {
        key: "invite-viewer",
        title: "Invite as Viewer",
      },
      {
        key: "invite-collaborator",
        title: "Invite as Collaborator",
      },
      {
        key: "invite-developer",
        title: "Invite as Developer",
      },
      {
        key: "invite-admin",
        title: "Invite as Admin",
      },
    ],
  },
  {
    key: "delete",
    title: "Delete",
  },
]

storiesOf("Lens/Menu", module)
  .add("Default (with static data)", () => (
    <div className="flex justify-center">
      <Menu.Container>
        <Button variant="quiet">Menu Trigger</Button>

        <Menu.Content
          title="Project Actions"
          onSelectionChange={action("onSelectionChange")}
        >
          <Menu.Option key="edit">Edit</Menu.Option>
          <Menu.Option key="invite">Invite</Menu.Option>
          <Menu.Option key="delete">Delete</Menu.Option>
        </Menu.Content>
      </Menu.Container>
    </div>
  ))
  .add("Default (with dynamic data)", () => (
    <Menu.Container>
      <Button variant="quiet">Menu Trigger</Button>

      <Menu.Content
        title="Project Actions"
        options={dynamicData}
        onSelectionChange={action("onSelectionChange")}
      >
        {(item) => <Menu.Option key={item.key}>{item.title}</Menu.Option>}
      </Menu.Content>
    </Menu.Container>
  ))
  .add("Default with Sections (with static data)", () => (
    <Menu.Container>
      <Button variant="quiet">Menu Trigger</Button>

      <Menu.Content
        title="Project Actions"
        onSelectionChange={action("onSelectionChange")}
      >
        <Menu.Section title="Personal">
          <Menu.Option key="cloud">Cloud</Menu.Option>
          <Menu.Option key="studio">Studio</Menu.Option>
        </Menu.Section>
        <Menu.Section title="Organizations">
          <Menu.Option key="prisma">Prisma</Menu.Option>
          <Menu.Option key="netlify">Netlify</Menu.Option>
        </Menu.Section>
      </Menu.Content>
    </Menu.Container>
  ))
  .add("Default with Sections (with dynamic data)", () => (
    <Menu.Container>
      <Button variant="quiet">Menu Trigger</Button>

      <Menu.Content
        title="Project Actions"
        options={dynamicDataWithChildren}
        onSelectionChange={action("onSelectionChange")}
      >
        {(item) => <Menu.Option key={item.key}>{item.title}</Menu.Option>}
      </Menu.Content>
    </Menu.Container>
  ))
