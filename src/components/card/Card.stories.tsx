import { action } from "@storybook/addon-actions"
import { Card } from "./Card"
import { Form } from "../form/Form"
import { Select } from "../select/Select"

export const Default = (props) => <Card {...props}>{renderForm()}</Card>
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Card",
  component: Card,
  argTypes: {
    icon: { defaultValue: "server" },
    title: { defaultValue: "Instance configuration" },
  },
}

export const WithTitle = () => (
  <section className="w-full">
    {/* Cards fill their parent by default. This `section` only exists to make the story look better */}
    <Card title="Instance configuration">{renderForm()}</Card>
  </section>
)

export const WithIconAndTitle = () => (
  <section className="w-full">
    {/* Cards fill their parent by default. This `section` only exists to make the story look better */}
    <Card icon="server" title="Instance configuration">
      {renderForm()}
    </Card>
  </section>
)

export const WithAction = () => (
  <section className="w-full">
    {/* Cards fill their parent by default. This `section` only exists to make the story look better */}
    <Card
      icon="server"
      title="Instance configuration"
      action={{ title: "Pricing", onPress: action("onAction") }}
    >
      {renderForm()}
    </Card>
  </section>
)

export const WithFixedDimensions = () => (
  <Card
    icon="server"
    title="Instance configuration"
    width={500}
    height={400}
    action={{ title: "Learn More", onPress: action("onAction") }}
  >
    {renderForm()}
  </Card>
)

function renderForm() {
  return (
    <Form>
      <Select.Container label="CPU" defaultSelectedKey="2">
        <Select.Option key="1">1 core</Select.Option>
        <Select.Option key="2">2 cores</Select.Option>
        <Select.Option key="4">4 cores</Select.Option>
        <Select.Option key="8">8 cores</Select.Option>
        <Select.Option key="12">12 cores</Select.Option>
        <Select.Option key="16">16 cores</Select.Option>
      </Select.Container>
      <Select.Container label="RAM" defaultSelectedKey="512M">
        <Select.Option key="512M">512 MB</Select.Option>
        <Select.Option key="1G">1 GB</Select.Option>
        <Select.Option key="2G">2 GB</Select.Option>
        <Select.Option key="4G">4 GB</Select.Option>
        <Select.Option key="8G">8 GB</Select.Option>
        <Select.Option key="16G">16 GB</Select.Option>
        <Select.Option key="32G">32 GB</Select.Option>
      </Select.Container>
      <Select.Container label="Storage" defaultSelectedKey="10G">
        <Select.Option key="10G">10 GB</Select.Option>
        <Select.Option key="20G">20 GB</Select.Option>
        <Select.Option key="50G">50 GB</Select.Option>
        <Select.Option key="100G">100 GB</Select.Option>
        <Select.Option key="500G">500 GB</Select.Option>
        <Select.Option key="1T">1 TB</Select.Option>
      </Select.Container>
    </Form>
  )
}
