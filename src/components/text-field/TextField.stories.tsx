import { chain } from "@react-aria/utils"
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

export const WithInitialValue = () => {
  const [value, setValue] = useState("production")

  return (
    <TextField
      type="text"
      label="Environment"
      placeholder="production"
      value={value}
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithPlaceholder = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      type="text"
      label="Environment"
      value={value}
      placeholder="production"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithPrefix = () => {
  const [value, setValue] = useState("lens")

  return (
    <TextField
      type="text"
      label="Handle"
      value={value}
      prefix="cloud.prisma.io/prisma/"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithError = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      type="text"
      label="Handle"
      value={value}
      errorText="This username is already taken"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithHint = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      type="text"
      label="Handle"
      value={value}
      hint="This should be something you can easily remember"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithHintAndError = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      type="text"
      label="Handle"
      value={value}
      hint="This should be something you can easily remember"
      errorText="This username is already taken"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithValidator = () => {
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")

  return (
    <section className="flex flex-col">
      <div className="text-sm mb-4">
        The following input will accept all handles except `prisma`, `lens` &
        `world-domination`
      </div>
      <TextField
        type="text"
        label="Handle"
        value={value1}
        validator={(v) =>
          ["prisma", "lens", "world-domination"].includes(v)
            ? "This is a reserved keyword"
            : undefined
        }
        onChange={chain(action("onChange"), setValue1)}
      />

      <div className="mb-4" />
      <Separator />
      <div className="mb-4" />

      <div className="text-sm mb-4" tabIndex={1}>
        The following input is required. It will only start validation once the
        user has "touched" it at least once.
      </div>
      <TextField
        type="text"
        label="Handle"
        value={value2}
        validator={(v) => (v ? undefined : "You must provide a handle")}
        onChange={chain(action("onChange"), setValue2)}
      />
    </section>
  )
}
