import React, { Children, useRef, createContext, useContext } from "react"
import cn from "classnames"
import { CollectionChildren, Node } from "@react-types/shared"
import { mergeProps } from "@react-aria/utils"
import { PressResponder } from "@react-aria/interactions"
import { FocusScope } from "@react-aria/focus"
import {
  DismissButton,
  OverlayContainer,
  useOverlayPosition,
  useOverlay,
} from "@react-aria/overlays"
import {
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger,
} from "@react-aria/menu"
import { useButton } from "@react-aria/button"
import { Section, Item } from "@react-stately/collections"
import { TreeState, useTreeState } from "@react-stately/tree"
import { MenuTriggerState, useMenuTriggerState } from "@react-stately/menu"

type MenuContext = {
  triggerRef: React.RefObject<HTMLElement>
  menuProps: React.HTMLAttributes<HTMLUListElement>
  close: MenuTriggerState["close"]
}
// @ts-expect-error: We cannot provide a valid initial value, but TSC does not understand that it is okay
const MenuContext = createContext<MenuContext>(null)

/** Value for a single Option inside this Menu */
export type MenuOption<Key extends string> = {
  /** A string that uniquely identifies this option */
  key: Key
  /** The main text to display within this option */
  title: string
  /** Sub-options for this option */
  children?: MenuOption<Key>[]
}

export type MenuContainerProps = {
  /** The menu's trigger and its body, in order */
  children: [React.ReactElement, React.ReactElement]
  /** Controls if this Menu will be open by default */
  defaultOpen?: boolean
  /** Controls if this Menu is disabled */
  isDisabled?: boolean
}

/**
 * A Menu is an overlay that allows you select a single option, then disappears
 */
function MenuContainer({
  children,
  defaultOpen,
  isDisabled,
}: MenuContainerProps) {
  if (!Array.isArray(children) || children.length !== 2) {
    throw new Error("Menu.Container must have exactly two children")
  }

  const [trigger, content] = Children.toArray(children)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const state = useMenuTriggerState({
    defaultOpen,
    closeOnSelect: true,
  })
  const { buttonProps, isPressed } = useButton({ isDisabled }, triggerRef)
  const { menuProps, menuTriggerProps } = useMenuTrigger(
    { ...buttonProps, type: "menu" },
    state,
    triggerRef
  )

  return (
    <MenuContext.Provider value={{ triggerRef, menuProps, close: state.close }}>
      <section className="flex relative">
        <PressResponder
          ref={triggerRef}
          {...menuTriggerProps}
          isPressed={isPressed}
          onPress={() => state.toggle()}
        >
          {trigger}
        </PressResponder>

        {state.isOpen && content}
      </section>
    </MenuContext.Provider>
  )
}

export type MenuBodyProps<OptionKey extends string> = {
  /** Children to render */
  children: CollectionChildren<MenuOption<OptionKey>>
  /** A string describing what this Menu represents */
  title: string
  /** A (dynamic) list of options and/or sections to render within this Menu.
   * This may be provided upfront instead of providing static children.
   */
  options?: MenuOption<OptionKey>[]
  /** Callback invoked when the Menu's selection changes */
  onSelectionChange?: (key: OptionKey) => void
}

/**
 * Container for all Menu Sections and Options
 */
function MenuBody<OptionKey extends string>({
  children,
  title,
  options,
  onSelectionChange,
}: MenuBodyProps<OptionKey>) {
  const context = useContext(MenuContext)

  const ref = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const state = useTreeState({
    children,
    items: options,
    selectionMode: "none",
  })
  const { menuProps } = useMenu(
    {
      children,
      "aria-label": title,
      items: options,
    },
    state,
    ref
  )
  const { overlayProps } = useOverlay(
    { isDismissable: true, shouldCloseOnBlur: true, onClose: context.close },
    overlayRef
  )
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: context.triggerRef,
    offset: 8,
    containerPadding: 0,
    onClose: context.close,
  })
  // Figure out trigger dimensions so we can size the overlay
  const triggerDimensions = context.triggerRef.current?.getBoundingClientRect()

  return (
    <OverlayContainer>
      <FocusScope restoreFocus>
        <div
          ref={overlayRef}
          {...mergeProps(positionProps, overlayProps)}
          style={{
            ...positionProps.style,
            left: triggerDimensions?.left,
            minWidth: triggerDimensions?.width,
          }}
        >
          <DismissButton onDismiss={context.close} />
          <ul
            ref={ref}
            {...mergeProps(menuProps, context.menuProps)}
            className={cn(
              "p-2 min-w-min overflow-auto",
              "rounded-md shadow-md border border-gray-300 dark:border-gray-700",
              "bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100",
              {
                "animate-slide-bottom": placement === "top",
                "animate-slide-top": placement === "bottom",
              }
            )}
            style={{ maxHeight: "inherit" }}
          >
            {[...state.collection].map((option) => {
              if (option.type === "section") {
                return (
                  <MenuSection
                    key={option.key}
                    title={option.rendered as string}
                    state={state}
                    section={option}
                    onAction={onSelectionChange}
                  />
                )
              } else if (option.type === "item") {
                return (
                  <MenuOption
                    key={option.key}
                    option={option}
                    state={state}
                    onAction={onSelectionChange}
                  />
                )
              } else {
                return null
              }
            })}
          </ul>
          <DismissButton onDismiss={context.close} />
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

type MenuSectionProps<OptionKey extends string> = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<MenuOption<OptionKey>>
  /** The global Menu state */
  state: TreeState<any>
  /** Callback invoked when an option inside this Section is selected */
  onAction?: (key: OptionKey) => void
}

/**
 * A divided section of the Menu that may contain other options within
 */
function MenuSection<OptionKey extends string>({
  title,
  section,
  state,
  onAction,
}: MenuSectionProps<OptionKey>) {
  const { groupProps, headingProps, itemProps: optionProps } = useMenuSection({
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
          {[...section.childNodes].map((i) => (
            <MenuOption
              key={i.key}
              option={i}
              state={state}
              onAction={onAction}
            />
          ))}
        </ul>
      </li>
    </section>
  )
}

type MenuOptionProps<Key extends string> = {
  /** The option to render */
  option: Node<MenuOption<Key>>
  /** The global Menu state */
  state: TreeState<any>
  /** Callback invoked when this option is selected */
  onAction?: (key: Key) => void
}

/** A single Menu Option */
function MenuOption<Key extends string>({
  option,
  state,
  onAction,
}: MenuOptionProps<Key>) {
  const context = useContext(MenuContext)
  const ref = useRef<HTMLLIElement>(null)

  const isFocused = state.selectionManager.focusedKey === option.key
  const { menuItemProps: menuOptionProps } = useMenuItem(
    {
      key: option.key,
      onAction: onAction as (k: React.Key) => void,
      closeOnSelect: true,
      onClose: context.close,
    },
    state,
    ref
  )

  return (
    <li
      ref={ref}
      {...menuOptionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
        },
        "hover:bg-gray-100"
      )}
    >
      {option.rendered || option.value.title}
    </li>
  )
}

export const Menu = {
  Container: MenuContainer,
  Section,
  Option: Item,
  Body: MenuBody,
}
