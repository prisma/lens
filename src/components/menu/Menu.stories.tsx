import { action } from "@storybook/addon-actions"
import { Menu } from "./Menu"
import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"

export const Default = (props) => (
  <Menu.Container>
    <Button variant="quiet">
      <Icon name="sliders" />
    </Button>

    <Menu.Body
      title="Project Actions"
      onSelectionChange={action("onSelectionChange")}
    >
      <Menu.Option key="edit">Edit</Menu.Option>
      <Menu.Option key="invite">Invite</Menu.Option>
      <Menu.Option key="delete">Delete</Menu.Option>
    </Menu.Body>
  </Menu.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Menu",
  component: Menu,
}

export const WithStaticData = () => (
  <div className="flex justify-center">
    <Menu.Container>
      <Button variant="quiet">
        <Icon name="sliders" />
      </Button>

      <Menu.Body
        title="Project Actions"
        onSelectionChange={action("onSelectionChange")}
      >
        <Menu.Option key="edit">Edit</Menu.Option>
        <Menu.Option key="invite">Invite</Menu.Option>
        <Menu.Option key="delete">Delete</Menu.Option>
      </Menu.Body>
    </Menu.Container>
  </div>
)

export const WithSectionsAndStaticData = () => (
  <Menu.Container>
    <Button variant="quiet">
      <Icon name="sliders" />
    </Button>

    <Menu.Body
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
    </Menu.Body>
  </Menu.Container>
)

export const AnchoredLeftWithStaticData = () => (
  <div className="flex justify-center">
    <Menu.Container>
      <Button variant="quiet">
        <Icon name="sliders" />
      </Button>

      <Menu.Body
        title="Project Actions"
        anchor="left"
        onSelectionChange={action("onSelectionChange")}
      >
        <Menu.Option key="handle">ALongUserHandle</Menu.Option>
        <Menu.Option key="edit">Edit</Menu.Option>
        <Menu.Option key="invite">Invite</Menu.Option>
        <Menu.Option key="delete">Delete</Menu.Option>
      </Menu.Body>
    </Menu.Container>
  </div>
)

export const AnchoredRightWithStaticData = () => (
  <div className="flex justify-center">
    <Menu.Container>
      <Button variant="quiet">
        <Icon name="sliders" />
      </Button>

      <Menu.Body
        title="Project Actions"
        anchor="right"
        onSelectionChange={action("onSelectionChange")}
      >
        <Menu.Option key="handle">ALongUserHandle</Menu.Option>
        <Menu.Option key="edit">Edit</Menu.Option>
        <Menu.Option key="invite">Invite</Menu.Option>
        <Menu.Option key="delete">Delete</Menu.Option>
      </Menu.Body>
    </Menu.Container>
  </div>
)
