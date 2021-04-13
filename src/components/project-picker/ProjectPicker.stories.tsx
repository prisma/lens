import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Button } from "../button/Button"
import { Project, ProjectPicker } from "./ProjectPicker"
// import { Select } from "./ProjectPicker"

const ownedProjects: Project[] = [
  { id: "1", title: "Aqua Iron Pomeranian" },
  { id: "2", title: "Blue Copper Fox Terrier" },
  { id: "3", title: "Black Steel Rose" },
]
const collaborations: Project[] = [
  { id: "4", title: "Yellow Platinum Mimosa" },
  { id: "5", title: "White Bronze Daffodil" },
]

// storiesOf("Cloud/ProjectPicker", module).add("Default", () => (
//   <Select.Container label="">
//     <Select.Section items={ownedProjects} title="Your projects">
//       {(project) => (
//         <Select.Option key={project.key}>{project.title}</Select.Option>
//       )}
//     </Select.Section>
//     <Select.Section items={collaborations} title="Collaborations">
//       {(project) => (
//         <Select.Option key={project.key}>{project.title}</Select.Option>
//       )}
//     </Select.Section>
//     <Select.Footer>
//       <Button variant="primary" fillParent onPress={action("onPress")}>
//         Create a new Project
//       </Button>
//     </Select.Footer>
//   </Select.Container>
// ))
storiesOf("Cloud/ProjectPicker", module).add("Default", () => (
  <ProjectPicker
    ownedProjects={ownedProjects}
    collaboratedProjects={collaborations}
    defaultSelectedKey={ownedProjects[0].id}
    onSelectionChange={action("onSelectionChange")}
  />
))
