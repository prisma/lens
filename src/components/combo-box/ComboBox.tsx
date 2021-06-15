import React, { useRef } from "react"
import cn from "classnames"
import { useComboBox } from "@react-aria/combobox"
import { ComboBoxState, useComboBoxState } from "@react-stately/combobox"
import { useFilter } from "@react-aria/i18n"
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox"
import { useButton } from "@react-aria/button"
import { Item, Section } from "@react-stately/collections"
import { PressResponder } from "@react-aria/interactions"
import { CollectionChildren, Node } from "@react-types/shared"
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays"
import { FocusScope } from "@react-aria/focus"
import { mergeProps } from "@react-aria/utils"

import { useAsyncOptions } from "../../hooks/useAsyncOptions"
import { useCollectionComponents } from "../../hooks/useCollectionComponents"
import { Separator } from "../separator/Separator"
import { Label } from "../label/Label"
import { Icon } from "../icon/Icon"
import { FocusRing } from "../focus-ring/FocusRing"
import { Loader } from "../loader/Loader"

/** Value for a single Option inside this ComboBox */
export type ComboBoxOption<Key extends string> = {
  /** A string that uniquely identifies this option */
  key: Key
  /** The main text to display within this option */
  title: string
}

export type ComboBoxContainerProps<OptionKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this ComboBox should steal focus when first rendered */
  autoFocus?: boolean
  /** A list of Options to render inside this ComboBox */
  children?: CollectionChildren<ComboBoxOption<OptionKey>>
  /** Value to be pre-populated in the input when this ComboBox is first rendered */
  defaultInputValue?: string
  /** Controls if this ComboBox will be open by default */
  defaultOpen?: boolean
  /** Key of the Option that is selected when this ComboBox is first rendered */
  defaultSelectedKey?: OptionKey
  /** Controls if this ComboBox is disabled */
  isDisabled?: boolean
  /** Controls is this ComboBox is readonly */
  isReadOnly?: boolean
  /** A (dynamic) list of options to render within this ComboBox.
   * This may be provided upfront instead of providing static children.
   */
  options?: ComboBoxOption<OptionKey>[] | Promise<ComboBoxOption<OptionKey>[]>
  /** A string describing what this ComboBox represents */
  label: string
  /** Name of the value held by this ComboBox when placed inside a form */
  name?: string
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** Callback invoked when the ComboBox's selection changes */
  onSelectionChange?: (key: OptionKey) => void
}

/**
 * A ComboBox is a specialized text field that only allows you its value to be one of the pre-provided options.
 * It displays a list of options below the text field. This list keeps getting shorter as you type, since fewer options match the text field's value.
 */
function ComboBoxContainer<OptionKey extends string>({
  id,
  autoFocus,
  children,
  defaultOpen = false,
  defaultInputValue,
  defaultSelectedKey,
  isDisabled = false,
  isReadOnly = false,
  options: propOptions,
  label,
  name,
  placeholder = "Select an option",
  onSelectionChange,
}: ComboBoxContainerProps<OptionKey>) {
  const { body, footer } = useCollectionComponents({
    children,
    footerType: ComboBoxFooter,
  })
  const { loading, error, options } =
    useAsyncOptions<ComboBoxOption<OptionKey>>(propOptions)

  const { contains } = useFilter({ sensitivity: "base" })
  const state = useComboBoxState({
    id,
    autoFocus,
    children: body,
    allowsEmptyCollection: true,
    menuTrigger: "focus",
    defaultInputValue,
    defaultSelectedKey,
    isDisabled,
    isReadOnly,
    defaultItems: options, // `defaultFilter` only works when `items` is undefined
    defaultFilter: contains,
    placeholder,
    shouldFlip: true,
    onSelectionChange: onSelectionChange as (k: React.Key) => void,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const {
    inputProps,
    buttonProps: triggerProps,
    labelProps,
    listBoxProps,
  } = useComboBox(
    {
      id,
      autoFocus,
      children: body,
      menuTrigger: "focus",
      defaultOpen,
      defaultInputValue,
      defaultSelectedKey,
      isDisabled,
      isReadOnly,
      defaultItems: options,
      placeholder,
      shouldFlip: true,
      label,
      onSelectionChange: onSelectionChange as (k: React.Key) => void,
      inputRef,
      buttonRef,
      popoverRef: overlayRef,
      listBoxRef,
    } as any, // need `as any` because types do not allow `label` to be passed on, which causes warnings to show up about missing labels
    state
  )
  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, buttonRef)

  return (
    <div id={id} className="table-row">
      <Label labelProps={labelProps}>{label}</Label>
      <section className="table-cell w-full relative">
        <FocusRing autoFocus={autoFocus} within>
          <div
            ref={containerRef}
            className={cn(
              "flex items-center w-full relative",
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
            <input
              ref={inputRef}
              type="text"
              lens-role="input"
              {...inputProps}
              name={name}
              className={cn("flex-grow", "mr-4", {
                "bg-white dark:bg-gray-900": !isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "text-gray-800 dark:text-gray-100": !isDisabled,
                "text-gray-400 dark:text-gray-400": isDisabled,
                "cursor-not-allowed": isDisabled,
              })}
            />
            <button lens-role="chevron" ref={buttonRef} {...buttonProps}>
              <Icon name="chevron-down" size="xs" />
            </button>
          </div>
        </FocusRing>

        {state.isOpen && (
          <ComboBoxBody
            {...listBoxProps}
            id={id}
            label={label}
            containerRef={containerRef}
            listBoxRef={listBoxRef}
            overlayRef={overlayRef}
            state={state}
            footer={footer}
            loading={loading}
            error={error}
          />
        )}
      </section>
    </div>
  )
}

type ComboBoxBodyProps<OptionKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** A string describing what this ComboBox represents */
  label: string
  /** A ref object that will be attached to the Options container */
  listBoxRef: React.RefObject<HTMLUListElement>
  /** A ref object that will be attached to the overlay element */
  overlayRef: React.RefObject<HTMLDivElement>
  /** The ComboBox's global state */
  state: ComboBoxState<ComboBoxOption<OptionKey>>
  /** Ref of the ComboBox container. This is used to position the overlay */
  containerRef: React.RefObject<HTMLElement>
  /** An optional footer to render within the Overlay, after the Body */
  footer?: React.ReactElement
  loading?: boolean
  error?: Error
}

/** An overlay that renders individual ComboBox Options */
function ComboBoxBody<OptionKey extends string>({
  id,
  label,
  listBoxRef,
  overlayRef,
  state,
  containerRef,
  footer,
  loading,
  error,
}: ComboBoxBodyProps<OptionKey>) {
  const { listBoxProps } = useListBox(
    {
      id,
      autoFocus: state.focusStrategy,
      label,
      disallowEmptySelection: true,
    },
    state,
    listBoxRef
  )
  const { overlayProps } = useOverlay(
    {
      onClose: state.close,
      isDismissable: true,
      shouldCloseOnBlur: true,
      isKeyboardDismissDisabled: false,
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
              <ComboBoxEmptyOption />
            )}

            {[...state.collection].map((option) => {
              if (option.type === "section") {
                return (
                  <ComboBoxSection
                    key={option.key}
                    title={option.rendered as string}
                    state={state}
                    section={option}
                  />
                )
              } else if (option.type === "item") {
                return (
                  <ComboBoxOption
                    key={option.key}
                    option={option}
                    state={state}
                  />
                )
              } else {
                return null
              }
            })}

            {loading && <ComboBoxLoadingOption />}
            {error && <ComboBoxErrorOption />}

            {footer}
          </ul>

          <DismissButton onDismiss={state.close} />
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

type ComboBoxSectionProps<OptionKey extends string> = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<ComboBoxOption<OptionKey>>
  /** The global ComboBox state */
  state: ComboBoxState<ComboBoxOption<OptionKey>>
}

function ComboBoxSection<OptionKey extends string>({
  title,
  section,
  state,
}: ComboBoxSectionProps<OptionKey>) {
  const {
    groupProps,
    headingProps,
    itemProps: optionProps,
  } = useListBoxSection({
    heading: title,
  })

  return (
    <section lens-role="combobox-section" {...groupProps} className={cn("p-2")}>
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
            <ComboBoxOption key={i.key} option={i} state={state} />
          ))}
        </ul>
      </li>
    </section>
  )
}

type ComboBoxOptionProps<Key extends string> = {
  /** The option to render */
  option: Node<ComboBoxOption<Key>>
  /** The global ComboBox state */
  state: ComboBoxState<ComboBoxOption<Key>>
}

/** A single ComboBox Option */
function ComboBoxOption<Key extends string>({
  option,
  state,
}: ComboBoxOptionProps<Key>) {
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
      lens-role="combobox-option"
      {...optionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default",
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

function ComboBoxLoadingOption() {
  return (
    <li className={cn("flex flex-col justify-center items-center", "m-2")}>
      <Loader size="md" />
    </li>
  )
}

type ComboBoxErrorOptionProps = {
  children?: string
}
function ComboBoxErrorOption({
  children = "An error occurred",
}: ComboBoxErrorOptionProps) {
  return (
    <li className={cn("flex flex-col justify-center items-center", "m-2")}>
      <Icon name="alert-circle" />
      <span className="mt-2">{children}</span>
    </li>
  )
}

type ComboBoxEmptyOptionProps = {
  children?: string
}
function ComboBoxEmptyOption({
  children = "No matches",
}: ComboBoxEmptyOptionProps) {
  return (
    <li className={cn("flex flex-col justify-center items-center", "m-2")}>
      <Icon name="slash" />
      <span className="mt-2">{children}</span>
    </li>
  )
}

type ComboBoxFooterProps = React.PropsWithChildren<{
  onPress?: () => void
}>

function ComboBoxFooter({ children, onPress }: ComboBoxFooterProps) {
  return (
    <PressResponder onPress={onPress}>
      <Separator />
      <div className="p-2 whitespace-nowrap">{children}</div>
    </PressResponder>
  )
}

export const ComboBox = {
  Container: ComboBoxContainer,
  Section,
  Option: Item,
  Footer: ComboBoxFooter,
}
