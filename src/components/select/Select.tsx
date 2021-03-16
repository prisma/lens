import React, { HTMLAttributes, useRef } from "react";
import cn from "classnames";
import { useSelect, HiddenSelect } from "@react-aria/select";
import { SelectState, useSelectState } from "@react-stately/select";
import { Item } from "@react-stately/collections";
import { CollectionChildren, Node } from "@react-types/shared";
import { useListBox, useOption } from "@react-aria/listbox";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import { Label } from "../label/Label";
import { FocusScope } from "@react-aria/focus";

/** A single Option inside this Select */
export type SelectItem = {
  /** A string that uniquely identifies this option */
  key: string | number;
  /** The main text to display within this option */
  title: string;
};

type SelectContainerProps = {
  /** Controls is this Select should steal focus when first rendered */
  autoFocus?: boolean;
  /** A list of Options to render inside this Select */
  children: CollectionChildren<SelectItem>;
  /** Controls if this Select will be open by default */
  defaultOpen?: boolean;
  /** Key of the Option that is selected when this Select is first rendered */
  defaultSelectedKey?: React.Key;
  /** A ID that will be attached to the rendered Select. Useful when targeting the Select from tests */
  id?: string;
  /** Controls if this Select is disabled */
  isDisabled?: boolean;
  /** Controls is this Select is readonly */
  isReadOnly?: boolean;
  /** A (dynamic) list of items to render within this Select.
   * This may be provided upfront instead of providing static children.
   */
  items?: SelectItem[];
  /** A string describing what this Select represents */
  label: string;
  /** Name of the value held by this Select when placed inside a form */
  name?: string;
  /** A value to display in the TextField when it is empty */
  placeholder?: string;
  /** Callback invoked when the Select's selection changes */
  onSelectionChange?: (key: React.Key) => void;
};

/**
 * A Select displays a list of options that you may choose one from. Its value can only ever be one of these options.
 */
function SelectContainer({
  autoFocus = false,
  children,
  defaultOpen = false,
  defaultSelectedKey,
  id,
  isDisabled = false,
  isReadOnly = false,
  items,
  label,
  name,
  placeholder = "Select an option",
  onSelectionChange,
}: SelectContainerProps) {
  const ref = useRef(null);
  const state = useSelectState({
    autoFocus,
    children,
    defaultOpen,
    defaultSelectedKey,
    isDisabled,
    isReadOnly,
    items,
    label,
    onSelectionChange,
  });
  const { labelProps, menuProps, triggerProps, valueProps } = useSelect(
    {
      autoFocus,
      children,
      defaultOpen,
      defaultSelectedKey,
      id,
      isDisabled,
      isReadOnly,
      items,
      label,
      placeholder,
      onSelectionChange,
    },
    state,
    ref
  );

  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, ref);

  return (
    <div id={id} className="flex items-center">
      <Label label={label} labelProps={labelProps} />
      {/* A HiddenSelect is used to render a hidden native <select>, which enables browser form autofill support */}
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={label}
        isDisabled={isDisabled}
        name={name}
      />
      <section className="flex flex-grow relative">
        <button
          ref={ref}
          {...buttonProps}
          className={cn(
            "flex flex-grow",
            "rounded-md shadow-sm border border-gray-300",
            "px-3 py-1.5",
            "text-sm",
            {
              "text-gray-400": isDisabled,
              "bg-gray-100": isDisabled,
              "cursor-not-allowed": isDisabled,
            }
          )}
        >
          <span {...valueProps} className="flex flex-grow">
            {state.selectedItem ? state.selectedItem.rendered : placeholder}
          </span>
          <span
            className={cn("ml-4", "text-md", {
              "text-gray-500": !isDisabled,
              "text-gray-300": isDisabled,
            })}
          >
            ▽
          </span>
        </button>
        {state.isOpen && <SelectOptions state={state} menuProps={menuProps} />}
      </section>
    </div>
  );
}

type SelectOptionsProps = {
  /** Props to spread over the overlay */
  menuProps: HTMLAttributes<HTMLUListElement>;
  /** The global ComboBox state */
  state: SelectState<SelectItem>;
};

/** An overlay that renders individual Select Options */
function SelectOptions({ menuProps, state }: SelectOptionsProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxProps } = useListBox(
    {
      disallowEmptySelection: true,
      autoFocus: state.focusStrategy || true,
      ...menuProps,
    },
    state,
    ref
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: true,
      onClose: state.close,
    },
    overlayRef
  );

  return (
    <FocusScope autoFocus restoreFocus contain>
      <div
        ref={overlayRef}
        {...overlayProps}
        className={cn("absolute left-0 right-0 top-10")}
      >
        <DismissButton onDismiss={state.close} />
        <ul
          ref={ref}
          {...listBoxProps}
          className={cn(
            "rounded-md shadow-md border border-gray-300",
            "p-2",
            "bg-white text-sm"
          )}
        >
          {[...state.collection].map(item => (
            <SelectOption item={item} state={state} />
          ))}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
}

type SelectOptionProps = {
  /** The option to render */
  item: Node<SelectItem>;
  /** The global ComboBox state */
  state: SelectState<SelectItem>;
};

/** A single Select Option */
function SelectOption({ item, state }: SelectOptionProps) {
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

export const Select = {
  Container: SelectContainer,
  Option: Item,
};
