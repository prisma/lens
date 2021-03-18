import React from "react";
import cn from "classnames";

type SubtitleProps = {
  /** Content of the Title */
  children: string;
  /** Additional classes that will be forwarded to the Title. Avoid classes that change the Title's visuals. */
  className?: string;
};

export function Title({ children, className }: SubtitleProps) {
  return (
    <div
      className={cn(
        "py-2",
        "whitespace-nowrap font-barlow font-light text-xl text-gray-800 dark:text-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}
