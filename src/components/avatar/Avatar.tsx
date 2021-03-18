import React from "react";
import cn from "classnames";
import { Button } from "../button/Button";
import { Size, sizeToNumeric } from "../../utils/sizeToNumeric";

type AvatarProps = {
  /** URL to the image resource to display */
  url: string;
  /** A small description of this image */
  label: string;
  /** Size of the Avatar */
  size?: Size;
  /** Callback involed when this avatar is pressed */
  onPress?: () => void;
};

export function Avatar({ url, label, size = "lg", onPress }: AvatarProps) {
  const width = sizeToNumeric(size);
  const classNames = cn("rounded-full");

  if (onPress) {
    return (
      <Button variant="quiet">
        {/* If the Avatar is clickable, treat it as a button, AKA no alt-text */}
        <img src={url} className={classNames} width={width} height={width} />
      </Button>
    );
  }

  /* If the Avatar is not clickable, treat it as an image, AKA add alt-text */
  return (
    <img
      src={url}
      alt={label}
      className={classNames}
      width={width}
      height={width}
    />
  );
}
