import React, { forwardRef } from "react"
import cn from "classnames"
import { Size, sizeToNumeric } from "../../utils/sizeToNumeric"

export type IconProps = {
  /** Name of the icon to render. Reference: https://feathericons.com */
  name: string
  /** Size of the icon */
  size?: Size
  /** Additional classes that will be spread over the icon. Avoid changing the Icon visually. */
  className?: string
}

function Icon(
  { name, size = "md", className }: IconProps,
  forwardedRef: React.ForwardedRef<SVGSVGElement>
) {
  const width = sizeToNumeric(size)
  const computedClassName = cn("text-gray-400 dark:text-gray-300", className)

  // Exceptions to FeatherIcons
  if (name === "prisma") {
    return (
      <svg
        ref={forwardedRef}
        width={width}
        height={width}
        viewBox="0 0 32 32"
        fill="currentColor"
        className={computedClassName}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.2342 20.2629C2.91743 20.7809 2.92234 21.4344 3.24684 21.9475L9.12024 31.2353C9.50143 31.8381 10.2362 32.113 10.9181 31.9079L27.8674 26.8107C28.7923 26.5325 29.2577 25.4981 28.8534 24.619L17.9576 0.925701C17.4263 -0.229765 15.8244 -0.324611 15.1611 0.760114L3.2342 20.2629ZM17.711 6.33539C17.4791 5.79843 16.6939 5.88114 16.5788 6.45464L12.3785 27.3844C12.29 27.8257 12.7028 28.2026 13.1338 28.0738L24.8596 24.5709C25.2019 24.4687 25.3782 24.0904 25.2365 23.7622L17.711 6.33539Z"
        />
      </svg>
    )
  }

  // Exceptions to FeatherIcons
  if (name === "chevron-down") {
    return (
      <svg
        ref={forwardedRef}
        width={width}
        height={width}
        viewBox="0 0 9 6"
        fill="currentColor"
        className={computedClassName}
      >
        <path d="M4.12835 5.08706L0.751034 1.33448C0.461449 1.01272 0.689796 0.5 1.12268 0.5H7.87732C8.3102 0.5 8.53855 1.01272 8.24897 1.33448L4.87165 5.08706C4.67303 5.30775 4.32697 5.30775 4.12835 5.08706Z" />
      </svg>
    )
  }

  return (
    <svg
      ref={forwardedRef}
      width={width}
      height={width}
      className={computedClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use xlinkHref={`/feather-icons.svg#${name}`} />
    </svg>
  )
}

const _Icon = forwardRef(Icon) as (
  props: IconProps & { ref?: React.ForwardedRef<SVGSVGElement> }
) => React.ReactElement
export { _Icon as Icon }
