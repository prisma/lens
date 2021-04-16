import { FocusRing } from "./FocusRing"

export const Default = (props) => (
  <FocusRing within {...props}>
    <div tabIndex={1} className="rounded-md text-gray-800 dark:text-gray-100">
      Press Tab to focus me
    </div>
  </FocusRing>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/FocusRing",
  component: FocusRing,
}
