import React, { Children, useRef, createContext, useContext } from "react";
import cn from "classnames";
import { CollectionChildren, Node } from "@react-types/shared";
import { mergeProps } from "@react-aria/utils";
import { PressResponder } from "@react-aria/interactions";
import { FocusScope } from "@react-aria/focus";
import {
  DismissButton,
  useOverlayPosition,
  useOverlay,
} from "@react-aria/overlays";
import {
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger,
} from "@react-aria/menu";
import { useButton } from "@react-aria/button";
import { Section, Item } from "@react-stately/collections";
import { TreeState, useTreeState } from "@react-stately/tree";
import { MenuTriggerState, useMenuTriggerState } from "@react-stately/menu";

type MenuContext = {
  triggerRef: React.RefObject<HTMLElement>;
  menuProps: React.HTMLAttributes<HTMLUListElement>;
  close: MenuTriggerState["close"];
};
// @ts-expect-error: We cannot provide a valid initial value, but TSC does not understand that it is okay
const MenuContext = createContext<MenuContext>(null);

/** Value for a single Option inside this Menu */
export type MenuOption = {
  /** A string that uniquely identifies this option */
  key: string | number;
  /** The main text to display within this option */
  title: string;
  /** Sub-options for this option */
  children?: MenuOption[];
};

type MenuContainerProps = {
  /** The menu's trigger and its body, in order */
  children: [React.ReactElement, React.ReactElement];
  /** Controls if this Menu will be open by default */
  defaultOpen?: boolean;
  /** Controls if this Menu is disabled */
  isDisabled?: boolean;
};

/**
 * A Menu is an overlay that allows you select a single option, then disappears
 */
function MenuContainer({
  children,
  defaultOpen,
  isDisabled,
}: MenuContainerProps) {
  if (!Array.isArray(children) || children.length !== 2) {
    throw new Error("Menu.Container must have exactly two children");
  }

  const [trigger, content] = Children.toArray(children);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useMenuTriggerState({
    defaultOpen,
    closeOnSelect: true,
  });
  const { buttonProps, isPressed } = useButton({ isDisabled }, triggerRef);
  const { menuProps, menuTriggerProps } = useMenuTrigger(
    { ...buttonProps, type: "menu" },
    state,
    triggerRef
  );

  return (
    <MenuContext.Provider value={{ triggerRef, menuProps, close: state.close }}>
      <section className="flex flex-grow relative">
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
  );
}

type MenuContentProps = {
  /** Children to render */
  children: CollectionChildren<MenuOption>;
  /** A string describing what this Menu represents */
  title: string;
  /** A (dynamic) list of items and/or sections to render within this Menu.
   * This may be provided upfront instead of providing static children.
   */
  items?: MenuOption[];
  /** Callback invoked when the Menu's selection changes */
  onSelectionChange?: (key: React.Key) => void;
};

/**
 * Container for all Menu Sections and Items
 */
function MenuContent({
  children,
  title,
  items,
  onSelectionChange,
}: MenuContentProps) {
  const context = useContext(MenuContext);

  const ref = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const state = useTreeState({ children, items, selectionMode: "none" });
  const { menuProps } = useMenu(
    {
      children,
      "aria-label": title,
      items,
    },
    state,
    ref
  );
  const { overlayProps } = useOverlay(
    { isDismissable: true, shouldCloseOnBlur: true, onClose: context.close },
    overlayRef
  );
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: context.triggerRef,
    offset: 6,
    containerPadding: 0,
    onClose: context.close,
  });

  return (
    <div
      ref={overlayRef}
      {...mergeProps(positionProps, overlayProps)}
      className="left-0 right-0"
    >
      <FocusScope autoFocus contain restoreFocus>
        <DismissButton onDismiss={context.close} />
        <ul
          ref={ref}
          {...mergeProps(menuProps, context.menuProps)}
          className={cn(
            "p-2 min-w-min overflow-auto",
            "rounded-md shadow-md border border-gray-300 dark:border-gray-700",
            "bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100",
            {
              "animate-slide-bottom": placement === "top",
              "animate-slide-top": placement === "bottom",
            }
          )}
          style={{ maxHeight: "inherit" }}
        >
          {[...state.collection].map(item => {
            if (item.type === "section") {
              return (
                <MenuSection
                  key={item.key}
                  title={item.rendered as string}
                  state={state}
                  section={item}
                  onAction={onSelectionChange}
                />
              );
            } else if (item.type === "item") {
              return (
                <MenuOption
                  key={item.key}
                  item={item}
                  state={state}
                  onAction={onSelectionChange}
                />
              );
            } else {
              return null;
            }
          })}
        </ul>
        <DismissButton onDismiss={context.close} />
      </FocusScope>
    </div>
  );
}

type MenuSectionProps = {
  /** Title for this Section */
  title: string;
  /** */
  section: Node<MenuOption>;
  /** The global Menu state */
  state: TreeState<any>;
  /** Callback invoked when an option is selected */
  onAction?: (key: React.Key) => void;
};

/**
 * A divided section of the Menu that may contain other items within
 */
function MenuSection({ title, section, state, onAction }: MenuSectionProps) {
  const { groupProps, headingProps, itemProps } = useMenuSection({
    heading: title,
  });

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
      <li {...itemProps}>
        <ul>
          {[...section.childNodes].map(i => (
            <MenuOption
              key={i.key}
              item={i}
              state={state}
              onAction={onAction}
            />
          ))}
        </ul>
      </li>
    </section>
  );
}

type MenuItemProps = {
  /** The option to render */
  item: Node<MenuOption>;
  /** The global Menu state */
  state: TreeState<any>;
  /** Callback invoked when this option is selected */
  onAction?: (key: React.Key) => void;
};

/** A single Menu Option */
function MenuOption({ item, state, onAction }: MenuItemProps) {
  const context = useContext(MenuContext);
  const ref = useRef<HTMLLIElement>(null);

  const isFocused = state.selectionManager.focusedKey === item.key;
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction: onAction,
      closeOnSelect: true,
      onClose: context.close,
    },
    state,
    ref
  );

  return (
    <li
      ref={ref}
      {...menuItemProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
        },
        "hover:bg-gray-100"
      )}
    >
      {item.rendered || item.value.title}
    </li>
  );
}

export const Menu = {
  Container: MenuContainer,
  Section,
  Option: Item,
  Content: MenuContent,
};
