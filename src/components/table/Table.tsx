import React, { createContext, useRef, useContext } from "react"
import cn from "classnames"
import {
  useTable,
  useTableRow,
  useTableColumnHeader,
  useTableCell,
  useTableRowGroup,
} from "@react-aria/table"
import {
  useTableState,
  TableState,
  TableBody as ReactAriaTableBody,
  TableHeader as ReactAriaTableHeader,
  Row as ReactAriaTableRow,
  Column as ReactAriaTableColumn,
  Cell as ReactAriaTableCell,
} from "@react-stately/table"
import { Card } from "../card/Card"

// @ts-expect-error: We cannot provide a valid initial value, but TSC does not understand that it is okay
const TableContext = createContext<TableState<TableValue>>(null)

// This is not typed so that the consumer has the freedom to render whatever they like
type TableValue = any

/** Manually typed representation of a row / column / cell in react-aria. Reference: https://react-spectrum.adobe.com/react-stately/Collection.html */
type ReactAriaTableNode = {
  /** User provided key */
  key: React.Key
  /** Type of node. Can be `column` (for columns), `item` (for rows) or `cell` (for cells) */
  type: string
  /** Rendered React element */
  rendered: React.ReactNode
  /** User provided value from `Table.Header`'s `column` prop */
  value: TableValue
  /** Depth of this column */
  level: number
  /** Indicates if this columns has more sub-columns */
  hasChildNodes: boolean
  /** Sub-columns */
  childNodes: Iterable<ReactAriaTableNode>
  /** Not really sure */
  textValue: string
}

type TableContainerProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  children: React.ReactElement[]
}

function TableContainer({ id, children }: TableContainerProps) {
  const ref = useRef<HTMLTableElement>(null)

  if (children.length < 2) {
    throw new Error("A Table.Container must contain at least two children")
  }

  const [lastChild] = children.slice(children.length - 1)
  let tableChildren = children
  if (lastChild.type === TableFooter) {
    // If the last child is a TableFooter, remove it before passing children on to `useTableState` since react-stately does not understand it.
    tableChildren = children.slice(0, children.length - 1)
  }

  const state = useTableState<TableValue>({
    selectionMode: "none",
    children: tableChildren,
  })
  const { gridProps } = useTable({ ref, id }, state)

  return (
    <TableContext.Provider value={state}>
      <Card className="px-0 py-0">
        <table
          ref={ref}
          className="table w-full"
          style={{ borderSpacing: "0 1rem" }}
          {...gridProps}
        >
          <TableHeader />
          <TableBody />
          {lastChild}
        </table>
      </Card>
    </TableContext.Provider>
  )
}

type TableHeaderProps = {}

function TableHeader({}: TableHeaderProps) {
  const state = useContext(TableContext)
  const ref = useRef<HTMLTableSectionElement>(null)
  const { rowGroupProps } = useTableRowGroup()

  if (state.collection.headerRows.length == 0) {
    // If no header rows are defined, render nothing
    return null
  }

  return (
    <thead ref={ref} lens-role="table-header" {...rowGroupProps}>
      {state.collection.headerRows.map((r) => (
        <TableHeaderRow key={r.key} row={r} />
      ))}
    </thead>
  )
}

type TableHeaderRowProps = {
  row: ReactAriaTableNode
}
function TableHeaderRow({ row }: TableHeaderRowProps) {
  const state = useContext(TableContext)
  const ref = useRef<HTMLTableRowElement>(null)
  const { rowProps } = useTableRow({ node: row, ref }, state)

  return (
    <tr
      ref={ref}
      lens-role="table-header-row"
      {...rowProps}
      className="table-row"
    >
      {[...row.childNodes].map((c) => (
        <TableColumnHeader key={c.key} column={c} />
      ))}
    </tr>
  )
}

type TableColumnHeaderProps = {
  column: ReactAriaTableNode
}
function TableColumnHeader({ column }: TableColumnHeaderProps) {
  const state = useContext(TableContext)
  const ref = useRef<HTMLTableHeaderCellElement>(null)
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column, ref },
    state
  )

  return (
    <th
      ref={ref}
      lens-role="table-column-header"
      {...columnHeaderProps}
      className={cn(
        "table-cell",
        "px-6 py-2",
        "font-barlow uppercase text-sm text-left text-gray-800 dark:text-gray-100"
      )}
    >
      {column.rendered}
    </th>
  )
}

export function TableBody({}) {
  const state = useContext(TableContext)
  return (
    <tbody lens-role="table-body">
      {[...state.collection.body.childNodes].map((row) => (
        <TableRow key={row.key} row={row} />
      ))}
    </tbody>
  )
}

type TableRowProps = {
  row: ReactAriaTableNode
}
function TableRow({ row }: TableRowProps) {
  const ref = useRef<HTMLTableRowElement>(null)
  const state = useContext(TableContext)
  const { rowProps } = useTableRow({ node: row, ref }, state)

  return (
    <tr
      ref={ref}
      lens-role="table-row"
      {...rowProps}
      className={cn(
        "table-row",
        "even:bg-white dark:even:bg-gray-800 odd:bg-gray-100 dark:odd:bg-gray-900"
      )}
    >
      {[...row.childNodes].map((cell: any) => (
        <TableCell key={cell.key} cell={cell} />
      ))}
    </tr>
  )
}

type TableCellProps = {
  cell: ReactAriaTableNode
}
function TableCell({ cell }: TableCellProps) {
  const ref = useRef<HTMLTableDataCellElement>(null)
  const state = useContext(TableContext)
  const { gridCellProps } = useTableCell({ node: cell, ref }, state)

  return (
    <td
      ref={ref}
      lens-role="table-cell"
      {...gridCellProps}
      className={cn(
        "table-cell px-6 py-3",
        "text-sm text-gray-600 dark:text-gray-300"
      )}
    >
      {cell.rendered}
    </td>
  )
}

type TableFooterProps = {
  children: React.ReactElement
}
function TableFooter({ children }: TableFooterProps) {
  return (
    <tfoot
      lens-role="table-footer"
      className="border-t border-gray-300 dark:border-gray-600"
    >
      <tr lens-role="table-footer-row">
        <td lens-role="table-footer-cell" className="px-4 py-3">
          {children}
        </td>
      </tr>
    </tfoot>
  )
}

export const Table = {
  Container: TableContainer,
  Header: ReactAriaTableHeader,
  Body: ReactAriaTableBody,
  Row: ReactAriaTableRow,
  Column: ReactAriaTableColumn,
  Cell: ReactAriaTableCell,
  Footer: TableFooter,
}
