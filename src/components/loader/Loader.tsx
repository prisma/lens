import React from "react"
import cn from "classnames"

import { Size, sizeToNumeric } from "../../utils/sizeToNumeric"

export type LoaderProps = { size?: Size }

export function Loader({ size = "lg" }: LoaderProps) {
  const width = sizeToNumeric(size)

  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      className={cn("animate-spin", "text-gray-500 dark:text-gray-500")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="currentColor"
        className="opacity-50"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 6.99247 17.8897 2 12 2V0C19.1103 0 24 6.00753 24 12H22Z"
        fill="currentColor"
      />
    </svg>
  )
}
