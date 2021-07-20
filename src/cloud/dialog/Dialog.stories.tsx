import React from "react"
import { Dialog } from "./Dialog"

export const Default = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
    ref={containerRef}
    style={{
      backgroundColor: "lightgray",
      width: 800,
      height: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Dialog.Container
      parentContainerRef={containerRef}
      title="Set up locally"
      subtitle="This guide will help you get started with your project locally"
      {...props}
    >
      <Dialog.Body>
        <div>Cloud Dialog Children</div>
      </Dialog.Body>
    </Dialog.Container>
  </div>
  )
} 

Default.storyName = "[Controlled]"
export default {
  title: "Cloud/Dialog",
  component: Dialog,
  argTypes: {
    title: {
      defaultValue: "Set up locally",
    },
    subtitle: {
      defaultValue: "This guide will help you get started with your project locally",
    },
    icon: {
      defaultValue: "download-cloud",
    },
  },
}
