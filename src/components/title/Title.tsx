import React from "react";
import cn from "classnames";

type TitleProps = {
  /** Content of the Title */
  children: string;
  /** Additional classes that will be forwarded to the Title. Avoid classes that change the Title's visuals. */
  className?: string;
  /** Additionl props that will be spread over the title */
  titleProps?: React.HTMLAttributes<HTMLElement>;
};

export function Title({ children, className, titleProps }: TitleProps) {
  return (
    <div
      className={cn(
        "whitespace-nowrap font-barlow font-light text-xl text-gray-800 dark:text-gray-100",
        className
      )}
      {...titleProps}
    >
      {children}
    </div>
  );
}
