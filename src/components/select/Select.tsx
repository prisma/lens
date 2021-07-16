import React, { useRef } from "react"
import cn from "classnames"
import { useSelect, HiddenSelect } from "@react-aria/select"
import { useSelectState } from "@react-stately/select"
import { Item, Section } from "@react-stately/collections"
import { CollectionChildren } from "@react-types/shared"
import { useButton } from "@react-aria/button"

import { useCollectionComponents } from "../../hooks/useCollectionComponents"
import { ListBoxFooter, ListBoxOverlay } from "../internal/ListBox"
import { Label } from "../label/Label"
import { Icon } from "../icon/Icon"
import { FocusRing } from "../focus-ring/FocusRing"

/** Value for a single Option inside this Select */
export type SelectOption<Key extends string> = {
  /** A string that uniquely identifies this option */
  key: Key
  /** The main text to display within this option */
  title: string
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
  /** A string describing what this Select represents */
  label: string
  /** Name of the value held by this Select when placed inside a form */
  name?: string
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** The current selection */
  selectedKey?: OptionKey
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
  label,
  name,
  placeholder = "Select an option",
  selectedKey,
  onSelectionChange,
}: SelectContainerProps<OptionKey>) {
  const ref = useRef(null)

  const { body, footer } = useCollectionComponents({
    children,
    footerType: ListBoxFooter,
  })

  const state = useSelectState({
    autoFocus,
    children: body,
    defaultOpen,
    defaultSelectedKey,
    isDisabled,
    isReadOnly,
    label,
    selectedKey,
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
      label,
      placeholder,
      selectedKey,
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
              "inline-flex w-full items-center",
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
            <div
              {...valueProps}
              lens-role="selected-option"
              className={cn("flex space-x-2", "mr-4", {
                "text-gray-400 dark:text-gray-300": !state.selectedItem,
                "text-gray-800 dark:text-gray-100": state.selectedItem,
              })}
            >
              {state.selectedItem && (
                <Icon name={state.selectedItem.props.icon} size="sm" />
              )}
              <span>
                {state.selectedItem ? state.selectedItem.rendered : placeholder}
              </span>
            </div>
            <Icon name="chevron-down" size="xs" />
          </button>
        </FocusRing>

        {state.isOpen && (
          <ListBoxOverlay
            id={id}
            label={label}
            state={state}
            listBoxProps={menuProps}
            containerRef={ref}
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

export const Select = {
  Container: SelectContainer,
  Section,
  Option: Item,
  Footer: ListBoxFooter,
}

// TODO:: Add `icon` to Item
// TODO:: Stricter type for Item children: strings only
// TODO:: Type optionProps
// TODO:: Talk to Luan about fragmented tailwind classes
