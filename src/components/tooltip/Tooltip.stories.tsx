import { useRef } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Tooltip } from "./Tooltip"
import { Icon } from "../icon/Icon"
import { Button } from "../button/Button"

storiesOf("Lens/Tooltip", module)
  .add("With automatic positioning)", () => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <>
        <div ref={ref} className="text-sm dark:text-white">
          Target
        </div>
        <Tooltip target={ref}>I'm a Tooltip</Tooltip>
      </>
    )
  })
  .add("Positioned above target", () => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <>
        <div ref={ref} className="text-sm dark:text-white">
          Target
        </div>
        <Tooltip target={ref} position="top">
          I always show up above my target
        </Tooltip>
      </>
    )
  })
  .add("Positioned below target", () => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <>
        <div ref={ref} className="text-sm dark:text-white">
          Target
        </div>
        <Tooltip target={ref} position="bottom">
          I always show up below my target
        </Tooltip>
      </>
    )
  })
  .add("Positioned left of target", () => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <>
        <div ref={ref} className="text-sm dark:text-white">
          Target
        </div>
        <Tooltip target={ref} position="left">
          I always show up to the left of my target
        </Tooltip>
      </>
    )
  })
  .add("Positioned right of target", () => {
    const ref = useRef<HTMLDivElement>(null)
    return (
      <>
        <div ref={ref} className="text-sm dark:text-white">
          Target
        </div>
        <Tooltip target={ref} position="right">
          I always show up to the right of my target
        </Tooltip>
      </>
    )
  })
  .add("With rich content", () => {
    const ref = useRef<HTMLButtonElement>(null)
    return (
      <>
        <Button
          ref={ref}
          variant="primary"
          isDisabled
          onPress={action("onPress")}
        >
          Delete Project
        </Button>
        <Tooltip target={ref} position="right">
          <Icon name="x" size="sm" />
          <div className="ml-1">This project cannot be deleted</div>
        </Tooltip>
      </>
    )
  })
