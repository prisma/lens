import React, {
  Ref,
  PropsWithChildren,
  RefObject,
  ReactElement,
  useRef,
  forwardRef,
  useContext,
} from "react";
import { useButton } from "@react-aria/button";
import { mergeProps } from "@react-aria/utils";

import { LensContext } from "../lens-context";

type Props = PropsWithChildren<{
  isDisabled?: boolean;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}>;

function Button(props: Props, forwardedRef: Ref<HTMLButtonElement>) {
  const ref = forwardedRef || useRef<HTMLButtonElement>(null);
  const context = useContext(LensContext);
  const { buttonProps, isPressed } = useButton(
    mergeProps(context, props),
    ref as RefObject<HTMLButtonElement>
  ); // This explicit type cast is required to convince TS that we know what we're doing

  return (
    <button
      ref={ref}
      {...buttonProps}
      tw="text-white bg-gray-700 rounded-md p-2 text-sm hover:bg-gray-800 active:bg-gray-500"
    >
      {props.children}
    </button>
  );
}

const _Button = forwardRef(Button) as (
  props: Props & { ref?: Ref<HTMLButtonElement> }
) => ReactElement;
export { _Button as Button };
