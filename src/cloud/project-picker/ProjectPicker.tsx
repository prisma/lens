import React, { useRef } from "react"
import cn from "classnames"
import { SelectState, useSelectState } from "@react-stately/select"
import { Item, Section } from "@react-stately/collections"
import { Node } from "@react-types/shared"
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox"
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays"
import { useButton } from "@react-aria/button"
import { FocusScope } from "@react-aria/focus"
import { mergeProps } from "@react-aria/utils"
import { Icon } from "../../components/icon/Icon"
import { Button } from "../../components/button/Button"

export type ProjectId = string
export type Project = {
  id: ProjectId
  title: string
}

type ProjectPickerProps = {
  ownedProjects: Project[]
  collaboratedProjects: Project[]
  defaultSelectedKey: ProjectId
  onSelectionChange?: (key: React.Key) => void
}

export function ProjectPicker({
  ownedProjects,
  collaboratedProjects,
  defaultSelectedKey,
  onSelectionChange,
}: ProjectPickerProps) {
  const state = useSelectState<Project>({
    children: [
      <Section title="Your projects" items={ownedProjects}>
        {(project) => <Item key={project.id}>{project.title}</Item>}
      </Section>,
      <Section title="Collaborations" items={collaboratedProjects}>
        {(project) => <Item key={project.id}>{project.title}</Item>}
      </Section>,
    ],
    defaultSelectedKey,
    onSelectionChange,
  })

  const buttonRef = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    { onPress: () => state.toggle() },
    buttonRef
  )

  return (
    <>
      <div
        ref={buttonRef}
        {...buttonProps}
        className="flex space-x-2 cursor-pointer"
      >
        <Icon
          name="prisma"
          size="lg"
          className={cn(
            "flex items-center justify-center p-2",
            "rounded-full",
            "bg-gray-700"
          )}
        />
        <button className="flex items-center space-x-2">
          <span className="text-md text-gray-800 dark:text-gray-100">
            {state.selectedItem?.rendered}
          </span>
          <Icon name="chevron-down" size="xs" className="ml-4" />
        </button>
      </div>
      {state.isOpen && (
        <ProjectPickerOverlay state={state} buttonRef={buttonRef} />
      )}
    </>
  )
}

type ProjectPickerOverlayProps = {
  /** The global Select state */
  state: SelectState<Project>
  /** Ref of the Select button */
  buttonRef: React.RefObject<HTMLButtonElement>
}

function ProjectPickerOverlay({ state, buttonRef }: ProjectPickerOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: true,
      onClose: state.close,
    },
    overlayRef
  )
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: buttonRef,
    offset: 8,
    containerPadding: 0,
    onClose: state.close,
  })
  // Figure out button dimensions so we can size the overlay
  const buttonDimensions = buttonRef.current?.getBoundingClientRect()

  const listBoxRef = useRef<HTMLUListElement>(null)
  const { listBoxProps } = useListBox(
    {
      disallowEmptySelection: true,
      autoFocus: state.focusStrategy || true,
    },
    state,
    listBoxRef
  )

  return (
    <OverlayContainer>
      <FocusScope autoFocus restoreFocus contain>
        <div
          ref={overlayRef}
          {...mergeProps(overlayProps, positionProps)}
          style={{
            ...positionProps.style,
            left: buttonDimensions?.left,
            width: buttonDimensions?.width,
          }}
        >
          <DismissButton onDismiss={state.close} />
          <ul
            ref={listBoxRef}
            {...listBoxProps}
            className={cn("menu w-full", {
              "animate-slide-bottom": placement === "top",
              "animate-slide-top": placement === "bottom",
            })}
          >
            {[...state.collection].map((section) => (
              <ProjectPickerSection
                key={section.key}
                title={section.rendered as string}
                state={state}
                section={section}
              />
            ))}
            <li className="flex mt">
              <Button variant="primary" autoFocus={false} fillParent>
                Create a new project
              </Button>
            </li>
          </ul>
          <DismissButton onDismiss={state.close} />
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

type ProjectPickerSectionProps = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<Project>
  /** The global Select state */
  state: SelectState<Project>
}

function ProjectPickerSection({
  title,
  section,
  state,
}: ProjectPickerSectionProps) {
  const {
    groupProps,
    headingProps,
    itemProps: optionProps,
  } = useListBoxSection({
    heading: title,
  })

  return (
    <section {...groupProps} className={cn("p-2")}>
      {state.collection.getFirstKey() !== section.key && (
        <li className="divide-solid"></li>
      )}
      <div
        {...headingProps}
        className={cn(
          "mb-2",
          "text-xs uppercase text-gray-500 dark:text-gray-400",
          "select-none"
        )}
      >
        {title}
      </div>
      <li {...optionProps}>
        <ul>
          {[...section.childNodes].map((option) => (
            <ProjectPickerOption
              key={option.key}
              option={option}
              state={state}
            />
          ))}
        </ul>
      </li>
    </section>
  )
}

type ProjectPickerOptionProps = {
  /** The option to render */
  option: Node<Project>
  /** The global Select state */
  state: SelectState<Project>
}

/** A single Select Option */
function ProjectPickerOption({ option, state }: ProjectPickerOptionProps) {
  const ref = useRef<HTMLLIElement>(null)

  const isFocused = state.selectionManager.focusedKey === option.key
  const isSelected = state.selectedKey === option.key
  const { optionProps } = useOption(
    {
      key: option.key,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  )

  return (
    <li
      ref={ref}
      {...optionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default whitespace-nowrap",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
          "font-bold": isSelected,
        },
        "hover:bg-gray-100"
      )}
    >
      {option.rendered}
    </li>
  )
}
