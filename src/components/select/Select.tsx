import React, { useRef } from "react";
import cn from "classnames";
import { useSelect, HiddenSelect } from "@react-aria/select";
import { SelectState, useSelectState } from "@react-stately/select";
import { Item } from "@react-stately/collections";
import { CollectionChildren, Node } from "@react-types/shared";
import { useListBox, useOption } from "@react-aria/listbox";
import {
  DismissButton,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays";
import { useButton } from "@react-aria/button";
import { FocusScope } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { Label } from "../label/Label";
import { Icon } from "../icon/Icon";
import { FocusRing } from "../focus-ring/FocusRing";

/** Value for a single Option inside this Select */
export type SelectOption<Key extends string> = {
  /** A string that uniquely identifies this option */
  key: Key;
  /** The main text to display within this option */
  title: string;
};

type SelectContainerProps<OptionKey extends string> = {
  /** Controls if this Select should steal focus when first rendered */
  autoFocus?: boolean;
  /** A list of Options to render inside this Select */
  children: CollectionChildren<SelectOption<OptionKey>>;
  /** Controls if this Select will be open by default */
  defaultOpen?: boolean;
  /** Key of the Option that is selected when this Select is first rendered */
  defaultSelectedKey?: OptionKey;
  /** A ID that will be attached to the rendered Select. Useful when targeting the Select from tests */
  id?: string;
  /** Controls if this Select is disabled */
  isDisabled?: boolean;
  /** Controls is this Select is readonly */
  isReadOnly?: boolean;
  /** A (dynamic) list of options to render within this Select.
   * This may be provided upfront instead of providing static children.
   */
  options?: SelectOption<OptionKey>[];
  /** A string describing what this Select represents */
  label: string;
  /** Name of the value held by this Select when placed inside a form */
  name?: string;
  /** A value to display in the TextField when it is empty */
  placeholder?: string;
  /** Callback invoked when the Select's selection changes */
  onSelectionChange?: (key: OptionKey) => void;
};

/**
 * A Select displays a list of options that you may choose one from. Its value can only ever be one of these options.
 */
function SelectContainer<OptionKey extends string>({
  autoFocus = false,
  children,
  defaultOpen = false,
  defaultSelectedKey,
  id,
  isDisabled = false,
  isReadOnly = false,
  options,
  label,
  name,
  placeholder = "Select an option",
  onSelectionChange,
}: SelectContainerProps<OptionKey>) {
  const ref = useRef(null);
  const state = useSelectState({
    autoFocus,
    children,
    defaultOpen,
    defaultSelectedKey,
    isDisabled,
    isReadOnly,
    items: options,
    label,
    onSelectionChange: onSelectionChange as (k: React.Key) => void,
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
      items: options,
      label,
      placeholder,
      onSelectionChange: onSelectionChange as (k: React.Key) => void,
    },
    state,
    ref
  );

  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, ref);

  return (
    <div id={id} className="table-row">
      <Label labelProps={labelProps}>{label}</Label>
      <section className="table-cell w-full relative">
        <FocusRing autoFocus={autoFocus}>
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
              className={cn("flex flex-grow", {
                "text-gray-400 dark:text-gray-300": !state.selectedItem,
                "text-gray-900 dark:text-gray-100": state.selectedItem,
              })}
            >
              {state.selectedItem ? state.selectedItem.rendered : placeholder}
            </span>
            <Icon name="chevron-down" size="xs" />
          </button>
        </FocusRing>
        {state.isOpen && (
          <SelectOptions state={state} menuProps={menuProps} buttonRef={ref} />
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
  );
}

type SelectOptionsProps<OptionKey extends string> = {
  /** Props to spread over the overlay */
  menuProps: React.HTMLAttributes<HTMLUListElement>;
  /** The global ComboBox state */
  state: SelectState<SelectOption<OptionKey>>;
  /** Ref of the Select button */
  buttonRef: React.RefObject<HTMLButtonElement>;
};

/** An overlay that renders individual Select Options */
function SelectOptions<OptionKey extends string>({
  menuProps,
  state,
  buttonRef,
}: SelectOptionsProps<OptionKey>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: true,
      onClose: state.close,
    },
    overlayRef
  );
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: buttonRef,
    offset: 6,
    containerPadding: 0,
    onClose: state.close,
  });

  const listBoxRef = useRef<HTMLUListElement>(null);
  const { listBoxProps } = useListBox(
    {
      ...menuProps,
      disallowEmptySelection: true,
      autoFocus: state.focusStrategy || true,
    },
    state,
    listBoxRef
  );

  return (
    <FocusScope autoFocus restoreFocus contain>
      <div
        ref={overlayRef}
        {...mergeProps(overlayProps, positionProps)}
        className="left-0 right-0"
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
          {[...state.collection].map(option => (
            <SelectOption key={option.key} option={option} state={state} />
          ))}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
}

type SelectOptionProps<Key extends string> = {
  /** The option to render */
  option: Node<SelectOption<Key>>;
  /** The global ComboBox state */
  state: SelectState<SelectOption<Key>>;
};

/** A single Select Option */
function SelectOption<Key extends string>({
  option,
  state,
}: SelectOptionProps<Key>) {
  const ref = useRef<HTMLLIElement>(null);

  const isDisabled = state.disabledKeys.has(option.key);
  const isFocused = state.selectionManager.focusedKey === option.key;
  const { optionProps } = useOption(
    {
      key: option.key,
      isDisabled,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
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
          "bg-gray-100 dark:bg-gray-800": isFocused,
        },
        "hover:bg-gray-100"
      )}
    >
      {option.rendered}
    </li>
  );
}

export const Select = {
  Container: SelectContainer,
  Option: Item,
};
