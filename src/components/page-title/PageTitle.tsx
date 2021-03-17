import React from "react";
import cn from "classnames";
import { Icon } from "../icon/Icon";

type PageTitleProps = {
  /** An identifying icon */
  icon: string;
  /** The title of the PageTitle */
  title: string;
  /** Additional description */
  subtitle: string;
};

export function PageTitle({ icon, title, subtitle }: PageTitleProps) {
  return (
    <section className="flex items-center">
      <Icon name={icon} size="lg" />
      <div className="flex-column ml-6">
        <div
          className={cn(
            "mb-1",
            "font-barlow font-light text-xl text-gray-800 dark:text-gray-100"
          )}
        >
          {title}
        </div>
        <div className="font-light text-sm text-gray-400">{subtitle}</div>
      </div>
    </section>
  );
}
