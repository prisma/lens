import { storiesOf } from "@storybook/react"
import { Icon } from "./Icon"

export const Default = (props) => <Icon {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Icon",
  component: Icon,
  argTypes: {
    name: {
      defaultValue: "database",
    },
  },
}

export const Sizes = () => (
  <div className="flex items-center space-x-4">
    <Icon name="database" size="xs" />
    <Icon name="database" size="sm" />
    <Icon name="database" size="md" />
    <Icon name="database" size="lg" />
    <Icon name="database" size="xl" />
  </div>
)
