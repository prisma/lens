import React, { useRef } from "react";
import cn from "classnames";
import { useComboBox } from "@react-aria/combobox";
import { ComboBoxState, useComboBoxState } from "@react-stately/combobox";
import { useFilter } from "@react-aria/i18n";
import { useListBox, useOption } from "@react-aria/listbox";
import { useButton } from "@react-aria/button";
import { Item } from "@react-stately/collections";
import { CollectionChildren, Node } from "@react-types/shared";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { Label } from "../label/Label";
import { FocusScope } from "@react-aria/focus";

/** A single Option inside this ComboBox */
export type ComboBoxItem = {
  /** A string that uniquely identifies this option */
  key: string | number;
  /** The main text to display within this option */
  title: string;
};

type ComboBoxContainerProps = {
  /** Controls is this ComboBox should steal focus when first rendered */
  autoFocus?: boolean;
  /** A list of Options to render inside this ComboBox */
  children: CollectionChildren<ComboBoxItem>;
  /** Value to be pre-populated in the input when this ComboBox is first rendered */
  defaultInputValue?: string;
  /** Controls if this ComboBox will be open by default */
  defaultOpen?: boolean;
  /** Key of the Option that is selected when this ComboBox is first rendered */
  defaultSelectedKey?: React.Key;
  /** A ID that will be attached to the rendered ComboBox. Useful when targeting the ComboBox from tests */
  id?: string;
  /** Controls if this ComboBox is disabled */
  isDisabled?: boolean;
  /** Controls is this ComboBox is readonly */
  isReadOnly?: boolean;
  /** A (dynamic) list of items to render within this ComboBox.
   * This may be provided upfront instead of providing static children.
   */
  items?: ComboBoxItem[];
  /** A string describing what this ComboBox represents */
  label: string;
  /** Name of the value held by this ComboBox when placed inside a form */
  name?: string;
  /** A value to display in the TextField when it is empty */
  placeholder?: string;
  /** Callback invoked when the ComboBox's selection changes */
  onSelectionChange?: (key: React.Key) => void;
};

/**
 * A ComboBox is a specialized text field that only allows you its value to be one of the pre-provided options.
 * It displays a list of options below the text field. This list keeps getting shorter as you type, since fewer options match the text field's value.
 */
function ComboBoxContainer({
  autoFocus,
  children,
  defaultOpen = false,
  defaultInputValue,
  defaultSelectedKey,
  id,
  isDisabled = false,
  isReadOnly = false,
  items,
  label,
  name,
  placeholder = "Select an option",
  onSelectionChange,
}: ComboBoxContainerProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({
    autoFocus,
    children,
    defaultInputValue,
    defaultOpen,
    defaultSelectedKey,
    id,
    isDisabled,
    isReadOnly,
    items,
    placeholder,
    onSelectionChange,
    defaultFilter: contains,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const {
    inputProps,
    buttonProps: triggerProps,
    labelProps,
    listBoxProps,
  } = useComboBox(
    {
      autoFocus,
      children,
      defaultOpen,
      defaultInputValue,
      defaultSelectedKey,
      id,
      isDisabled,
      isReadOnly,
      items,
      placeholder,
      onSelectionChange,
      inputRef,
      buttonRef,
      popoverRef: overlayRef,
      listBoxRef,
      menuTrigger: "input",
    },
    state
  );
  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, buttonRef);

  return (
    <div className="flex items-center">
      <Label labelProps={labelProps} label={label} />
      <section
        className={cn(
          "flex flex-grow relative",
          "rounded-md shadow-sm border border-gray-300",
          "px-3 py-1.5",
          "text-sm",
          {
            "text-gray-400": isDisabled,
            "bg-gray-100": isDisabled,
          }
        )}
      >
        <input
          ref={inputRef}
          type="text"
          {...inputProps}
          className={cn("flex-grow", "text-gray-600", {
            "bg-gray-100": isDisabled,
            "cursor-not-allowed": isDisabled,
          })}
        />
        <button
          ref={buttonRef}
          {...buttonProps}
          className={cn("text-md", {
            "text-gray-500": !isDisabled,
            "text-gray-300": isDisabled,
            "cursor-not-allowed": isDisabled,
          })}
        >
          ▽
        </button>
        {state.isOpen && (
          <ComboBoxOptions
            {...listBoxProps}
            listBoxRef={listBoxRef}
            overlayRef={overlayRef}
            state={state}
          />
        )}
      </section>
    </div>
  );
}

type ComboBoxOptionsProps = {
  /** A ref object that will be attached to the Options container */
  listBoxRef: React.RefObject<HTMLUListElement>;
  /** A ref object that will be attached to the overlay element */
  overlayRef: React.RefObject<HTMLDivElement>;
  /** The ComboBox's global state */
  state: ComboBoxState<ComboBoxItem>;
};

/** An overlay that renders individual ComboBox Options */
function ComboBoxOptions({
  listBoxRef,
  overlayRef,
  state,
}: ComboBoxOptionsProps) {
  const { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy,
      disallowEmptySelection: true,
    },
    state,
    listBoxRef
  );
  const { overlayProps } = useOverlay(
    {
      onClose: state.close,
      isDismissable: true,
      shouldCloseOnBlur: true,
      isKeyboardDismissDisabled: false,
    },
    overlayRef
  );

  return (
    <FocusScope autoFocus restoreFocus contain>
      <div
        {...overlayProps}
        ref={overlayRef}
        className={cn("absolute left-0 right-0 top-10")}
      >
        <DismissButton onDismiss={state.close} />
        <ul
          ref={listBoxRef}
          {...listBoxProps}
          className={cn(
            "rounded-md shadow-md border border-gray-300",
            "p-2",
            "bg-white text-sm"
          )}
        >
          {[...state.collection].map(item => (
            <ComboBoxOption key={item.key} item={item} state={state} />
          ))}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
}

type ComboBoxOptionProps = {
  /** The option to render */
  item: Node<ComboBoxItem>;
  /** The global ComboBox state */
  state: ComboBoxState<ComboBoxItem>;
};

/** A single ComboBox Option */
function ComboBoxOption({ item, state }: ComboBoxOptionProps) {
  const ref = useRef<HTMLLIElement>(null);

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const { optionProps } = useOption(
    {
      key: item.key,
      isSelected,
      isDisabled,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus: true,
    },
    state,
    ref
  );

  return (
    <li
      ref={ref}
      {...optionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default",
        {
          "bg-gray-100": isFocused,
          "bg-gray-200": isSelected,
        },
        "hover:bg-gray-100"
      )}
    >
      {item.rendered}
    </li>
  );
}

export const ComboBox = {
  Container: ComboBoxContainer,
  Option: Item,
};
