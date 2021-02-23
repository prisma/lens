import React, {
  Ref,
  PropsWithChildren,
  RefObject,
  ReactElement,
  useRef,
  forwardRef,
} from "react";
import cn from "classnames";
import { useHover } from "@react-aria/interactions";
import { FocusRing } from "@react-aria/focus";
import { useButton } from "@react-aria/button";

type Props = PropsWithChildren<{
  autoFocus?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}>;

function Button(props: Props, forwardedRef: Ref<HTMLButtonElement>) {
  const ref = (forwardedRef || useRef<HTMLButtonElement>(null)) as RefObject<
    HTMLButtonElement
  >;
  const { buttonProps, isPressed } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover(props);

  // TODO:: Use isHovered, isPressed to add classes instead of tailwind hover:*, active:*
  return (
    <FocusRing autoFocus={props.autoFocus} focusRingClass="tailwind-classes">
      <button
        ref={ref}
        {...buttonProps}
        {...hoverProps}
        className={cn("text-white bg-gray-700 rounded-md p-2 text-sm", {
          "bg-gray-800": isPressed,
          "bg-gray-500": isHovered,
        })}
      >
        {props.children}
      </button>
    </FocusRing>
  );
}

const _Button = forwardRef(Button) as (
  props: Props & { ref?: Ref<HTMLButtonElement> }
) => ReactElement;
export { _Button as Button };
