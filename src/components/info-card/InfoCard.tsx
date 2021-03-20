import React from "react"
import cn from "classnames"
import { Card } from "../card/Card"
import { Icon } from "../icon/Icon"
import { Title } from "../../typography/title/Title"
import { Label } from "../label/Label"

type InfoCardContainerProps = React.PropsWithChildren<{
  /** An identifying icon */
  icon?: string
  /** The title of the Card */
  title?: string
  /** If provided, fixes the Card's width */
  width?: number
  /** If provided, fixes the Card's width */
  height?: number
}>

/** An InfoCard displays */
function InfoCardContainer({
  icon,
  title,
  width,
  height,
  children,
}: InfoCardContainerProps) {
  return (
    <Card width={width} height={height} className="table px-0 py-0">
      <section className="flex items-center px-6 py-4">
        {icon && <Icon name={icon} size="md"></Icon>}
        {title && <Title className="ml-6">{title}</Title>}
      </section>

      {children}
    </Card>
  )
}

type InfoCardRowProps = {
  /** A name for this row */
  label: string
  /** This row's value */
  children: string
}

function InfoCardRow({ label, children }: InfoCardRowProps) {
  return (
    <tr
      className={cn(
        "w-full",
        "even:bg-gray-100 dark:even:bg-gray-900 odd:bg-white dark:odd:bg-gray-800"
      )}
    >
      <td className={cn("align-middle px-6 py-2")}>
        <Label>{label}</Label>
      </td>
      <td
        className={cn(
          "w-full align-middle px-3 py-2",
          "text-gray-800 dark:text-gray-100"
        )}
      >
        {children}
      </td>
    </tr>
  )
}

export const InfoCard = {
  Container: InfoCardContainer,
  Row: InfoCardRow,
}
