import React, { useRef } from "react"
import cn from "classnames"

import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox"
import { Node } from "@react-types/shared"
import { SelectState } from "@react-stately/select"
import { ComboBoxState } from "@react-stately/combobox"
import { FocusScope } from "@react-aria/focus"
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays"
import { mergeProps } from "@react-aria/utils"
import { PressResponder } from "@react-aria/interactions"

import { Loader } from "../loader/Loader"
import { Icon } from "../icon/Icon"
import { Separator } from "../separator/Separator"

/**
 * A ListBox is an abstraction over components that render a list of options that are individually selectable.
 *
 * Currently, `Select` & `ComboBox` are `ListBox`es
 */

/** Value for a single Option inside this Select */
type ListBoxOption<Key extends string> = {
  /** A string that uniquely identifies this option */
  key: Key
  /** The main text to display within this option */
  title: string
}

type ListBoxOverlayProps<OptionKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** A string describing what this ListBox represents */
  label: string
  /** Ref of the ListBox container. This is used to position the overlay */
  containerRef: React.RefObject<HTMLElement>
  /** A ref object that will be attached to the Options container */
  listBoxRef?: React.RefObject<HTMLUListElement>
  /** A ref object that will be attached to the overlay element */
  overlayRef?: React.RefObject<HTMLDivElement>
  /** The ListBox's global state */
  state:
    | SelectState<ListBoxOption<OptionKey>>
    | ComboBoxState<ListBoxOption<OptionKey>> // TODO:: Find a more generic type for this
  /** An optional footer to render within the Overlay, after the Body */
  footer?: React.ReactElement
  loading?: boolean
  error?: Error
  /** Additional props that will be spread over the overlay component */
  listBoxProps?: React.HTMLAttributes<HTMLElement>
}

/** An overlay that renders individual ListBox Options */
export function ListBoxOverlay<OptionKey extends string>({
  id,
  label,
  containerRef,
  listBoxRef: _listBoxRef,
  overlayRef: _overlayRef,
  state,
  footer,
  loading,
  error,
  listBoxProps: otherProps = {},
}: ListBoxOverlayProps<OptionKey>) {
  // The following hook calls are conditional, but they should not be a problem because they'll be called the same number of times across renders
  // listBoxRef & overlayRef values do (should) not change across renders
  const listBoxRef = _listBoxRef || useRef<HTMLUListElement>(null)
  const overlayRef = _overlayRef || useRef<HTMLDivElement>(null)

  const { listBoxProps } = useListBox(
    {
      id,
      label,
      disallowEmptySelection: true,
      autoFocus: state.focusStrategy,
      ...otherProps,
    },
    state,
    listBoxRef
  )
  const { overlayProps } = useOverlay(
    {
      onClose: state.close,
      isDismissable: true,
      shouldCloseOnBlur: true,
    },
    overlayRef
  )
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: containerRef,
    offset: 8,
    containerPadding: 0,
    shouldFlip: true,
    onClose: state.close,
  })
  // Figure out button dimensions so we can size the overlay
  const containerDimensions = containerRef.current?.getBoundingClientRect()

  return (
    <OverlayContainer>
      <FocusScope restoreFocus>
        <div
          id="combobox-body"
          {...mergeProps(overlayProps, positionProps)}
          ref={overlayRef}
          style={{
            ...positionProps.style,
            left: containerDimensions?.left,
            width: containerDimensions?.width,
          }}
        >
          <DismissButton onDismiss={state.close} />
          <ul
            ref={listBoxRef}
            {...listBoxProps}
            className={cn("menu", {
              "animate-slide-bottom": placement === "top",
              "animate-slide-top": placement === "bottom",
            })}
            style={{ maxHeight: "inherit" }}
          >
            {state.collection.size === 0 && !loading && !error && (
              <ListBoxEmptyOption />
            )}

            {[...state.collection].map((option) => {
              if (option.type === "section") {
                return (
                  <ListBoxSection
                    key={option.key}
                    title={option.rendered as string}
                    state={state}
                    section={option}
                  />
                )
              } else if (option.type === "item") {
                return (
                  <ListBoxOption
                    key={option.key}
                    option={option}
                    state={state}
                  />
                )
              } else {
                return null
              }
            })}

            {loading && <ListBoxLoadingOption />}
            {error && <ListBoxErrorOption />}

            {footer}
          </ul>

          <DismissButton onDismiss={state.close} />
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

type ListBoxSectionProps<OptionKey extends string> = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<ListBoxOption<OptionKey>>
  /** The global Select state */
  state:
    | SelectState<ListBoxOption<OptionKey>>
    | ComboBoxState<ListBoxOption<OptionKey>> // TODO:: Find a more generic type for this
}
/** A single ListBox Section. This is usually used to (visually) group similar `ListBoxOption`s together */
export function ListBoxSection<OptionKey extends string>({
  title,
  section,
  state,
}: ListBoxSectionProps<OptionKey>) {
  const {
    groupProps,
    headingProps,
    itemProps: optionProps,
  } = useListBoxSection({
    heading: title,
  })

  return (
    <section lens-role="select-section" {...groupProps} className={cn("p-2")}>
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
          {[...section.childNodes].map((i) => (
            <ListBoxOption key={i.key} option={i} state={state} />
          ))}
        </ul>
      </li>
    </section>
  )
}

type ListBoxOptionProps<Key extends string> = {
  /** The option to render */
  option: Node<ListBoxOption<Key>>
  /** The global Select state */
  state: SelectState<ListBoxOption<Key>> | ComboBoxState<ListBoxOption<Key>> // TODO:: Find a more generic type for this
}
/** A single `ListBox` Option */
export function ListBoxOption<Key extends string>({
  option,
  state,
}: ListBoxOptionProps<Key>) {
  const ref = useRef<HTMLLIElement>(null)

  const isDisabled = state.disabledKeys.has(option.key)
  const isFocused = state.selectionManager.focusedKey === option.key
  const { optionProps: domProps } = useOption(
    {
      key: option.key,
      isDisabled,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus: true,
    },
    state,
    ref
  )
  const optionProps = option.props

  return (
    <li
      ref={ref}
      lens-role="listbox-option"
      {...domProps}
      className={cn(
        "flex items-center space-x-2",
        "rounded-md px-2 py-1",
        "cursor-default whitespace-nowrap",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
        },
        "hover:bg-gray-100"
      )}
    >
      <Icon name={optionProps.icon} size="sm" />
      <span>{option.rendered}</span>
    </li>
  )
}

/* A specialized Option that is to be used to represent the loading state for a ListBox */
export function ListBoxLoadingOption() {
  return (
    <li className={cn("flex flex-col justify-center items-center", "m-2")}>
      <Loader size="md" />
    </li>
  )
}

type ListBoxErrorOptionProps = {
  children?: string
}
/* A specialized Option that is to be used to represent the error state for a ListBox */
export function ListBoxErrorOption({
  children = "An error occurred",
}: ListBoxErrorOptionProps) {
  return (
    <li className={cn("flex flex-col justify-center items-center", "m-2")}>
      <Icon name="alert-circle" />
      <span className="mt-2">{children}</span>
    </li>
  )
}

type ListBoxEmptyOptionProps = {
  children?: string
}
export function ListBoxEmptyOption({
  children = "No matches",
}: ListBoxEmptyOptionProps) {
  return (
    <li className={cn("flex flex-col justify-center items-center", "m-2")}>
      <Icon name="slash" />
      <span className="mt-2">{children}</span>
    </li>
  )
}

type ListBoxFooterProps = React.PropsWithChildren<{
  onPress?: () => void
}>
/** A static footer */
export function ListBoxFooter({ children, onPress }: ListBoxFooterProps) {
  return (
    <PressResponder onPress={onPress}>
      <Separator />
      <div className="p-2 whitespace-nowrap">{children}</div>
    </PressResponder>
  )
}
