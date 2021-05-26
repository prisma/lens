import { useRef } from "react"
import { action } from "@storybook/addon-actions"
import { Tooltip } from "./Tooltip"
import { Icon } from "../icon/Icon"
import { Button } from "../button/Button"

export const Default = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={ref} className="text-sm dark:text-white">
        Target
      </div>
      <Tooltip {...props} target={ref}>
        I'm a Tooltip
      </Tooltip>
    </>
  )
}
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Tooltip",
  component: Tooltip,
  argTypes: {
    position: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "inline-radio",
      },
    },
  },
}

export const WithAutomaticPositioning = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={ref} className="text-sm dark:text-white">
        Target
      </div>
      <Tooltip target={ref}>I'm a Tooltip</Tooltip>
    </>
  )
}

export const AboveTarget = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={ref} className="text-sm dark:text-white">
        Target
      </div>
      <Tooltip target={ref} position="top">
        I will try to render above my target
      </Tooltip>
    </>
  )
}

export const BelowTarget = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={ref} className="text-sm dark:text-white">
        Target
      </div>
      <Tooltip target={ref} position="bottom">
        I will try to render below my target
      </Tooltip>
    </>
  )
}

export const LeftOfTarget = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={ref} className="text-sm dark:text-white">
        Target
      </div>
      <Tooltip target={ref} position="left">
        I will try to render to the left of my target
      </Tooltip>
    </>
  )
}

export const RightOfTarget = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={ref} className="text-sm dark:text-white">
        Target
      </div>
      <Tooltip target={ref} position="right">
        I will try to render to the right of my target
      </Tooltip>
    </>
  )
}

export const WithRichContent = () => {
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
}
