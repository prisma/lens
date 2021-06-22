import { action } from "@storybook/addon-actions"
import { useState } from "react"
import { TextField } from "./TextField"

export const Default = (props) => <TextField {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/TextField",
  component: TextField,
  argTypes: {
    type: { defaultValue: "text" },
    label: { defaultValue: "Label" },
  },
}

export const WithValue = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      type="text"
      label="Environment"
      placeholder="production"
      value={value}
      onChange={(value) => {
        setValue(value)
        action("onChange")(value)
      }}
    />
  )
}

export const WithPlaceholder = () => (
  <TextField
    type="text"
    label="Environment"
    placeholder="production"
    onChange={action("onChange")}
  />
)

export const WithPrefix = () => (
  <TextField
    type="text"
    label="Handle"
    prefix="cloud.prisma.io/spacex/"
    defaultValue="falcon-9"
    onChange={action("onChange")}
  />
)

export const WithError = () => (
  <TextField
    type="text"
    label="Handle"
    error="This username is already taken"
    onChange={action("onChange")}
  />
)
