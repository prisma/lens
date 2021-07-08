import { useState } from "react"
import { action } from "@storybook/addon-actions"
import { chain } from "@react-aria/utils"
import { Form } from "./Form"
import { TextField } from "../text-field/TextField"
import { Select } from "../select/Select"
import { Card } from "../card/Card"
import { ComboBox, ComboBoxOption } from "../combo-box/ComboBox"

type RepositoryId =
  | "prisma"
  | "studio"
  | "cloud"
  | "engines"
  | "examples"
  | "docs"

const repositories: ComboBoxOption<RepositoryId>[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
  {
    key: "studio",
    title: "prisma/studio",
  },
  {
    key: "cloud",
    title: "prisma/cloud",
  },
  {
    key: "engines",
    title: "prisma/engines",
  },
  {
    key: "examples",
    title: "prisma/examples",
  },
  {
    key: "docs",
    title: "prisma/docs",
  },
]

export const Default = (props) => {
  const [firstName, setFirstName] = useState("")
  const [environment, setEnvironment] = useState("")
  const [handle, setHandle] = useState("")

  return (
    <Form {...props}>
      <TextField
        label="First Name"
        value={firstName}
        onChange={chain(action("onChangeFirstName"), setFirstName)}
      />
      <TextField
        label="Environment"
        placeholder="production"
        value={environment}
        onChange={chain(action("onChangeEnvironment"), setEnvironment)}
      />
      <TextField
        label="Handle"
        prefix="cloud.prisma.io/lens/"
        value={handle}
        onChange={chain(action("onChangeHandle"), setHandle)}
      />
      <Select.Container label="Project">
        <Select.Option>Connect to an existing Prisma project</Select.Option>
        <Select.Option>Create a new Prisma project</Select.Option>
      </Select.Container>
      <ComboBox.Container label="Repository" options={repositories}>
        {(item) => (
          <ComboBox.Option key={item.key}>{item.title}</ComboBox.Option>
        )}
      </ComboBox.Container>
    </Form>
  )
}
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Form",
  component: Form,
}

export const WithValidation = () => {
  const [firstName, setFirstName] = useState("")
  const [environment, setEnvironment] = useState("")
  const [handle, setHandle] = useState("")

  return (
    <Card>
      <Form>
        <TextField
          label="First Name"
          value={firstName}
          validator={(v) => (v ? undefined : "This field is required")}
          onChange={chain(action("onChangeFirstName"), setFirstName)}
        />
        <TextField
          label="Environment"
          placeholder="production"
          value={environment}
          validator={(v) => (v ? undefined : "This field is required")}
          onChange={chain(action("onChangeEnvironment"), setEnvironment)}
        />
        <TextField
          label="Handle"
          prefix="cloud.prisma.io/lens/"
          value={handle}
          validator={(v) => (v ? undefined : "This field is required")}
          onChange={chain(action("onChangeHandle"), setHandle)}
        />
        <Select.Container label="Project">
          <Select.Option>Connect to an existing Prisma project</Select.Option>
          <Select.Option>Create a new Prisma project</Select.Option>
        </Select.Container>
        <ComboBox.Container label="Repository" options={repositories}>
          {(item) => (
            <ComboBox.Option key={item.key}>{item.title}</ComboBox.Option>
          )}
        </ComboBox.Container>
      </Form>
    </Card>
  )
}
