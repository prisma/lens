import React from "react";
import cn from "classnames";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";
import { Size, sizeToNumeric } from "../../utils/sizeToNumeric";

type AvatarProps = {
  /** URL to the image resource to display */
  url?: string;
  /** A small description of this image */
  label: string;
  /** Size of the Avatar */
  size?: Size;
  /** Name of the user this Avatar belongs to */
  name?: string;
  /** Email of the user this Avatar belongs to */
  email?: string;
  /** Callback involed when this avatar is pressed */
  onPress?: () => void;
};

export function Avatar({
  url,
  label,
  size = "lg",
  name,
  email,
  onPress,
}: AvatarProps) {
  const width = sizeToNumeric(size);

  /* If the Avatar is clickable, treat it as a button, AKA no alt-text, otherwise add alt-text */
  let avatar;
  if (url) {
    avatar = (
      <img
        src={url}
        className="rounded-full"
        width={width}
        height={width}
        alt={onPress ? undefined : label}
      />
    );
  } else {
    avatar = (
      <Icon
        name="user"
        size={size}
        className={cn("rounded-full", "bg-gray-100 dark:bg-gray-800", "p-1")}
      />
    );
  }

  const nameAndEmail = (
    <div
      className={cn("flex items-center space-x-4", {
        "cursor-pointer": !!onPress,
      })}
    >
      {avatar}
      <div className="flex flex-col">
        <span className="font-bold text-gray-800 dark:text-gray-100">
          {name}
        </span>
        <span className="text-gray-600 dark:text-gray-300">{email}</span>
      </div>
    </div>
  );

  let rendered = avatar;
  if (name || email) {
    rendered = nameAndEmail;
  }
  if (onPress) {
    rendered = <Button variant="quiet">{rendered}</Button>;
  }

  return rendered;
}
