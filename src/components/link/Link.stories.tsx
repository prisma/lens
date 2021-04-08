import { storiesOf } from "@storybook/react"
import { Link } from "./Link"

storiesOf("Lens/Link", module)
  .add("Default", () => (
    <Link href="/?path=/story/lens-link--default">Link</Link>
  ))
  .add("Open in new tab", () => (
    <Link href="/?path=/story/lens-link--open-in-new-tab" openInNewTab>
      Link
    </Link>
  ))
  .add("Disabled", () => (
    <Link href="/?path=/story/lens-link--disabled" isDisabled>
      Link
    </Link>
  ))
  .add("Inline", () => (
    <p>
      This is a line of text with a
      <Link href="/?path=/story/lens-link--inline">link</Link>
      within it
    </p>
  ))
