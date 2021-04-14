import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Toast } from "./Toast"
import { useToasts } from "./useToasts"
import { Button } from "../button/Button"

storiesOf("Lens/Toast", module)
  .add("Default", () => (
    <Toast title="This might take a while" onClose={action("onClose")} />
  ))
  .add("Positive", () => (
    <Toast
      variant="positive"
      title="Task failed successfully"
      onClose={action("onClose")}
    />
  ))
  .add("Negative", () => (
    <Toast
      variant="negative"
      title="An internal server error occurred"
      onClose={action("onClose")}
    />
  ))
  .add("Info", () => (
    <Toast
      variant="neutral"
      title="This might take a while"
      onClose={action("onClose")}
    />
  ))
  .add("With trigger (auto-vanishing)", () => {
    const toasts = useToasts()

    return (
      <Button
        onPress={() => {
          toasts.add({
            title: `Changes saved ${toasts.toasts.length + 1}`,
            variant: "positive",
          })
        }}
      >
        Save Changes
      </Button>
    )
  })
  .add("With trigger (sticky)", () => {
    const toasts = useToasts()

    return (
      <Button
        onPress={() => {
          toasts.add({
            title: `Changes saved ${toasts.toasts.length + 1}`,
            sticky: true,
            variant: "positive",
          })
        }}
      >
        Save Changes
      </Button>
    )
  })
