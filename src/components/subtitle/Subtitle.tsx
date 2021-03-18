import React from "react";
import cn from "classnames";

type SubtitleProps = {
  /** Content of the Subtitle */
  children: string;
  /** Additional classes that will be forwarded to the Subtitle. Avoid classes that change the Subtitle's visuals. */
  className?: string;
};

export function Subtitle({ children, className }: SubtitleProps) {
  return (
    <div className={cn("font-light text-sm text-gray-400", className)}>
      {children}
    </div>
  );
}
