import React from "react";

type SubtitleProps = {
  children: string;
};

export function Subtitle({ children }: SubtitleProps) {
  return <div className="font-light text-sm text-gray-400">{children}</div>;
}
