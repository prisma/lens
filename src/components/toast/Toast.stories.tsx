import { action } from "@storybook/addon-actions"
import { Toast } from "./Toast"
import { useToasts } from "./useToasts"
import { Button } from "../button/Button"

export const Default = (props) => <Toast {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Toast",
  component: Toast,
  argTypes: {
    title: { defaultValue: "This might take a while" },
    variant: { control: { type: "inline-radio" }, defaultValue: "neutral" },
  },
}

export const Positive = () => (
  <Toast
    variant="positive"
    title="Task failed successfully"
    onClose={action("onClose")}
  />
)

export const Negative = () => (
  <Toast
    variant="negative"
    title="An internal server error occurred"
    onClose={action("onClose")}
  />
)

export const Neutral = () => (
  <Toast
    variant="neutral"
    title="This might take a while"
    onClose={action("onClose")}
  />
)

export const WithTriggerAndAutoVanishing = () => {
  const toasts = useToasts()

  return (
    <Button
      onPress={() =>
        toasts.add({
          title: `Changes saved ${toasts.toasts.length + 1}`,
          variant: "positive",
        })
      }
    >
      Save Changes
    </Button>
  )
}

export const WithTriggerAndSticky = () => {
  const toasts = useToasts()

  return (
    <Button
      onPress={() =>
        toasts.add({
          title: `Changes saved ${toasts.toasts.length + 1}`,
          sticky: true,
          variant: "positive",
        })
      }
    >
      Save Changes
    </Button>
  )
}
export const WithLongContent = () => (
  <Toast
    title="Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself."
    onClose={action("onClose")}
  />
)
