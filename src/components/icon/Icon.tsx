import React from "react";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type IconProps = {
  /** Name of the icon to render. Reference: https://feathericons.com */
  name: string;
  /** Size of the icon */
  size?: Size;
};

function sizeNumeric(size: Size): number {
  switch (size) {
    case "xs":
      return 12;
    case "sm":
      return 16;
    case "md":
      return 24;
    case "lg":
      return 32;
    case "xl":
      return 64;
  }
}

export function Icon({ name, size = "md" }: IconProps) {
  const width = sizeNumeric(size);

  return (
    <svg
      width={width}
      height={width}
      className="text-gray-400 dark:text-gray-300"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <use xlinkHref={`feather-icons.svg#${name}`} />
    </svg>
  );
}
