import React from "react";
import { Icon } from "../icon/Icon";
import { Title } from "../title/Title";
import { Subtitle } from "../subtitle/Subtitle";

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
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
    </section>
  );
}
