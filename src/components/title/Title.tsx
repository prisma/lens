import React from "react";
import cn from "classnames";

type SubtitleProps = {
  children: string;
};

export function Title({ children }: SubtitleProps) {
  return (
    <div
      className={cn(
        "whitespace-nowrap font-barlow font-light text-xl text-gray-800 dark:text-gray-100"
      )}
    >
      {children}
    </div>
  );
}
