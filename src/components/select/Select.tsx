import React, { useRef } from "react"
import cn from "classnames"
import last from "lodash-es/last"
import isFunction from "lodash-es/isFunction"
import { useSelect, HiddenSelect } from "@react-aria/select"
import { SelectState, useSelectState } from "@react-stately/select"
import { Item, Section } from "@react-stately/collections"
import { CollectionChildren, Node } from "@react-types/shared"
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox"
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays"
import { useButton } from "@react-aria/button"
import { PressResponder } from "@react-aria/interactions"
import { FocusScope } from "@react-aria/focus"
import { mergeProps } from "@react-aria/utils"
import { Label } from "../label/Label"
import { Icon } from "../icon/Icon"
import { Separator } from "../separator/Separator"
import { FocusRing } from "../focus-ring/FocusRing"

/** Value for a single Option inside this Select */
export type SelectOption<Key extends string> = {
  /** A string that uniquely identifies this option */
  key: Key
  /** The main text to display within this option */
  title: string
}

function getBodyAndFooter<OptionKey extends string>(
  children:
    | CollectionChildren<SelectOption<OptionKey>>
    | [CollectionChildren<SelectOption<OptionKey>>, React.ReactElement]
) {
  // `children` may or may not contain a footer
  // `children` may also either be static or dynamic data
  // This means there are 4 cases for us to consider

  let body: CollectionChildren<SelectOption<OptionKey>>
  let footer: React.ReactElement | undefined

  if (!Array.isArray(children)) {
    // Dynamic data + no footer
    body = children
    footer = undefined
  } else {
    // Assume footer will be the last element (if it exists)
    const lastChild = last(children) as React.ReactElement
    if (lastChild?.type === SelectFooter) {
      const allButLastChildren = children.slice(0, children.length - 1)
      footer = lastChild

      if (isFunction(allButLastChildren[0])) {
        // Dynamic data + footer
        body = allButLastChildren[0]
      } else {
        // Static data + footer
        body = allButLastChildren as CollectionChildren<SelectOption<OptionKey>>
      }
    } else {
      // Static data + no footer
      body = children as any
      footer = undefined
    }
  }

  return { body, footer }
}

export type SelectContainerProps<OptionKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this Select should steal focus when first rendered */
  autoFocus?: boolean
  /** A list of Options to render inside this Select */
  children:
    | CollectionChildren<SelectOption<OptionKey>>
    | [CollectionChildren<SelectOption<OptionKey>>, React.ReactElement]
  /** Controls if this Select will be open by default */
  defaultOpen?: boolean
  /** Key of the Option that is selected when this Select is first rendered */
  defaultSelectedKey?: OptionKey
  /** Controls if this Select is disabled */
  isDisabled?: boolean
  /** Controls is this Select is readonly */
  isReadOnly?: boolean
  /** A (dynamic) list of options to render within this Select.
   * This may be provided upfront instead of providing static children.
   */
  options?: SelectOption<OptionKey>[]
  /** A string describing what this Select represents */
  label: string
  /** Name of the value held by this Select when placed inside a form */
  name?: string
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** Callback invoked when the Select's selection changes */
  onSelectionChange?: (key: OptionKey) => void
}

/**
 * A Select displays a list of options that you may choose one from. Its value can only ever be one of these options.
 */
function SelectContainer<OptionKey extends string>({
  id,
  autoFocus = false,
  children,
  defaultOpen = false,
  defaultSelectedKey,
  isDisabled = false,
  isReadOnly = false,
  options,
  label,
  name,
  placeholder = "Select an option",
  onSelectionChange,
}: SelectContainerProps<OptionKey>) {
  const ref = useRef(null)

  const { body, footer } = getBodyAndFooter(children)

  const state = useSelectState({
    autoFocus,
    children: body,
    defaultOpen,
    defaultSelectedKey,
    isDisabled,
    isReadOnly,
    items: options,
    label,
    onSelectionChange: onSelectionChange as (k: React.Key) => void,
  })
  const { labelProps, menuProps, triggerProps, valueProps } = useSelect(
    {
      id,
      autoFocus,
      children: body,
      defaultOpen,
      defaultSelectedKey,
      isDisabled,
      isReadOnly,
      items: options,
      label,
      placeholder,
      onSelectionChange: onSelectionChange as (k: React.Key) => void,
    },
    state,
    ref
  )

  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, ref)

  return (
    <div id={id} className="table-row">
      <Label labelProps={labelProps}>{label}</Label>
      <section className="table-cell w-full relative">
        <FocusRing autoFocus={autoFocus} within>
          <button
            ref={ref}
            {...buttonProps}
            className={cn(
              "flex w-full items-center",
              "rounded-md shadow-sm border border-gray-300 dark:border-gray-700",
              "px-3 py-1.5",
              "text-sm",
              {
                "text-gray-400 dark:text-gray-400": isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "bg-white dark:bg-gray-900": !isDisabled,
                "cursor-not-allowed": isDisabled,
              }
            )}
          >
            <span
              {...valueProps}
              lens-role="selected-option"
              className={cn("flex flex-grow", "mr-4", {
                "text-gray-400 dark:text-gray-300": !state.selectedItem,
                "text-gray-800 dark:text-gray-100": state.selectedItem,
              })}
            >
              {state.selectedItem ? state.selectedItem.rendered : placeholder}
            </span>
            <Icon name="chevron-down" size="xs" />
          </button>
        </FocusRing>
        {state.isOpen && (
          <SelectOverlay
            state={state}
            menuProps={menuProps}
            buttonRef={ref}
            footer={footer}
          />
        )}
      </section>
      {/* A HiddenSelect is used to render a hidden native <select>, which enables browser form autofill support */}
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={label}
        isDisabled={isDisabled}
        name={name}
      />
    </div>
  )
}

type SelectOverlayProps<OptionKey extends string> = {
  /** Props to spread over the overlay */
  menuProps: React.HTMLAttributes<HTMLUListElement>
  /** The global Select state */
  state: SelectState<SelectOption<OptionKey>>
  /** Ref of the Select button */
  buttonRef: React.RefObject<HTMLButtonElement>
  /** An optional footer to render within the Overlay, after the Body */
  footer?: React.ReactElement
}

/** An overlay that renders individual Select Options */
function SelectOverlay<OptionKey extends string>({
  menuProps,
  state,
  buttonRef,
  footer,
}: SelectOverlayProps<OptionKey>) {
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
      ...menuProps,
      disallowEmptySelection: true,
      autoFocus: state.focusStrategy || true,
    },
    state,
    listBoxRef
  )

  return (
    <OverlayContainer>
      <FocusScope restoreFocus>
        <div
          lens-role="select-body"
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
            lens-role="select-overlay"
            {...listBoxProps}
            className={cn("menu w-full", {
              "animate-slide-bottom": placement === "top",
              "animate-slide-top": placement === "bottom",
            })}
            style={{ maxHeight: "inherit" }}
          >
            {[...state.collection].map((option) => {
              if (option.type === "section") {
                return (
                  <SelectSection
                    key={option.key}
                    title={option.rendered as string}
                    state={state}
                    section={option}
                  />
                )
              } else if (option.type === "item") {
                return (
                  <SelectOption
                    key={option.key}
                    option={option}
                    state={state}
                  />
                )
              } else {
                return null
              }
            })}

            {footer}
          </ul>
          <DismissButton onDismiss={state.close} />
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

type SelectSectionProps<OptionKey extends string> = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<SelectOption<OptionKey>>
  /** The global Select state */
  state: SelectState<SelectOption<OptionKey>>
}

function SelectSection<OptionKey extends string>({
  title,
  section,
  state,
}: SelectSectionProps<OptionKey>) {
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
            <SelectOption key={i.key} option={i} state={state} />
          ))}
        </ul>
      </li>
    </section>
  )
}

type SelectOptionProps<Key extends string> = {
  /** The option to render */
  option: Node<SelectOption<Key>>
  /** The global Select state */
  state: SelectState<SelectOption<Key>>
}

/** A single Select Option */
function SelectOption<Key extends string>({
  option,
  state,
}: SelectOptionProps<Key>) {
  const ref = useRef<HTMLLIElement>(null)

  const isDisabled = state.disabledKeys.has(option.key)
  const isFocused = state.selectionManager.focusedKey === option.key
  const { optionProps } = useOption(
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

  return (
    <li
      ref={ref}
      lens-role="select-option"
      {...optionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default whitespace-nowrap",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
        },
        "hover:bg-gray-100"
      )}
    >
      {option.rendered}
    </li>
  )
}

type SelectFooterProps = React.PropsWithChildren<{
  onPress?: () => void
}>

function SelectFooter({ children, onPress }: SelectFooterProps) {
  return (
    <PressResponder onPress={onPress}>
      <Separator />
      <div className="p-2 whitespace-nowrap">{children}</div>
    </PressResponder>
  )
}

export const Select = {
  Container: SelectContainer,
  Section,
  Option: Item,
  Footer: SelectFooter,
}
