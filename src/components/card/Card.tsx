import React from "react";
import { Icon } from "../icon/Icon";
import { Title } from "../title/Title";

type CardProps = React.PropsWithChildren<{
  /** An identifying icon */
  icon?: string;
  /** The title of the Card */
  title?: string;
}>;

export function Card({ children, icon, title }: CardProps) {
  return (
    <div className="rounded-md shadow-md p-6 w-full">
      {(icon || title) && (
        <section className="flex items-center">
          {icon && <Icon name={icon} size="md"></Icon>}
          {title && <Title className="ml-6">{title}</Title>}
        </section>
      )}
      <section>{children}</section>
    </div>
  );
}
