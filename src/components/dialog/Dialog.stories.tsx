import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Dialog } from "./Dialog";
import { Button } from "../button/Button";
import { Avatar } from "../avatar/Avatar";
import { Select } from "../select/Select";

storiesOf("Lens/Dialog", module)
  .add("Default", () => (
    <Dialog.Container
      title="Edit Membership"
      subtitle="Edit user's membership in current project"
      icon="user"
    >
      <Button>Dialog Trigger</Button>
      <Dialog.Content>
        {close => (
          <div className="flex justify-between">
            <Avatar
              url="/favicon.ico"
              label="Lens User"
              name="Lens User"
              email="lens@prisma.io"
            />
            <Select.Container
              label=""
              defaultSelectedKey="developer"
              onSelectionChange={action("onSelectionChange")}
            >
              <Select.Option key="viewer">Viewer</Select.Option>
              <Select.Option key="collaborator">Collaborator</Select.Option>
              <Select.Option key="developer">Developer</Select.Option>
              <Select.Option key="admin">Admin</Select.Option>
            </Select.Container>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Container>
  ))
  .add("With Actions", () => (
    <Dialog.Container
      title="Edit Membership"
      subtitle="Edit user's membership in current project"
      icon="user"
      onPressPrimaryAction={action("onPressPrimaryAction")}
      onPressSecondaryAction={action("onPressSecondaryAction")}
      tertiaryActionTitle="Remove from project"
      onPressTertiaryAction={action("onPressTertiaryAction")}
    >
      <Button>Dialog Trigger</Button>
      <Dialog.Content>
        {close => (
          <div className="flex justify-between">
            <Avatar
              url="/favicon.ico"
              label="Lens User"
              name="Lens User"
              email="lens@prisma.io"
            />
            <Select.Container
              label=""
              defaultSelectedKey="developer"
              onSelectionChange={action("onSelectionChange")}
            >
              <Select.Option key="viewer">Viewer</Select.Option>
              <Select.Option key="collaborator">Collaborator</Select.Option>
              <Select.Option key="developer">Developer</Select.Option>
              <Select.Option key="admin">Admin</Select.Option>
            </Select.Container>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Container>
  ));
