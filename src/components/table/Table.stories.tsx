import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Table } from "./Table"
import { Avatar } from "../avatar/Avatar"
import { Button } from "../button/Button"

const dynamicColumns = [
  { key: "user", title: "User" },
  { key: "role", title: "Role" },
  { key: "manage", title: "Manage" },
]
const dynamicData = [
  {
    id: 1,
    avatar: "/favicon.ico",
    name: "Lens User 1",
    email: "lens@prisma.io",
    isOwner: true,
    role: "Admin",
  },
  {
    id: 2,
    avatar: "/favicon.ico",
    name: "Lens User 2",
    email: "lens@prisma.io",
    isOwner: false,
    role: "Developer",
  },
  {
    id: 3,
    avatar: "/favicon.ico",
    name: "Lens User 3",
    email: "lens@prisma.io",
    isOwner: false,
    role: "Developer",
  },
  {
    id: 4,
    avatar: "/favicon.ico",
    name: "Lens User 4",
    email: "invited@prisma.io",
    isOwner: false,
    isInvitationPending: true,
    role: "Viewer",
  },
]

storiesOf("Lens/Table", module)
  .add("Default (with static data)", () => (
    <Table.Container>
      <Table.Header>
        <Table.Column key="user">User</Table.Column>
        <Table.Column key="role">Role</Table.Column>
        <Table.Column key="manage">Manage</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Avatar
              url="/favicon.ico"
              label="Lens User 1"
              name="Lens User 1"
              email="lens@prisma.io"
            />
          </Table.Cell>
          <Table.Cell>Owner</Table.Cell>
          <Table.Cell>
            <Button variant="link" onPress={action("onPress")}>
              Edit
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Avatar
              url="/favicon.ico"
              label="Lens User 2"
              name="Lens User 2"
              email="lens@prisma.io"
            />
          </Table.Cell>
          <Table.Cell>Developer</Table.Cell>
          <Table.Cell>
            <Button variant="link" onPress={action("onPress")}>
              Edit
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Avatar
              url="/favicon.ico"
              label="Lens User 3"
              name="Lens User 3"
              email="lens@prisma.io"
            />
          </Table.Cell>
          <Table.Cell>Developer</Table.Cell>
          <Table.Cell>
            <Button variant="link" onPress={action("onPress")}>
              Edit
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Avatar
              label="Invited User"
              name="Invited User"
              email="invited@prisma.io"
            />
          </Table.Cell>
          <Table.Cell>Guest</Table.Cell>
          <Table.Cell>
            <Button variant="link" onPress={action("onPress")}>
              Edit
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Button variant="secondary" onPress={action("onPress")}>
          Invite a new member
        </Button>
      </Table.Footer>
    </Table.Container>
  ))
  .add("Default (with dynamic data)", () => (
    <Table.Container>
      <Table.Header columns={dynamicColumns}>
        {(column) => <Table.Column>{column.key}</Table.Column>}
      </Table.Header>
      <Table.Body items={dynamicData}>
        {(user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Avatar
                url={user.isInvitationPending ? undefined : user.avatar}
                label={user.isInvitationPending ? "Invited User" : user.name}
                name={user.isInvitationPending ? "Invited User" : user.name}
                email={user.email}
              />
            </Table.Cell>
            <Table.Cell>
              {user.isInvitationPending ? "Guest" : user.role}
            </Table.Cell>
            <Table.Cell>
              <Button variant="link" onPress={action("onPress")}>
                Edit
              </Button>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      <Table.Footer>
        <Button variant="secondary" onPress={action("onPress")}>
          Invite a new member
        </Button>
      </Table.Footer>
    </Table.Container>
  ))
