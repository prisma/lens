import React, { useRef, forwardRef } from "react"
import cn from "classnames"
import { Size, sizeToNumeric } from "../../utils/sizeToNumeric"

export type IconProps = {
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<SVGSVGElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Name of the icon to render. Reference: https://feathericons.com */
  name: string
  /** Size of the icon */
  size?: Size
  /** Additional classes that will be spread over the icon. Avoid changing the Icon visually. */
  className?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ id, name, size = "md", className }: IconProps, forwardedRef) => {
    const _iconRef = useRef<SVGSVGElement>(null)
    const iconRef = forwardedRef || _iconRef

    const width = sizeToNumeric(size)
    const commonProps = {
      id,
      "lens-role": "icon",
      ref: iconRef,
      width,
      height: width,
      className: cn(
        "flex-grow-0 flex-shrink-0",
        "text-gray-400 dark:text-gray-300",
        className
      ),
    }

    // Exceptions to FeatherIcons
    if (name === "prisma") {
      return (
        <svg {...commonProps} viewBox="0 0 32 32" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.2342 20.2629C2.91743 20.7809 2.92234 21.4344 3.24684 21.9475L9.12024 31.2353C9.50143 31.8381 10.2362 32.113 10.9181 31.9079L27.8674 26.8107C28.7923 26.5325 29.2577 25.4981 28.8534 24.619L17.9576 0.925701C17.4263 -0.229765 15.8244 -0.324611 15.1611 0.760114L3.2342 20.2629ZM17.711 6.33539C17.4791 5.79843 16.6939 5.88114 16.5788 6.45464L12.3785 27.3844C12.29 27.8257 12.7028 28.2026 13.1338 28.0738L24.8596 24.5709C25.2019 24.4687 25.3782 24.0904 25.2365 23.7622L17.711 6.33539Z"
          />
        </svg>
      )
    }

    if (name === "chevron-down") {
      return (
        <svg {...commonProps} viewBox="0 0 9 6" fill="currentColor">
          <path d="M4.12835 5.08706L0.751034 1.33448C0.461449 1.01272 0.689796 0.5 1.12268 0.5H7.87732C8.3102 0.5 8.53855 1.01272 8.24897 1.33448L4.87165 5.08706C4.67303 5.30775 4.32697 5.30775 4.12835 5.08706Z" />
        </svg>
      )
    }

    if (name === "i") {
      return (
        <svg {...commonProps} viewBox="0 0 32 32" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2637 31.979C14.4612 31.9674 13.0094 30.4969 13.021 28.6944L13.1049 15.6398C13.1165 13.8373 14.5871 12.3855 16.3895 12.3971C18.192 12.4087 19.6438 13.8793 19.6322 15.6818L19.5483 28.7364C19.5367 30.5388 18.0661 31.9906 16.2637 31.979Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.021 3.30582C20.0094 5.10828 18.5388 6.56007 16.7364 6.54849L16.7037 6.54828C14.9013 6.53669 13.4495 5.06611 13.461 3.26365C13.4726 1.46119 14.9432 0.0093926 16.7457 0.0209788L16.7783 0.0211886C18.5808 0.0327748 20.0326 1.50335 20.021 3.30582Z"
          />
        </svg>
      )
    }

    if (name === "heroku") {
      return (
        <svg {...commonProps} viewBox="0 0 15 17" fill="currentColor">
          <path
            d="M13.5 0H1.5C0.671667 0 0 0.6851 0 1.53V15.47C0 16.3149 0.671667 17 1.5 17H13.5C14.3283 17 15 16.3149 15 15.47V1.53C15 0.6851 14.3283 0 13.5 0ZM3.75 14.45V11.05L5.625 12.75L3.75 14.45ZM9.58333 14.45V9.37338C9.57521 8.97664 9.38792 8.5 8.54167 8.5C6.84708 8.5 4.94625 9.36934 4.92729 9.37805L3.75 9.92205V2.55H5.41667V7.37609C6.24875 7.09984 7.41187 6.8 8.54167 6.8C9.57187 6.8 10.1885 7.2131 10.5244 7.55969C11.2412 8.29919 11.251 9.2412 11.25 9.35V14.45H9.58333ZM10 5.3125H8.33333C8.98833 4.43594 9.39958 3.51348 9.58333 2.55H11.25C11.1375 3.5156 10.7537 4.44125 10 5.3125Z"
            fill="#430098" // Deliberately leaving color in so it cannot be changed externally
          />
        </svg>
      )
    }

    return (
      <svg
        {...commonProps}
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
)
