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

  // Exceptions to FeatherIcons
  if (name === "chevron-down") {
    return (
      <svg width={width} height={width} viewBox="0 0 9 6" fill="#CCD6E0">
        <path d="M4.12835 5.08706L0.751034 1.33448C0.461449 1.01272 0.689796 0.5 1.12268 0.5H7.87732C8.3102 0.5 8.53855 1.01272 8.24897 1.33448L4.87165 5.08706C4.67303 5.30775 4.32697 5.30775 4.12835 5.08706Z" />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={width}
      className="text-gray-400 dark:text-gray-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use xlinkHref={`/feather-icons.svg#${name}`} />
    </svg>
  );
}
