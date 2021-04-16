import { TitleGroup } from "./TitleGroup"

export const Default = (props) => <TitleGroup {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/TitleGroup",
  component: TitleGroup,
  argTypes: {
    icon: { defaultValue: "folder-plus" },
    title: { defaultValue: "New project" },
    subtitle: {
      defaultValue:
        "Create a new project or connect to an existing one on Github",
    },
  },
}
