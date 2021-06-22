import { action } from "@storybook/addon-actions"
import { useState } from "react"
import { Separator } from "../separator/Separator"
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
    errorText="This username is already taken"
    onChange={action("onChange")}
  />
)

export const WithValidator = () => (
  <section className="flex flex-col">
    <div className="text-sm mb-4">
      The following input will accept all handles except `prisma`, `lens` &
      `world-domination`
    </div>
    <TextField
      type="text"
      label="Handle"
      validator={(v) =>
        ["prisma", "lens", "world-domination"].includes(v)
          ? "This is a reserved keyword"
          : undefined
      }
      onChange={action("onChange")}
    />

    <div className="mb-4" />
    <Separator />
    <div className="mb-4" />

    <div className="text-sm mb-4">
      The following input is required. It will only start validation once the
      user has "touched" it at least once.
    </div>
    <TextField
      type="text"
      label="Handle"
      validator={(v) => (v ? undefined : "This field is required")}
      onChange={action("onChange")}
    />
  </section>
)
