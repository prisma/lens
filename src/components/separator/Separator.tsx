import React from "react";
import { useSeparator } from "@react-aria/separator";

type SeparatorProps = {
  orientation?: "vertical" | "horizontal";
};

export function Separator({ orientation = "horizontal" }: SeparatorProps) {
  const { separatorProps } = useSeparator({
    orientation,
  });

  if (orientation === "horizontal") {
    return (
      <div
        {...separatorProps}
        className="border-b-2 border-gray-300 dark:border-gray-700"
      />
    );
  } else {
    return (
      <div
        {...separatorProps}
        className="border-r-2 border-color-gray-300 dark:border-gray-700"
      ></div>
    );
  }
}
